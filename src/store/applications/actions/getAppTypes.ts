import { GetAppTypesAction, GetAppTypesActionError, GetAppTypesActionSuccess } from "./types";

export const GET_APP_TYPES = "applications/GET_APP_TYPES";
export const GET_APP_TYPES_SUCCESS = "applications/GET_APP_TYPES_SUCCESS";
export const GET_APP_TYPES_ERROR = "applications/GET_APP_TYPES_ERROR";

export function getAppTypes (payload: Omit<GetAppTypesAction, "type">) {
  return { type: GET_APP_TYPES, ...payload };
}

export function getAppTypesSuccess (payload: Omit<GetAppTypesActionError, "type">) {
  return { type: GET_APP_TYPES_SUCCESS, ...payload };
}

export function getAppTypesError (payload: Omit<GetAppTypesActionSuccess, "type">) {
  return { type: GET_APP_TYPES_ERROR, ...payload };
}
