import update from 'immutability-helper'
import { AuthStore, AuthStoreActionTypes, AuthPayloads } from './types'
import { Reducer, AnyAction, Dispatch } from 'redux'
import { History } from 'history'
import cookie from 'js-cookie'

export const LOGIN = 'auth/LOGIN'
export const LOGIN_USER = 'auth/LOGIN_USER'
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'
const LOGIN_ERROR = 'auth/LOGIN_ERROR'
const LOGIN_USER_SUCCESS = 'auth/LOGIN_USER_SUCCESS'
const LOGIN_USER_ERROR = 'auth/LOGIN_USER_ERROR'
const LOGOUT = 'auth/LOGOUT'

export const RECOVER_PASSWORD = 'auth/RECOVER_PASSWORD'
export const RECOVER_PASSWORD_ERROR = 'auth/RECOVER_PASSWORD_ERROR'
export const RECOVER_PASSWORD_SUCCESS = 'auth/RECOVER_PASSWORD_SUCCESS'

export const TOKEN_KEY = 'at'
export const TOKEN_MAX_AGE = 30 // <-- 1 month

const authToken = cookie.get(TOKEN_KEY) || ''

const initialState: AuthStore = {
  authToken,
  user: undefined,
  isAuthorizing: false,
  isRecoveringPassword: false,
  error: undefined,
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
      const { payload: { token } } = action as AuthStoreActionTypes['loginSuccess']
      return update(state, {
        authToken: { $set: token },
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

    case RECOVER_PASSWORD: {
      return update(state, {
        isRecoveringPassword: { $set: true },
      })
    }

    case RECOVER_PASSWORD_SUCCESS: {
      return update(state, {
        isRecoveringPassword: { $set: false },
      })
    }

    case LOGIN_ERROR:
    case LOGIN_USER_ERROR: {
      return update(state, {
        error: { $set: action.error || 'Whoops, something went wrong...' },
        isAuthorizing: { $set: false },
      })
    }

    case LOGOUT: {
      return update(state, {
        user: { $set: undefined },
        authToken: { $set: undefined },
        isAuthorizing: { $set: false },
      })
    }

    default:
      return state
  }
}

export const authActions = {
  login: (payload: AuthPayloads['login']) => ({ type: LOGIN, payload }),
  loginUser: (payload: AuthPayloads['loginUser']) => ({ type: LOGIN_USER, payload }),
  loginSuccess: (payload: AuthPayloads['loginSuccess']) => ({ type: LOGIN_SUCCESS, payload }),
  loginError: (error: AuthPayloads['loginError']) => ({ type: LOGIN_ERROR, error }),
  loginUserSuccess: (payload: AuthPayloads['loginUserSuccess']) => ({ type: LOGIN_USER_SUCCESS, payload }),
  loginUserError: (error: AuthPayloads['loginUserError']) => ({ type: LOGIN_USER_ERROR, error }),
  recoverPassword: (payload: AuthPayloads['recoverPassword']) => ({ type: RECOVER_PASSWORD, payload }),
  recoverPasswordError: (payload: AuthPayloads['recoverPasswordError']) => ({ type: RECOVER_PASSWORD_ERROR, payload }),
  recoverPasswordSuccess: () => ({ type: RECOVER_PASSWORD_SUCCESS }),
  logout: () => ({ type: LOGOUT }),
}

export const createAuthMiddleware = (history: History) => () => (next: Dispatch) => (action: AnyAction) => {
  next(action)
  if (action.type === LOGIN_SUCCESS) {
    cookie.set(TOKEN_KEY, action.payload.token, {
      expires: TOKEN_MAX_AGE,
      path: '/',
    })
  } else if (action.type === LOGIN_USER_SUCCESS) {
    const location = history.location

    if (location.pathname.startsWith('/auth')) {
      // let nextPath = location.state && location.state.onSuccess ? location.state.onSuccess : '/'
      history.replace('/dashboard')
    }
  } else if (action.type === LOGIN_ERROR || action.type === LOGIN_USER_ERROR) {
    cookie.remove(TOKEN_KEY, { path: '/' })
    history.replace('/auth/login')
  } else if (action.type === LOGOUT) {
    cookie.remove(TOKEN_KEY, { path: '/' })
    history.replace('/auth/login')
  }
}

export default reducer
