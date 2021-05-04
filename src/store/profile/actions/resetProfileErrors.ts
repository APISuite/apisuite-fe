import { ResetProfileErrorsAction } from "./types";

export const RESET_PROFILE_ERRORS = "profile/RESET_PROFILE_ERRORS";

export function resetProfileErrors (payload: Omit<ResetProfileErrorsAction, "type">) {
  return { type: RESET_PROFILE_ERRORS, ...payload };
}
