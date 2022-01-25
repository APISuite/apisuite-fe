import { CREATE_APP, CREATE_APP_ERROR, CREATE_APP_SUCCESS } from "./createApp";
import { DELETE_APP, DELETE_APP_ERROR, DELETE_APP_SUCCESS } from "./deleteApp";
import { GET_ALL_USER_APPS, GET_ALL_USER_APPS_ERROR, GET_ALL_USER_APPS_SUCCESS } from "./getAllUserApps";
import { GET_USER_APP, GET_USER_APP_ERROR, GET_USER_APP_RESET, GET_USER_APP_SUCCESS } from "./getUserApp";
import { REQUEST_API_ACCESS, REQUEST_API_ACCESS_ERROR, REQUEST_API_ACCESS_SUCCESS } from "./requestApiAccess";
import { UPDATE_APP, UPDATE_APP_ERROR, UPDATE_APP_SUCCESS } from "./updatedApp";
import { AppData, AppType } from "../types";
import { UPLOAD_APP_MEDIA, UPLOAD_APP_MEDIA_ERROR, UPLOAD_APP_MEDIA_SUCCESS } from "./appMediaUpload";
import { DELETE_APP_MEDIA, DELETE_APP_MEDIA_ERROR, DELETE_APP_MEDIA_SUCCESS } from "./deleteAppMedia";
import { GET_APP_TYPES, GET_APP_TYPES_ERROR, GET_APP_TYPES_SUCCESS } from "./getAppTypes";

export type ApplicationsActions = CreateAppAction |
CreateAppActionError |
CreateAppActionSuccess |
CreateAppActionError |
DeleteAppAction |
DeleteAppActionSuccess |
DeleteAppActionError |
GetAllUserAppsAction |
GetAllUserAppsActionSuccess |
GetAllUserAppsActionError |
GetUserAppAction |
GetUserAppActionSuccess |
GetUserAppActionError |
RequestAPIAccessAction |
RequestAPIAccessActionSuccess |
RequestAPIAccessActionError |
UpdateAppAction |
UpdateAppActionSuccess |
UpdateAppActionError |
UploadAppMediaAction |
UploadAppMediaActionSuccess |
UploadAppMediaActionError |
DeleteAppMediaAction |
DeleteAppMediaActionSuccess |
DeleteAppMediaActionError |
GetAppTypesAction |
GetAppTypesActionError |
GetAppTypesActionSuccess |
ResetUserAppAction

export type CreateAppAction = {
  type: typeof CREATE_APP,
  orgID: string,
  appData: CreateAppActionData,
  appTypeId: number,
}

export type CreateAppActionSuccess = {
  type: typeof CREATE_APP_SUCCESS,
  appData: AppData,
}

export type CreateAppActionError = {
  type: typeof CREATE_APP_ERROR,
}

export type UpdateAppAction = {
  type: typeof UPDATE_APP,
  orgID: string,
  appData: UpdateAppActionData,
}

export type UpdateAppActionSuccess = {
  type: typeof UPDATE_APP_SUCCESS,
  appData: AppData,
}

export type UpdateAppActionError = {
  type: typeof UPDATE_APP_ERROR,
}

export type DeleteAppAction = {
  type: typeof DELETE_APP,
  appId: number,
  orgID: string,
}

export type DeleteAppActionSuccess = {
  type: typeof DELETE_APP_SUCCESS,
}

export type DeleteAppActionError = {
  type: typeof DELETE_APP_ERROR,
}

export type RequestAPIAccessAction = {
  type: typeof REQUEST_API_ACCESS,
  orgID: string,
  appId: number,
}

export type RequestAPIAccessActionSuccess = {
  type: typeof REQUEST_API_ACCESS_SUCCESS,
}

export type RequestAPIAccessActionError = {
  type: typeof REQUEST_API_ACCESS_ERROR,
}

export type GetUserAppAction = {
  type: typeof GET_USER_APP,
  orgID: string,
  appId: number,
}

export type GetUserAppActionSuccess = {
  type: typeof GET_USER_APP_SUCCESS,
  appData: AppData,
}

export type GetUserAppActionError = {
  type: typeof GET_USER_APP_ERROR,
}

export type GetAllUserAppsAction = {
  type: typeof GET_ALL_USER_APPS,
  orgID: string,
}

export type GetAllUserAppsActionSuccess = {
  type: typeof GET_ALL_USER_APPS_SUCCESS,
  userApps: AppData[],
}

export type GetAllUserAppsActionError = {
  type: typeof GET_ALL_USER_APPS_ERROR,
  userApps: AppData[],
}

export type UploadAppMediaAction = {
  type: typeof UPLOAD_APP_MEDIA,
  orgID: string,
  appId: number,
  media: FormData,
}

export type UploadAppMediaActionSuccess = {
  type: typeof UPLOAD_APP_MEDIA_SUCCESS,
  savedImages: SaveImages[],
  errors: MediaError[],
}

export type UploadAppMediaActionError = {
  type: typeof UPLOAD_APP_MEDIA_ERROR,
}

export type DeleteAppMediaAction = {
  type: typeof DELETE_APP_MEDIA,
  orgID: string,
  appId: number,
  media: string,
}

export type DeleteAppMediaActionSuccess = {
  type: typeof DELETE_APP_MEDIA_SUCCESS,
  deleted: string,
}

export type DeleteAppMediaActionError = {
  type: typeof DELETE_APP_MEDIA_ERROR,
}

export type SavedImages = {
  file: string,
  url: string,
}

export type MediaError = {
  file: string,
  error: string,
}

export type UploadResponse = {
  savedImages: SaveImages[],
  errors: MediaError[],
}

export type GetAppTypesAction = {
  type: typeof GET_APP_TYPES,
}

export type GetAppTypesActionSuccess = {
  type: typeof GET_APP_TYPES_SUCCESS,
  types: AppType[],
}

export type GetAppTypesActionError = {
  type: typeof GET_APP_TYPES_ERROR,
  types: AppType[],
}

export type ResetUserAppAction = {
  type: typeof GET_USER_APP_RESET,
}
