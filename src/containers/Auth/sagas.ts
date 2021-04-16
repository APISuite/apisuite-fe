import { AnyAction } from 'redux'

import { call, delay, put, select, takeLatest } from 'redux-saga/effects'

import request from 'util/request'
import stateGenerator from 'util/stateGenerator'

import {
  authActions,
  EXPIRED_SESSION,
  FORGOT_PASSWORD,
  LOGIN_SUCCESS,
  LOGIN_USER,
  LOGIN,
  LOGOUT,
  RECOVER_PASSWORD,
  SSO_LOGIN,
  SSO_PROVIDERS,
  SSO_TOKEN_EXCHANGE,
} from './ducks'

import { openNotification } from 'containers/NotificationStack/ducks'

import { Profile } from 'containers/Profile/types'

import { API_URL } from 'constants/endpoints'
import { ROLES } from 'constants/global'

import { Store } from 'store/types'

import qs from 'qs'

const STATE_STORAGE = 'ssoStateStorage'

function * loginWorker (action: AnyAction) {
  try {
    const loginUrl = `${API_URL}/auth/login`

    const data = {
      email: action.payload.email,
      password: action.payload.password,
    }

    yield call(request, {
      url: loginUrl,
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify(data),
    })

    yield put(authActions.loginSuccess())
  } catch (error) {
    yield put(authActions.loginError(error.message.error))
  }
}

function * loginUserWorker () {
  try {
    const profile: Profile = yield call(request, {
      url: `${API_URL}/users/profile`,
      method: 'GET',
    })

    const profileHasOrgDetails = Object.keys(profile.current_org).length !== 0

    const user = profile.user
    const userId = user.id
    const userName = user.name.split(' ')

    yield put(authActions.loginUserSuccess({
      user: {
        fName: userName[0],
        lName: userName[userName.length - 1],
        id: Number(userId),
        role: {
          id: profileHasOrgDetails ? profile.current_org.role.id : `${ROLES.baseUser.level}`,
          name: profileHasOrgDetails ? profile.current_org.role.name : ROLES.baseUser.value,
        },
      },
    }))
  } catch (error) {
    yield put(authActions.loginUserError(error.message.error))
  }
}

function * forgotPasswordSaga (action: AnyAction) {
  try {
    yield call(request, {
      url: `${API_URL}/users/forgot`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(action.payload),
    })

    yield put(authActions.forgotPasswordSuccess())
  } catch (error) {
    authActions.forgotPasswordError(error)
  }
}

function * recoverPasswordSaga (action: AnyAction) {
  try {
    yield call(request, {
      url: `${API_URL}/users/recover`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(action.payload),
    })

    yield put(authActions.recoverPasswordSuccess())

    action.history.replace('auth/login')

    yield put(openNotification('success', 'Password successfully changed! You may now sign in.', 3000))
  } catch (error) {
    authActions.recoverPasswordError(error)
  }
}

function * logoutWorker () {
  try {
    const logoutUrl = `${API_URL}/auth/logout`

    yield call(request, {
      url: logoutUrl,
      method: 'POST',
    })

    yield put(authActions.logoutSuccess())
  } catch (error) {
    yield put(authActions.logoutError({ error: error.message || 'An unknown error has occurred.' }))
  }
}

function * expiredSessionWorker () {
  try {
    // Tries to exchange the refresh token for a new access token
    yield call(request, {
      url: `${API_URL}/auth/refresh`,
      method: 'POST',
    })
  } catch (error) {
    // If the token has expired, we sign out
    const authToken: string = yield select((state: Store) => state.auth.authToken)

    // We only sign out if we have the session token
    if (authToken) {
      if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
        yield put(openNotification('error', 'Your session has expired! You need to sign in again.', 5000))
        yield delay(1000)
        yield put(authActions.logout())
      }
    }
  }
}

function * getProviders () {
  try {
    const settingsURL = `${API_URL}/settings`

    const response: { sso: string[] } = yield call(request, {
      url: settingsURL,
      method: 'GET',
    })

    yield put(authActions.getSSOProvidersSuccess({ providers: response.sso }))
  } catch (error) {
    console.log('Error retrieving SSO providers.')
  }
}

function * ssoLoginWorker (action: AnyAction) {
  try {
    let state = localStorage.getItem(STATE_STORAGE)

    console.log('state', state)

    if (!state) {
      state = stateGenerator()

      localStorage.setItem(STATE_STORAGE, state)
    }

    const provider = action?.payload?.provider
    const ssoLoginUrl = `${API_URL}/auth/oidc/${provider}?state=${state}`

    const response: { url: string } = yield call(window.fetch, ssoLoginUrl)

    window.location.href = response.url
  } catch (error) {
    yield put(authActions.loginError(error.message.error))
  }
}

function * ssoTokenExchangeWorker (action: AnyAction) {
  try {
    const provider = action?.payload?.provider
    const ssoLoginUrl = `${API_URL}/auth/oidc/${provider}/token`

    const data = {
      code: action?.payload?.code,
    }

    yield call(request, {
      url: ssoLoginUrl,
      method: 'POST',
      data,
    })

    localStorage.removeItem(STATE_STORAGE)
    localStorage.removeItem('attemptingSignInWithProvider')

    yield put(authActions.loginSuccess())

    window.location.href = '/auth'
  } catch (error) {
    yield put(authActions.loginError(error.message.error))
  }
}

export function * rootSaga () {
  yield takeLatest([LOGIN_SUCCESS, LOGIN_USER], loginUserWorker)
  yield takeLatest(EXPIRED_SESSION, expiredSessionWorker)
  yield takeLatest(FORGOT_PASSWORD, forgotPasswordSaga)
  yield takeLatest(LOGIN, loginWorker)
  yield takeLatest(LOGOUT, logoutWorker)
  yield takeLatest(RECOVER_PASSWORD, recoverPasswordSaga)
  yield takeLatest(SSO_LOGIN, ssoLoginWorker)
  yield takeLatest(SSO_PROVIDERS, getProviders)
  yield takeLatest(SSO_TOKEN_EXCHANGE, ssoTokenExchangeWorker)
}

export default rootSaga
