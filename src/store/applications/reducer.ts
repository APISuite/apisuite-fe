import update from "immutability-helper";

import { ApplicationsActions } from "./actions/types";
import { ApplicationsStore } from "./types";
import { CREATE_APP, CREATE_APP_ERROR, CREATE_APP_SUCCESS } from "./actions/createApp";
import { DELETE_APP_MEDIA_SUCCESS } from "./actions/deleteAppMedia";
import { DELETE_APP, DELETE_APP_ERROR, DELETE_APP_SUCCESS } from "./actions/deleteApp";
import { GET_ALL_USER_APPS_SUCCESS } from "./actions/getAllUserApps";
import { GET_APP_TYPES_ERROR, GET_APP_TYPES_SUCCESS } from "./actions/getAppTypes";
import { GET_USER_APP, GET_USER_APP_ERROR, GET_USER_APP_RESET, GET_USER_APP_SUCCESS } from "./actions/getUserApp";
import { REQUEST_API_ACCESS, REQUEST_API_ACCESS_ERROR, REQUEST_API_ACCESS_SUCCESS } from "./actions/requestApiAccess";
import { UPDATE_APP, UPDATE_APP_ERROR, UPDATE_APP_SUCCESS } from "./actions/updatedApp";
import { UPLOAD_APP_MEDIA_SUCCESS } from "./actions/appMediaUpload";
import { VALIDATE_ACCESS_DETAILS_ACTION, VALIDATE_ACCESS_DETAILS_ACTION_SUCCESS, VALIDATE_ACCESS_DETAILS_ACTION_ERROR } from "./actions/validateAccessDetails";
import { GET_BLUEPRINT_CONFIG, GET_BLUEPRINT_CONFIG_SUCCESS, GET_BLUEPRINT_CONFIG_ERROR } from "./actions/getBlueprintAppConfig";
import { UPDATE_ACCESS_DETAILS_ACTION, UPDATE_ACCESS_DETAILS_ACTION_ERROR, UPDATE_ACCESS_DETAILS_ACTION_SUCCESS } from "./actions/updateAccessDetails";
import { GET_BLUEPRINT_DETAILS_ACTION, GET_BLUEPRINT_DETAILS_ACTION_SUCCESS, GET_BLUEPRINT_DETAILS_ACTION_ERROR } from "./actions/getBlueprintDetails";
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
    orgId: -1,
    privacyUrl: "",
    redirectUrl: "",
    shortDescription: "",
    subscriptions: [],
    supportUrl: "",
    tosUrl: "",
    updatedAt: "",
    visibility: "",
    websiteUrl: "",
    youtubeUrl: "",
    images: [],
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
    id: 0,
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

  /* Blueprint apps */

  // Statuses

  getBlueprintDetailsStatus: {
    isError: false,
    isRequesting: false,
    name: "",
  },

  getBlueprintAppConfigStatus: {
    isError: false,
    isRequesting: false,
    retrieved: false,
  },

  validateAccessDetailsStatus: {
    isError: false,
    isRequesting: false,
    validated: false,
  },

  toggleBlueprintAppStatus: {
    isError: false,
    isRequesting: false,
  },

  isActive: false,

  // App connector configuration data

  blueprintConfig: {
    app_conf: {
      auth_url: "",
      clt_id: "",
      clt_secret: "",
      conn_auth_type: "token",
      redirect_url: "",
      scope: "",
      token_url: "",
      token: "",
    },
    app_id: 0,
    app_method: "GET",
    app_name: "",
    app_url: "",
    auth_type: "token",
    polling_interval: "",
  },
};

/** Reducer */
export default function reducer (
  state = initialState,
  action: ApplicationsActions,
): ApplicationsStore {
  switch (action.type) {
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
        currentApp: { $set: action.appData },
        createAppStatus: {
          isRequesting: { $set: false },
          id: { $set: action.appData.id },
        },
      });
    }

    case CREATE_APP_ERROR: {
      return update(state, {
        currentApp: { $set: action.payload },
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
        userApps: { $set: state.userApps.filter((v) => v.id !== action.id) },
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
          id: { $set: action.appId },
          isError: { $set: false },
          isRequesting: { $set: true },
        },
        createAppStatus: {
          id: { $set: -1 },
        },
      });
    }

    case GET_USER_APP_SUCCESS: {
      return {
        ...state,
        currentApp: {
          ...action.appData,
          logo: action.appData.logo || "",
          images: action.appData.images || [],
          appType: {
            ...action.appData.appType,
            id: action.appData.appType?.id || 1,
          },
        },
        getApp: {
          ...state.getApp,
          isError: false,
          isRequesting: false,
        },
        blueprintConfig: {
          ...state.blueprintConfig,
          app_id: action.appData.id,
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

    case GET_USER_APP_RESET: {
      return update(state, {
        // Client, External, and Expert apps

        currentApp: { $set: initialState.currentApp },
        getApp: {
          id: { $set: 0 },
          isError: { $set: false },
          isRequesting: { $set: false },
        },

        // Blueprint apps
            
        blueprintConfig: { $set: initialState.blueprintConfig },
        getBlueprintAppConfigStatus: { $set: initialState.getBlueprintAppConfigStatus },
        getBlueprintDetailsStatus: { $set: initialState.getBlueprintDetailsStatus },
        isActive: { $set: false },
        toggleBlueprintAppStatus: { $set: initialState.toggleBlueprintAppStatus },
        validateAccessDetailsStatus: { $set: initialState.validateAccessDetailsStatus },
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
        currentApp: { $set: action.payload },
        updateAppStatus: {
          isError: { $set: true },
          isRequesting: { $set: false },
        },
      });
    }

    case UPLOAD_APP_MEDIA_SUCCESS: {
      return update(state, {
        currentApp: {
          images: {
            $set: [...state.currentApp.images, ...action.savedImages.map((i: { url: any }) => i.url)],
          },
        },
      });
    }

    case DELETE_APP_MEDIA_SUCCESS: {
      return update(state, {
        currentApp: {
          images: {
            $set: [...state.currentApp.images.filter((m) => m !== action.deleted)],
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

    // Blueprint-related actions

    case GET_BLUEPRINT_DETAILS_ACTION: {
      return update(state, {
        getBlueprintDetailsStatus: {
          isError: { $set: false },
          isRequesting: { $set: true },
          name: { $set: "" },
        },
      });
    }

    case GET_BLUEPRINT_DETAILS_ACTION_SUCCESS: {
      return {
        ...state,
        
        currentApp: {
          ...initialState.currentApp,
          description: action.blueprintData.data.description,
          logo: action.blueprintData.data.logo,
          labels: action.blueprintData.data.labels,
          shortDescription: action.blueprintData.data.overview,
          redirectUrl: action.blueprintData.data.appLink,
        },

        getBlueprintDetailsStatus: {
          isError: false,
          isRequesting: false,
          name: action.blueprintData.data.appName,
        },
      };
    }

    case GET_BLUEPRINT_DETAILS_ACTION_ERROR: {
      return update(state, {
        getBlueprintDetailsStatus: {
          isError: { $set: false },
          isRequesting: { $set: false },
          name: { $set: "" },
        },
      });
    }

    case GET_BLUEPRINT_CONFIG: {
      return update(state, {
        getBlueprintAppConfigStatus: {
          isError: { $set: false },
          isRequesting: { $set: true },
          retrieved: { $set: false },
        },
      });
    }

    case GET_BLUEPRINT_CONFIG_SUCCESS: {
      return update(state, {
        blueprintConfig: { $set: action.config },
      
        getBlueprintAppConfigStatus: {
          isError: { $set: false },
          isRequesting: { $set: false },
          retrieved: { $set: true },
        },

        validateAccessDetailsStatus: {
          isError: { $set: false },
          isRequesting: { $set: false },
          validated: { $set: true },
        },
      });
    }

    case GET_BLUEPRINT_CONFIG_ERROR: {
      return update(state, {
        getBlueprintAppConfigStatus: {
          isError: { $set: true },
          isRequesting: { $set: false },
          retrieved: { $set: false },
        },
      });
    }

    case UPDATE_ACCESS_DETAILS_ACTION: {
      return update(state, {
        blueprintConfig: { $set: action.newConfig },
      });
    }

    case UPDATE_ACCESS_DETAILS_ACTION_SUCCESS:
    case UPDATE_ACCESS_DETAILS_ACTION_ERROR: {
      return state;
    }

    case VALIDATE_ACCESS_DETAILS_ACTION: {
      return update(state, {
        validateAccessDetailsStatus: {
          isError: { $set: false },
          isRequesting: { $set: true },
          validated: { $set: false },
        },

        blueprintConfig: { $set: action.blueprintConfig },
      });
    }

    case VALIDATE_ACCESS_DETAILS_ACTION_SUCCESS: {
      return update(state, {
        validateAccessDetailsStatus: {
          isError: { $set: false },
          isRequesting: { $set: false },
          validated: { $set: true },
        },
      });
    }

    case VALIDATE_ACCESS_DETAILS_ACTION_ERROR: {
      return update(state, {
        validateAccessDetailsStatus: {
          isError: { $set: true },
          isRequesting: { $set: false },
          validated: { $set: false },
        },
      });
    }

    case TOGGLE_BLUEPRINT_APP_STATUS_ACTION: {
      return update(state, {
        toggleBlueprintAppStatus: {
          isError: { $set: false },
          isRequesting: { $set: true },
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

    default:
      return state;
  }
}
