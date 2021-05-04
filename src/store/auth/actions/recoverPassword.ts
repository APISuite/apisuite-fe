import { RecoverPasswordAction, RecoverPasswordActionSuccess, RecoverPasswordActionError } from "./types";

export const RECOVER_PASSWORD = "auth/RECOVER_PASSWORD";
export const RECOVER_PASSWORD_SUCCESS = "auth/RECOVER_PASSWORD_SUCCESS";
export const RECOVER_PASSWORD_ERROR = "auth/RECOVER_PASSWORD_ERROR";

export function recoverPassword (payload: Omit<RecoverPasswordAction, "type">) {
  return { type: RECOVER_PASSWORD, ...payload };
}

export function recoverPasswordSuccess (payload: Omit<RecoverPasswordActionSuccess, "type">) {
  return { type: RECOVER_PASSWORD_SUCCESS, ...payload };
}

export function recoverPasswordError (payload: Omit<RecoverPasswordActionError, "type">) {
  return { type: RECOVER_PASSWORD_ERROR, ...payload };
}
