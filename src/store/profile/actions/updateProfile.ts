import { UpdateProfileAction, UpdateProfileActionSuccess, UpdateProfileActionError } from "./types";

export const UPDATE_PROFILE = "profile/UPDATE_PROFILE";
export const UPDATE_PROFILE_SUCCESS = "profile/UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_ERROR = "profile/UPDATE_PROFILE_ERROR";

export function updateProfile (payload: Omit<UpdateProfileAction, "type">) {
  return { type: UPDATE_PROFILE, ...payload };
}

export function updateProfileSuccess (payload: Omit<UpdateProfileActionSuccess, "type">) {
  return { type: UPDATE_PROFILE_SUCCESS, ...payload };
}

export function updateProfileError (payload: Omit<UpdateProfileActionError, "type">) {
  return { type: UPDATE_PROFILE_ERROR, ...payload };
}
