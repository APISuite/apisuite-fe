import { UpdateBlueprintAppAction, UpdateBlueprintAppActionError, UpdateBlueprintAppActionSuccess } from "./types";

export const UPDATE_BLUEPRINT_APP = "applications/UPDATE_BLUEPRINT_APP";
export const UPDATE_BLUEPRINT_APP_SUCCESS = "applications/UPDATE_BLUEPRINT_APP_SUCCESS";
export const UPDATE_BLUEPRINT_APP_ERROR = "applications/UPDATE_BLUEPRINT_APP_ERROR";

export function updateBlueprintApp(payload: Omit<UpdateBlueprintAppAction, "type">) {
  return { type: UPDATE_BLUEPRINT_APP, ...payload };
}

export function updateBlueprintAppSuccess(payload: Omit<UpdateBlueprintAppActionSuccess, "type">) {
  return { type: UPDATE_BLUEPRINT_APP_SUCCESS, ...payload };
}

export function updateBlueprintAppError(payload: Omit<UpdateBlueprintAppActionError, "type">) {
  return { type: UPDATE_BLUEPRINT_APP_ERROR, ...payload };
}
