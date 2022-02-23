import { CreateBlueprintAppAction, CreateBlueprintAppActionError, CreateBlueprintAppActionSuccess } from "./types";

export const CREATE_BLUEPRINT_APP = "applications/CREATE_BLUEPRINT_APP";
export const CREATE_BLUEPRINT_APP_ERROR = "applications/CREATE_BLUEPRINT_APP_ERROR";
export const CREATE_BLUEPRINT_APP_SUCCESS = "applications/CREATE_BLUEPRINT_APP_SUCCESS";

export function createBlueprintApp (payload: Omit<CreateBlueprintAppAction, "type">) {
  return { type: CREATE_BLUEPRINT_APP, ...payload };
}

export function createBlueprintAppSuccess (payload: Omit<CreateBlueprintAppActionSuccess, "type">) {
  return { type: CREATE_BLUEPRINT_APP_SUCCESS, ...payload };
}

export function createBlueprintAppError (payload: Omit<CreateBlueprintAppActionError, "type">) {
  return { type: CREATE_BLUEPRINT_APP_ERROR, ...payload };
}
