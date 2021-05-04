import {
  ValidateInvitationTokenAction, ValidateInvitationTokenActionSuccess, ValidateInvitationTokenActionError,
  AcceptInvitationWithSignInAction, AcceptInvitationWithSignInActionSuccess, AcceptInvitationWithSignInActionError,
  AcceptInvitationAction, AcceptInvitationActionSuccess, AcceptInvitationActionError,
  InvitationSignInAction, InvitationSignInActionSuccess, InvitationSignInActionError,
  RejectInvitationAction, RejectInvitationActionSuccess, RejectInvitationActionError,
} from "./types";

export const ACCEPT_INVITATION_WITH_SIGN_IN = "invitation/ACCEPT_INVITATION_WITH_IN";
export const ACCEPT_INVITATION_WITH_SIGN_IN_SUCCESS = "invitation/ACCEPT_INVITATION_WITH_SIGN_IN_SUCCESS";
export const ACCEPT_INVITATION_WITH_SIGN_IN_ERROR = "invitation/ACCEPT_INVITATION_WITH_SIGN_IN_ERROR";

export const INVITATION_SIGN_IN = "invitation/INVITATION_SIGN_IN";
export const INVITATION_SIGN_IN_SUCCESS = "invitation/INVITATION_SIGN_IN_SUCCESS";
export const INVITATION_SIGN_IN_ERROR = "invitation/INVITATION_SIGN_IN_ERROR";

export const ACCEPT_INVITATION = "invitation/ACCEPT_INVITATION";
export const ACCEPT_INVITATION_SUCCESS = "invitation/ACCEPT_INVITATION_SUCCESS";
export const ACCEPT_INVITATION_ERROR = "invitation/ACCEPT_INVITATION_ERROR";

export const REJECT_INVITATION = "invitation/REJECT_INVITATION";
export const REJECT_INVITATION_SUCCESS = "invitation/REJECT_INVITATION_SUCCESS";
export const REJECT_INVITATION_ERROR = "invitation/REJECT_INVITATION_ERROR";

export const VALIDATE_INVITATION_TOKEN = "invitation/VALIDATE_INVITATION_TOKEN";
export const VALIDATE_INVITATION_TOKEN_SUCCESS = "invitation/VALIDATE_INVITATION_TOKEN_SUCCESS";
export const VALIDATE_INVITATION_TOKEN_ERROR = "invitation/VALIDATE_INVITATION_TOKEN_ERROR";

export function validateInvitationToken (payload: Omit<ValidateInvitationTokenAction, "type">) {
  return { type: VALIDATE_INVITATION_TOKEN, ...payload };
}

export function validateInvitationTokenSuccess (payload: Omit<ValidateInvitationTokenActionSuccess, "type">) {
  return { type: VALIDATE_INVITATION_TOKEN_SUCCESS, ...payload };
}

export function validateInvitationTokenError (payload: Omit<ValidateInvitationTokenActionError, "type">) {
  return { type: VALIDATE_INVITATION_TOKEN_ERROR, ...payload };
}

export function acceptInvitationWithSignIn (payload: Omit<AcceptInvitationWithSignInAction, "type">) {
  return { type: ACCEPT_INVITATION_WITH_SIGN_IN, ...payload };
}

export function acceptInvitationWithSignInSuccess (payload: Omit<AcceptInvitationWithSignInActionSuccess, "type">) {
  return { type: ACCEPT_INVITATION_WITH_SIGN_IN_SUCCESS, ...payload };
}

export function acceptInvitationWithSignInError (payload: Omit<AcceptInvitationWithSignInActionError, "type">) {
  return { type: ACCEPT_INVITATION_WITH_SIGN_IN_ERROR, ...payload };
}

export function acceptInvitation (payload: Omit<AcceptInvitationAction, "type">) {
  return { type: ACCEPT_INVITATION, ...payload };
}

export function acceptInvitationSuccess (payload: Omit<AcceptInvitationActionSuccess, "type">) {
  return { type: ACCEPT_INVITATION_SUCCESS, ...payload };
}

export function acceptInvitationError (payload: Omit<AcceptInvitationActionError, "type">) {
  return { type: ACCEPT_INVITATION_ERROR, ...payload };
}

export function invitationSignIn (payload: Omit<InvitationSignInAction, "type">) {
  return { type: INVITATION_SIGN_IN, ...payload };
}

export function invitationSignInSuccess (payload: Omit<InvitationSignInActionSuccess, "type">) {
  return { type: INVITATION_SIGN_IN_SUCCESS, ...payload };
}

export function invitationSignInError (payload: Omit<InvitationSignInActionError, "type">) {
  return { type: INVITATION_SIGN_IN_ERROR, ...payload };
}

export function rejectInvitation (payload: Omit<RejectInvitationAction, "type">) {
  return { type: REJECT_INVITATION, ...payload };
}

export function rejectInvitationSuccess (payload: Omit<RejectInvitationActionSuccess, "type">) {
  return { type: REJECT_INVITATION_SUCCESS, ...payload };
}

export function rejectInvitationError (payload: Omit<RejectInvitationActionError, "type">) {
  return { type: REJECT_INVITATION_ERROR, ...payload };
}
