import { ConfirmRegistrationAction, ConfirmRegistrationActionSuccess, ConfirmRegistrationActionError } from "./types";

export const CONFIRM_REGISTRATION_ERROR = "auth/CONFIRM_REGISTRATION_ERROR";
export const CONFIRM_REGISTRATION = "auth/CONFIRM_REGISTRATION";
export const CONFIRM_REGISTRATION_SUCCESS = "auth/CONFIRM_REGISTRATION_SUCCESS";

export function confirmRegistration (payload: Omit<ConfirmRegistrationAction, "type">) {
  return { type: CONFIRM_REGISTRATION, ...payload };
}

export function confirmRegistrationSuccess (payload: Omit<ConfirmRegistrationActionSuccess, "type">) {
  return { type: CONFIRM_REGISTRATION_SUCCESS, ...payload };
}

export function confirmRegistrationError (payload: Omit<ConfirmRegistrationActionError, "type">) {
  return { type: CONFIRM_REGISTRATION_ERROR, ...payload };
}
