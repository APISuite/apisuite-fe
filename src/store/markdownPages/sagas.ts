import { call, put, takeLatest } from "redux-saga/effects";
import { i18n } from "@apisuite/fe-base";

import { API_URL } from "constants/endpoints";
import { GetMarkdownPageResponse } from "./types";
import { GET_MARKDOWN_PAGE, getMarkdownPageError, getMarkdownPageSuccess } from "./actions/getMarkdownPage";
import { GetMarkdownPageAction } from "./actions/types";
import { handleSessionExpire } from "store/auth/actions/expiredSession";
import request from "util/request";


export function* getMarkdownPageSaga(action: GetMarkdownPageAction) {
  try {
    const mdPage: GetMarkdownPageResponse = yield call(request, {
      url: `${API_URL}/pages/${action.page}/${i18n.language}`,
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    yield put(getMarkdownPageSuccess(mdPage));
  } catch (error) {
    yield put(getMarkdownPageError({ error: error.message }));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

function* rootSaga() {
  yield takeLatest(GET_MARKDOWN_PAGE, getMarkdownPageSaga);
}

export default rootSaga;
