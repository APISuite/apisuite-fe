import { CheckBlueprintAuthAction, CheckBlueprintAuthActionError, CheckBlueprintAuthActionSuccess } from "./types";

export const CHECK_BLUEPRINT_AUTH_ACTION = "applications/CHECK_BLUEPRINT_AUTH_ACTION";
export const CHECK_BLUEPRINT_AUTH_ACTION_ERROR = "applications/CHECK_BLUEPRINT_AUTH_ACTION_ERROR";
export const CHECK_BLUEPRINT_AUTH_ACTION_SUCCESS = "applications/CHECK_BLUEPRINT_AUTH_ACTION_SUCCESS";

export function checkBlueprintAuthAction (payload: Omit<CheckBlueprintAuthAction, "type">) {
  return { type: CHECK_BLUEPRINT_AUTH_ACTION, ...payload };
}

export function checkBlueprintAuthActionSuccess (payload: Omit<CheckBlueprintAuthActionSuccess, "type">) {
  return { type: CHECK_BLUEPRINT_AUTH_ACTION_SUCCESS, ...payload };
}

export function checkBlueprintAuthActionError (payload: Omit<CheckBlueprintAuthActionError, "type">) {
  return { type: CHECK_BLUEPRINT_AUTH_ACTION_ERROR, ...payload };
}
