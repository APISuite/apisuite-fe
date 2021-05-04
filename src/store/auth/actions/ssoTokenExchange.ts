import { SSOTokenExchangeAction, SSOTokenExchangeActionSuccess, SSOTokenExchangeActionError } from "./types";

export const SSO_TOKEN_EXCHANGE = "auth/SSO_TOKEN_EXCHANGE";
export const SSO_TOKEN_EXCHANGE_SUCCESS = "auth/SSO_TOKEN_EXCHANGE_SUCCESS";
export const SSO_TOKEN_EXCHANGE_ERROR = "auth/SSO_TOKEN_EXCHANGE_ERROR";

export function ssoTokenExchange (payload: Omit<SSOTokenExchangeAction, "type">) {
  return { type: SSO_TOKEN_EXCHANGE, ...payload };
}

export function ssoTokenExchangeSuccess (payload: Omit<SSOTokenExchangeActionSuccess, "type">) {
  return { type: SSO_TOKEN_EXCHANGE_SUCCESS, ...payload };
}

export function ssoTokenExchangeError (payload: Omit<SSOTokenExchangeActionError, "type">) {
  return { type: SSO_TOKEN_EXCHANGE_ERROR, ...payload };
}
