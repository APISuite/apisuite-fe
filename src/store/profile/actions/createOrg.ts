import { CreateOrgAction, CreateOrgActionSuccess, CreateOrgActionError } from "./types";

export const CREATE_ORG = "profile/CREATE_ORG";
export const CREATE_ORG_SUCCESS = "profile/CREATE_ORG_SUCCESS";
export const CREATE_ORG_ERROR = "profile/CREATE_ORG_ERROR";

export function createOrg (payload: Omit<CreateOrgAction, "type">) {
  return { type: CREATE_ORG, ...payload };
}

export function createOrgSuccess (payload: Omit<CreateOrgActionSuccess, "type">) {
  return { type: CREATE_ORG_SUCCESS, ...payload };
}

export function createOrgError (payload: Omit<CreateOrgActionError, "type">) {
  return { type: CREATE_ORG_ERROR, ...payload };
}
