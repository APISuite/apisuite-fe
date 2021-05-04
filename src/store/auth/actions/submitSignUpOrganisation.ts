import {
  SubmitSignUpOrganisation,
  SubmitSignUpOrganisationSuccess,
  SubmitSignUpOrganisationError,
} from "./types";

export const SUBMIT_SIGN_UP_ORGANISATION = "auth/SUBMIT_SIGN_UP_ORGANISATION";
export const SUBMIT_SIGN_UP_ORGANISATION_SUCCESS = "auth/SUBMIT_SIGN_UP_ORGANISATION_SUCCESS";
export const SUBMIT_SIGN_UP_ORGANISATION_ERROR = "auth/SUBMIT_SIGN_UP_ORGANISATION_ERROR";

export function submitSignUpOrganisation (payload: Omit<SubmitSignUpOrganisation, "type">) {
  return { type: SUBMIT_SIGN_UP_ORGANISATION, ...payload };
}

export function submitSignUpOrganisationSuccess (payload: Omit<SubmitSignUpOrganisationSuccess, "type">) {
  return { type: SUBMIT_SIGN_UP_ORGANISATION_SUCCESS, ...payload };
}

export function submitSignUpOrganisationError (payload: Omit<SubmitSignUpOrganisationError, "type">) {
  return { type: SUBMIT_SIGN_UP_ORGANISATION_ERROR, ...payload };
}
