import { UpdatePasswordRequestAction, UpdatePasswordRequestErrorAction, UpdatePasswordRequestSuccessAction } from "./types";

export const UPDATE_PASSWORD_REQUEST = "SECURITY/UPDATE_PASSWORD_REQUEST";
export const UPDATE_PASSWORD_REQUEST_SUCCESS = "SECURITY/UPDATE_PASSWORD_REQUEST_SUCCESS";
export const UPDATE_PASSWORD_REQUEST_ERROR = "SECURITY/UPDATE_PASSWORD_REQUEST_ERROR";

export function updatePasswordRequest (payload: Omit<UpdatePasswordRequestAction, "type">) {
  return { type: UPDATE_PASSWORD_REQUEST, ...payload };
}

export function updatePasswordRequestSuccess (payload: Omit<UpdatePasswordRequestSuccessAction, "type">) {
  return { type: UPDATE_PASSWORD_REQUEST_SUCCESS, ...payload };
}

export function updatePasswordRequestError (payload: Omit<UpdatePasswordRequestErrorAction, "type">) {
  return { type: UPDATE_PASSWORD_REQUEST_ERROR, ...payload };
}
