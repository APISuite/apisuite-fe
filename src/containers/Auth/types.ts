import { Action, AnyAction } from 'redux'

import { History } from 'history'

import { ErrorReason } from 'util/request'

import { RoleRequirement } from '@apisuite/extension-ui-types'

import { Role } from 'containers/Profile/types'

import { LOGOUT, SSO_PROVIDERS } from './ducks'

export interface AuthStore {
  authToken?: string,
  error?: string,
  isAuthorizing: boolean,
  isRecoveringPassword: boolean,
  providers: null | string[],
  user?: User,
  providerSignupURL: string,
}

export interface User {
  fName: string,
  id: number,
  lName: string,
  photo?: string,
  role: Role,
}

export interface AuthPayloads {
  login: {
    email: string,
    password: string,
  },

  loginSuccess: {
    token: string,
  },

  loginError: ErrorReason,

  loginUser: {
    token?: string,
  },

  loginUserSuccess: {
    user: User,
  },

  loginUserError: ErrorReason,

  forgotPassword: {
    email: string,
  },

  forgotPasswordError: ErrorReason,

  recoverPassword: {
    password: string,
    token: string,
  },

  recoverPasswordError: any,

  logoutError: {
    error: string,
  },

  expireSession: {
    error: any,
  },

  sso: {
    ssoLogin: {
      provider: string,
    },

    ssoLoginSuccess: {
      code: string,
    },

    ssoLoginError: {
      error: ErrorReason,
    },

    ssoProvidersSuccess: {
      providers: string[],
    },

    ssoTokenExchange: {
      code: string,
      provider: string,
    },

    ssoTokenExchangeSuccess: {
      token: string,
    },

    ssoTokenExchangeError: {
      error: ErrorReason,
    },
  },
}

export interface AuthStoreActionTypes {
  forgotPassword: AnyAction & { payload: AuthPayloads['forgotPassword'] },
  forgotPasswordError: AnyAction & { payload: AuthPayloads['forgotPasswordError'] },
  forgotPasswordSuccess: AnyAction,
  login: AnyAction & { payload: AuthPayloads['login'] },
  loginError: AnyAction & { error: AuthPayloads['loginError'] },
  loginSuccess: AnyAction & { payload: AuthPayloads['loginSuccess'] },
  loginUserError: AnyAction & { error: AuthPayloads['loginUserError'] },
  loginUserSuccess: AnyAction & { payload: AuthPayloads['loginUserSuccess'] },
  logout: Action<typeof LOGOUT>,
  recoverPassword: AnyAction & { payload: AuthPayloads['recoverPassword'] } & { history: History<any> },
  recoverPasswordError: AnyAction & { payload: AuthPayloads['recoverPasswordError'] },
  recoverPasswordSuccess: AnyAction,
  ssoLogin: AnyAction & { payload: AuthPayloads['sso']['ssoLogin'] },
  ssoLoginError: AnyAction & { error: AuthPayloads['sso']['ssoLoginError'] },
  ssoLoginSuccess: AnyAction & { payload: AuthPayloads['sso']['ssoLoginSuccess'] },
  ssoProviders: Action<typeof SSO_PROVIDERS>,
  ssoProvidersSuccess: AnyAction & { payload: AuthPayloads['sso']['ssoProvidersSuccess'] },
  ssoTokenExchange: AnyAction & { payload: AuthPayloads['sso']['ssoTokenExchange'] },
  ssoTokenExchangeError: AnyAction & { error: AuthPayloads['sso']['ssoTokenExchangeError'] },
  ssoTokenExchangeSuccess: AnyAction & { payload: AuthPayloads['sso']['ssoTokenExchangeSuccess'] },
}

export interface AuthStoreActionCreators {
  getSSOProviders: () => AuthStoreActionTypes['ssoProviders'],
  getSSOProvidersSuccess: (payload: AuthPayloads['sso']['ssoProvidersSuccess']) => AuthStoreActionTypes['ssoProvidersSuccess'],
  login: (payload: AuthPayloads['login']) => AuthStoreActionTypes['login'],
  loginError: (error: AuthPayloads['loginError']) => AuthStoreActionTypes['loginError'],
  loginSuccess: (payload: AuthPayloads['loginSuccess']) => AuthStoreActionTypes['loginSuccess'],
  logout: () => AuthStoreActionTypes['logout'],
  performSSOTokenExchange: () => AuthStoreActionTypes['ssoTokenExchange'],
  performSSOTokenExchangeSuccess: (payload: AuthPayloads['sso']['ssoTokenExchangeSuccess']) => AuthStoreActionTypes['ssoTokenExchangeSuccess'],
  ssoLogin: (payload: AuthPayloads['sso']['ssoLogin']) => AuthStoreActionTypes['ssoLogin'],
  ssoLoginError: (error: AuthPayloads['sso']['ssoLoginError']) => AuthStoreActionTypes['ssoLoginError'],
  ssoLoginSuccess: (payload: AuthPayloads['sso']['ssoLoginSuccess']) => AuthStoreActionTypes['ssoLoginSuccess'],
}

export interface RequireAuthProps {
  auth?: AuthStore,
  component: JSX.Element,
  requireAuth: boolean,
  role?: RoleRequirement,
}
