import { UploadMediaAction, UploadMediaActionSuccess, UploadMediaActionError } from "./types";

export const UPLOAD_MEDIA = "media/UPLOAD_MEDIA";
export const UPLOAD_MEDIA_SUCCESS = "media/UPLOAD_MEDIA_SUCCESS";
export const UPLOAD_MEDIA_ERROR = "media/UPLOAD_MEDIA_ERROR";

export function uploadMedia (payload: Omit<UploadMediaAction, "type">) {
  return { type: UPLOAD_MEDIA, ...payload };
}

export function uploadMediaSuccess (payload: Omit<UploadMediaActionSuccess, "type">) {
  return { type: UPLOAD_MEDIA_SUCCESS, ...payload };
}

export function uploadMediaError (payload: Omit<UploadMediaActionError, "type">) {
  return { type: UPLOAD_MEDIA_ERROR, ...payload };
}
