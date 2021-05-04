import { APIVersion } from "store/subscriptions/types";
import { APIDetailParams } from "../types";
import { GET_API_VERSION, GET_API_VERSION_ERROR, GET_API_VERSION_SUCCESS } from "./getAPIVersion";

// ACTION TYPES
export type APIVersionActions =
GetAPIVersionAction |
GetAPIVersionSuccessAction |
GetAPIVersionErrorAction

// ACTIONS
export type GetAPIVersionAction = {
  type: typeof GET_API_VERSION,
  params: APIDetailParams,
}

export type GetAPIVersionSuccessAction = {
  type: typeof GET_API_VERSION_SUCCESS,
  version: APIVersion,
}

export type GetAPIVersionErrorAction = {
  type: typeof GET_API_VERSION_ERROR,
} & Error
