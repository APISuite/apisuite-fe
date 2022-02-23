import { GetAllBlueprintAppsAction, GetAllBlueprintAppsActionError, GetAllBlueprintAppsActionSuccess } from "./types";

export const GET_ALL_BLUEPRINT_APPS = "applications/GET_ALL_BLUEPRINT_APPS";
export const GET_ALL_BLUEPRINT_APPS_SUCCESS = "applications/GET_ALL_BLUEPRINT_APPS_SUCCESS";
export const GET_ALL_BLUEPRINT_APPS_ERROR = "applications/GET_ALL_BLUEPRINT_APPS_ERROR";

export function getAllBlueprintApps (payload: Omit<GetAllBlueprintAppsAction, "type">) {
  return { type: GET_ALL_BLUEPRINT_APPS, ...payload };
}

export function getAllBlueprintAppsSuccess (payload: Omit<GetAllBlueprintAppsActionSuccess, "type">) {
  return { type: GET_ALL_BLUEPRINT_APPS_SUCCESS, ...payload };
}

export function getAllBlueprintAppsError (payload: Omit<GetAllBlueprintAppsActionError, "type">) {
  return { type: GET_ALL_BLUEPRINT_APPS_ERROR, ...payload };
}
