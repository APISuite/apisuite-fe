import { FetchOrgAction, FetchOrgActionSuccess, FetchOrgActionError } from "./types";

export const FETCH_ORG = "profile/FETCH_ORG";
export const FETCH_ORG_SUCCESS = "profile/FETCH_ORG_SUCCESS";
export const FETCH_ORG_ERROR = "profile/FETCH_ORG_ERROR";

export function fetchOrg (payload: Omit<FetchOrgAction, "type">) {
  return { type: FETCH_ORG, ...payload };
}

export function fetchOrgSuccess (payload: Omit<FetchOrgActionSuccess, "type">) {
  return { type: FETCH_ORG_SUCCESS, ...payload };
}

export function fetchOrgError (payload: Omit<FetchOrgActionError, "type">) {
  return { type: FETCH_ORG_ERROR, ...payload };
}
