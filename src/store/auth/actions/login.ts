import {
  LoginAction,
  LoginActionSuccess,
  LoginActionError,
  LoginUserAction,
  LoginUserActionSuccess,
  LoginUserActionError,
} from "./types";

export const LOGIN = "auth/LOGIN";
export const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
export const LOGIN_ERROR = "auth/LOGIN_ERROR";
export const LOGIN_USER = "auth/LOGIN_USER";
export const LOGIN_USER_SUCCESS = "auth/LOGIN_USER_SUCCESS";
export const LOGIN_USER_ERROR = "auth/LOGIN_USER_ERROR";

export function login (payload: Omit<LoginAction, "type">) {
  return { type: LOGIN, ...payload };
}

export function loginSuccess (payload: Omit<LoginActionSuccess, "type">) {
  return { type: LOGIN_SUCCESS, ...payload };
}

export function loginError (payload: Omit<LoginActionError, "type">) {
  return { type: LOGIN_ERROR, ...payload };
}

export function loginUser (payload: Omit<LoginUserAction, "type">) {
  return { type: LOGIN_USER, ...payload };
}

export function loginUserSuccess (payload: Omit<LoginUserActionSuccess, "type">) {
  return { type: LOGIN_USER_SUCCESS, ...payload };
}

export function loginUserError (payload: Omit<LoginUserActionError, "type">) {
  return { type: LOGIN_USER_ERROR, ...payload };
}
