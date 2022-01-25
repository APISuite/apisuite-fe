import update from "immutability-helper";

import { ApplicationsActions } from "./actions/types";
import { ApplicationsStore } from "./types";
import { CREATE_APP, CREATE_APP_ERROR, CREATE_APP_SUCCESS } from "./actions/createApp";
import { DELETE_APP, DELETE_APP_ERROR, DELETE_APP_SUCCESS } from "./actions/deleteApp";
import { GET_ALL_USER_APPS_SUCCESS } from "./actions/getAllUserApps";
import { GET_USER_APP, GET_USER_APP_ERROR, GET_USER_APP_SUCCESS } from "./actions/getUserApp";
import { REQUEST_API_ACCESS, REQUEST_API_ACCESS_ERROR, REQUEST_API_ACCESS_SUCCESS } from "./actions/requestApiAccess";
import { UPDATE_APP, UPDATE_APP_ERROR, UPDATE_APP_SUCCESS } from "./actions/updatedApp";
import { UPLOAD_APP_MEDIA_SUCCESS } from "./actions/appMediaUpload";
import { DELETE_APP_MEDIA_SUCCESS } from "./actions/deleteAppMedia";
import { GET_APP_TYPES_ERROR, GET_APP_TYPES_SUCCESS } from "./actions/getAppTypes";
import { CHECK_BLUEPRINT_AUTH_ACTION, CHECK_BLUEPRINT_AUTH_ACTION_SUCCESS, CHECK_BLUEPRINT_AUTH_ACTION_ERROR } from "./actions/checkBlueprintAuth";
import { TOGGLE_BLUEPRINT_APP_STATUS_ACTION, TOGGLE_BLUEPRINT_APP_STATUS_ACTION_ERROR, TOGGLE_BLUEPRINT_APP_STATUS_ACTION_SUCCESS } from "./actions/toggleBlueprintAppStatus";

/** Initial state */
const initialState: ApplicationsStore = {
  currentApp: {
    clientId: "",
    clientSecret: "",
    createdAt: "",
    description: "",
    directUrl: "",
    id: 0,
    labels: [],
    logo: "",
    metadata: [],
    name: "",
    orgId: "",
    privacyUrl: "",
    redirectUrl: "https://",
    summary: "",
    subscriptions: [],
    supportUrl: "",
    tosUrl: "",
    updatedAt: "",
    visibility: "",
    websiteUrl: "",
    youtubeUrl: "",
    media: [],
    appType: {
      id: 0,
      type: "client",
      createdAt: "",
      updatedAt: "",
    },
    appTypeId: 0,
  },
  createAppStatus: {
    id: -1,
    isError: false,
    isRequesting: false,
  },
  deleteAppStatus: {
    isError: false,
    isRequesting: false,
  },
  getApp: {
    isError: false,
    isRequesting: false,
  },
  requestingAPIAccessStatus: {
    isError: false,
    isRequesting: false,
  },
  types: [],
  updateAppStatus: {
    isError: false,
    isRequesting: false,
  },
  userApps: [],

  // Blueprint apps
  allBlueprintApps: [],
  currentBlueprintAppData: {
    auth_type: "",
    api_method: "",
    api_url: "",
    app_conf: {
      auth_url: "",
      clt_id: "",
      clt_secret: "",
      conn_auth_type: "",
      redirect_url: "",
      scope: "",
      token_url: "",
      token: "",
    },
    app_method: "",
    app_name: "",
    app_url: "",
    polling_interval: "",
  },
  isActive: false,
  checkBlueprintAuthStatus: {
    isChecked: false,
    isError: false,
    isRequesting: false,
  },
  toggleBlueprintAppStatus: {
    isError: false,
    isRequesting: false,
  },
  currentBlueprintAppFields: [],
};

/** Reducer */
export default function reducer (
  state = initialState,
  action: ApplicationsActions,
): ApplicationsStore {
  switch (action.type) {
    case CHECK_BLUEPRINT_AUTH_ACTION: {
      return update(state, {
        checkBlueprintAuthStatus: {
          isChecked: { $set: false },
          isError: { $set: false },
          isRequesting: { $set: true },
        },

        // TODO: Store the data, so it doesn't get lost after requesting success/error.
        currentBlueprintAppData: { $set: action.currentBlueprintAppData },
      });
    }

    case CHECK_BLUEPRINT_AUTH_ACTION_SUCCESS: {
      return update(state, {
        checkBlueprintAuthStatus: {
          isChecked: { $set: true },
          isRequesting: { $set: false },
        },

        currentBlueprintAppFields:  { $set: action.fields },
      });
    }

    case CHECK_BLUEPRINT_AUTH_ACTION_ERROR: {
      return update(state, {
        checkBlueprintAuthStatus: {
          isChecked: { $set: true },
          isError: { $set: true },
          isRequesting: { $set: false },
        },
      });
    }

    case TOGGLE_BLUEPRINT_APP_STATUS_ACTION: {
      return update(state, {
        toggleBlueprintAppStatus: {
          isError: { $set: false },
          isRequesting: { $set: true },
        },

        checkBlueprintAuthStatus: {
          isChecked: { $set: false },
          isError: { $set: false },
          isRequesting: { $set: false },
        },
      });
    }

    case TOGGLE_BLUEPRINT_APP_STATUS_ACTION_SUCCESS: {
      return update(state, {
        isActive: { $set: action.isActive },

        toggleBlueprintAppStatus: {
          isError: { $set: false },
          isRequesting: { $set: false },
        },
      });
    }

    case TOGGLE_BLUEPRINT_APP_STATUS_ACTION_ERROR: {
      return update(state, {
        toggleBlueprintAppStatus: {
          isError: { $set: true },
          isRequesting: { $set: false },
        },
      });
    }

    case CREATE_APP: {
      return update(state, {
        createAppStatus: {
          isError: { $set: false },
          isRequesting: { $set: true },
        },
      });
    }

    case CREATE_APP_SUCCESS: {
      return update(state, {
        createAppStatus: {
          isRequesting: { $set: false },
          id: { $set: action.appData.id },
        },
      });
    }

    case CREATE_APP_ERROR: {
      return update(state, {
        createAppStatus: {
          isError: { $set: true },
          isRequesting: { $set: false },
        },
      });
    }

    case DELETE_APP: {
      return update(state, {
        deleteAppStatus: {
          isError: { $set: false },
          isRequesting: { $set: true },
        },
      });
    }

    case DELETE_APP_SUCCESS: {
      return update(state, {
        deleteAppStatus: {
          isRequesting: { $set: false },
        },
      });
    }

    case DELETE_APP_ERROR: {
      return update(state, {
        deleteAppStatus: {
          isError: { $set: true },
          isRequesting: { $set: false },
        },
      });
    }

    case GET_ALL_USER_APPS_SUCCESS: {
      return update(state, {
        userApps: { $set: action.userApps },
      });
    }

    case GET_USER_APP: {
      return update(state, {
        getApp: {
          isError: { $set: false },
          isRequesting: { $set: true },
        },
      });
    }

    case GET_USER_APP_SUCCESS: {
      return {
        ...state,
        currentApp: {
          ...action.appData,
          appType: {
            ...action.appData.appType,
            id: action.appData.appType?.id || 1,
          },
        },
        getApp: {
          isError: false,
          isRequesting: false,
        },
      };
    }

    case GET_USER_APP_ERROR: {
      return update(state, {
        getApp: {
          isError: { $set: true },
          isRequesting: { $set: false },
        },
      });
    }

    case REQUEST_API_ACCESS: {
      return update(state, {
        requestingAPIAccessStatus: {
          isError: { $set: false },
          isRequesting: { $set: true },
        },
      });
    }

    case REQUEST_API_ACCESS_SUCCESS: {
      return update(state, {
        requestingAPIAccessStatus: {
          isRequesting: { $set: false },
        },
      });
    }

    case REQUEST_API_ACCESS_ERROR: {
      return update(state, {
        requestingAPIAccessStatus: {
          isError: { $set: true },
          isRequesting: { $set: false },
        },
      });
    }

    case UPDATE_APP: {
      return update(state, {
        updateAppStatus: {
          isError: { $set: false },
          isRequesting: { $set: true },
        },
      });
    }

    case UPDATE_APP_SUCCESS: {
      return update(state, {
        updateAppStatus: {
          isRequesting: { $set: false },
        },

        currentApp: { $set: action.appData },
      });
    }

    case UPDATE_APP_ERROR: {
      return update(state, {
        updateAppStatus: {
          isError: { $set: true },
          isRequesting: { $set: false },
        },
      });
    }

    case UPLOAD_APP_MEDIA_SUCCESS: {
      return update(state, {
        currentApp: {
          media: {
            $set: [...state.currentApp.media, ...action.savedImages.map(i => i.url)],
          },
        },
      });
    }

    case DELETE_APP_MEDIA_SUCCESS: {
      return update(state, {
        currentApp: {
          media: {
            $set: [...state.currentApp.media.filter((m) => m !== action.deleted)],
          },
        },
      });
    }

    case GET_APP_TYPES_ERROR:
    case GET_APP_TYPES_SUCCESS: {
      return update(state, {
        types: { $set: action.types },
      });
    }

    default:
      return state;
  }
}
