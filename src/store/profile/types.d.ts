import { SelectOption } from "components/Select/types";
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
  address: {
    address?: string,
    postalCode?: string,
    city?: string,
    country?: string,
  },
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
  address: {
    address?: string,
    postalCode?: string,
    city?: string,
    country?: string,
  },
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
  "youtubeUrl" |
  "address"
  >,
  profile: Profile,
  requestStatuses: {
    changeRoleRequest: RequestStatus,
    createOrgRequest: RequestStatus,
    deleteAccount: RequestStatus,
    getMembersRequest: RequestStatus,
    getRolesRequest: RequestStatus,
    inviteMemberRequest: RequestStatus & { invited: boolean },
    removeMemberRequest: RequestStatus & { removed: boolean },
    updateOrgRequest: RequestStatus,
    updateProfileRequest: RequestStatus,
  },
  roleOptions: Role[],
}

export type Profile = {
  currentOrg: OrganizationAndRole,
  organizations: OrganizationAndRole[],
  ssoAccountURL: string,
  user: {
    avatar?: string,
    bio?: string,
    email: string,
    id: number,
    "last_login": string,
    mobile?: string,
    name: string,
    oidcProvider: string | null,
  },
}

export type Role = {
  id: number,
  name: "admin" | "organizationOwner" | "developer" | "baseUser",
  level: number,
}

export type Organization = {
  id: number,
  name: string,
}

export type OrganizationAndRole = {
  id: number,
  name: string,
  role: Role,
}

interface SelectOrgOption extends SelectOption {
  role: Role,
  value: string,
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

export type OrgDetailsResponse = Organization & ExistingOrgInfo
