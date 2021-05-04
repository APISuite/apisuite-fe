import {
  ValidateRegistrationTokenAction,
  ValidateRegistrationTokenActionSuccess,
  ValidateRegistrationTokenActionError,
} from "./types";

export const VALIDATE_REGISTRATION_TOKEN_ERROR = "auth/VALIDATE_REGISTRATION_TOKEN_ERROR";
export const VALIDATE_REGISTRATION_TOKEN = "auth/VALIDATE_REGISTRATION_TOKEN";
export const VALIDATE_REGISTRATION_TOKEN_SUCCESS = "auth/VALIDATE_REGISTRATION_TOKEN_SUCCESS";

export function validateRegistrationToken (payload: Omit<ValidateRegistrationTokenAction, "type">) {
  return { type: VALIDATE_REGISTRATION_TOKEN, ...payload };
}

export function validateRegistrationTokenSuccess (payload: Omit<ValidateRegistrationTokenActionSuccess, "type">) {
  return { type: VALIDATE_REGISTRATION_TOKEN_SUCCESS, ...payload };
}

export function validateRegistrationTokenError (payload: Omit<ValidateRegistrationTokenActionError, "type">) {
  return { type: VALIDATE_REGISTRATION_TOKEN_ERROR, ...payload };
}
