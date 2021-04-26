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
import {
  ConfirmRegistrationAction,
  ForgotPasswordAction,
  LoginAction,
  RecoverPasswordAction,
  SSOLoginAction,
  SSOTokenExchangeAction,
  SubmitSignUpDetails,
  ValidateRegistrationTokenAction,
} from './actions/types'

import { confirmRegistrationSuccess } from './actions/confirmRegistration'
import { validateRegistrationTokenError, validateRegistrationTokenSuccess, VALIDATE_REGISTRATION_TOKEN } from './actions/validateRegistrationToken'

import { submitSignUpDetailsError, submitSignUpDetailsSuccess, SUBMIT_SIGN_UP_DETAILS } from './actions/submitSignUpDetails'
import { ProfileDetailsResponse } from 'components/SignUpForm/types'

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
    yield put(loginError({ error: error.message }))
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
    yield put(loginUserError({ error: error.message }))
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
    forgotPasswordError({ error: error.message })
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
    recoverPasswordError({ error: error.message })
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
    yield put(logoutError({ error: error.message }))
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
    yield put(loginError({ error: error.message }))
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
    yield put(loginError({ error: error.message }))
  }
}

// ---

export function * submitSignUpDetailsSaga ({ details }: SubmitSignUpDetails) {
  try {
    // Personal details submission logic

    const personalDetailsResponse: ProfileDetailsResponse = yield call(request, {
      url: `${API_URL}/registration/user`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        name: details.name,
        email: details.email,
      }),
    })

    // Organisation details submission logic

    if (details.orgName === '' || (details.orgName === '' && details.website === '')) {
      yield call(request, {
        url: `${API_URL}/registration/organization`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          name: details.orgName,
          website: details.website,
          registrationToken: personalDetailsResponse.token,
        }),
      })
    }

    // Security details submission logic

    yield call(request, {
      url: `${API_URL}/registration/security`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        password: details.password,
        registrationToken: personalDetailsResponse.token,
      }),
    })

    yield put(submitSignUpDetailsSuccess({}))
  } catch (error) {
    yield put(submitSignUpDetailsError({ error: error.message }))
  }
}

export function * confirmRegistrationSaga ({ token }: ConfirmRegistrationAction) {
  try {
    yield call(request, {
      url: `${API_URL}/registration/confirm`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ token }),
    })

    yield put(openNotification('success', 'We have confirmed your account! You can now sign in.', 4000))
    yield put(confirmRegistrationSuccess({}))
  } catch (error) {
    yield put(confirmRegistrationSuccess({ error: error.message }))
  }
}

export function * validateRegisterTokenSaga ({ token }: ValidateRegistrationTokenAction) {
  try {
    yield call(request, {
      url: `${API_URL}/registration/invitation`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ token }),
    })

    yield put(validateRegistrationTokenSuccess({}))
  } catch (error) {
    yield put(validateRegistrationTokenError({ error: error.message }))
  }
}

// ---

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
  yield takeLatest(SUBMIT_SIGN_UP_DETAILS, submitSignUpDetailsSaga)
  yield takeLatest(VALIDATE_REGISTRATION_TOKEN, validateRegisterTokenSaga)
}

export default rootSaga
