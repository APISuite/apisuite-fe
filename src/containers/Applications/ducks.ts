import update from 'immutability-helper'

import { AppData, ApplicationsActions, ApplicationsStore, CreateAppActionData, UpdateAppActionData } from './types'

/** Initial state */
const initialState: ApplicationsStore = {
  currentApp: {
    clientId: '',
    clientSecret: '',
    createdAt: '',
    description: '',
    id: 0,
    labels: [],
    logo: '',
    name: '',
    orgId: 0,
    privacyUrl: '',
    redirectUrl: '',
    shortDescription: '',
    subscriptions: [],
    supportUrl: '',
    tosUrl: '',
    updatedAt: '',
    websiteUrl: '',
    youtubeUrl: '',
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
}

/** Action types */
export const CREATE_APP_ACTION = 'Applications/CREATE_APP_ACTION'
export const CREATE_APP_ACTION_ERROR = 'Applications/CREATE_APP_ACTION_ERROR'
export const CREATE_APP_ACTION_SUCCESS = 'Applications/CREATE_APP_ACTION_SUCCESS'
export const DELETE_APP_ACTION = 'Applications/DELETE_APP_ACTION'
export const DELETE_APP_ACTION_ERROR = 'Applications/DELETE_APP_ACTION_ERROR'
export const DELETE_APP_ACTION_SUCCESS = 'Applications/DELETE_APP_ACTION_SUCCESS'
export const GET_ALL_USER_APPS_ACTION = 'Applications/GET_ALL_USER_APPS_ACTION'
export const GET_ALL_USER_APPS_ACTION_SUCCESS = 'Applications/GET_ALL_USER_APPS_ACTION_SUCCESS'
export const GET_USER_APP_ACTION = 'Applications/GET_USER_APP_ACTION'
export const GET_USER_APP_ACTION_SUCCESS = 'Applications/GET_USER_APP_ACTION_SUCCESS'
export const REQUEST_API_ACCESS_ACTION = 'Applications/REQUEST_API_ACCESS_ACTION'
export const REQUEST_API_ACCESS_ACTION_ERROR = 'Applications/REQUEST_API_ACCESS_ACTION_ERROR'
export const REQUEST_API_ACCESS_ACTION_SUCCESS = 'Applications/REQUEST_API_ACCESS_ACTION_SUCCESS'
export const UPDATE_APP_ACTION = 'Applications/UPDATE_APP_ACTION'
export const UPDATE_APP_ACTION_ERROR = 'Applications/UPDATE_APP_ACTION_ERROR'
export const UPDATE_APP_ACTION_SUCCESS = 'Applications/UPDATE_APP_ACTION_SUCCESS'

/** Reducer */
export default function reducer (
  state = initialState,
  action: ApplicationsActions,
): ApplicationsStore {
  switch (action.type) {
    case CREATE_APP_ACTION: {
      return update(state, {
        createAppStatus: {
          isError: { $set: false },
          isRequesting: { $set: true },
        },
      })
    }

    case CREATE_APP_ACTION_SUCCESS: {
      return update(state, {
        createAppStatus: {
          isRequesting: { $set: false },
        },
      })
    }

    case CREATE_APP_ACTION_ERROR: {
      return update(state, {
        createAppStatus: {
          isError: { $set: true },
          isRequesting: { $set: false },
        },
      })
    }

    case DELETE_APP_ACTION: {
      return update(state, {
        deleteAppStatus: {
          isError: { $set: false },
          isRequesting: { $set: true },
        },
      })
    }

    case DELETE_APP_ACTION_SUCCESS: {
      return update(state, {
        deleteAppStatus: {
          isRequesting: { $set: false },
        },
      })
    }

    case DELETE_APP_ACTION_ERROR: {
      return update(state, {
        deleteAppStatus: {
          isError: { $set: true },
          isRequesting: { $set: false },
        },
      })
    }

    case GET_ALL_USER_APPS_ACTION: {
      return state
    }

    case GET_ALL_USER_APPS_ACTION_SUCCESS: {
      return update(state, {
        userApps: { $set: action.userApps },
      })
    }

    case GET_USER_APP_ACTION: {
      return state
    }

    case GET_USER_APP_ACTION_SUCCESS: {
      return update(state, {
        currentApp: {
          clientId: { $set: action.appData.clientId },
          clientSecret: { $set: action.appData.clientSecret },
          createdAt: { $set: action.appData.createdAt },
          description: { $set: action.appData.description },
          id: { $set: action.appData.id },
          labels: { $set: action.appData.labels },
          logo: { $set: action.appData.logo },
          name: { $set: action.appData.name },
          orgId: { $set: action.appData.orgId },
          privacyUrl: { $set: action.appData.privacyUrl },
          redirectUrl: { $set: action.appData.redirectUrl },
          shortDescription: { $set: action.appData.shortDescription },
          subscriptions: { $set: action.appData.subscriptions },
          supportUrl: { $set: action.appData.supportUrl },
          tosUrl: { $set: action.appData.tosUrl },
          updatedAt: { $set: action.appData.updatedAt },
          websiteUrl: { $set: action.appData.websiteUrl },
          youtubeUrl: { $set: action.appData.youtubeUrl },
        },
      })
    }

    case REQUEST_API_ACCESS_ACTION: {
      return update(state, {
        requestingAPIAccessStatus: {
          isError: { $set: false },
          isRequesting: { $set: true },
        },
      })
    }

    case REQUEST_API_ACCESS_ACTION_SUCCESS: {
      return update(state, {
        requestingAPIAccessStatus: {
          isRequesting: { $set: false },
        },
      })
    }

    case REQUEST_API_ACCESS_ACTION_ERROR: {
      return update(state, {
        requestingAPIAccessStatus: {
          isError: { $set: true },
          isRequesting: { $set: false },
        },
      })
    }

    case UPDATE_APP_ACTION: {
      return update(state, {
        updateAppStatus: {
          isError: { $set: false },
          isRequesting: { $set: true },
        },
      })
    }

    case UPDATE_APP_ACTION_SUCCESS: {
      return update(state, {
        updateAppStatus: {
          isRequesting: { $set: false },
        },

        currentApp: {
          description: { $set: action.appData.description },
          labels: { $set: action.appData.labels },
          logo: { $set: action.appData.logo },
          name: { $set: action.appData.name },
          privacyUrl: { $set: action.appData.privacyUrl },
          redirectUrl: { $set: action.appData.redirectUrl },
          shortDescription: { $set: action.appData.shortDescription },
          supportUrl: { $set: action.appData.supportUrl },
          tosUrl: { $set: action.appData.tosUrl },
          websiteUrl: { $set: action.appData.websiteUrl },
          youtubeUrl: { $set: action.appData.youtubeUrl },
        },
      })
    }

    case UPDATE_APP_ACTION_ERROR: {
      return update(state, {
        updateAppStatus: {
          isError: { $set: true },
          isRequesting: { $set: false },
        },
      })
    }

    default:
      return state
  }
}

/** Action builders */
export function createAppAction (appData: CreateAppActionData) {
  return { type: CREATE_APP_ACTION, appData }
}

export function createAppActionSuccess () {
  return { type: CREATE_APP_ACTION_SUCCESS }
}

export function createAppActionError () {
  return { type: CREATE_APP_ACTION_ERROR }
}

export function updateAppAction (appData: UpdateAppActionData) {
  return { type: UPDATE_APP_ACTION, appData }
}

export function updateAppActionSuccess (appData: AppData) {
  return { type: UPDATE_APP_ACTION_SUCCESS, appData }
}

export function updateAppActionError () {
  return { type: UPDATE_APP_ACTION_ERROR }
}

export function deleteAppAction (appId: number, orgId?: number) {
  return { type: DELETE_APP_ACTION, appId, orgId }
}

export function deleteAppActionSuccess () {
  return { type: DELETE_APP_ACTION_SUCCESS }
}

export function deleteAppActionError () {
  return { type: DELETE_APP_ACTION_ERROR }
}

export function requestAPIAccessAction (appId: number) {
  return { type: REQUEST_API_ACCESS_ACTION, appId }
}

export function requestAPIAccessActionSuccess () {
  return { type: REQUEST_API_ACCESS_ACTION_SUCCESS }
}

export function requestAPIAccessActionError () {
  return { type: REQUEST_API_ACCESS_ACTION_ERROR }
}

export function getUserAppAction (appId: number, orgId: number) {
  return { type: GET_USER_APP_ACTION, appId, orgId }
}

export function getUserAppActionSuccess (appData: AppData) {
  return { type: GET_USER_APP_ACTION_SUCCESS, appData }
}

export function getAllUserAppsAction (userId: number) {
  return { type: GET_ALL_USER_APPS_ACTION, userId }
}

export function getAllUserAppsActionSuccess (userApps: AppData[]) {
  return { type: GET_ALL_USER_APPS_ACTION_SUCCESS, userApps }
}
