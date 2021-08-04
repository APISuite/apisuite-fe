import { GetGatewaySettingsAction, GetGatewaySettingsActionSuccess, GetGatewaySettingsActionError } from "./types";

export const GET_GATEWAY_SETTINGS_ACTION = "API/Version/GET_GATEWAY_SETTINGS_ACTION";
export const GET_GATEWAY_SETTINGS_ACTION_SUCCESS = "API/Version/GET_GATEWAY_SETTINGS_ACTION_SUCCESS";
export const GET_GATEWAY_SETTINGS_ACTION_ERROR = "API/Version/GET_GATEWAY_SETTINGS_ACTION_ERROR";

export const getGatewaySettingsAction = (payload: Omit<GetGatewaySettingsAction, "type">) => {
  return { type: GET_GATEWAY_SETTINGS_ACTION, ...payload };
};

export const getGatewaySettingsActionSuccess = (payload: Omit<GetGatewaySettingsActionSuccess, "type">) => {
  return { type: GET_GATEWAY_SETTINGS_ACTION_SUCCESS, ...payload };
};

export const getGatewaySettingsActionError = (payload: Omit<GetGatewaySettingsActionError, "type">) => {
  return { type: GET_GATEWAY_SETTINGS_ACTION_ERROR, ...payload };
};
