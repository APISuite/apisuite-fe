import { UpdateBlueprintAppConfigAction, UpdateBlueprintAppConfigActionError, UpdateBlueprintAppConfigActionSuccess } from "./types";

export const UPDATE_BLUEPRINT_CONFIG = "applications/UPDATE_BLUEPRINT_CONFIG";
export const UPDATE_BLUEPRINT_CONFIG_SUCCESS = "applications/UPDATE_BLUEPRINT_CONFIG_SUCCESS";
export const UPDATE_BLUEPRINT_CONFIG_ERROR = "applications/UPDATE_BLUEPRINT_CONFIG_ERROR";

export function updateBlueprintAppConfig(payload: Omit<UpdateBlueprintAppConfigAction, "type">) {
  return { type: UPDATE_BLUEPRINT_CONFIG, ...payload };
}

export function updateBlueprintAppConfigSuccess(payload: Omit<UpdateBlueprintAppConfigActionSuccess, "type">) {
  return { type: UPDATE_BLUEPRINT_CONFIG_SUCCESS, ...payload };
}

export function updateBlueprintAppConfigError(payload: Omit<UpdateBlueprintAppConfigActionError, "type">) {
  return { type: UPDATE_BLUEPRINT_CONFIG_ERROR, ...payload };
}
