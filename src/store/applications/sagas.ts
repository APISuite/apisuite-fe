import { call, put, select, takeLatest } from "redux-saga/effects";

import { API_URL } from "constants/endpoints";
import request from "util/request";

import { Store } from "store/types";
import { AppData } from "./types";
import { CreateAppAction, DeleteAppAction, GetUserAppAction, RequestAPIAccessAction, UpdateAppAction } from "./actions/types";
import { createAppSuccess, createAppError, CREATE_APP } from "./actions/createApp";
import { updateAppError, updateAppSuccess, UPDATE_APP } from "./actions/updatedApp";
import { deleteAppError, deleteAppSuccess, DELETE_APP } from "./actions/deleteApp";
import { getAllUserApps, getAllUserAppsError, getAllUserAppsSuccess, GET_ALL_USER_APPS } from "./actions/getAllUserApps";
import { requestAPIAccessError, requestAPIAccessSuccess, REQUEST_API_ACCESS } from "./actions/requestApiAccess";
import { getUserAppError, getUserAppSuccess, GET_USER_APP } from "./actions/getUserApp";
import { handleSessionExpire } from "store/auth/actions/expiredSession";

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
  } catch (error) {
    yield put(requestAPIAccessError({}));
    yield put(handleSessionExpire({}));
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
