import { DeleteAppMediaAction, DeleteAppMediaActionError, DeleteAppMediaActionSuccess } from "./types";

export const DELETE_APP_MEDIA = "applications/DELETE_APP_MEDIA";
export const DELETE_APP_MEDIA_SUCCESS = "applications/DELETE_APP_MEDIA_SUCCESS";
export const DELETE_APP_MEDIA_ERROR = "applications/DELETE_APP_MEDIA_ERROR";

export function deleteAppMedia (payload: Omit<DeleteAppMediaAction, "type">) {
  return { type: DELETE_APP_MEDIA, ...payload };
}

export function deleteAppMediaSuccess (payload: Omit<DeleteAppMediaActionSuccess, "type">) {
  return { type: DELETE_APP_MEDIA_SUCCESS, ...payload };
}

export function deleteAppMediaError (payload: Omit<DeleteAppMediaActionError, "type">) {
  return { type: DELETE_APP_MEDIA_ERROR, ...payload };
}
