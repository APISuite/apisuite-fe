import update from "immutability-helper";
import { APIVersionStore } from "./types";
import { APIVersionActions } from "./actions/types";
import { GET_API_VERSION, GET_API_VERSION_ERROR, GET_API_VERSION_SUCCESS } from "./actions/getAPIVersion";
import { LogoutAction } from "store/auth/actions/types";
import { LOGOUT } from "store/auth/actions/logout";

/** Initial state */
const initialState: APIVersionStore = {
  requested: true,
  error: false,
  version: {
    id: 0,
    apiId: 0,
    title: "",
    version: "",
    spec: null,
    live: false,
    deprecated: false,
    createdAt: "",
    updatedAt: "",
  },
};

/** Reducer */
export default function apiVersionReducer (
  state = initialState,
  action: APIVersionActions | LogoutAction,
): APIVersionStore {
  switch (action.type) {
    case LOGOUT: {
      return initialState;
    }

    case GET_API_VERSION: {
      return update(state, {
        requested: { $set: false },
      });
    }

    case GET_API_VERSION_SUCCESS: {
      return update(state, {
        requested: { $set: true },
        version: { $set: action.version },
      });
    }

    case GET_API_VERSION_ERROR: {
      return update(state, {
        requested: { $set: true },
        error: { $set: true },
      });
    }

    default:
      return state;
  }
}
