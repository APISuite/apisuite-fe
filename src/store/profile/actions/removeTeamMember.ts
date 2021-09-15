import { RemoveTeamMemberAction, RemoveTeamMemberActionSuccess, RemoveTeamMemberActionError } from "./types";

export const REMOVE_TEAM_MEMBER = "profile/REMOVE_TEAM_MEMBER";
export const REMOVE_TEAM_MEMBER_SUCCESS = "profile/REMOVE_TEAM_MEMBER_SUCCESS";
export const REMOVE_TEAM_MEMBER_ERROR = "profile/REMOVE_TEAM_MEMBER_ERROR";

export function removeTeamMember (payload: Omit<RemoveTeamMemberAction, "type">) {
  return { type: REMOVE_TEAM_MEMBER, ...payload };
}

export function removeTeamMemberSuccess (payload: Omit<RemoveTeamMemberActionSuccess, "type">) {
  return { type: REMOVE_TEAM_MEMBER_SUCCESS, ...payload };
}

export function removeTeamMemberError (payload: Omit<RemoveTeamMemberActionError, "type">) {
  return { type: REMOVE_TEAM_MEMBER_ERROR, ...payload };
}
