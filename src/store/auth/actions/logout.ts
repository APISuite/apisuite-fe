import { LogoutAction, LogoutActionSuccess, LogoutActionError } from "./types";

export const LOGOUT = "auth/LOGOUT";
export const LOGOUT_SUCCESS = "auth/LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "auth/LOGOUT_ERROR";

export function logout (payload: Omit<LogoutAction, "type">) {
  return { type: LOGOUT, ...payload };
}

export function logoutSuccess (payload: Omit<LogoutActionSuccess, "type">) {
  return { type: LOGOUT_SUCCESS, ...payload };
}

export function logoutError (payload: Omit<LogoutActionError, "type">) {
  return { type: LOGOUT_ERROR, ...payload };
}
