import { UpdateAccessDetailsAction, UpdateAccessDetailsActionError, UpdateAccessDetailsActionSuccess } from "./types";

export const UPDATE_ACCESS_DETAILS_ACTION = "applications/UPDATE_ACCESS_DETAILS_ACTION";
export const UPDATE_ACCESS_DETAILS_ACTION_SUCCESS = "applications/UPDATE_ACCESS_DETAILS_ACTION_SUCCESS";
export const UPDATE_ACCESS_DETAILS_ACTION_ERROR = "applications/UPDATE_ACCESS_DETAILS_ACTION_ERROR";

export function updateAccessDetailsAction(payload: Omit<UpdateAccessDetailsAction, "type">) {
  return { type: UPDATE_ACCESS_DETAILS_ACTION, ...payload };
}

export function updateAccessDetailsActionSuccess(payload: Omit<UpdateAccessDetailsActionSuccess, "type">) {
  return { type: UPDATE_ACCESS_DETAILS_ACTION_SUCCESS, ...payload };
}

export function updateAccessDetailsActionError(payload: Omit<UpdateAccessDetailsActionError, "type">) {
  return { type: UPDATE_ACCESS_DETAILS_ACTION_ERROR, ...payload };
}
