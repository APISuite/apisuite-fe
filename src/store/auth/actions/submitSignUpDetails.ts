import {
  SubmitSignUpDetails,
  SubmitSignUpDetailsSuccess,
  SubmitSignUpDetailsError,
} from "./types";

export const SUBMIT_SIGN_UP_DETAILS = "auth/SUBMIT_SIGN_UP_DETAILS";
export const SUBMIT_SIGN_UP_DETAILS_ERROR = "auth/SUBMIT_SIGN_UP_DETAILS_ERROR";
export const SUBMIT_SIGN_UP_DETAILS_SUCCESS = "auth/SUBMIT_SIGN_UP_DETAILS_SUCCESS";

export function submitSignUpDetails (payload: Omit<SubmitSignUpDetails, "type">) {
  return { type: SUBMIT_SIGN_UP_DETAILS, ...payload };
}

export function submitSignUpDetailsSuccess (payload: Omit<SubmitSignUpDetailsSuccess, "type">) {
  return { type: SUBMIT_SIGN_UP_DETAILS_SUCCESS, ...payload };
}

export function submitSignUpDetailsError (payload: Omit<SubmitSignUpDetailsError, "type">) {
  return { type: SUBMIT_SIGN_UP_DETAILS_ERROR, ...payload };
}
