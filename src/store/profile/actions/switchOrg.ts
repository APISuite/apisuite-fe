import { SwitchOrgAction, SwitchOrgActionSuccess, SwitchOrgActionError } from "./types";

export const SWITCH_ORG = "profile/SWITCH_ORG";
export const SWITCH_ORG_SUCCESS = "profile/SWITCH_ORG_SUCCESS";
export const SWITCH_ORG_ERROR = "profile/SWITCH_ORG_ERROR";

export function switchOrg (payload: Omit<SwitchOrgAction, "type">) {
  return { type: SWITCH_ORG, ...payload };
}

export function switchOrgSuccess (payload: Omit<SwitchOrgActionSuccess, "type">) {
  return { type: SWITCH_ORG_SUCCESS, ...payload };
}

export function switchOrgError (payload: Omit<SwitchOrgActionError, "type">) {
  return { type: SWITCH_ORG_ERROR, ...payload };
}
