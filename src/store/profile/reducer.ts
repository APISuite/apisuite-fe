import update from "immutability-helper";

import { ProfileActions } from "./actions/types";
import { RESET_PROFILE_ERRORS } from "./actions/resetProfileErrors";
import { FETCH_TEAM_MEMBERS, FETCH_TEAM_MEMBERS_ERROR, FETCH_TEAM_MEMBERS_SUCCESS } from "./actions/fetchTeamMembers";
import { INVITE_TEAM_MEMBER, INVITE_TEAM_MEMBER_ERROR, INVITE_TEAM_MEMBER_SUCCESS } from "./actions/inviteTeamMember";
import { GET_PROFILE_SUCCESS } from "./actions/getProfile";
import { UPDATE_PROFILE, UPDATE_PROFILE_ERROR, UPDATE_PROFILE_SUCCESS } from "./actions/updateProfile";
import { FETCH_ORG, FETCH_ORG_ERROR, FETCH_ORG_SUCCESS } from "./actions/fetchOrg";
import { CREATE_ORG, CREATE_ORG_ERROR, CREATE_ORG_SUCCESS } from "./actions/createOrg";
import { UPDATE_ORG, UPDATE_ORG_ERROR, UPDATE_ORG_SUCCESS } from "./actions/updateOrg";
import { SWITCH_ORG, SWITCH_ORG_ERROR, SWITCH_ORG_SUCCESS } from "./actions/switchOrg";
import { FETCH_ROLE_OPTIONS_SUCCESS } from "./actions/fetchRoleOptions";
import { CHANGE_ROLE, CHANGE_ROLE_ERROR, CHANGE_ROLE_SUCCESS } from "./actions/changeRole";
import { DELETE_ACCOUNT, DELETE_ACCOUNT_ERROR, DELETE_ACCOUNT_SUCCESS } from "./actions/deleteAccount";
import { LogoutAction } from "store/auth/actions/types";
import { ProfileStore } from "./types";
import { LOGOUT } from "store/auth/actions/logout";

const initialState: ProfileStore = {
  members: [{
    Organization: {
      id: "",
      name: "",
    },
    User: {
      name: "",
      id: 0,
    },
    Role: {
      name: "",
      id: "",
    },
  }],
  profile: {
    current_org: {
      name: "",
      id: "",
      member_since: "",
      role: {
        name: "",
        id: "",
      },
    },
    orgs_member: [{
      id: "",
      name: "",
    }],
    user: {
      email: "",
      id: "",
      last_login: "",
      name: "",
      oidcProvider: null,
    },
  },
  roleOptions: [{
    name: "",
    id: "",
  }],
  org: {
    description: "",
    id: "",
    logo: "",
    name: "",
    privacyUrl: "",
    supportUrl: "",
    tosUrl: "",
    vat: "",
    websiteUrl: "",
    youtubeUrl: "",
  },
  requestStatuses: {
    getMembersRequest: {
      isRequesting: false,
      error: "",
    },
    getRolesRequest: {
      isRequesting: false,
      error: "",
    },
    inviteMemberRequest: {
      isRequesting: false,
      invited: false,
      error: "",
    },
    updateProfileRequest: {
      isRequesting: false,
      error: "",
    },
    createOrgRequest: {
      isRequesting: false,
      error: "",
    },
    updateOrgRequest: {
      isRequesting: false,
      error: "",
    },
    switchOrgRequest: {
      isRequesting: false,
      error: "",
    },
    changeRoleRequest: {
      isRequesting: false,
      error: "",
    },
    deleteAccount: {
      isRequesting: false,
      error: "",
    },
  },
};

export default function profileReducer (
  state = initialState,
  action: ProfileActions | LogoutAction,
): ProfileStore {
  switch (action.type) {
    // General actions
    case LOGOUT: {
      return initialState;
    }

    case RESET_PROFILE_ERRORS: {
      return update(state, {
        requestStatuses: {
          inviteMemberRequest: {
            error: { $set: "" },
          },
          updateProfileRequest: {
            error: { $set: "" },
          },
          updateOrgRequest: {
            error: { $set: "" },
          },
          changeRoleRequest: {
            error: { $set: "" },
          },
        },
      });
    }

    // Team members
    case FETCH_TEAM_MEMBERS: {
      return update(state, {
        requestStatuses: {
          getMembersRequest: {
            isRequesting: { $set: true },
          },
        },
      });
    }

    case FETCH_TEAM_MEMBERS_SUCCESS: {
      return update(state, {
        /* Previously '{ $set: action.response.members }', which caused the
        'Profile -> Team' view to NOT be rendered as a result of an error
        ('members' being 'undefined'). */
        requestStatuses: {
          getMembersRequest: {
            isRequesting: { $set: false },
          },
        },
        members: { $set: action.members },
      });
    }

    case FETCH_TEAM_MEMBERS_ERROR: {
      return update(state, {
        requestStatuses: {
          getMembersRequest: {
            isRequesting: { $set: false },
          },
        },
      });
    }

    case INVITE_TEAM_MEMBER: {
      return update(state, {
        requestStatuses: {
          inviteMemberRequest: {
            isRequesting: { $set: true },
            invited: { $set: false },
            error: { $set: "" },
          },
        },
      });
    }

    case INVITE_TEAM_MEMBER_SUCCESS: {
      return update(state, {
        requestStatuses: {
          inviteMemberRequest: {
            isRequesting: { $set: false },
            invited: { $set: true },
          },
        },
      });
    }

    case INVITE_TEAM_MEMBER_ERROR: {
      return update(state, {
        requestStatuses: {
          inviteMemberRequest: {
            isRequesting: { $set: false },
            invited: { $set: false },
            error: { $set: action.error },
          },
        },
      });
    }

    // Profile details
    case GET_PROFILE_SUCCESS: {
      return update(state, {
        /* Previously '{ $set: action.response.profile }', which caused the
        'Profile -> Overview' view to NOT be rendered as a result of an error
        ('profile' being 'undefined'). */
        profile: { $set: action.profile },
      });
    }

    case UPDATE_PROFILE: {
      return update(state, {
        requestStatuses: {
          updateProfileRequest: {
            isRequesting: { $set: true },
            error: { $set: "" },
          },
        },
      });
    }

    case UPDATE_PROFILE_SUCCESS: {
      return update(state, {
        requestStatuses: {
          updateProfileRequest: {
            isRequesting: { $set: false },
          },
        },
      });
    }

    case UPDATE_PROFILE_ERROR: {
      return update(state, {
        requestStatuses: {
          updateProfileRequest: {
            isRequesting: { $set: false },
            error: { $set: action.error },
          },
        },
      });
    }

    // Organisation details
    case FETCH_ORG: {
      return update(state, {
        requestStatuses: {
          getRolesRequest: {
            isRequesting: { $set: true },
          },
        },
      });
    }

    case FETCH_ORG_SUCCESS: {
      return update(state, {
        requestStatuses: {
          getRolesRequest: {
            isRequesting: { $set: false },
          },
        },

        /* Previously '{ $set: action.response.org }', which caused the
        'Profile -> Organisation' view to NOT be rendered as a result of an error
        ('org' being 'undefined'). */
        org: { $set: action.org },
      });
    }

    case FETCH_ORG_ERROR: {
      return update(state, {
        requestStatuses: {
          getRolesRequest: {
            isRequesting: { $set: false },
          },
        },
      });
    }

    case CREATE_ORG: {
      return update(state, {
        requestStatuses: {
          createOrgRequest: {
            isRequesting: { $set: true },
            error: { $set: "" },
          },
        },
      });
    }

    case CREATE_ORG_SUCCESS: {
      return update(state, {
        requestStatuses: {
          createOrgRequest: {
            isRequesting: { $set: false },
          },
        },

        org: { $set: action.org },
      });
    }

    case CREATE_ORG_ERROR: {
      return update(state, {
        requestStatuses: {
          createOrgRequest: {
            isRequesting: { $set: false },
            error: { $set: action.error },
          },
        },
      });
    }

    case UPDATE_ORG: {
      return update(state, {
        requestStatuses: {
          updateOrgRequest: {
            isRequesting: { $set: true },
            error: { $set: "" },
          },
        },
      });
    }

    case UPDATE_ORG_SUCCESS: {
      return update(state, {
        requestStatuses: {
          updateOrgRequest: {
            isRequesting: { $set: false },
          },
        },
      });
    }

    case UPDATE_ORG_ERROR: {
      return update(state, {
        requestStatuses: {
          updateOrgRequest: {
            isRequesting: { $set: false },
            error: { $set: action.error },
          },
        },
      });
    }

    case SWITCH_ORG: {
      return update(state, {
        requestStatuses: {
          switchOrgRequest: {
            isRequesting: { $set: true },
            error: { $set: "" },
          },
        },
      });
    }

    case SWITCH_ORG_SUCCESS: {
      return update(state, {
        requestStatuses: {
          switchOrgRequest: {
            isRequesting: { $set: false },
          },
        },
      });
    }

    case SWITCH_ORG_ERROR: {
      return update(state, {
        requestStatuses: {
          switchOrgRequest: {
            isRequesting: { $set: false },
            error: { $set: action.error },
          },
        },
      });
    }

    // User's role
    case FETCH_ROLE_OPTIONS_SUCCESS: {
      return update(state, {
        roleOptions: { $set: action.roles },
      });
    }

    case CHANGE_ROLE: {
      return update(state, {
        requestStatuses: {
          changeRoleRequest: {
            isRequesting: { $set: true },
            error: { $set: "" },
          },
        },
      });
    }

    case CHANGE_ROLE_SUCCESS: {
      return update(state, {
        requestStatuses: {
          changeRoleRequest: {
            isRequesting: { $set: false },
          },
        },
      });
    }

    case CHANGE_ROLE_ERROR: {
      return update(state, {
        requestStatuses: {
          changeRoleRequest: {
            isRequesting: { $set: false },
            error: { $set: action.error },
          },
        },
      });
    }

    // User's account deletion
    case DELETE_ACCOUNT: {
      return update(state, {
        requestStatuses: {
          deleteAccount: {
            isRequesting: { $set: true },
          },
        },
      });
    }

    case DELETE_ACCOUNT_SUCCESS:
    case DELETE_ACCOUNT_ERROR: {
      return update(state, {
        requestStatuses: {
          deleteAccount: {
            isRequesting: { $set: false },
          },
        },
      });
    }

    default:
      return state;
  }
}
