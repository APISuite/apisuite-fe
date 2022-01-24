import { call, put, takeLatest } from "redux-saga/effects";

import { openNotification } from "store/notificationStack/actions/notification";

import {
  updatePasswordRequestError,
  updatePasswordRequestSuccess,
  UPDATE_PASSWORD_REQUEST,
} from "./actions/updatePassword";

import { API_URL } from "constants/endpoints";

import { UpdatePasswordRequestAction } from "./actions/types";

import request from "util/request";
import { getReCAPTCHAToken, ReCaptchaActions } from "util/getReCAPTCHAToken";

export function * updatePasswordRequestSaga (action: UpdatePasswordRequestAction) {
  try {
    const updatePasswordRequestURL = `${API_URL}/users/password`;
    // request ReCaptcha token - this might trigger a visual challenge to the user
    const recaptchaToken: string = yield call(getReCAPTCHAToken, ReCaptchaActions.password);

    const updatePasswordRequestData = {
      old_password: action.oldPassword,
      new_password: action.newPassword,
      recaptchaToken,
    };

    yield call(request, {
      url: updatePasswordRequestURL,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(updatePasswordRequestData),
    });

    yield put(updatePasswordRequestSuccess({}));
    yield put(openNotification("success", "Your password was updated successfully!", 3000));
  } catch (error) {
    yield put(updatePasswordRequestError({}));
    yield put(openNotification("error", "Could not update your password. Please try again.", 3000));
  }
}

function * rootSaga () {
  yield takeLatest(UPDATE_PASSWORD_REQUEST, updatePasswordRequestSaga);
}

export default rootSaga;
