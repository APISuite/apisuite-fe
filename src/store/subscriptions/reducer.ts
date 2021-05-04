import update from "immutability-helper";

import { LOGOUT } from "store/auth/actions/logout";
import { LogoutAction } from "store/auth/actions/types";

import { SubscriptionsActions, SubscriptionsStore } from "./types";
import { GET_APIS_SUCCESS } from "./actions/getAPIs";

/** Initial state */
const initialState: SubscriptionsStore = {
  apis: [],
};

// TODO: name all reducers according to feature and change them to named exports
/** Reducer */
export default function subscriptionsReducer (
  state = initialState,
  action: SubscriptionsActions | LogoutAction,
): SubscriptionsStore {
  switch (action.type) {
    case LOGOUT: {
      return initialState;
    }

    case GET_APIS_SUCCESS: {
      return update(state, {
        apis: { $set: action.apis },
      });
    }

    default:
      return state;
  }
}
