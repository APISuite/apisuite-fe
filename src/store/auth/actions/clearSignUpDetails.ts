import { ClearSignUpDetailsAction } from "./types";

export const CLEAR_SIGN_UP_DETAILS_ACTION = "auth/CLEAR_SIGN_UP_DETAILS_ACTION";

export function clearSignUpDetailsAction(payload: Omit<ClearSignUpDetailsAction, "type">) {
  return { type: CLEAR_SIGN_UP_DETAILS_ACTION, ...payload };
}