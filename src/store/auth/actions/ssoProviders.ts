import { SSOProvidersAction, SSOProvidersActionSuccess, SSOProvidersActionError } from "./types";

export const SSO_PROVIDERS = "auth/SSO_PROVIDERS";
export const SSO_PROVIDERS_SUCCESS = "auth/SSO_PROVIDERS_SUCCESS";
export const SSO_PROVIDERS_ERROR = "auth/SSO_PROVIDERS_ERROR";

export function ssoProviders (payload: Omit<SSOProvidersAction, "type">) {
  return { type: SSO_PROVIDERS, ...payload };
}

export function ssoProvidersSuccess (payload: Omit<SSOProvidersActionSuccess, "type">) {
  return { type: SSO_PROVIDERS_SUCCESS, ...payload };
}

export function ssoProvidersError (payload: Omit<SSOProvidersActionError, "type">) {
  return { type: SSO_PROVIDERS_ERROR, ...payload };
}
