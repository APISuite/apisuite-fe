import { VALIDATE_ACCESS_DETAILS_ACTION, VALIDATE_ACCESS_DETAILS_ACTION_ERROR, VALIDATE_ACCESS_DETAILS_ACTION_SUCCESS } from "./validateAccessDetails";
import { CREATE_APP, CREATE_APP_ERROR, CREATE_APP_SUCCESS } from "./createApp";
import { DELETE_APP, DELETE_APP_ERROR, DELETE_APP_SUCCESS } from "./deleteApp";
import { GET_ALL_USER_APPS, GET_ALL_USER_APPS_ERROR, GET_ALL_USER_APPS_SUCCESS } from "./getAllUserApps";
import { GET_USER_APP, GET_USER_APP_ERROR, GET_USER_APP_RESET, GET_USER_APP_SUCCESS } from "./getUserApp";
import { REQUEST_API_ACCESS, REQUEST_API_ACCESS_ERROR, REQUEST_API_ACCESS_SUCCESS } from "./requestApiAccess";
import { UPDATE_APP, UPDATE_APP_ERROR, UPDATE_APP_SUCCESS } from "./updatedApp";
import { AppData, AppType, CreateAppActionData, UpdateAppActionData, CurrentBlueprintAppData, ToggleBlueprintAppStatusData } from "../types";
import { UPLOAD_APP_MEDIA, UPLOAD_APP_MEDIA_ERROR, UPLOAD_APP_MEDIA_SUCCESS } from "./appMediaUpload";
import { DELETE_APP_MEDIA, DELETE_APP_MEDIA_ERROR, DELETE_APP_MEDIA_SUCCESS } from "./deleteAppMedia";
import { GET_APP_TYPES, GET_APP_TYPES_ERROR, GET_APP_TYPES_SUCCESS } from "./getAppTypes";

export type ApplicationsActions = CreateAppAction |
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
ResetUserAppAction |
// Blueprint-related actions
CreateBlueprintAppAction |
CreateBlueprintAppActionSuccess |
CreateBlueprintAppActionError |
UpdateBlueprintAppAction |
UpdateBlueprintAppActionSuccess |
UpdateBlueprintAppActionError |
GetBlueprintAppAction |
GetBlueprintAppActionSuccess |
GetBlueprintAppActionError |
ValidateAccessDetailsAction |
ValidateAccessDetailsActionSuccess |
ValidateAccessDetailsActionError |
ToggleBlueprintAppStatusAction |
ToggleBlueprintAppStatusActionSuccess |
ToggleBlueprintAppStatusActionError

export type CreateAppAction = {
  type: typeof CREATE_APP,
  orgID: number,
  appData: CreateAppActionData,
}

export type CreateAppActionSuccess = {
  type: typeof CREATE_APP_SUCCESS,
  appData: AppData,
}

export type CreateAppActionError = {
  type: typeof CREATE_APP_ERROR,
  payload: AppData,
}

export type UpdateAppAction = {
  type: typeof UPDATE_APP,
  orgID: number,
  appData: UpdateAppActionData,
}

export type UpdateAppActionSuccess = {
  type: typeof UPDATE_APP_SUCCESS,
  appData: AppData,
}

export type UpdateAppActionError = {
  type: typeof UPDATE_APP_ERROR,
  payload: AppData,
}

export type DeleteAppAction = {
  type: typeof DELETE_APP,
  appId: number,
  orgID: number,
}

export type DeleteAppActionSuccess = {
  type: typeof DELETE_APP_SUCCESS,
}

export type DeleteAppActionError = {
  type: typeof DELETE_APP_ERROR,
}

export type RequestAPIAccessAction = {
  type: typeof REQUEST_API_ACCESS,
  orgID: number,
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
  orgID: number,
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
  orgID: number,
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
  orgID: number,
  appId: number,
  media: FormData,
}

export type UploadAppMediaActionSuccess = {
  type: typeof UPLOAD_APP_MEDIA_SUCCESS,
  savedImages: SavedImages[],
  errors: MediaError[],
}

export type UploadAppMediaActionError = {
  type: typeof UPLOAD_APP_MEDIA_ERROR,
}

export type DeleteAppMediaAction = {
  type: typeof DELETE_APP_MEDIA,
  orgID: number,
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
  savedImages: SavedImages[],
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

// Blueprint-related action types

export type CreateBlueprintAppAction = {
  type: typeof CREATE_BLUEPRINT_APP,
  appData: AppData,
  orgID: number,
}

export type CreateBlueprintAppActionSuccess = {
  type: typeof CREATE_BLUEPRINT_APP_SUCCESS,
  appData: AppData,
}

export type CreateBlueprintAppActionError = {
  type: typeof CREATE_BLUEPRINT_APP_ERROR,
  payload: AppData,
}

export type UpdateBlueprintAppAction = {
  type: typeof UPDATE_BLUEPRINT_APP,
  appData: AppData,
}

export type UpdateBlueprintAppActionSuccess = {
  type: typeof UPDATE_BLUEPRINT_APP_SUCCESS,
  appData: AppData,
}

export type UpdateBlueprintAppActionError = {
  type: typeof UPDATE_BLUEPRINT_APP_ERROR,
  payload: AppData,
}

export type GetBlueprintAppAction = {
  type: typeof GET_BLUEPRINT_APP,
  appId: number,
  appName: string,
}

export type GetBlueprintAppActionSuccess = {
  type: typeof GET_BLUEPRINT_APP_SUCCESS,
  appData: BlueprintAppData,
}

export type GetBlueprintAppActionError = {
  type: typeof GET_BLUEPRINT_APP_ERROR,
}

export type ValidateAccessDetailsAction = {
  type: typeof VALIDATE_ACCESS_DETAILS_ACTION,
  blueprintAppConfig: CurrentBlueprintAppData,
}

export type ValidateAccessDetailsActionSuccess = {
  type: typeof VALIDATE_ACCESS_DETAILS_ACTION_SUCCESS,
  blueprintAppConfig: CurrentBlueprintAppData,
}

export type ValidateAccessDetailsActionError = {
  type: typeof VALIDATE_ACCESS_DETAILS_ACTION_ERROR,
}

export type ToggleBlueprintAppStatusAction = {
  type: typeof TOGGLE_BLUEPRINT_APP_STATUS_ACTION,
  toggleBlueprintAppStatusData: ToggleBlueprintAppStatusData,
  fields: string[],
}

export type ToggleBlueprintAppStatusActionSuccess = {
  type: typeof TOGGLE_BLUEPRINT_APP_STATUS_ACTION_SUCCESS,
  isActive: boolean,
}

export type ToggleBlueprintAppStatusActionError = {
  type: typeof TOGGLE_BLUEPRINT_APP_STATUS_ACTION_ERROR,
}
