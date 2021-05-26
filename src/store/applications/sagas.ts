import { call, put, select, takeLatest } from "redux-saga/effects";

import { API_URL } from "constants/endpoints";
import { AppData } from "./types";
import { CREATE_APP, createAppError, createAppSuccess } from "./actions/createApp";
import { CreateAppAction, DeleteAppAction, GetUserAppAction, RequestAPIAccessAction, UpdateAppAction } from "./actions/types";
import { DELETE_APP, deleteAppError, deleteAppSuccess } from "./actions/deleteApp";
import { GET_ALL_USER_APPS, getAllUserApps, getAllUserAppsError, getAllUserAppsSuccess } from "./actions/getAllUserApps";
import { GET_USER_APP, getUserAppError, getUserAppSuccess } from "./actions/getUserApp";
import { handleSessionExpire } from "store/auth/actions/expiredSession";
import { REQUEST_API_ACCESS, requestAPIAccessError, requestAPIAccessSuccess } from "./actions/requestApiAccess";
import { Store } from "store/types";
import { UPDATE_APP, updateAppError, updateAppSuccess } from "./actions/updatedApp";
import request from "util/request";
import { i18n } from "@apisuite/fe-base";
import { openNotification } from "store/notificationStack/actions/notification";

export function * createAppActionSaga (action: CreateAppAction) {
  try {
    const data = {
      description: action.appData.description,
      labels: action.appData.labels,
      logo: action.appData.logo,
      name: action.appData.name,
      privacyUrl: action.appData.privacyUrl,
      redirectUrl: action.appData.redirectUrl,
      shortDescription: action.appData.shortDescription,
      supportUrl: action.appData.supportUrl,
      tosUrl: action.appData.tosUrl,
      visibility: action.appData.visibility,
      websiteUrl: action.appData.websiteUrl,
      youtubeUrl: action.appData.youtubeUrl,
    };

    const createAppUrl = `${API_URL}/apps`;

    yield call(request, {
      url: createAppUrl,
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: data,
    });

    yield put(createAppSuccess({}));
  } catch (error) {
    yield put(createAppError(error));
    yield put(handleSessionExpire({}));
  }
}

export function * updateAppActionSaga (action: UpdateAppAction) {
  try {
    const data = {
      description: action.appData.description,
      labels: action.appData.labels,
      logo: action.appData.logo,
      name: action.appData.name,
      privacyUrl: action.appData.privacyUrl,
      redirectUrl: action.appData.redirectUrl,
      shortDescription: action.appData.shortDescription,
      supportUrl: action.appData.supportUrl,
      tosUrl: action.appData.tosUrl,
      visibility: action.appData.visibility,
      websiteUrl: action.appData.websiteUrl,
      youtubeUrl: action.appData.youtubeUrl,
    };

    const updateAppUrl = `${API_URL}/apps/${action.appData.id}`;

    const response: Record<string, never> = yield call(request, {
      url: updateAppUrl,
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      data: data,
    });

    yield put(updateAppSuccess({
      appData: {
        clientId: response.clientId,
        clientSecret: response.clientSecret,
        createdAt: response.createdAt,
        description: response.description,
        id: response.id,
        labels: response.labels,
        logo: response.logo,
        name: response.name,
        orgId: response.orgId,
        privacyUrl: response.privacyUrl,
        redirectUrl: response.redirectUrl,
        shortDescription: response.shortDescription,
        subscriptions: response.subscriptions,
        supportUrl: response.supportUrl,
        tosUrl: response.tosUrl,
        updatedAt: response.updatedAt,
        visibility: response.visibility,
        websiteUrl: response.websiteUrl,
        youtubeUrl: response.youtubeUrl,
      },
    }));
  } catch (error) {
    yield put(updateAppError(error));
    yield put(handleSessionExpire({}));
  }
}

export function * deleteAppActionSaga (action: DeleteAppAction) {
  try {
    const deleteAppUrl = `${API_URL}/apps/${action.appId}`;

    yield call(request, {
      url: deleteAppUrl,
      method: "DELETE",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });

    if (action.orgId) {
      yield put(getAllUserApps({ userId: action.orgId }));
    }

    yield put(deleteAppSuccess({}));
  } catch (error) {
    /* TODO: Review the 'checkStatus' function in 'util/request.ts',
    as this Saga considers a response from the server whose status
    code is 204 (i.e., a 'No Content') as an error. */
    if (error.status === 204) {
      if (action.orgId) {
        yield put(getAllUserApps({ userId: action.orgId }));
      }

      yield put(deleteAppSuccess({}));
    } else {
      yield put(deleteAppError({}));
      yield put(handleSessionExpire({}));
    }
  }
}

export function * requestAPIAccessActionSaga (action: RequestAPIAccessAction) {
  try {
    const requestAPIAccessUrl = `${API_URL}/apps/${action.appId}/request`;

    const accessToken: string = yield select((state: Store) => state.auth.authToken);

    yield call(request, {
      url: requestAPIAccessUrl,
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "x-access-token": accessToken,
      },
    });

    yield put(requestAPIAccessSuccess({}));
    yield put(openNotification("success", i18n.t("applications.requestAPIAcessSuccess"), 3000));
  } catch (error) {
    yield put(requestAPIAccessError({}));
    yield put(handleSessionExpire({}));
    yield put(openNotification("error", i18n.t("applications.requestAPIAcessError"), 3000));
  }
}

export function * getAllUserAppsActionSaga () {
  try {
    const getAllUserAppsActionUrl = `${API_URL}/apps`;

    const response: any[] = yield call(request, {
      url: getAllUserAppsActionUrl,
      method: "GET",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });

    const allUserApps = response.map((userApp) => (
      {
        clientId: userApp.clientId,
        clientSecret: userApp.clientSecret,
        createdAt: userApp.createdAt,
        description: userApp.description,
        id: userApp.id,
        labels: userApp.labels,
        logo: userApp.logo,
        name: userApp.name,
        orgId: userApp.orgId,
        privacyUrl: userApp.privacyUrl,
        redirectUrl: userApp.redirectUrl,
        shortDescription: userApp.shortDescription,
        subscriptions: userApp.subscriptions,
        supportUrl: userApp.supportUrl,
        tosUrl: userApp.tosUrl,
        updatedAt: userApp.updatedAt,
        visibility: userApp.visibility,
        websiteUrl: userApp.websiteUrl,
        youtubeUrl: userApp.youtubeUrl,
      }
    ));

    yield put(getAllUserAppsSuccess({
      userApps: allUserApps.sort((userAppA: AppData, userAppB: AppData) => userAppA.id - userAppB.id),
    }));
  } catch (error) {
    yield put(getAllUserAppsError(error));
    yield put(handleSessionExpire({}));
  }
}

export function * getUserAppActionSaga (action: GetUserAppAction) {
  try {
    const getAllUserAppsActionUrl = `${API_URL}/apps`;

    const response: any[] = yield call(request, {
      url: getAllUserAppsActionUrl,
      method: "GET",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });

    const allUserApps = response.map((userApp) => (
      {
        clientId: userApp.clientId,
        clientSecret: userApp.clientSecret,
        createdAt: userApp.createdAt,
        description: userApp.description,
        id: userApp.id,
        labels: userApp.labels,
        logo: userApp.logo,
        name: userApp.name,
        orgId: userApp.orgId,
        privacyUrl: userApp.privacyUrl,
        redirectUrl: userApp.redirectUrl,
        shortDescription: userApp.shortDescription,
        subscriptions: userApp.subscriptions,
        supportUrl: userApp.supportUrl,
        tosUrl: userApp.tosUrl,
        updatedAt: userApp.updatedAt,
        visibility: userApp.visibility,
        websiteUrl: userApp.websiteUrl,
        youtubeUrl: userApp.youtubeUrl,
      }
    ));

    const indexOfUserAppWeWant = allUserApps.findIndex((userApp: AppData) => userApp.id === action.appId);

    yield put(getUserAppSuccess({ appData: allUserApps[indexOfUserAppWeWant] }));
  } catch (error) {
    yield put(getUserAppError(error));
    yield put(handleSessionExpire({}));
  }
}

function * rootSaga () {
  yield takeLatest(CREATE_APP, createAppActionSaga);
  yield takeLatest(DELETE_APP, deleteAppActionSaga);
  yield takeLatest(GET_ALL_USER_APPS, getAllUserAppsActionSaga);
  yield takeLatest(GET_USER_APP, getUserAppActionSaga);
  yield takeLatest(REQUEST_API_ACCESS, requestAPIAccessActionSaga);
  yield takeLatest(UPDATE_APP, updateAppActionSaga);
}

export default rootSaga;
