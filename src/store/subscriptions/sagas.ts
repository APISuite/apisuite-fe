import { call, put, takeLatest } from "redux-saga/effects";
import { ApisResponse } from "./actions/types";
import { API_URL } from "constants/endpoints";
import request from "util/request";
import { handleSessionExpire } from "store/auth/actions/expiredSession";
import { getAPIsError, getAPIsSuccess, GET_APIS } from "./actions/getAPIs";

/**
 * Takes a list of items and builds a string usable as a URL query string.
 * Ex.: buildQueryParameters([1,2], 'user') => 'user=1&user=2'
 * */
function buildQueryParameters(items: string[], paramName: string): string {
  let params = "";
  for (let i = 0; i < items.length; i++) {
    if (i === 0) {
      params = `${paramName}=${items[i]}`;
      continue;
    }
    params += `&${paramName}=${items[i]}`;
  }
  return params;
}

function * getAPIsSaga () {
  try {
    const pagination = "page=1&pageSize=100";
    let getAPIsUrl = `${API_URL}/apis?${pagination}`;

    const typeParams = buildQueryParameters(["production, documentation"], "type");
    const sortParams = buildQueryParameters(["published"], "sort_by");
    const orderParams = buildQueryParameters(["asc"], "order");
    const name = "";
    const search = "";

    const params = [typeParams, sortParams, orderParams, name, search]
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
