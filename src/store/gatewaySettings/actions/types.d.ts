import { GET_GATEWAY_SETTINGS_ACTION, GET_GATEWAY_SETTINGS_ACTION_ERROR, GET_GATEWAY_SETTINGS_ACTION_SUCCESS } from "./getGatewaySettings";
import { GatewaySettingsResponse } from "../types";

// ACTION TYPES
export type GatewaySettingsActions =
  GetGatewaySettingsAction |
  GetGatewaySettingsActionError |
  GetGatewaySettingsActionSuccess

// ACTIONS
export type GetGatewaySettingsAction = {
  type: typeof GET_GATEWAY_SETTINGS_ACTION,
}

export type GetGatewaySettingsActionSuccess = {
  type: typeof GET_GATEWAY_SETTINGS_ACTION_SUCCESS,
  gatewaySettings: GatewaySettingsResponse,
}

export type GetGatewaySettingsActionError = {
  type: typeof GET_GATEWAY_SETTINGS_ACTION_ERROR,
}