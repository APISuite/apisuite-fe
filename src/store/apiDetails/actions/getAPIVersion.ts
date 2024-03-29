import { GetAPIVersionAction, GetAPIVersionSuccessAction, GetAPIVersionErrorAction } from "./types";

export const GET_API_VERSION = "API/Version/GET_API_VERSION";
export const GET_API_VERSION_SUCCESS = "API/Version/GET_API_VERSION_SUCCESS";
export const GET_API_VERSION_ERROR = "API/Version/GET_API_VERSION_ERROR";

export const getAPIVersion = (payload: Omit<GetAPIVersionAction, "type">) => {
  return { type: GET_API_VERSION, ...payload };
};

export const getAPIVersionSuccess = (payload: Omit<GetAPIVersionSuccessAction, "type">) => {
  return { type: GET_API_VERSION_SUCCESS, ...payload };
};

export const getAPIVersionError = (payload: Omit<GetAPIVersionErrorAction, "type">) => {
  return { type: GET_API_VERSION_ERROR, ...payload };
};
