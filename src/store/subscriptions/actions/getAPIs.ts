import { GetAPIsAction, GetAPIsErrorAction, GetAPIsSuccessAction } from "./types";

export const GET_APIS = "subscriptions/GET_APIS";
export const GET_APIS_SUCCESS = "subscriptions/GET_APIS_SUCCESS";
export const GET_APIS_ERROR = "subscriptions/GET_APIS_ERROR";

export function getAPIs (payload: Omit<GetAPIsAction, "type">) {
  return { type: GET_APIS, ...payload };
}

export function getAPIsSuccess (payload: Omit<GetAPIsSuccessAction, "type">) {
  return { type: GET_APIS_SUCCESS, ...payload };
}

export function getAPIsError (payload: Omit<GetAPIsErrorAction, "type">) {
  return { type: GET_APIS_ERROR, ...payload };
}
