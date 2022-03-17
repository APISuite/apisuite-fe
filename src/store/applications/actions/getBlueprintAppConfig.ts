import { GetBlueprintAppConfigAction, GetBlueprintAppConfigActionError, GetBlueprintAppConfigActionSuccess } from "./types";

export const GET_BLUEPRINT_CONFIG = "applications/GET_BLUEPRINT_CONFIG";
export const GET_BLUEPRINT_CONFIG_SUCCESS = "applications/GET_BLUEPRINT_CONFIG_SUCCESS";
export const GET_BLUEPRINT_CONFIG_ERROR = "applications/GET_BLUEPRINT_CONFIG_ERROR";

export function getBlueprintAppConfig(payload: Omit<GetBlueprintAppConfigAction, "type">) {
  return { type: GET_BLUEPRINT_CONFIG, ...payload };
}

export function getBlueprintAppConfigSuccess(payload: Omit<GetBlueprintAppConfigActionSuccess, "type">) {
  return { type: GET_BLUEPRINT_CONFIG_SUCCESS, ...payload };
}

export function getBlueprintAppConfigError(payload: Omit<GetBlueprintAppConfigActionError, "type">) {
  return { type: GET_BLUEPRINT_CONFIG_ERROR, ...payload };
}
