import { CreateAppAction, CreateAppActionError, CreateAppActionSuccess } from "./types";

export const CREATE_APP = "applications/CREATE_APP";
export const CREATE_APP_ERROR = "applications/CREATE_APP_ERROR";
export const CREATE_APP_SUCCESS = "applications/CREATE_APP_SUCCESS";

export function createApp (payload: Omit<CreateAppAction, "type">) {
  return { type: CREATE_APP, ...payload };
}

export function createAppSuccess (payload: Omit<CreateAppActionSuccess, "type">) {
  return { type: CREATE_APP_SUCCESS, ...payload };
}

export function createAppError (payload: Omit<CreateAppActionError, "type">) {
  return { type: CREATE_APP_ERROR, ...payload };
}
