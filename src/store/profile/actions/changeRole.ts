import { ChangeRoleAction, ChangeRoleActionSuccess, ChangeRoleActionError } from "./types";

export const CHANGE_ROLE = "profile/CHANGE_ROLE";
export const CHANGE_ROLE_SUCCESS = "profile/CHANGE_ROLE_SUCCESS";
export const CHANGE_ROLE_ERROR = "profile/CHANGE_ROLE_ERROR";

export function changeRole (payload: Omit<ChangeRoleAction, "type">) {
  return { type: CHANGE_ROLE, ...payload };
}

export function changeRoleSuccess (payload: Omit<ChangeRoleActionSuccess, "type">) {
  return { type: CHANGE_ROLE_SUCCESS, ...payload };
}

export function changeRoleError (payload: Omit<ChangeRoleActionError, "type">) {
  return { type: CHANGE_ROLE_ERROR, ...payload };
}
