import { call, put, select, takeLatest } from "redux-saga/effects";

import { API_URL } from "constants/endpoints";
import qs from "qs";
import { i18n } from "@apisuite/fe-base";

import { AppTypesTab } from "pages/AppView/types";
import { history } from "store";
import { handleSessionExpire } from "store/auth/actions/expiredSession";
import { openNotification } from "store/notificationStack/actions/notification";
import { Store } from "store/types";
import { clearProps } from "util/clear";
import { linker } from "util/linker";
import request from "util/request";
import { AppData, AppType } from "./types";
import { CREATE_APP, createAppError, createAppSuccess } from "./actions/createApp";
import { CheckBlueprintAuthAction, CreateAppAction, DeleteAppAction, DeleteAppMediaAction, GetAllUserAppsAction, GetUserAppAction, MapFieldsAction, RequestAPIAccessAction, ToggleBlueprintAppStatusAction, UpdateAppAction, UploadAppMediaAction } from "./actions/types";
import { DELETE_APP, deleteAppError, deleteAppSuccess } from "./actions/deleteApp";
import { GET_ALL_USER_APPS, getAllUserApps, getAllUserAppsError, getAllUserAppsSuccess } from "./actions/getAllUserApps";
import { GET_USER_APP, getUserAppError, getUserAppSuccess } from "./actions/getUserApp";
import { REQUEST_API_ACCESS, requestAPIAccessError, requestAPIAccessSuccess } from "./actions/requestApiAccess";
import { UPDATE_APP, updateAppError, updateAppSuccess } from "./actions/updatedApp";
import { uploadAppMediaError, uploadAppMediaSuccess, UPLOAD_APP_MEDIA } from "./actions/appMediaUpload";
import { deleteAppMediaError, deleteAppMediaSuccess, DELETE_APP_MEDIA } from "./actions/deleteAppMedia";
import { UploadResponse } from "./actions/types";
import { getAppTypesError, getAppTypesSuccess, GET_APP_TYPES } from "./actions/getAppTypes";
import { checkBlueprintAuthActionError, checkBlueprintAuthActionSuccess, CHECK_BLUEPRINT_AUTH_ACTION } from "./actions/checkBlueprintAuth";
import { toggleBlueprintAppStatusActionError, toggleBlueprintAppStatusActionSuccess, TOGGLE_BLUEPRINT_APP_STATUS_ACTION } from "./actions/toggleBlueprintAppStatus";
import { mapFieldsActionSuccess, mapFieldsActionError, MAP_FIELDS_ACTION } from "./actions/mapFields";

const appDataFilter = ["appType", "clientId", "clientSecret", "createdAt", "id", "idpProvider", "images", "org_id", "orgId", "redirect_url", "state", "updatedAt"];

export function* createAppActionSaga(action: CreateAppAction) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let data = Object.fromEntries(Object.entries(action.appData).filter(([_, v]) => !!v));
    data = clearProps(data, appDataFilter);

    const createAppUrl = `${API_URL}/organizations/${action.orgID}/apps`;

    const app: AppData = yield call(request, {
      url: createAppUrl,
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: data,
    });

    yield put(createAppSuccess({ appData: app }));
    history.push(`/dashboard/apps/${app.id}/type/${app.appType.id}/${AppTypesTab.GENERAL}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(createAppError({ payload: action.appData }));
    yield put(openNotification("error", i18n.t("applications.error.create"), 3000));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

export function* updateAppActionSaga(action: UpdateAppAction) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let data = Object.fromEntries(Object.entries(action.appData).filter(([_, v]) => v !== null));
    data = clearProps(data, appDataFilter);
    if (!action.appData.appTypeId) {
      delete data.appTypeId;
    }
    const links = ["logo", "privacyUrl", "supportUrl", "redirectUrl", "tosUrl", "websiteUrl", "youtubeUrl"];
    for (const link of links) {
      if (data.hasOwnProperty(link) && data[link]) {
        data[link] = linker(data[link]);
      } else if (action.appData.hasOwnProperty(link)) {
        data[link] = "";
      }
    }

    const updateAppUrl = `${API_URL}/organizations/${action.orgID}/apps/${action.appData.id}`;

    const response: AppData = yield call(request, {
      url: updateAppUrl,
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      data: data,
    });

    yield put(updateAppSuccess({
      appData: { ...response },
    }));
    yield put(openNotification("success", i18n.t("applications.success.update", { name: response.name }), 3000));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(updateAppError({ payload: action.appData }));
    yield put(openNotification("error", i18n.t("applications.error.update"), 3000));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

export function* deleteAppActionSaga(action: DeleteAppAction) {
  try {
    const deleteAppUrl = `${API_URL}/organizations/${action.orgID}/apps/${action.appId}`;

    yield call(request, {
      url: deleteAppUrl,
      method: "DELETE",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });

    yield put(deleteAppSuccess({}));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(deleteAppError({}));

    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

export function* requestAPIAccessActionSaga(action: RequestAPIAccessAction) {
  try {
    const requestAPIAccessUrl = `${API_URL}/organizations/${action.orgID}/apps/${action.appId}/request`;

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

    /* We need to retrieve the user's apps after the above request, as we want up-to-date
    info on every app's 'Request access' status. */
    yield put(getAllUserApps({ orgID: action.orgID }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(requestAPIAccessError({}));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
    yield put(openNotification("error", i18n.t("applications.requestAPIAcessError"), 3000));
  }
}

export function* getAllUserAppsActionSaga(action: GetAllUserAppsAction) {
  try {
    const getAllUserAppsActionUrl = `${API_URL}/organizations/${action.orgID}/apps`;

    const response: AppData[] = yield call(request, {
      url: getAllUserAppsActionUrl,
      method: "GET",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });

    const allUserApps = response.map((userApp) => (
      { ...userApp }
    ));

    yield put(getAllUserAppsSuccess({
      userApps: allUserApps.sort((userAppA: AppData, userAppB: AppData) => userAppA.id - userAppB.id),
    }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(getAllUserAppsError(error));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

export function* getUserAppActionSaga(action: GetUserAppAction) {
  try {
    const getUserAppActionUrl = `${API_URL}/organizations/${action.orgID}/apps/${action.appId}`;

    const response: AppData = yield call(request, {
      url: getUserAppActionUrl,
      method: "GET",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });

    yield put(getUserAppSuccess({ appData: response }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(getUserAppError(error));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

export function* uploadAppMediaActionSaga(action: UploadAppMediaAction) {
  try {
    const requestAPIAccessUrl = `${API_URL}/organizations/${action.orgID}/apps/${action.appId}/media`;

    const res: UploadResponse = yield call(request, {
      url: requestAPIAccessUrl,
      method: "PUT",
      headers: {
        "content-type": "multipart/form-data",
      },
      data: action.media,
    });

    yield put(uploadAppMediaSuccess(res));
    yield put(openNotification("success", i18n.t("mediaUpload.uploadSuccess"), 3000));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(uploadAppMediaError({}));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
    yield put(openNotification("error", i18n.t("mediaUpload.uploadError"), 3000));
  }
}

export function* deleteAppMediaActionSaga(action: DeleteAppMediaAction) {
  try {
    const queryString = qs.stringify({
      mediaURL: action.media,
    });
    const deleteMediaURL = `${API_URL}/organizations/${action.orgID}/apps/${action.appId}/media?${queryString}`;

    yield call(request, {
      url: deleteMediaURL,
      method: "DELETE",
    });

    yield put(deleteAppMediaSuccess({ deleted: action.media }));
    yield put(openNotification("success", i18n.t("mediaUpload.deleteSuccess"), 3000));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(deleteAppMediaError({}));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
    yield put(openNotification("error", i18n.t("mediaUpload.deleteError"), 3000));
  }
}

export function* getAppTypesActionSaga() {
  try {
    const getTypeUrl = `${API_URL}/app/types`;

    const response: AppType[] = yield call(request, {
      url: getTypeUrl,
      method: "GET",
    });

    yield put(getAppTypesSuccess({ types: response }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(getAppTypesError({ types: [] }));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

export function* checkBlueprintAuthActionSaga(action: CheckBlueprintAuthAction) {
  try {
    // TODO: URL should not be hardcoded, I believe
    const checkBlueprintAuthUrl = "https://appconnector.proxy.apisuite.io/apps/";

    // TODO: Improve response type
    const response: unknown = yield call(request, {
      url: checkBlueprintAuthUrl,
      method: "POST",
      data: action.currentBlueprintAppData,
    });

    if (action.currentBlueprintAppData.auth_type === "oauth") {
      window.open(
        response.data,
        "_blank"
      );
    }

    yield put(checkBlueprintAuthActionSuccess({
      currentBlueprintAppData: action.currentBlueprintAppData,
      fields: action.currentBlueprintAppData.auth_type === "oauth" ? ["health_status"] : response.data.fields,
    }));

    // TODO: Add translations
    yield put(openNotification("success", "App submitted successfully!", 4000));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(checkBlueprintAuthActionError({}));
    // TODO: Add translations
    yield put(openNotification("error", "An error occurred when trying to submit your app.", 4000));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

export function* mapFieldsActionSaga(action: MapFieldsAction) {
  try {
    // TODO: URL should not be hardcoded, I believe
    const mapFieldsUrl = "https://appconnector.proxy.apisuite.io/apps/fieldmapping/";

    const response: unknown = yield call(request, {
      url: mapFieldsUrl,
      method: "POST",
      data: action.mappedFields,
    });

    // TODO: Do this once it is clear what is included in the response
    yield put(mapFieldsActionSuccess({}));

    yield put(openNotification("success", "App details saved successfully!", 4000));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(mapFieldsActionError({}));
    yield put(openNotification("error", "An error occurred when trying to save your app's details.", 4000));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

export function* toggleBlueprintAppStatusActionSaga(action: ToggleBlueprintAppStatusAction) {
  try {
    // TODO: URL should not be hardcoded, I believe
    const toggleBlueprintAppStatusUrl = "https://appconnector.proxy.apisuite.io/apps/worker/";

    yield call(request, {
      url: toggleBlueprintAppStatusUrl,
      method: "POST",
      data: action.toggleBlueprintAppStatusData,
    });

    // TODO: Do not use "start" for the sake of comparison - use a constant
    yield put(toggleBlueprintAppStatusActionSuccess({ isActive: action.toggleBlueprintAppStatusData.command === "start" }));

    yield put(openNotification("success", "App's status successfully updated!", 4000));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(toggleBlueprintAppStatusActionError({}));
    yield put(openNotification("error", "An error occurred when trying to update your app's status.", 4000));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

function* rootSaga() {
  yield takeLatest(CREATE_APP, createAppActionSaga);
  yield takeLatest(DELETE_APP, deleteAppActionSaga);
  yield takeLatest(GET_ALL_USER_APPS, getAllUserAppsActionSaga);
  yield takeLatest(GET_USER_APP, getUserAppActionSaga);
  yield takeLatest(REQUEST_API_ACCESS, requestAPIAccessActionSaga);
  yield takeLatest(UPDATE_APP, updateAppActionSaga);
  yield takeLatest(UPLOAD_APP_MEDIA, uploadAppMediaActionSaga);
  yield takeLatest(DELETE_APP_MEDIA, deleteAppMediaActionSaga);
  yield takeLatest(GET_APP_TYPES, getAppTypesActionSaga);
  yield takeLatest(CHECK_BLUEPRINT_AUTH_ACTION, checkBlueprintAuthActionSaga);
  yield takeLatest(MAP_FIELDS_ACTION, mapFieldsActionSaga);
  yield takeLatest(TOGGLE_BLUEPRINT_APP_STATUS_ACTION, toggleBlueprintAppStatusActionSaga);
}

export default rootSaga;
