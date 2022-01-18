import { call, put, takeLatest } from "redux-saga/effects";

import { API_URL } from "constants/endpoints";
import { UploadMediaResponse } from "./types";
import { UploadMediaAction, DeleteMediaAction } from "./actions/types";
import { handleSessionExpire } from "store/auth/actions/expiredSession";
import request from "util/request";
import { UPLOAD_MEDIA, uploadMediaError, uploadMediaSuccess } from "./actions/uploadMedia";
import { DELETE_MEDIA, deleteMediaError, deleteMediaSuccess } from "./actions/deleteMedia";


export function* deleteMediaSaga(action: DeleteMediaAction) {
  try {
    yield call(request, {
      url: `${API_URL}/media/${action.orgId}?mediaURL=${encodeURIComponent(action.url)}`,
      method: "DELETE",
    });

    yield put(deleteMediaSuccess({ url: action.url }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(deleteMediaError({ error: error.message }));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

export function* uploadMediaSaga(action: UploadMediaAction) {
  try {
    const media: UploadMediaResponse = yield call(request, {
      url: `${API_URL}/media/${action.orgId}`,
      method: "POST",
      headers: {
        "content-type": "multipart/form-data",
      },
      data: action.file,
    });

    yield put(uploadMediaSuccess({ media }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(uploadMediaError({ error: error.message }));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

function* rootSaga() {
  yield takeLatest(DELETE_MEDIA, deleteMediaSaga);
  yield takeLatest(UPLOAD_MEDIA, uploadMediaSaga);
}

export default rootSaga;
