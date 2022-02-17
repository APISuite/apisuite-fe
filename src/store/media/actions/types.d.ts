import { UploadMediaResponse } from "../types";
import { UPLOAD_MEDIA, UPLOAD_MEDIA_ERROR, UPLOAD_MEDIA_SUCCESS, UPLOAD_MEDIA_RESET } from "./uploadMedia";
import { DELETE_MEDIA, DELETE_MEDIA_ERROR, DELETE_MEDIA_SUCCESS } from "./deleteMedia";

export type MediaActions =
  UploadMediaAction |
  UploadMediaActionSuccess |
  UploadMediaActionError |
  DeleteMediaAction |
  DeleteMediaActionSuccess |
  DeleteMediaActionError |
  ResetUploadMediaAction;

export type UploadMediaAction = {
  type: typeof UPLOAD_MEDIA,
  file: FormData,
  orgId: number,
}

export type UploadMediaActionSuccess = {
  type: typeof UPLOAD_MEDIA_SUCCESS,
  media: UploadMediaResponse,
}

export type UploadMediaActionError = {
  type: typeof UPLOAD_MEDIA_ERROR,
  error: string,
}

export type DeleteMediaAction = {
  type: typeof DELETE_MEDIA,
  orgId: number,
  url: string,
}

export type DeleteMediaActionSuccess = {
  type: typeof DELETE_MEDIA_SUCCESS,
  url: string,
}

export type DeleteMediaActionError = {
  type: typeof DELETE_MEDIA_ERROR,
  error: string,
}

export type ResetUploadMediaAction = {
  type: typeof UPLOAD_MEDIA_RESET,
}
