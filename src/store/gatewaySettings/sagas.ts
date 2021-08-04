import { call, put, takeLatest } from "redux-saga/effects";
import request from "util/request";
import { API_URL } from "constants/endpoints";
import { GatewaySettingsResponse } from "./types";
import { getGatewaySettingsActionError, getGatewaySettingsActionSuccess, GET_GATEWAY_SETTINGS_ACTION } from "./actions/getGatewaySettings";

function* getGatewaySettingsActionSaga() {
  try {
    const getGatewaySettingsActionUrl = `${API_URL}/settings/gateway`;

    const gatewaySettings: GatewaySettingsResponse = yield call(request, {
      url: getGatewaySettingsActionUrl,
      method: "GET",
    });

    yield put(getGatewaySettingsActionSuccess({ gatewaySettings }));
  } catch (error) {
    yield put(getGatewaySettingsActionError(error));
  }
}

export function* rootSaga() {
  yield takeLatest(GET_GATEWAY_SETTINGS_ACTION, getGatewaySettingsActionSaga);
}

export default rootSaga;
