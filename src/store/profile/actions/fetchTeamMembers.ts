import { FetchTeamMembersAction, FetchTeamMembersActionSuccess, FetchTeamMembersActionError } from "./types";

export const FETCH_TEAM_MEMBERS = "profile/FETCH_TEAM_MEMBERS";
export const FETCH_TEAM_MEMBERS_SUCCESS = "profile/FETCH_TEAM_MEMBERS_SUCCESS";
export const FETCH_TEAM_MEMBERS_ERROR = "profile/FETCH_TEAM_MEMBERS_ERROR";

export function fetchTeamMembers (payload: Omit<FetchTeamMembersAction, "type">) {
  return { type: FETCH_TEAM_MEMBERS, ...payload };
}

export function fetchTeamMembersSuccess (payload: Omit<FetchTeamMembersActionSuccess, "type">) {
  return { type: FETCH_TEAM_MEMBERS_SUCCESS, ...payload };
}

export function fetchTeamMembersError (payload: Omit<FetchTeamMembersActionError, "type">) {
  return { type: FETCH_TEAM_MEMBERS_ERROR, ...payload };
}
