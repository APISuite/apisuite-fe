import { ToggleBlueprintAppStatusAction, ToggleBlueprintAppStatusActionError, ToggleBlueprintAppStatusActionSuccess } from "./types";

export const TOGGLE_BLUEPRINT_APP_STATUS_ACTION = "applications/TOGGLE_BLUEPRINT_APP_STATUS_ACTION";
export const TOGGLE_BLUEPRINT_APP_STATUS_ACTION_ERROR = "applications/TOGGLE_BLUEPRINT_APP_STATUS_ACTION_ERROR";
export const TOGGLE_BLUEPRINT_APP_STATUS_ACTION_SUCCESS = "applications/TOGGLE_BLUEPRINT_APP_STATUS_ACTION_SUCCESS";

export function toggleBlueprintAppStatusAction (payload: Omit<ToggleBlueprintAppStatusAction, "type">) {
  return { type: TOGGLE_BLUEPRINT_APP_STATUS_ACTION, ...payload };
}

export function toggleBlueprintAppStatusActionSuccess (payload: Omit<ToggleBlueprintAppStatusActionSuccess, "type">) {
  return { type: TOGGLE_BLUEPRINT_APP_STATUS_ACTION_SUCCESS, ...payload };
}

export function toggleBlueprintAppStatusActionError (payload: Omit<ToggleBlueprintAppStatusActionError, "type">) {
  return { type: TOGGLE_BLUEPRINT_APP_STATUS_ACTION_ERROR, ...payload };
}