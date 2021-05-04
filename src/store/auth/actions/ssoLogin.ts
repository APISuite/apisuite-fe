import { SSOLoginAction, SSOLoginActionSuccess, SSOLoginActionError } from "./types";

export const SSO_LOGIN = "auth/SSO_LOGIN";
export const SSO_LOGIN_SUCCESS = "auth/SSO_LOGIN_SUCCESS";
export const SSO_LOGIN_ERROR = "auth/SSO_LOGIN_ERROR";

export function ssoLogin (payload: Omit<SSOLoginAction, "type">) {
  return { type: SSO_LOGIN, ...payload };
}

export function ssoLoginSuccess (payload: Omit<SSOLoginActionSuccess, "type">) {
  return { type: SSO_LOGIN_SUCCESS, ...payload };
}

export function ssoLoginError (payload: Omit<SSOLoginActionError, "type">) {
  return { type: SSO_LOGIN_ERROR, ...payload };
}
