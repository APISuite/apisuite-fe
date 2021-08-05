import { ExistingOrgInfo, FetchTeamMembersResponse, GetProfileResponse, NewOrgInfo, ProfileStore, Role, UpdateProfileResponse } from "../types";
import { CHANGE_ROLE, CHANGE_ROLE_SUCCESS, CHANGE_ROLE_ERROR } from "./changeRole";
import { CONFIRM_INVITE_MEMBER, CONFIRM_INVITE_MEMBER_SUCCESS, CONFIRM_INVITE_MEMBER_ERROR } from "./confirmInviteMember";
import { CREATE_ORG, CREATE_ORG_SUCCESS, CREATE_ORG_ERROR } from "./createOrg";
import { DELETE_ACCOUNT, DELETE_ACCOUNT_SUCCESS, DELETE_ACCOUNT_ERROR } from "./deleteAccount";
import { FETCH_ORG, FETCH_ORG_SUCCESS, FETCH_ORG_ERROR } from "./fetchOrg";
import { FETCH_ROLE_OPTIONS, FETCH_ROLE_OPTIONS_SUCCESS, FETCH_ROLE_OPTIONS_ERROR } from "./fetchRoleOptions";
import { FETCH_TEAM_MEMBERS, FETCH_TEAM_MEMBERS_SUCCESS, FETCH_TEAM_MEMBERS_ERROR } from "./fetchTeamMembers";
import { GET_PROFILE, GET_PROFILE_SUCCESS, GET_PROFILE_ERROR } from "./getProfile";
import { INVITE_TEAM_MEMBER, INVITE_TEAM_MEMBER_SUCCESS, INVITE_TEAM_MEMBER_ERROR } from "./inviteTeamMember";
import { RESET_PROFILE_ERRORS } from "./resetProfileErrors";
import { SWITCH_ORG, SWITCH_ORG_SUCCESS, SWITCH_ORG_ERROR } from "./switchOrg";
import { UPDATE_ORG, UPDATE_ORG_SUCCESS, UPDATE_ORG_ERROR } from "./updateOrg";
import { UPDATE_PROFILE, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_ERROR } from "./updateProfile";

export type ProfileActions =
ChangeRoleAction |
ChangeRoleActionSuccess |
ChangeRoleActionError |
ConfirmInviteMemberAction |
ConfirmInviteMemberActionSuccess |
ConfirmInviteMemberActionError |
CreateOrgAction |
CreateOrgActionSuccess |
CreateOrgActionError |
DeleteAccountAction |
DeleteAccountActionSuccess |
DeleteAccountActionError |
FetchOrgAction |
FetchOrgActionSuccess |
FetchOrgActionError |
FetchRoleOptionsAction |
FetchRoleOptionsActionSuccess |
FetchRoleOptionsActionError |
FetchTeamMembersAction |
FetchTeamMembersActionSuccess |
FetchTeamMembersActionError |
GetProfileAction |
GetProfileActionSuccess |
GetProfileActionError |
InviteTeamMemberAction |
InviteTeamMemberActionSuccess |
InviteTeamMemberActionError |
ResetProfileErrorsAction |
SwitchOrgAction |
SwitchOrgActionSuccess |
SwitchOrgActionError |
UpdateOrgAction |
UpdateOrgActionSuccess |
UpdateOrgActionError |
UpdateProfileAction |
UpdateProfileActionSuccess |
UpdateProfileActionError

export type ChangeRoleAction = {
  type: typeof CHANGE_ROLE,
  "user_id": string,
  "org_id": string,
  "role_id": string,
}

export type ChangeRoleActionSuccess = {
  type: typeof CHANGE_ROLE_SUCCESS,
}

export type ChangeRoleActionError = {
  type: typeof CHANGE_ROLE_ERROR,
  error: string,
}

export type ConfirmInviteMemberAction = {
  type: typeof CONFIRM_INVITE_MEMBER,
  token: string,
}

export type ConfirmInviteMemberActionSuccess = {
  type: typeof CONFIRM_INVITE_MEMBER_SUCCESS,
}

export type ConfirmInviteMemberActionError = {
  type: typeof CONFIRM_INVITE_MEMBER_ERROR,
  error: string,
}

export type CreateOrgAction = {
  type: typeof CREATE_ORG,
  newOrgInfo: NewOrgInfo,
}

export type CreateOrgActionSuccess = {
  type: typeof CREATE_ORG_SUCCESS,
  org: ProfileStore["org"],
}

export type CreateOrgActionError = {
  type: typeof CREATE_ORG_ERROR,
  error: string,
}

export type DeleteAccountAction = {
  type: typeof DELETE_ACCOUNT,
}

export type DeleteAccountActionSuccess = {
  type: typeof DELETE_ACCOUNT_SUCCESS,
}

export type DeleteAccountActionError = {
  type: typeof DELETE_ACCOUNT_ERROR,
  error: string,
}

export type FetchOrgAction = {
  type: typeof FETCH_ORG,
  "org_id": string,
}

export type FetchOrgActionSuccess = {
  type: typeof FETCH_ORG_SUCCESS,
  org: ProfileStore["org"],
}

export type FetchOrgActionError = {
  type: typeof FETCH_ORG_ERROR,
  error: string,
}

export type FetchRoleOptionsAction = {
  type: typeof FETCH_ROLE_OPTIONS,
}

export type FetchRoleOptionsActionSuccess = {
  type: typeof FETCH_ROLE_OPTIONS_SUCCESS,
  roles: Role[],
}

export type FetchRoleOptionsActionError = {
  type: typeof FETCH_ROLE_OPTIONS_ERROR,
  error: string,
}

export type FetchTeamMembersAction = {
  type: typeof FETCH_TEAM_MEMBERS,
  orgID?: string,
}

export type FetchTeamMembersActionSuccess = {
  type: typeof FETCH_TEAM_MEMBERS_SUCCESS,
  members: FetchTeamMembersResponse[],
}

export type FetchTeamMembersActionError = {
  type: typeof FETCH_TEAM_MEMBERS_ERROR,
  error: string,
}

export type GetProfileAction = {
  type: typeof GET_PROFILE,
}

export type GetProfileActionSuccess = {
  type: typeof GET_PROFILE_SUCCESS,
  profile: GetProfileResponse,
}

export type GetProfileActionError = {
  type: typeof GET_PROFILE_ERROR,
  error: string,
}

export type InviteTeamMemberAction = {
  type: typeof INVITE_TEAM_MEMBER,
  email: string,
  "role_id": string,
}

export type InviteTeamMemberActionSuccess = {
  type: typeof INVITE_TEAM_MEMBER_SUCCESS,
}

export type InviteTeamMemberActionError = {
  type: typeof INVITE_TEAM_MEMBER_ERROR,
  error: string,
}

export type ResetProfileErrorsAction = {
  type: typeof RESET_PROFILE_ERRORS,
}

export type SwitchOrgAction = {
  type: typeof SWITCH_ORG,
  id: string,
  orgId: string,
}

export type SwitchOrgActionSuccess = {
  type: typeof SWITCH_ORG_SUCCESS,
}

export type SwitchOrgActionError = {
  type: typeof SWITCH_ORG_ERROR,
  error: string,
}

export type UpdateOrgAction = {
  type: typeof UPDATE_ORG,
  orgId: string,
  orgInfo: ExistingOrgInfo,
}

export type UpdateOrgActionSuccess = {
  type: typeof UPDATE_ORG_SUCCESS,
  updatedOrgDetails: OrgDetailsResponse,
}

export type UpdateOrgActionError = {
  type: typeof UPDATE_ORG_ERROR,
  error: string,
}

export type UpdateProfileAction = {
  type: typeof UPDATE_PROFILE,
  userId: string,
  name: string,
  bio: string,
  avatar: string,
  mobile: string,
}

export type UpdateProfileActionSuccess = {
  type: typeof UPDATE_PROFILE_SUCCESS,
} & UpdateProfileResponse

export type UpdateProfileActionError = {
  type: typeof UPDATE_PROFILE_ERROR,
  error: string,
}
