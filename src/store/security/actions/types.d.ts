import { UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_REQUEST_ERROR, UPDATE_PASSWORD_REQUEST_SUCCESS } from "./updatePassword";

export type SecurityActions =
  UpdatePasswordRequestAction |
  UpdatePasswordRequestErrorAction |
  UpdatePasswordRequestSuccessAction

export type UpdatePasswordRequestAction = {
  type: typeof UPDATE_PASSWORD_REQUEST,
  newPassword: string,
  oldPassword: string,
}

export type UpdatePasswordRequestSuccessAction = {
  type: typeof UPDATE_PASSWORD_REQUEST_SUCCESS,
}

export type UpdatePasswordRequestErrorAction = {
  type: typeof UPDATE_PASSWORD_REQUEST_ERROR,
}
