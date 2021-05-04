import { GetProfileAction, GetProfileActionSuccess, GetProfileActionError } from "./types";

export const GET_PROFILE = "profile/GET_PROFILE";
export const GET_PROFILE_SUCCESS = "profile/GET_PROFILE_SUCCESS";
export const GET_PROFILE_ERROR = "profile/GET_PROFILE_ERROR";

export function getProfile (payload: Omit<GetProfileAction, "type">) {
  return { type: GET_PROFILE, ...payload };
}

export function getProfileSuccess (payload: Omit<GetProfileActionSuccess, "type">) {
  return { type: GET_PROFILE_SUCCESS, ...payload };
}

export function getProfileError (payload: Omit<GetProfileActionError, "type">) {
  return { type: GET_PROFILE_ERROR, ...payload };
}
