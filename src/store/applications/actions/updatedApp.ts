import { UpdateAppAction, UpdateAppActionError, UpdateAppActionSuccess } from "./types";

export const UPDATE_APP = "applications/UPDATE_APP";
export const UPDATE_APP_SUCCESS = "applications/UPDATE_APP_SUCCESS";
export const UPDATE_APP_ERROR = "applications/UPDATE_APP_ERROR";

export function updateApp (payload: Omit<UpdateAppAction, "type">) {
  return { type: UPDATE_APP, ...payload };
}

export function updateAppSuccess (payload: Omit<UpdateAppActionSuccess, "type">) {
  return { type: UPDATE_APP_SUCCESS, ...payload };
}

export function updateAppError (payload: Omit<UpdateAppActionError, "type">) {
  return { type: UPDATE_APP_ERROR, ...payload };
}
