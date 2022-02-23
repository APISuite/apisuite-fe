import { GetBlueprintAppAction, GetBlueprintAppActionError, GetBlueprintAppActionSuccess } from "./types";

export const GET_BLUEPRINT_APP = "applications/GET_BLUEPRINT_APP";
export const GET_BLUEPRINT_APP_SUCCESS = "applications/GET_BLUEPRINT_APP_SUCCESS";
export const GET_BLUEPRINT_APP_ERROR = "applications/GET_BLUEPRINT_APP_ERROR";

export function getBlueprintApp(payload: Omit<GetBlueprintAppAction, "type">) {
  return { type: GET_BLUEPRINT_APP, ...payload };
}

export function getBlueprintAppSuccess(payload: Omit<GetBlueprintAppActionSuccess, "type">) {
  return { type: GET_BLUEPRINT_APP_SUCCESS, ...payload };
}

export function getBlueprintAppError(payload: Omit<GetBlueprintAppActionError, "type">) {
  return { type: GET_BLUEPRINT_APP_ERROR, ...payload };
}
