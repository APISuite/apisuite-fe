import { ValidateAccessDetailsAction, ValidateAccessDetailsActionError, ValidateAccessDetailsActionSuccess } from "./types";

export const VALIDATE_ACCESS_DETAILS_ACTION = "applications/VALIDATE_ACCESS_DETAILS_ACTION";
export const VALIDATE_ACCESS_DETAILS_ACTION_ERROR = "applications/VALIDATE_ACCESS_DETAILS_ACTION_ERROR";
export const VALIDATE_ACCESS_DETAILS_ACTION_SUCCESS = "applications/VALIDATE_ACCESS_DETAILS_ACTION_SUCCESS";

export function validateAccessDetailsAction (payload: Omit<ValidateAccessDetailsAction, "type">) {
  return { type: VALIDATE_ACCESS_DETAILS_ACTION, ...payload };
}

export function validateAccessDetailsActionSuccess (payload: Omit<ValidateAccessDetailsActionSuccess, "type">) {
  return { type: VALIDATE_ACCESS_DETAILS_ACTION_SUCCESS, ...payload };
}

export function validateAccessDetailsActionError (payload: Omit<ValidateAccessDetailsActionError, "type">) {
  return { type: VALIDATE_ACCESS_DETAILS_ACTION_ERROR, ...payload };
}
