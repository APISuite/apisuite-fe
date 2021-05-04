import { GetAllUserAppsAction, GetAllUserAppsActionError, GetAllUserAppsActionSuccess } from "./types";

export const GET_ALL_USER_APPS = "applications/GET_ALL_USER_APPS";
export const GET_ALL_USER_APPS_SUCCESS = "applications/GET_ALL_USER_APPS_SUCCESS";
export const GET_ALL_USER_APPS_ERROR = "applications/GET_ALL_USER_APPS_ERROR";

export function getAllUserApps (payload: Omit<GetAllUserAppsAction, "type">) {
  return { type: GET_ALL_USER_APPS, ...payload };
}

export function getAllUserAppsSuccess (payload: Omit<GetAllUserAppsActionSuccess, "type">) {
  return { type: GET_ALL_USER_APPS_SUCCESS, ...payload };
}

export function getAllUserAppsError (payload: Omit<GetAllUserAppsActionError, "type">) {
  return { type: GET_ALL_USER_APPS_ERROR, ...payload };
}
