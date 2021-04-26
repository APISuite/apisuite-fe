import { Reducer } from 'redux'
import update from 'immutability-helper'
import cookie from 'js-cookie'

import { LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, LOGIN_USER, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS } from './actions/login'
import { FORGOT_PASSWORD, FORGOT_PASSWORD_SUCCESS } from './actions/forgotPassword'
import { LOGOUT } from './actions/logout'
import { SSO_PROVIDERS_SUCCESS } from './actions/ssoProviders'
import { AuthActions } from './actions/types'
import { COO_KEY } from './middleware'
import { AuthStore } from './types'

// FIXME: remove the need for auth cookies as they are no longer used effectively
const authToken = cookie.get(COO_KEY) || ''

const initialState: AuthStore = {
  authToken,
  error: undefined,
  isAuthorizing: false,
  isRecoveringPassword: false,
  providers: null,
  user: undefined,
  providerSignupURL: '',
}

const reducer: Reducer<AuthStore, AuthActions> = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return update(state, {
        isAuthorizing: { $set: true },
        error: { $set: undefined },
      })
    }

    case LOGIN_USER: {
      return update(state, {
        isAuthorizing: { $set: true },
      })
    }

    case LOGIN_SUCCESS: {
      return update(state, {
        authToken: { $set: 'TOKEN_COMES_FROM_BE_IN_COOKIE' },
        error: { $set: undefined },
      })
    }

    case LOGIN_USER_SUCCESS: {
      const { user } = action
      return update(state, {
        user: { $set: user },
        isAuthorizing: { $set: false },
      })
    }

    case FORGOT_PASSWORD: {
      return update(state, {
        isRecoveringPassword: { $set: true },
      })
    }

    case FORGOT_PASSWORD_SUCCESS: {
      return update(state, {
        isRecoveringPassword: { $set: false },
      })
    }

    case LOGIN_ERROR:
    case LOGIN_USER_ERROR: {
      return update(state, {
        error: { $set: action.error.message || 'Whooops, something went wrong...' },
        isAuthorizing: { $set: false },
      })
    }

    case LOGOUT: {
      return initialState
    }

    // FIXME: why do we do this? this might not work as expected
    // case LOCATION_CHANGE: {
    //   if (action.payload.action === 'POP') {
    //     return update(state, {
    //       error: { $set: undefined },
    //       providers: { $set: null },
    //     })
    //   }

    //   return state
    // }

    case SSO_PROVIDERS_SUCCESS: {
      return update(state, {
        providers: { $set: action.providers },
      })
    }

    default:
      return state
  }
}

export default reducer
