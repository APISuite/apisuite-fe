import { call, put, takeLatest } from "redux-saga/effects";
import { ApisResponse } from "./actions/types";
import { API_URL } from "constants/endpoints";
import request from "util/request";
import { handleSessionExpire } from "store/auth/actions/expiredSession";
import { getAPIsError, getAPIsSuccess, GET_APIS } from "./actions/getAPIs";

function * getAPIsSaga () {
  try {
    const getAPIsUrl = `${API_URL}/apis`;
    const response: ApisResponse = yield call(request, {
      url: getAPIsUrl,
      method: "GET",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });

    yield put(getAPIsSuccess({ apis: response.rows }));
  } catch (error) {
    // TODO: decide and implement error handling
    yield put(getAPIsError({}));
    yield put(handleSessionExpire({}));
  }
}

export function * rootSaga () {
  yield takeLatest(GET_APIS, getAPIsSaga);
}

export default rootSaga;
