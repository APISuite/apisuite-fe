import update from "immutability-helper";

import { ApplicationsActions } from "./actions/types";
import { ApplicationsStore } from "./types";
import { CREATE_APP, CREATE_APP_ERROR, CREATE_APP_SUCCESS } from "./actions/createApp";
import { DELETE_APP, DELETE_APP_ERROR, DELETE_APP_SUCCESS } from "./actions/deleteApp";
import { GET_ALL_USER_APPS_SUCCESS } from "./actions/getAllUserApps";
import { GET_USER_APP_SUCCESS } from "./actions/getUserApp";
import { REQUEST_API_ACCESS, REQUEST_API_ACCESS_ERROR, REQUEST_API_ACCESS_SUCCESS } from "./actions/requestApiAccess";
import { UPDATE_APP, UPDATE_APP_ERROR, UPDATE_APP_SUCCESS } from "./actions/updatedApp";
import { UPLOAD_APP_MEDIA_SUCCESS } from "./actions/appMediaUpload";
import { DELETE_APP_MEDIA_SUCCESS } from "./actions/deleteAppMedia";

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
    orgId: 0,
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
    media: [],
  },
  createAppStatus: {
    isError: false,
    isRequesting: false,
  },
  deleteAppStatus: {
    isError: false,
    isRequesting: false,
  },
  requestingAPIAccessStatus: {
    isError: false,
    isRequesting: false,
  },
  updateAppStatus: {
    isError: false,
    isRequesting: false,
  },
  userApps: [],
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
        createAppStatus: {
          isRequesting: { $set: false },
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

    case GET_USER_APP_SUCCESS: {
      return update(state, {
        currentApp: {
          clientId: { $set: action.appData.clientId },
          clientSecret: { $set: action.appData.clientSecret },
          createdAt: { $set: action.appData.createdAt },
          description: { $set: action.appData.description },
          directUrl: { $set: action.appData.directUrl },
          id: { $set: action.appData.id },
          labels: { $set: action.appData.labels },
          logo: { $set: action.appData.logo },
          metadata: { $set: action.appData.metadata },
          name: { $set: action.appData.name },
          orgId: { $set: action.appData.orgId },
          privacyUrl: { $set: action.appData.privacyUrl },
          redirectUrl: { $set: action.appData.redirectUrl },
          shortDescription: { $set: action.appData.shortDescription },
          subscriptions: { $set: action.appData.subscriptions },
          supportUrl: { $set: action.appData.supportUrl },
          tosUrl: { $set: action.appData.tosUrl },
          updatedAt: { $set: action.appData.updatedAt },
          visibility: { $set: action.appData.visibility },
          websiteUrl: { $set: action.appData.websiteUrl },
          youtubeUrl: { $set: action.appData.youtubeUrl },
          media: { $set: action.appData.media },
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

        currentApp: {
          description: { $set: action.appData.description },
          directUrl: { $set: action.appData.directUrl },
          labels: { $set: action.appData.labels },
          logo: { $set: action.appData.logo },
          metadata: { $set: action.appData.metadata },
          name: { $set: action.appData.name },
          privacyUrl: { $set: action.appData.privacyUrl },
          redirectUrl: { $set: action.appData.redirectUrl },
          shortDescription: { $set: action.appData.shortDescription },
          supportUrl: { $set: action.appData.supportUrl },
          tosUrl: { $set: action.appData.tosUrl },
          visibility: { $set: action.appData.visibility },
          websiteUrl: { $set: action.appData.websiteUrl },
          youtubeUrl: { $set: action.appData.youtubeUrl },
        },
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

    default:
      return state;
  }
}
