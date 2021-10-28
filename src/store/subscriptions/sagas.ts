import { call, put, takeLatest } from "redux-saga/effects";
import { ApisResponse } from "./actions/types";
import { API_URL } from "constants/endpoints";
import request from "util/request";
import { handleSessionExpire } from "store/auth/actions/expiredSession";
import { getAPIsError, getAPIsSuccess, GET_APIS } from "./actions/getAPIs";
import qs from "qs";

function * getAPIsSaga () {
  try {
    const pagination = qs.stringify({
      page: 1,
      pageSize: 100,
    });

    let getAPIsUrl = `${API_URL}/apis?${pagination}`;

    const queryParams = qs.stringify(
      {
        type: ["cloud", "local"],
        sort_by: ["published"],
        order: ["asc"],
      },
      {
        indices: false,
      }
    );

    const name = "";
    const search = "";

    const params = [queryParams, name, search]
      .filter((p) => p.length)
      .join("&");

    getAPIsUrl = params.length ? `${getAPIsUrl}&${params}` : getAPIsUrl;

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
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

export function * rootSaga () {
  yield takeLatest(GET_APIS, getAPIsSaga);
}

export default rootSaga;
