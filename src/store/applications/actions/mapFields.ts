import { MapFieldsAction, MapFieldsActionError, MapFieldsActionSuccess } from "./types";

export const MAP_FIELDS_ACTION = "applications/MAP_FIELDS_ACTION";
export const MAP_FIELDS_ACTION_ERROR = "applications/MAP_FIELDS_ACTION_ERROR";
export const MAP_FIELDS_ACTION_SUCCESS = "applications/MAP_FIELDS_ACTION_SUCCESS";

export function mapFieldsAction (payload: Omit<MapFieldsAction, "type">) {
  return { type: MAP_FIELDS_ACTION, ...payload };
}

export function mapFieldsActionSuccess (payload: Omit<MapFieldsActionSuccess, "type">) {
  return { type: MAP_FIELDS_ACTION_SUCCESS, ...payload };
}

export function mapFieldsActionError (payload: Omit<MapFieldsActionError, "type">) {
  return { type: MAP_FIELDS_ACTION_ERROR, ...payload };
}
