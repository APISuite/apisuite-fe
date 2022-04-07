import { RevokeAPIAccessAction, RevokeAPIAccessActionError, RevokeAPIAccessActionSuccess } from "./types";

export const REVOKE_API_ACCESS = "applications/REVOKE_API_ACCESS";
export const REVOKE_API_ACCESS_SUCCESS = "applications/REVOKE_API_ACCESS_SUCCESS";
export const REVOKE_API_ACCESS_ERROR = "applications/REVOKE_API_ACCESS_ERROR";

export function revokeAPIAccess (payload: Omit<RevokeAPIAccessAction, "type">) {
  return { type: REVOKE_API_ACCESS, ...payload };
}

export function revokeAPIAccessSuccess (payload: Omit<RevokeAPIAccessActionSuccess, "type">) {
  return { type: REVOKE_API_ACCESS_SUCCESS, ...payload };
}

export function revokeAPIAccessError (payload: Omit<RevokeAPIAccessActionError, "type">) {
  return { type: REVOKE_API_ACCESS_ERROR, ...payload };
}
