import update from "immutability-helper";
import {
  GET_GATEWAY_SETTINGS_ACTION,
  GET_GATEWAY_SETTINGS_ACTION_ERROR,
  GET_GATEWAY_SETTINGS_ACTION_SUCCESS,
} from "./actions/getGatewaySettings";
import { GatewaySettingsStore } from "./types";
import { GatewaySettingsActions } from "./actions/types";

/** Initial state */
const initialState: GatewaySettingsStore = {
  configuration: {
    apiKey: "",
    url: "",
  },
  error: false,
  provider: "",
  requesting: false,
};

/** Reducer */
export default function gatewaySettingsReducer(
  state = initialState,
  action: GatewaySettingsActions,
): GatewaySettingsStore {
  switch (action.type) {
    case GET_GATEWAY_SETTINGS_ACTION: {
      return update(state, {
        error: { $set: false },
        requesting: { $set: true },
      });
    }

    case GET_GATEWAY_SETTINGS_ACTION_SUCCESS: {
      return update(state, {
        configuration: { $set: action.gatewaySettings.configuration },
        provider: { $set: action.gatewaySettings.provider },
        requesting: { $set: false },
      });
    }

    case GET_GATEWAY_SETTINGS_ACTION_ERROR: {
      return update(state, {
        error: { $set: true },
        requesting: { $set: false },
      });
    }

    default:
      return state;
  }
}
