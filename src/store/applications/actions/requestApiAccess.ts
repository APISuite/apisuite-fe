import { RequestAPIAccessAction, RequestAPIAccessActionError, RequestAPIAccessActionSuccess } from "./types";

export const REQUEST_API_ACCESS = "applications/REQUEST_API_ACCESS";
export const REQUEST_API_ACCESS_SUCCESS = "applications/REQUEST_API_ACCESS_SUCCESS";
export const REQUEST_API_ACCESS_ERROR = "applications/REQUEST_API_ACCESS_ERROR";

export function requestAPIAccess (payload: Omit<RequestAPIAccessAction, "type">) {
  return { type: REQUEST_API_ACCESS, ...payload };
}

export function requestAPIAccessSuccess (payload: Omit<RequestAPIAccessActionSuccess, "type">) {
  return { type: REQUEST_API_ACCESS_SUCCESS, ...payload };
}

export function requestAPIAccessError (payload: Omit<RequestAPIAccessActionError, "type">) {
  return { type: REQUEST_API_ACCESS_ERROR, ...payload };
}
