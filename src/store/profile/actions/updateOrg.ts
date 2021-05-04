import { UpdateOrgAction, UpdateOrgActionSuccess, UpdateOrgActionError } from "./types";

export const UPDATE_ORG = "profile/UPDATE_ORG";
export const UPDATE_ORG_SUCCESS = "profile/UPDATE_ORG_SUCCESS";
export const UPDATE_ORG_ERROR = "profile/UPDATE_ORG_ERROR";

export function updateOrg (payload: Omit<UpdateOrgAction, "type">) {
  return { type: UPDATE_ORG, ...payload };
}

export function updateOrgSuccess (payload: Omit<UpdateOrgActionSuccess, "type">) {
  return { type: UPDATE_ORG_SUCCESS, ...payload };
}

export function updateOrgError (payload: Omit<UpdateOrgActionError, "type">) {
  return { type: UPDATE_ORG_ERROR, ...payload };
}
