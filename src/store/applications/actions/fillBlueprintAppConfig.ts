import {
  FillBlueprintAppConfigAction,
  FillBlueprintAppConfigActionError,
  FillBlueprintAppConfigActionSuccess,
} from "store/applications/actions/types";


export const FILL_BLUEPRINT_CONFIG = "applications/FILL_BLUEPRINT_CONFIG";
export const FILL_BLUEPRINT_CONFIG_SUCCESS = "applications/FILL_BLUEPRINT_CONFIG_SUCCESS";
export const FILL_BLUEPRINT_CONFIG_ERROR = "applications/FILL_BLUEPRINT_CONFIG_ERROR";

export function fillBlueprintAppConfig(payload: Omit<FillBlueprintAppConfigAction, "type">) {
  return { type: FILL_BLUEPRINT_CONFIG, ...payload };
}

export function fillBlueprintAppConfigSuccess(payload: Omit<FillBlueprintAppConfigActionSuccess, "type">) {
  return { type: FILL_BLUEPRINT_CONFIG_SUCCESS, ...payload };
}

export function fillBlueprintAppConfigError(payload: Omit<FillBlueprintAppConfigActionError, "type">) {
  return { type: FILL_BLUEPRINT_CONFIG_ERROR, ...payload };
}
