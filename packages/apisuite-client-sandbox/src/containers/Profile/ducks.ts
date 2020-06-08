import update from 'immutability-helper'
import {
  ProfileActions,
  ProfileStore,
  FetchTeamMembersResponse,
  FetchRoleOptionsResponse,
  InviteMemberResponse,
  ConfirmInviteResponse,
} from './types'

const initialState: ProfileStore = {
  members: [{
    'org_id': '',
    'User': {
      name: '',
      id: 0,
    },
    'Role': {
      name: '',
      id: '',
    },
  }],
  roleOptions: [{
    name: '',
    id: '',
  }],
}

export enum ProfileActionTypes {
  FETCH_TEAM_MEMBERS_REQUEST = 'FETCH_TEAM_MEMBERS_REQUEST',
  FETCH_TEAM_MEMBERS_SUCCESS = 'FETCH_TEAM_MEMBERS_SUCCESS',
  FETCH_TEAM_MEMBERS_ERROR = 'FETCH_TEAM_MEMBERS_ERROR',

  FETCH_ROLE_OPTIONS_REQUEST = 'FETCH_ROLE_OPTIONS_REQUEST',
  FETCH_ROLE_OPTIONS_SUCCESS = 'FETCH_ROLE_OPTIONS_SUCCESS',
  FETCH_ROLE_OPTIONS_ERROR = 'FETCH_ROLE_OPTIONS_ERROR',

  INVITE_MEMBER_REQUEST = 'INVITE_MEMBER_REQUEST',
  INVITE_MEMBER_SUCCESS = 'INVITE_MEMBER_SUCCESS',
  INVITE_MEMBER_ERROR = 'INVITE_MEMBER_ERROR',

  CONFIRM_INVITE_MEMBER_REQUEST = 'CONFIRM_INVITE_MEMBER_REQUEST',
  CONFIRM_INVITE_MEMBER_SUCCESS = 'CONFIRM_INVITE_MEMBER_SUCCESS',
  CONFIRM_INVITE_MEMBER_ERROR = 'CONFIRM_INVITE_MEMBER_ERROR'
}

export default function profileReducer (
  state = initialState,
  action: ProfileActions,
): ProfileStore {
  switch (action.type) {
    case ProfileActionTypes.FETCH_TEAM_MEMBERS_SUCCESS: {
      return update(state, {
        members: { $set: action.response.members },
      })
    }

    case ProfileActionTypes.FETCH_ROLE_OPTIONS_SUCCESS: {
      return update(state, {
        roleOptions: { $set: action.response },
      })
    }

    default:
      return state
  }
}

export const fetchTeamMembersActions = {
  request: () => {
    return {
      type: ProfileActionTypes.FETCH_TEAM_MEMBERS_REQUEST,
    } as const
  },
  success: (response: FetchTeamMembersResponse) => {
    return {
      type: ProfileActionTypes.FETCH_TEAM_MEMBERS_SUCCESS,
      response: response,
    } as const
  },
  error: (error: string) => {
    return {
      type: ProfileActionTypes.FETCH_TEAM_MEMBERS_ERROR,
      error: error,
    } as const
  },
}

export const fetchRoleOptionsActions = {
  request: () => {
    return {
      type: ProfileActionTypes.FETCH_ROLE_OPTIONS_REQUEST,
    } as const
  },
  success: (response: FetchRoleOptionsResponse) => {
    return {
      type: ProfileActionTypes.FETCH_ROLE_OPTIONS_SUCCESS,
      response: response,
    } as const
  },
  error: (error: string) => {
    return {
      type: ProfileActionTypes.FETCH_ROLE_OPTIONS_ERROR,
      error: error,
    } as const
  },
}

export const inviteMemberActions = {
  request: (email: string, roleId: string) => {
    return {
      type: ProfileActionTypes.INVITE_MEMBER_REQUEST,
      payload: {
        email: email,
        'role_id': roleId,
      },
    } as const
  },
  success: (response: InviteMemberResponse) => {
    return {
      type: ProfileActionTypes.INVITE_MEMBER_SUCCESS,
      response: response,
    } as const
  },
  error: (error: string) => {
    return {
      type: ProfileActionTypes.INVITE_MEMBER_ERROR,
      error: error,
    } as const
  },
}

export const confirmInviteActions = {
  request: (confirmationToken: string) => {
    return {
      type: ProfileActionTypes.CONFIRM_INVITE_MEMBER_REQUEST,
      payload: { token: confirmationToken },
    } as const
  },
  success: (response: ConfirmInviteResponse) => {
    return {
      type: ProfileActionTypes.CONFIRM_INVITE_MEMBER_SUCCESS,
      response: response,
    } as const
  },
  error: (error: string) => {
    return {
      type: ProfileActionTypes.CONFIRM_INVITE_MEMBER_ERROR,
      error: error,
    } as const
  },
}
