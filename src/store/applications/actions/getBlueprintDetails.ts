import { GetBlueprintDetailsAction, GetBlueprintDetailsActionError, GetBlueprintDetailsActionSuccess } from "./types";

export const GET_BLUEPRINT_DETAILS_ACTION = "applications/GET_BLUEPRINT_DETAILS_ACTION";
export const GET_BLUEPRINT_DETAILS_ACTION_SUCCESS = "applications/GET_BLUEPRINT_DETAILS_ACTION_SUCCESS";
export const GET_BLUEPRINT_DETAILS_ACTION_ERROR = "applications/GET_BLUEPRINT_DETAILS_ACTION_ERROR";

export function getBlueprintDetailsAction (payload: Omit<GetBlueprintDetailsAction, "type">) {
  return { type: GET_BLUEPRINT_DETAILS_ACTION, ...payload };
}

export function getBlueprintDetailsActionSuccess (payload: Omit<GetBlueprintDetailsActionSuccess, "type">) {
  return { type: GET_BLUEPRINT_DETAILS_ACTION_SUCCESS, ...payload };
}

export function getBlueprintDetailsActionError (payload: Omit<GetBlueprintDetailsActionError, "type">) {
  return { type: GET_BLUEPRINT_DETAILS_ACTION_ERROR, ...payload };
}
