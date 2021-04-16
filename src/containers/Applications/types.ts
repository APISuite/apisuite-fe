import { Action } from 'redux'

import {
  CREATE_APP_ACTION_ERROR,
  CREATE_APP_ACTION_SUCCESS,
  CREATE_APP_ACTION,
  DELETE_APP_ACTION_ERROR,
  DELETE_APP_ACTION_SUCCESS,
  DELETE_APP_ACTION,
  GET_ALL_USER_APPS_ACTION_SUCCESS,
  GET_ALL_USER_APPS_ACTION,
  GET_USER_APP_ACTION_SUCCESS,
  GET_USER_APP_ACTION,
  REQUEST_API_ACCESS_ACTION_ERROR,
  REQUEST_API_ACCESS_ACTION_SUCCESS,
  REQUEST_API_ACCESS_ACTION,
  UPDATE_APP_ACTION_ERROR,
  UPDATE_APP_ACTION_SUCCESS,
  UPDATE_APP_ACTION,
} from './ducks'

import { User } from 'containers/Auth/types'

export interface Response {
  isError: boolean,
  isRequesting: boolean,
}

export interface ApplicationsStore {
  createAppStatus: Response,
  currentApp: AppData,
  deleteAppStatus: Response,
  requestingAPIAccessStatus: Response,
  updateAppStatus: Response,
  userApps: AppData[],
}

export interface AppData {
  clientId: string,
  clientSecret: string,
  createdAt: string,
  description: string,
  id: number,
  labels: string[],
  logo: string,
  name: string,
  orgId: number,
  privacyUrl: string,
  redirectUrl: string,
  shortDescription: string,
  subscriptions: any[],
  supportUrl: string,
  tosUrl: string,
  updatedAt: string,
  websiteUrl: string,
  youtubeUrl: string,
}

export interface ModalDetails {
  userAppID: number,
  userID: number,
}

export interface ApplicationsProps {
  allUserApps: AppData[],
  currentOrganisation: {
    id: number | string,
    member_since: string,
    name: string,
    role: {
      id: number,
      name: string,
    },
  },
  createAppStatus: boolean,
  deleteAppStatus: boolean,
  getAllUserAppsAction: (userID: number) => void,
  requestAPIAccessStatus: boolean,
  updateAppStatus: boolean,
  user: User,
}

export interface CreateAppActionData {
  description: string,
  labels: string[],
  logo: string,
  name: string,
  privacyUrl: string,
  redirectUrl: string,
  shortDescription: string,
  supportUrl: string,
  tosUrl: string,
  websiteUrl: string,
  youtubeUrl: string,
}

export interface UpdateAppActionData {
  description: string,
  id: number,
  labels: string[],
  logo: string,
  name: string,
  privacyUrl: string,
  redirectUrl: string,
  shortDescription: string,
  supportUrl: string,
  tosUrl: string,
  websiteUrl: string,
  youtubeUrl: string,
}

export interface CreateAppAction extends Action {
  type: typeof CREATE_APP_ACTION,
  appData: CreateAppActionData,
  orgId: number,
}

export interface CreateAppActionSuccess extends Action {
  type: typeof CREATE_APP_ACTION_SUCCESS,
}

export interface CreateAppActionError extends Action {
  type: typeof CREATE_APP_ACTION_ERROR,
}

export interface UpdateAppAction extends Action {
  type: typeof UPDATE_APP_ACTION,
  appData: UpdateAppActionData,
  appId: number,
}

export interface UpdateAppActionSuccess extends Action {
  type: typeof UPDATE_APP_ACTION_SUCCESS,
  appData: AppData,
}

export interface UpdateAppActionError extends Action {
  type: typeof UPDATE_APP_ACTION_ERROR,
}

export interface DeleteAppAction extends Action {
  type: typeof DELETE_APP_ACTION,
  appId: number,
  orgId?: number,
}

export interface DeleteAppActionSuccess extends Action {
  type: typeof DELETE_APP_ACTION_SUCCESS,
}

export interface DeleteAppActionError extends Action {
  type: typeof DELETE_APP_ACTION_ERROR,
}

export interface RequestAPIAccessAction extends Action {
  type: typeof REQUEST_API_ACCESS_ACTION,
  appId: number,
}

export interface RequestAPIAccessActionSuccess extends Action {
  type: typeof REQUEST_API_ACCESS_ACTION_SUCCESS,
}

export interface RequestAPIAccessActionError extends Action {
  type: typeof REQUEST_API_ACCESS_ACTION_ERROR,
}

export interface GetUserAppAction extends Action {
  type: typeof GET_USER_APP_ACTION,
  appId: number,
  orgId: number,
}

export interface GetUserAppActionSuccess extends Action {
  type: typeof GET_USER_APP_ACTION_SUCCESS,
  appData: AppData,
}

export interface GetAllUserAppsAction extends Action {
  type: typeof GET_ALL_USER_APPS_ACTION,
  userId: number,
}

export interface GetAllUserAppsActionSuccess extends Action {
  type: typeof GET_ALL_USER_APPS_ACTION_SUCCESS,
  userApps: AppData[],
}

export type ApplicationsActions = CreateAppAction |
CreateAppActionError |
CreateAppActionSuccess |
DeleteAppAction |
DeleteAppActionError |
DeleteAppActionSuccess |
GetAllUserAppsAction |
GetAllUserAppsActionSuccess |
GetUserAppAction |
GetUserAppActionSuccess |
RequestAPIAccessAction |
RequestAPIAccessActionError |
RequestAPIAccessActionSuccess |
UpdateAppAction |
UpdateAppActionError |
UpdateAppActionSuccess
