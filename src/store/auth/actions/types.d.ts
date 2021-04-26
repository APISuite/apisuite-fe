import { ErrorReason } from 'util/request'
import { User } from '../types'
import { EXPIRED_SESSION } from './expiredSession'
import { FORGOT_PASSWORD, FORGOT_PASSWORD_ERROR, FORGOT_PASSWORD_SUCCESS } from './forgotPassword'
import { LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, LOGIN_USER, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS } from './login'
import { LOGOUT, LOGOUT_ERROR, LOGOUT_SUCCESS } from './logout'
import { RECOVER_PASSWORD, RECOVER_PASSWORD_ERROR, RECOVER_PASSWORD_SUCCESS } from './recoverPassword'
import { SSO_LOGIN, SSO_LOGIN_ERROR, SSO_LOGIN_SUCCESS } from './ssoLogin'
import { SSO_PROVIDERS, SSO_PROVIDERS_ERROR, SSO_PROVIDERS_SUCCESS } from './ssoProviders'
import { SSO_TOKEN_EXCHANGE, SSO_TOKEN_EXCHANGE_ERROR, SSO_TOKEN_EXCHANGE_SUCCESS } from './ssoTokenExchange'

export type AuthActions =
LoginAction |
LoginActionSuccess |
LoginActionError |
LoginUserAction |
LoginUserActionSuccess |
LoginUserActionError |
ForgotPasswordAction |
ForgotPasswordActionSuccess |
ForgotPasswordActionError |
ExpiredSessionAction |
RecoverPasswordAction |
RecoverPasswordActionSuccess |
RecoverPasswordActionError |
LogoutAction |
LogoutActionSuccess |
LogoutActionError |
SSOLoginAction |
SSOLoginActionSuccess |
SSOLoginActionError |
SSOProvidersAction |
SSOProvidersActionSuccess |
SSOProvidersActionError |
SSOTokenExchangeAction |
SSOTokenExchangeActionSuccess |
SSOTokenExchangeActionError

export type LoginAction = {
  type: typeof LOGIN,
  email: string,
  password: string,
}

export type LoginActionSuccess = {
  type: typeof LOGIN_SUCCESS,
}

export type LoginActionError = {
  type: typeof LOGIN_ERROR,
  error: ErrorReason,
}

export type LoginUserAction = {
  type: typeof LOGIN_USER,
  token?: string,
}

export type LoginUserActionSuccess = {
  type: typeof LOGIN_USER_SUCCESS,
  user: User,
}

export type LoginUserActionError = {
  type: typeof LOGIN_USER_ERROR,
  error: ErrorReason,
}

export type ForgotPasswordAction = {
  type: typeof FORGOT_PASSWORD,
  email: string,
}

export type ForgotPasswordActionSuccess = {
  type: typeof FORGOT_PASSWORD_SUCCESS,
}

export type ForgotPasswordActionError = {
  type: typeof FORGOT_PASSWORD_ERROR,
  error: ErrorReason,
}

export type ExpiredSessionAction = {
  type: typeof EXPIRED_SESSION,
}

export type RecoverPasswordAction = {
  type: typeof RECOVER_PASSWORD,
  password: string,
  token: string,
}

export type RecoverPasswordActionSuccess = {
  type: typeof RECOVER_PASSWORD_SUCCESS,
}

export type RecoverPasswordActionError = {
  type: typeof RECOVER_PASSWORD_ERROR,
  error: ErrorReason,
}

export type LogoutAction = {
  type: typeof LOGOUT,
}

export type LogoutActionSuccess = {
  type: typeof LOGOUT_SUCCESS,
}

export type LogoutActionError = {
  type: typeof LOGOUT_ERROR,
  error: ErrorReason,
}

export type SSOLoginAction = {
  type: typeof SSO_LOGIN,
  provider: string,
}

export type SSOLoginActionSuccess = {
  type: typeof SSO_LOGIN_SUCCESS,
  code: string,
}

export type SSOLoginActionError = {
  type: typeof SSO_LOGIN_ERROR,
  error: ErrorReason,
}

export type SSOProvidersAction = {
  type: typeof SSO_PROVIDERS,
}

export type SSOProvidersActionSuccess = {
  type: typeof SSO_PROVIDERS_SUCCESS,
  providers: string[],
}

export type SSOProvidersActionError = {
  type: typeof SSO_PROVIDERS_ERROR,
  error: ErrorReason,
}

export type SSOTokenExchangeAction = {
  type: typeof SSO_TOKEN_EXCHANGE,
  code: string,
  provider: string,
}

export type SSOTokenExchangeActionSuccess = {
  type: typeof SSO_TOKEN_EXCHANGE_SUCCESS,
  token: string,
}

export type SSOTokenExchangeActionError = {
  type: typeof SSO_TOKEN_EXCHANGE_ERROR,
  error: ErrorReason,
}
