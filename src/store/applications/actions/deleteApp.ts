import { DeleteAppAction, DeleteAppActionError, DeleteAppActionSuccess } from "./types";

export const DELETE_APP = "applications/DELETE_APP";
export const DELETE_APP_ERROR = "applications/DELETE_APP_ERROR";
export const DELETE_APP_SUCCESS = "applications/DELETE_APP_SUCCESS";

export function deleteApp (payload: Omit<DeleteAppAction, "type">) {
  return { type: DELETE_APP, ...payload };
}

export function deleteAppSuccess (payload: Omit<DeleteAppActionSuccess, "type">) {
  return { type: DELETE_APP_SUCCESS, ...payload };
}

export function deleteAppError (payload: Omit<DeleteAppActionError, "type">) {
  return { type: DELETE_APP_ERROR, ...payload };
}
