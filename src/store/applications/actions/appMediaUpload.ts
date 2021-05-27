import { UploadAppMediaAction, UploadAppMediaActionError, UploadAppMediaActionSuccess } from "./types";

export const UPLOAD_APP_MEDIA = "applications/UPLOAD_APP_MEDIA";
export const UPLOAD_APP_MEDIA_SUCCESS = "applications/UPLOAD_APP_MEDIA_SUCCESS";
export const UPLOAD_APP_MEDIA_ERROR = "applications/UPLOAD_APP_MEDIA_ERROR";

export function uploadAppMedia (payload: Omit<UploadAppMediaAction, "type">) {
  return { type: UPLOAD_APP_MEDIA, ...payload };
}

export function uploadAppMediaSuccess (payload: Omit<UploadAppMediaActionSuccess, "type">) {
  return { type: UPLOAD_APP_MEDIA_SUCCESS, ...payload };
}

export function uploadAppMediaError (payload: Omit<UploadAppMediaActionError, "type">) {
  return { type: UPLOAD_APP_MEDIA_ERROR, ...payload };
}
