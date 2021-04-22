import update from 'immutability-helper'

import { LOGOUT } from 'containers/Auth/ducks'
import { AuthStoreActionTypes } from 'containers/Auth/types'

import { SubscriptionsActions, SubscriptionsStore } from './types'
import { GET_APIS_SUCCESS } from './actions/getAPIs'

/** Initial state */
const initialState: SubscriptionsStore = {
  apis: [],
}

// TODO: name all reducers according to feature and change them to named exports
/** Reducer */
export default function subscriptionsReducer (
  state = initialState,
  action: SubscriptionsActions | AuthStoreActionTypes['logout'],
): SubscriptionsStore {
  switch (action.type) {
    case LOGOUT: {
      return initialState
    }

    case GET_APIS_SUCCESS: {
      return update(state, {
        apis: { $set: action.apis },
      })
    }

    default:
      return state
  }
}
