import { ForgotPasswordAction, ForgotPasswordActionSuccess, ForgotPasswordActionError } from "./types";

export const FORGOT_PASSWORD = "auth/FORGOT_PASSWORD";
export const FORGOT_PASSWORD_SUCCESS = "auth/FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_ERROR = "auth/FORGOT_PASSWORD_ERROR";

export function forgotPassword (payload: Omit<ForgotPasswordAction, "type">) {
  return { type: FORGOT_PASSWORD, ...payload };
}

export function forgotPasswordSuccess (payload: Omit<ForgotPasswordActionSuccess, "type">) {
  return { type: FORGOT_PASSWORD_SUCCESS, ...payload };
}

export function forgotPasswordError (payload: Omit<ForgotPasswordActionError, "type">) {
  return { type: FORGOT_PASSWORD_ERROR, ...payload };
}
