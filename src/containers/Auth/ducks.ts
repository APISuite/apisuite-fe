import { AnyAction, Dispatch, Reducer } from 'redux'

import { AuthPayloads, AuthStore, AuthStoreActionTypes } from './types'

import { History } from 'history'

import update from 'immutability-helper'

import cookie from 'js-cookie'

import { LOCATION_CHANGE } from 'connected-react-router'

const LOGIN_ERROR = 'auth/LOGIN_ERROR'
const LOGIN_USER_ERROR = 'auth/LOGIN_USER_ERROR'
const LOGIN_USER_SUCCESS = 'auth/LOGIN_USER_SUCCESS'

const LOGOUT_ERROR = 'auth/LOGOUT_ERROR'
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS'

export const COO_KEY = 'apiSuiteSession'
export const COO_KEY_MAX_AGE = 30 * 24 * 60 // <-- 1 month

export const EXPIRED_SESSION = 'auth/EXPIRED_SESSION'

export const FORGOT_PASSWORD = 'auth/FORGOT_PASSWORD'
export const FORGOT_PASSWORD_ERROR = 'auth/FORGOT_PASSWORD_ERROR'
export const FORGOT_PASSWORD_SUCCESS = 'auth/FORGOT_PASSWORD_SUCCESS'

export const LOGIN = 'auth/LOGIN'
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'
export const LOGIN_USER = 'auth/LOGIN_USER'

export const LOGOUT = 'auth/LOGOUT'

export const RECOVER_PASSWORD = 'auth/RECOVER_PASSWORD'
export const RECOVER_PASSWORD_ERROR = 'auth/RECOVER_PASSWORD_ERROR'
export const RECOVER_PASSWORD_SUCCESS = 'auth/RECOVER_PASSWORD_SUCCESS'

export const SSO_LOGIN = 'auth/SSO_LOGIN'
export const SSO_LOGIN_ERROR = 'auth/SSO_LOGIN_ERROR'
export const SSO_LOGIN_SUCCESS = 'auth/SSO_LOGIN_SUCCESS'

export const SSO_PROVIDERS = 'auth/SSO_PROVIDERS'
export const SSO_PROVIDERS_SUCCESS = 'auth/SSO_PROVIDERS_SUCCESS'

export const SSO_TOKEN_EXCHANGE = 'auth/SSO_TOKEN_EXCHANGE'
export const SSO_TOKEN_EXCHANGE_ERROR = 'auth/SSO_TOKEN_EXCHANGE_ERROR'
export const SSO_TOKEN_EXCHANGE_SUCCESS = 'auth/SSO_TOKEN_EXCHANGE_SUCCESS'

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

const reducer: Reducer<AuthStore, AnyAction> = (state = initialState, action) => {
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
      const { payload: { user } } = action as AuthStoreActionTypes['loginUserSuccess']
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
        error: { $set: action.error || 'Whooops, something went wrong...' },
        isAuthorizing: { $set: false },
      })
    }

    case LOGOUT: {
      return initialState
    }

    case LOCATION_CHANGE: {
      if (action.payload.action === 'POP') {
        return update(state, {
          error: { $set: undefined },
          providers: { $set: null },
        })
      }

      return state
    }

    case SSO_PROVIDERS_SUCCESS: {
      return update(state, {
        providers: { $set: action.payload.providers },
      })
    }

    default:
      return state
  }
}

export const authActions = {
  forgotPassword: (payload: AuthPayloads['forgotPassword']) => ({ type: FORGOT_PASSWORD, payload }),
  forgotPasswordError: (payload: AuthPayloads['forgotPasswordError']) => ({ type: FORGOT_PASSWORD_ERROR, payload }),
  forgotPasswordSuccess: () => ({ type: FORGOT_PASSWORD_SUCCESS }),
  getSSOProviders: () => ({ type: SSO_PROVIDERS }),
  getSSOProvidersSuccess: (payload: AuthPayloads['sso']['ssoProvidersSuccess']) => ({ type: SSO_PROVIDERS_SUCCESS, payload }),
  handleSessionExpire: () => ({ type: EXPIRED_SESSION }),
  login: (payload: AuthPayloads['login']) => ({ type: LOGIN, payload }),
  loginError: (error: AuthPayloads['loginError']) => ({ type: LOGIN_ERROR, error }),
  loginSuccess: () => ({ type: LOGIN_SUCCESS }),
  loginUser: (payload: AuthPayloads['loginUser']) => ({ type: LOGIN_USER, payload }),
  loginUserError: (error: AuthPayloads['loginUserError']) => ({ type: LOGIN_USER_ERROR, error }),
  loginUserSuccess: (payload: AuthPayloads['loginUserSuccess']) => ({ type: LOGIN_USER_SUCCESS, payload }),
  logout: () => ({ type: LOGOUT }),
  logoutError: (payload: AuthPayloads['logoutError']) => ({ type: LOGOUT_ERROR, payload }),
  logoutSuccess: () => ({ type: LOGOUT_SUCCESS }),
  recoverPassword: (payload: AuthPayloads['recoverPassword'], history: History) => ({ type: RECOVER_PASSWORD, payload, history }),
  recoverPasswordError: (payload: AuthPayloads['recoverPasswordError']) => ({ type: RECOVER_PASSWORD_ERROR, payload }),
  recoverPasswordSuccess: () => ({ type: RECOVER_PASSWORD_SUCCESS }),
  ssoLogin: (payload: AuthPayloads['sso']['ssoLogin']) => ({ type: SSO_LOGIN, payload }),
  ssoLoginError: (error: AuthPayloads['sso']['ssoLoginError']) => ({ type: SSO_LOGIN_ERROR, error }),
  ssoLoginSuccess: (payload: AuthPayloads['sso']['ssoLoginSuccess']) => ({ type: SSO_LOGIN_SUCCESS, payload }),
  ssoTokenExchange: (payload: AuthPayloads['sso']['ssoTokenExchange']) => ({ type: SSO_TOKEN_EXCHANGE, payload }),
  ssoTokenExchangeError: (error: AuthPayloads['sso']['ssoTokenExchangeError']) => ({ type: SSO_TOKEN_EXCHANGE_ERROR, error }),
  ssoTokenExchangeSuccess: (payload: AuthPayloads['sso']['ssoTokenExchangeSuccess']) => ({ type: SSO_TOKEN_EXCHANGE_SUCCESS, payload }),
}

export const createAuthMiddleware = (history: History) => () => (next: Dispatch) => (action: AnyAction) => {
  next(action)

  if (action.type === LOGIN_SUCCESS) {
    cookie.set(COO_KEY, 'TOKEN_COMES_FROM_BE_IN_COOKIE', {
      expires: new Date(new Date().getTime() + COO_KEY_MAX_AGE * 60 * 1000),
      path: '/',
    })
  } else if (action.type === LOGIN_USER_SUCCESS) {
    const location = history.location

    if (location.pathname.startsWith('/auth')) {
      if (action.payload.user?.role?.name === 'admin') {
        history.replace('/dashboard')
      } else {
        history.replace('/')
      }
    }
  } else if (action.type === LOGIN_ERROR || action.type === LOGIN_USER_ERROR) {
    cookie.remove(COO_KEY, { path: '/' })
    history.replace('/auth/signin')
  } else if (action.type === LOGOUT || action.type === LOGOUT_ERROR) {
    cookie.remove(COO_KEY, { path: '/' })
    history.replace('/auth/signin')
  }
}

export default reducer
