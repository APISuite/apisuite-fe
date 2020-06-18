import { User } from 'containers/Auth/types'
import { ReturnNestedType } from 'util/typeUtils'
import {
  fetchTeamMembersActions,
  fetchRoleOptionsActions,
  inviteMemberActions,
  confirmInviteActions,
} from './ducks'

export const roleNameOptions = ['superadmin', 'admin', 'developer', ''] as const

export type ProfileStore = Pick<FetchTeamMembersResponse, 'members'> & {
  roleOptions: Role[],
}

export type Role = {
  name: typeof roleNameOptions[number],
  id: string,
}

export type Organization = {
  id: string,
  name: string,
}

export type FetchTeamMembersResponse = {
  success: boolean,
  message: string,
  members: ({
    'Organization': Organization,
    'Role': Role,
    'User': Pick<User, 'id'> & { name: string },
  })[],
}

export type FetchRoleOptionsResponse = Role[]

export type InviteMemberResponse = any

export type ConfirmInviteResponse = any

export type ChangeRoleResponse = any

export type ProfileActions =
  ReturnNestedType<typeof fetchTeamMembersActions> |
  ReturnNestedType<typeof fetchRoleOptionsActions> |
  ReturnNestedType<typeof inviteMemberActions> |
  ReturnNestedType<typeof confirmInviteActions>
