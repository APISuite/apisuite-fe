import { DeleteAccountAction, DeleteAccountActionSuccess, DeleteAccountActionError } from "./types";

export const DELETE_ACCOUNT = "profile/DELETE_ACCOUNT";
export const DELETE_ACCOUNT_SUCCESS = "profile/DELETE_ACCOUNT_SUCCESS";
export const DELETE_ACCOUNT_ERROR = "profile/DELETE_ACCOUNT_ERROR";

export function deleteAccount (payload: Omit<DeleteAccountAction, "type">) {
  return { type: DELETE_ACCOUNT, ...payload };
}

export function deleteAccountSuccess (payload: Omit<DeleteAccountActionSuccess, "type">) {
  return { type: DELETE_ACCOUNT_SUCCESS, ...payload };
}

export function deleteAccountError (payload: Omit<DeleteAccountActionError, "type">) {
  return { type: DELETE_ACCOUNT_ERROR, ...payload };
}
