import update from 'immutability-helper'
import { AuthStoreActionTypes } from 'containers/Auth/types'
import { LOGOUT } from 'containers/Auth/ducks'
import {
  ProfileActions,
  ProfileStore,
  FetchTeamMembersResponse,
  FetchRoleOptionsResponse,
  InviteMemberResponse,
  ConfirmInviteResponse,
  ChangeRoleResponse,
  GetProfileResponse,
  UpdateProfileResponse,
  UpdateOrgResponse,
  OrgInfo,
} from './types'

const initialState: ProfileStore = {
  members: [{
    'Organization': {
      id: '',
      name: '',
    },
    'User': {
      name: '',
      id: 0,
    },
    'Role': {
      name: '',
      id: '',
    },
  }],
  profile: {
    'current_org': {
      name: '',
      id: '',
      'member_since': '',
      role: {
        name: '',
        id: '',
      },
    },
    'orgs_member': [{
      id: '',
      name: '',
    }],
    user: {
      email: '',
      id: '',
      'last_login': '',
      name: '',
    },
  },
  roleOptions: [{
    name: '',
    id: '',
  }],
  org: {
    name: '',
    id: '',
    description: '',
    vat: '',
    website: '',
    terms: '',
    logo: '',
  },
  requestStatuses: {
    getMembersRequest: {
      isRequesting: false,
      error: '',
    },
    getRolesRequest: {
      isRequesting: false,
      error: '',
    },
    inviteMemberRequest: {
      isRequesting: false,
      invited: false,
      error: '',
    },
    updateProfileRequest: {
      isRequesting: false,
      error: '',
    },
    updateOrgRequest: {
      isRequesting: false,
      error: '',
    },
    changeRoleRequest: {
      isRequesting: false,
      error: '',
    },
    deleteAccount: {
      isRequesting: false,
      error: '',
    },
  },
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
  CONFIRM_INVITE_MEMBER_ERROR = 'CONFIRM_INVITE_MEMBER_ERROR',

  CHANGE_ROLE_REQUEST = 'CHANGE_ROLE_REQUEST',
  CHANGE_ROLE_SUCCESS = 'CHANGE_ROLE_SUCCESS',
  CHANGE_ROLE_ERROR = 'CHANGE_ROLE_ERROR',

  GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST',
  GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS',
  GET_PROFILE_ERROR = 'GET_PROFILE_ERROR',

  UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_ERROR = 'UPDATE_PROFILE_ERROR',

  FETCH_ORG_REQUEST = 'FETCH_ORG_REQUEST',
  FETCH_ORG_SUCCESS = 'FETCH_ORG_SUCCESS',
  FETCH_ORG_ERROR = 'FETCH_ORG_ERROR',

  UPDATE_ORG_REQUEST = 'UPDATE_ORG_REQUEST',
  UPDATE_ORG_SUCCESS = 'UPDATE_ORG_SUCCESS',
  UPDATE_ORG_ERROR = 'UPDATE_ORG_ERROR',

  RESET_ERRORS = 'RESET_ERRORS',

  DELETE_ACCOUNT_REQUEST = 'DELETE_ACCOUNT_REQUEST',
}

export default function profileReducer (
  state = initialState,
  action: ProfileActions | AuthStoreActionTypes['logout'],
): ProfileStore {
  switch (action.type) {
    case LOGOUT: {
      return initialState
    }

    case ProfileActionTypes.FETCH_TEAM_MEMBERS_REQUEST: {
      return update(state, {
        requestStatuses: {
          getMembersRequest: {
            isRequesting: { $set: true },
          },
        },
      })
    }

    case ProfileActionTypes.FETCH_TEAM_MEMBERS_SUCCESS: {
      return update(state, {
        /* Previously '{ $set: action.response.members }', which caused the
        'Profile -> Team' view to NOT be rendered as a result of an error
        ('members' being 'undefined'). */
        requestStatuses: {
          getMembersRequest: {
            isRequesting: { $set: false },
          },
        },
        members: { $set: action.response },
      })
    }

    case ProfileActionTypes.FETCH_TEAM_MEMBERS_ERROR: {
      return update(state, {
        requestStatuses: {
          getMembersRequest: {
            isRequesting: { $set: false },
          },
        },
      })
    }

    case ProfileActionTypes.INVITE_MEMBER_REQUEST: {
      return update(state, {
        requestStatuses: {
          inviteMemberRequest: {
            isRequesting: { $set: true },
            invited: { $set: false },
            error: { $set: '' },
          },
        },
      })
    }

    case ProfileActionTypes.INVITE_MEMBER_SUCCESS: {
      return update(state, {
        requestStatuses: {
          inviteMemberRequest: {
            isRequesting: { $set: false },
            invited: { $set: true },
          },
        },
      })
    }

    case ProfileActionTypes.INVITE_MEMBER_ERROR: {
      return update(state, {
        requestStatuses: {
          inviteMemberRequest: {
            isRequesting: { $set: false },
            invited: { $set: false },
            error: { $set: action.error },
          },
        },
      })
    }

    case ProfileActionTypes.UPDATE_PROFILE_REQUEST: {
      return update(state, {
        requestStatuses: {
          updateProfileRequest: {
            isRequesting: { $set: true },
            error: { $set: '' },
          },
        },
      })
    }

    case ProfileActionTypes.UPDATE_PROFILE_SUCCESS: {
      return update(state, {
        requestStatuses: {
          updateProfileRequest: {
            isRequesting: { $set: false },
          },
        },
      })
    }

    case ProfileActionTypes.UPDATE_PROFILE_ERROR: {
      return update(state, {
        requestStatuses: {
          updateProfileRequest: {
            isRequesting: { $set: false },
            error: { $set: action.error },
          },
        },
      })
    }

    case ProfileActionTypes.UPDATE_ORG_REQUEST: {
      return update(state, {
        requestStatuses: {
          updateOrgRequest: {
            isRequesting: { $set: true },
            error: { $set: '' },
          },
        },
      })
    }

    case ProfileActionTypes.UPDATE_ORG_SUCCESS: {
      return update(state, {
        requestStatuses: {
          updateOrgRequest: {
            isRequesting: { $set: false },
          },
        },
      })
    }

    case ProfileActionTypes.UPDATE_ORG_ERROR: {
      return update(state, {
        requestStatuses: {
          updateOrgRequest: {
            isRequesting: { $set: false },
            error: { $set: action.error },
          },
        },
      })
    }

    case ProfileActionTypes.CHANGE_ROLE_REQUEST: {
      return update(state, {
        requestStatuses: {
          changeRoleRequest: {
            isRequesting: { $set: true },
            error: { $set: '' },
          },
        },
      })
    }

    case ProfileActionTypes.CHANGE_ROLE_SUCCESS: {
      return update(state, {
        requestStatuses: {
          changeRoleRequest: {
            isRequesting: { $set: false },
          },
        },
      })
    }

    case ProfileActionTypes.CHANGE_ROLE_ERROR: {
      return update(state, {
        requestStatuses: {
          changeRoleRequest: {
            isRequesting: { $set: false },
            error: { $set: action.error },
          },
        },
      })
    }

    case ProfileActionTypes.FETCH_ROLE_OPTIONS_SUCCESS: {
      return update(state, {
        roleOptions: { $set: action.response },
      })
    }

    case ProfileActionTypes.GET_PROFILE_SUCCESS: {
      return update(state, {
        /* Previously '{ $set: action.response.profile }', which caused the
        'Profile -> Profile' view to NOT be rendered as a result of an error
        ('profile' being 'undefined'). */
        profile: { $set: action.response },
      })
    }

    case ProfileActionTypes.FETCH_ORG_REQUEST: {
      return update(state, {
        /* Previously '{ $set: action.response.org }', which caused the
        'Profile -> Organisation' view to NOT be rendered as a result of an error
        ('org' being 'undefined'). */
        requestStatuses: {
          getRolesRequest: {
            isRequesting: { $set: true },
          },
        },
      })
    }

    case ProfileActionTypes.FETCH_ORG_SUCCESS: {
      return update(state, {
        /* Previously '{ $set: action.response.org }', which caused the
        'Profile -> Organisation' view to NOT be rendered as a result of an error
        ('org' being 'undefined'). */
        requestStatuses: {
          getRolesRequest: {
            isRequesting: { $set: false },
          },
        },
        org: { $set: action.response },
      })
    }

    case ProfileActionTypes.FETCH_ORG_ERROR: {
      return update(state, {
        /* Previously '{ $set: action.response.org }', which caused the
        'Profile -> Organisation' view to NOT be rendered as a result of an error
        ('org' being 'undefined'). */
        requestStatuses: {
          getRolesRequest: {
            isRequesting: { $set: false },
          },
        },
      })
    }

    case ProfileActionTypes.RESET_ERRORS: {
      return update(state, {
        requestStatuses: {
          inviteMemberRequest: {
            error: { $set: '' },
          },
          updateProfileRequest: {
            error: { $set: '' },
          },
          updateOrgRequest: {
            error: { $set: '' },
          },
          changeRoleRequest: {
            error: { $set: '' },
          },
        },
      })
    }

    case ProfileActionTypes.DELETE_ACCOUNT_REQUEST: {
      return update(state, {
        requestStatuses: {
          deleteAccount: {
            isRequesting: { $set: true },
          },
        },
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
  success: (response: FetchTeamMembersResponse[]) => {
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

export const changeRoleActions = {
  request: (userId: string, orgId: string, roleId: string) => {
    return {
      type: ProfileActionTypes.CHANGE_ROLE_REQUEST,
      payload: {
        'user_id': userId,
        'org_id': orgId,
        'role_id': roleId,
      },
    } as const
  },
  success: (response: ChangeRoleResponse) => {
    return {
      type: ProfileActionTypes.CHANGE_ROLE_SUCCESS,
      response: response,
    } as const
  },
  error: (error: string) => {
    return {
      type: ProfileActionTypes.CHANGE_ROLE_ERROR,
      error: error,
    } as const
  },
}

export const getProfileActions = {
  request: () => {
    return {
      type: ProfileActionTypes.GET_PROFILE_REQUEST,
    } as const
  },
  success: (response: GetProfileResponse) => {
    return {
      type: ProfileActionTypes.GET_PROFILE_SUCCESS,
      response: response,
    } as const
  },
  error: (error: string) => {
    return {
      type: ProfileActionTypes.GET_PROFILE_ERROR,
      error: error,
    } as const
  },
}

export const updateProfileActions = {
  request: (name: string, bio: string, avatar: string, mobile: number, orgId: string) => {
    return {
      type: ProfileActionTypes.UPDATE_PROFILE_REQUEST,
      payload: {
        name: name,
        bio: bio,
        avatar: avatar,
        mobile: mobile,
        'org_id': orgId,
      },
    } as const
  },
  success: (response: UpdateProfileResponse) => {
    return {
      type: ProfileActionTypes.UPDATE_PROFILE_SUCCESS,
      response: response,
    } as const
  },
  error: (error: string) => {
    return {
      type: ProfileActionTypes.UPDATE_PROFILE_ERROR,
      error: error,
    } as const
  },
}

export const fetchOrgActions = {
  request: (orgId: string) => {
    return {
      type: ProfileActionTypes.FETCH_ORG_REQUEST,
      payload: {
        'org_id': orgId,
      },
    } as const
  },
  success: (response: ChangeRoleResponse) => {
    return {
      type: ProfileActionTypes.FETCH_ORG_SUCCESS,
      response: response,
    } as const
  },
  error: (error: string) => {
    return {
      type: ProfileActionTypes.FETCH_ORG_ERROR,
      error: error,
    } as const
  },
}

export const updateOrgActions = {
  request: (orgId: string, orgInfo: OrgInfo) => {
    return {
      type: ProfileActionTypes.UPDATE_ORG_REQUEST,
      orgId: orgId,
      payload: orgInfo,
    } as const
  },
  success: (response: UpdateOrgResponse) => {
    return {
      type: ProfileActionTypes.UPDATE_ORG_SUCCESS,
      response: response,
    } as const
  },
  error: (error: string) => {
    return {
      type: ProfileActionTypes.UPDATE_ORG_ERROR,
      error: error,
    } as const
  },
}

export const resetErrorAction = () =>
  ({
    type: ProfileActionTypes.RESET_ERRORS,
  } as const
  )

export const deleteAccountActions = {
  request: () => {
    return {
      type: ProfileActionTypes.DELETE_ACCOUNT_REQUEST,
    } as const
  },
}
