import { ConfirmInviteMemberAction, ConfirmInviteMemberActionError, ConfirmInviteMemberActionSuccess } from "./types";

export const CONFIRM_INVITE_MEMBER = "profile/CONFIRM_INVITE_MEMBER";
export const CONFIRM_INVITE_MEMBER_SUCCESS = "profile/CONFIRM_INVITE_MEMBER_SUCCESS";
export const CONFIRM_INVITE_MEMBER_ERROR = "profile/CONFIRM_INVITE_MEMBER_ERROR";

export function confirmInviteMember (payload: Omit<ConfirmInviteMemberAction, "type">) {
  return { type: CONFIRM_INVITE_MEMBER, ...payload };
}

export function confirmInviteMemberSuccess (payload: Omit<ConfirmInviteMemberActionSuccess, "type">) {
  return { type: CONFIRM_INVITE_MEMBER_SUCCESS, ...payload };
}

export function confirmInviteMemberError (payload: Omit<ConfirmInviteMemberActionError, "type">) {
  return { type: CONFIRM_INVITE_MEMBER_ERROR, ...payload };
}
