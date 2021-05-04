import { InviteTeamMemberAction, InviteTeamMemberActionSuccess, InviteTeamMemberActionError } from "./types";

export const INVITE_TEAM_MEMBER = "profile/INVITE_TEAM_MEMBER";
export const INVITE_TEAM_MEMBER_SUCCESS = "profile/INVITE_TEAM_MEMBER_SUCCESS";
export const INVITE_TEAM_MEMBER_ERROR = "profile/INVITE_TEAM_MEMBER_ERROR";

export function inviteTeamMember (payload: Omit<InviteTeamMemberAction, "type">) {
  return { type: INVITE_TEAM_MEMBER, ...payload };
}

export function inviteTeamMemberSuccess (payload: Omit<InviteTeamMemberActionSuccess, "type">) {
  return { type: INVITE_TEAM_MEMBER_SUCCESS, ...payload };
}

export function inviteTeamMemberError (payload: Omit<InviteTeamMemberActionError, "type">) {
  return { type: INVITE_TEAM_MEMBER_ERROR, ...payload };
}
