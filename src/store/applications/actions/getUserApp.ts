import { GetUserAppAction, GetUserAppActionError, GetUserAppActionSuccess } from "./types";

export const GET_USER_APP = "applications/GET_USER_APP";
export const GET_USER_APP_SUCCESS = "applications/GET_USER_APP_SUCCESS";
export const GET_USER_APP_ERROR = "applications/GET_USER_APP_ERROR";

export function getUserApp (payload: Omit<GetUserAppAction, "type">) {
  return { type: GET_USER_APP, ...payload };
}

export function getUserAppSuccess (payload: Omit<GetUserAppActionSuccess, "type">) {
  return { type: GET_USER_APP_SUCCESS, ...payload };
}

export function getUserAppError (payload: Omit<GetUserAppActionError, "type">) {
  return { type: GET_USER_APP_ERROR, ...payload };
}
