import { call, delay, put, select, takeLatest } from 'redux-saga/effects'
import qs from 'qs'

import request from 'util/request'
import stateGenerator from 'util/stateGenerator'
import { openNotification } from 'store/notificationStack/actions/notification'
import { Profile } from 'store/profile/types'
import { API_URL } from 'constants/endpoints'
import { ROLES } from 'constants/global'
import { Store } from 'store/types'
import { LOGIN, loginError, loginSuccess, loginUserError, loginUserSuccess, LOGIN_SUCCESS, LOGIN_USER } from './actions/login'
import { EXPIRED_SESSION } from './actions/expiredSession'
import { forgotPasswordError, forgotPasswordSuccess, FORGOT_PASSWORD } from './actions/forgotPassword'
import { logout, LOGOUT, logoutError, logoutSuccess } from './actions/logout'
import { recoverPasswordError, recoverPasswordSuccess, RECOVER_PASSWORD } from './actions/recoverPassword'
import { SSO_LOGIN } from './actions/ssoLogin'
import { ssoProvidersSuccess, SSO_PROVIDERS } from './actions/ssoProviders'
import { SSO_TOKEN_EXCHANGE } from './actions/ssoTokenExchange'
import { ForgotPasswordAction, LoginAction, RecoverPasswordAction, SSOLoginAction, SSOTokenExchangeAction } from './actions/types'

const STATE_STORAGE = 'ssoStateStorage'

function * loginWorker (action: LoginAction) {
  try {
    const loginUrl = `${API_URL}/auth/login`

    const data = {
      email: action.email,
      password: action.password,
    }

    yield call(request, {
      url: loginUrl,
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify(data),
    })

    yield put(loginSuccess({}))
  } catch (error) {
    yield put(loginError({ error }))
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

    yield put(loginUserSuccess({
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
    yield put(loginUserError({ error }))
  }
}

function * forgotPasswordSaga ({ email }: ForgotPasswordAction) {
  try {
    yield call(request, {
      url: `${API_URL}/users/forgot`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ email }),
    })

    yield put(forgotPasswordSuccess({}))
  } catch (error) {
    forgotPasswordError({ error })
  }
}

function * recoverPasswordSaga ({ password, token }: RecoverPasswordAction) {
  try {
    yield call(request, {
      url: `${API_URL}/users/recover`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ password, token }),
    })

    yield put(recoverPasswordSuccess({}))

    // FIXME: use middleware
    // action.history.replace('auth/login')

    yield put(openNotification('success', 'Password successfully changed! You may now sign in.', 3000))
  } catch (error) {
    recoverPasswordError({ error })
  }
}

function * logoutWorker () {
  try {
    const logoutUrl = `${API_URL}/auth/logout`

    yield call(request, {
      url: logoutUrl,
      method: 'POST',
    })

    yield put(logoutSuccess({}))
  } catch (error) {
    yield put(logoutError({ error }))
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
        yield put(logout({}))
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

    yield put(ssoProvidersSuccess({ providers: response.sso }))
  } catch (error) {
    console.log('Error retrieving SSO providers.')
  }
}

function * ssoLoginWorker ({ provider }: SSOLoginAction) {
  try {
    let state = localStorage.getItem(STATE_STORAGE)

    console.log('state', state)

    if (!state) {
      state = stateGenerator()

      localStorage.setItem(STATE_STORAGE, state)
    }

    const ssoLoginUrl = `${API_URL}/auth/oidc/${provider}?state=${state}`

    const response: { url: string } = yield call(window.fetch, ssoLoginUrl)

    window.location.href = response.url
  } catch (error) {
    yield put(loginError({ error }))
  }
}

function * ssoTokenExchangeWorker ({ code, provider }: SSOTokenExchangeAction) {
  try {
    const ssoLoginUrl = `${API_URL}/auth/oidc/${provider}/token`

    yield call(request, {
      url: ssoLoginUrl,
      method: 'POST',
      data: { code },
    })

    // FIXME: move to middleware
    localStorage.removeItem(STATE_STORAGE)
    localStorage.removeItem('attemptingSignInWithProvider')

    yield put(loginSuccess({}))

    // FIXME: move to middleware
    window.location.href = '/auth'
  } catch (error) {
    yield put(loginError(error.message.error))
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
