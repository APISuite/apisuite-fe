import {
  SubmitSignUpCredentials,
  SubmitSignUpCredentialsSuccess,
  SubmitSignUpCredentialsError,
} from "./types";

export const SUBMIT_SIGN_UP_CREDENTIALS = "auth/SUBMIT_SIGN_UP_CREDENTIALS";
export const SUBMIT_SIGN_UP_CREDENTIALS_SUCCESS = "auth/SUBMIT_SIGN_UP_CREDENTIALS_SUCCESS";
export const SUBMIT_SIGN_UP_CREDENTIALS_ERROR = "auth/SUBMIT_SIGN_UP_CREDENTIALS_ERROR";

export function submitSignUpCredentials (payload: Omit<SubmitSignUpCredentials, "type">) {
  return { type: SUBMIT_SIGN_UP_CREDENTIALS, ...payload };
}

export function submitSignUpCredentialsSuccess (payload: Omit<SubmitSignUpCredentialsSuccess, "type">) {
  return { type: SUBMIT_SIGN_UP_CREDENTIALS_SUCCESS, ...payload };
}

export function submitSignUpCredentialsError (payload: Omit<SubmitSignUpCredentialsError, "type">) {
  return { type: SUBMIT_SIGN_UP_CREDENTIALS_ERROR, ...payload };
}
