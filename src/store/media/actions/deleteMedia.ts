import { DeleteMediaAction, DeleteMediaActionSuccess, DeleteMediaActionError } from "./types";

export const DELETE_MEDIA = "media/DELETE_MEDIA";
export const DELETE_MEDIA_SUCCESS = "media/DELETE_MEDIA_SUCCESS";
export const DELETE_MEDIA_ERROR = "media/DELETE_MEDIA_ERROR";

export function deleteMedia (payload: Omit<DeleteMediaAction, "type">) {
  return { type: DELETE_MEDIA, ...payload };
}

export function deleteMediaSuccess (payload: Omit<DeleteMediaActionSuccess, "type">) {
  return { type: DELETE_MEDIA_SUCCESS, ...payload };
}

export function deleteMediaError (payload: Omit<DeleteMediaActionError, "type">) {
  return { type: DELETE_MEDIA_ERROR, ...payload };
}
