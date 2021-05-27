import { User } from "containers/Auth/types";
import { RequestStatus } from "util/request";

export const roleNameOptions = ["admin", "organizationOwner", "developer", ""] as const;

export type NewOrgInfo = {
  description: string | null,
  logo: string,
  name: string,
  privacyUrl: string,
  supportUrl: string,
  tosUrl: string,
  vat?: string | null,
  websiteUrl: string,
  youtubeUrl: string,
}

export type ExistingOrgInfo = {
  createdAt?: string,
  description: string | null,
  logo: string,
  "org_code"?: string,
  privacyUrl: string,
  supportUrl: string,
  tosUrl: string,
  updatedAt?: string,
  vat?: string | null,
  websiteUrl: string,
  youtubeUrl: string,
}

export type ProfileStore = {
  members: FetchTeamMembersResponse[],
  org: Organization &
  Pick<
  ExistingOrgInfo,
  "description" |
  "logo" |
  "privacyUrl" |
  "supportUrl" |
  "tosUrl" |
  "vat" |
  "websiteUrl" |
  "youtubeUrl"
  >,
  profile: Profile,
  requestStatuses: {
    changeRoleRequest: RequestStatus,
    createOrgRequest: RequestStatus,
    deleteAccount: RequestStatus,
    getMembersRequest: RequestStatus,
    getRolesRequest: RequestStatus,
    inviteMemberRequest: RequestStatus & { invited: boolean },
    switchOrgRequest: RequestStatus,
    updateOrgRequest: RequestStatus,
    updateProfileRequest: RequestStatus,
  },
  roleOptions: Role[],
}

export type Profile = {
  "current_org": Organization & {
    "member_since": string,
    role: Role,
  },
  "orgs_member": Organization[],
  ssoAccountURL: string,
  user: {
    avatar?: string,
    bio?: string,
    email: string,
    id: string,
    "last_login": string,
    mobile?: string,
    name: string,
    oidcProvider: string | null,
  },
}

export type Role = {
  id: string,
  name: "admin" | "organizationOwner" | "developer" | "baseUser",
}

export type Organization = {
  id: string,
  name: string,
}

export type FetchTeamMembersResponse = {
  "Organization": Organization,
  "Role": Role,
  "User": Pick<User, "id"> & { name: string },
}

export type FetchRoleOptionsResponse = Role[]

export type GetProfileResponse = Profile

export type UpdateProfileResponse = {
  message: string,
  success: boolean,
}

export type FetchOrgResponse = Organization & ExistingOrgInfo
