import { FetchRoleOptionsAction, FetchRoleOptionsActionSuccess, FetchRoleOptionsActionError } from "./types";

export const FETCH_ROLE_OPTIONS = "profile/FETCH_ROLE_OPTIONS";
export const FETCH_ROLE_OPTIONS_SUCCESS = "profile/FETCH_ROLE_OPTIONS_SUCCESS";
export const FETCH_ROLE_OPTIONS_ERROR = "profile/FETCH_ROLE_OPTIONS_ERROR";

export function fetchRoleOptions (payload: Omit<FetchRoleOptionsAction, "type">) {
  return { type: FETCH_ROLE_OPTIONS, ...payload };
}

export function fetchRoleOptionsSuccess (payload: Omit<FetchRoleOptionsActionSuccess, "type">) {
  return { type: FETCH_ROLE_OPTIONS_SUCCESS, ...payload };
}

export function fetchRoleOptionsError (payload: Omit<FetchRoleOptionsActionError, "type">) {
  return { type: FETCH_ROLE_OPTIONS_ERROR, ...payload };
}
