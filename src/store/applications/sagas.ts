import { i18n } from "@apisuite/fe-base";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { API_URL, APP_CONNECTOR_URL, BLUEPRINT_APPS_URL } from "constants/endpoints";
import qs from "qs";

import { AppTypesTab } from "pages/AppView/types";
import { history } from "store";
import { handleSessionExpire } from "store/auth/actions/expiredSession";
import { openNotification } from "store/notificationStack/actions/notification";
import { Store } from "store/types";
import { clearProps } from "util/clear";
import { linker } from "util/linker";
import request from "util/request";
import { AppData, AppType } from "./types";
import { BlueprintAppConfigResponse, CreateAppAction, CreateBlueprintAppAction, DeleteAppAction, DeleteAppMediaAction, GetAllUserAppsAction, GetBlueprintAppConfigAction, GetUserAppAction, OAuthValidationResponse, RequestAPIAccessAction, ToggleBlueprintAppStatusAction, TokenValidationResponse, UpdateAppAction, UpdateBlueprintAppConfigAction, UploadAppMediaAction, ValidateAccessDetailsAction } from "./actions/types";
import { CREATE_APP, createAppError, createAppSuccess } from "./actions/createApp";
import { DELETE_APP_MEDIA, deleteAppMediaError, deleteAppMediaSuccess } from "./actions/deleteAppMedia";
import { DELETE_APP, deleteAppError, deleteAppSuccess } from "./actions/deleteApp";
import { GET_ALL_USER_APPS, getAllUserApps, getAllUserAppsError, getAllUserAppsSuccess } from "./actions/getAllUserApps";
import { GET_USER_APP, getUserAppError, getUserAppSuccess } from "./actions/getUserApp";
import { getAppTypesError, getAppTypesSuccess, GET_APP_TYPES } from "./actions/getAppTypes";
import { REQUEST_API_ACCESS, requestAPIAccessError, requestAPIAccessSuccess } from "./actions/requestApiAccess";
import { UPDATE_APP, updateAppError, updateAppSuccess } from "./actions/updatedApp";
import { UPLOAD_APP_MEDIA, uploadAppMediaError, uploadAppMediaSuccess } from "./actions/appMediaUpload";
import { UploadResponse } from "./actions/types";
import { CREATE_BLUEPRINT_APP, createBlueprintAppError, createBlueprintAppSuccess } from "./actions/createBlueprintApp";
import { getBlueprintAppConfigError, getBlueprintAppConfigSuccess, GET_BLUEPRINT_CONFIG } from "./actions/getBlueprintAppConfig";
import { TOGGLE_BLUEPRINT_APP_STATUS_ACTION, toggleBlueprintAppStatusActionError, toggleBlueprintAppStatusActionSuccess } from "./actions/toggleBlueprintAppStatus";
import { validateAccessDetailsActionError, validateAccessDetailsActionSuccess, VALIDATE_ACCESS_DETAILS_ACTION } from "./actions/validateAccessDetails";
import { updateBlueprintAppConfigError, updateBlueprintAppConfigSuccess, UPDATE_BLUEPRINT_APP_CONFIG } from "./actions/updateBlueprintAppConfig";

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

    /* We need to retrieve the user"s apps after the above request, as we want up-to-date
    info on every app"s "Request access" status. */
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

export function* createBlueprintAppActionSaga(action: CreateBlueprintAppAction) {
  try {
    const createBlueprintAppUrl = BLUEPRINT_APPS_URL;

    const blueprintAppData = {
      app_link: "",
      app_name: action.appData.name,
      configuration: {},
      description: action.appData.description,
      labels: [],
      logo: action.appData.logo,
      overview: action.appData.shortDescription,
    };

    yield call(request, {
      url: createBlueprintAppUrl,
      method: "POST",
      headers: {
        Authorization: "Basic Y2xvdWRva2k6ZmtsZGZnaGRma2pnaHNramdoc2dzZGZramdo",
        "content-type": "application/json",
      },
      data: blueprintAppData,
    });

    yield put(createBlueprintAppSuccess({ appId: action.appData.id }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(createBlueprintAppError({ error }));
    yield put(openNotification("error", i18n.t("applications.error.createBlueprint"), 3000));

    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

export function* validateAccessDetailsActionSaga(action: ValidateAccessDetailsAction) {
  try {
    const validateAccessDetailsUrl = `${APP_CONNECTOR_URL}/apps/`;

    const response: TokenValidationResponse | OAuthValidationResponse = yield call(request, {
      url: validateAccessDetailsUrl,
      method: "POST",
      data: action.blueprintAppConfig,
    });

    if (action.blueprintAppConfig.auth_type === "oauth") {
      window.open(
        response.data.toString(),
        "_blank"
      );
    }

    yield put(validateAccessDetailsActionSuccess({ blueprintAppConfig: action.blueprintAppConfig }));

    // TODO: Add translations
    yield put(openNotification("success", i18n.t("applications.validateAcessDetailsSuccess"), 3000));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(validateAccessDetailsActionError({}));
    // TODO: Add translations
    yield put(openNotification("error", i18n.t("applications.validateAcessDetailsError"), 3000));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

export function* getBlueprintAppConfigActionSaga(action: GetBlueprintAppConfigAction) {
  try {
    const getBlueprintAppConfigActionUrl = `${APP_CONNECTOR_URL}/apps/getid/${action.appId}`;

    const response: BlueprintAppConfigResponse = yield call(request, {
      url: getBlueprintAppConfigActionUrl,
      method: "GET",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });

    const blueprintAppConfig = {
      app_id: Number(action.appId),
      app_conf: {
        auth_url: response.data.appConfig.authUrl,
        clt_id: response.data.appConfig.cltId,
        clt_secret: response.data.appConfig.cltSecret,
        conn_auth_type: response.data.appConfig.connAuthType,
        redirect_url: response.data.appConfig.redirectUrl,
        scope: response.data.appConfig.scope,
        token_url: response.data.appConfig.tokenUrl,
        token: response.data.token,
      },
      app_method: response.data.appMethod,
      app_name: response.data.name,
      app_url: response.data.appUrl,
      auth_type: response.data.authType,
      polling_interval: `${response.data.pollingInterval}`,
    };

    yield put(getBlueprintAppConfigSuccess({
      config: blueprintAppConfig,
      isActive: response.data.workerStatus === "started",
    }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(getBlueprintAppConfigError(error));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

export function* updateBlueprintAppConfigActionSaga(action: UpdateBlueprintAppConfigAction) {
  try {
    const updateBlueprintAppConfigUrl = `${APP_CONNECTOR_URL}/apps/${action.originalAppName}`;

    yield call(request, {
      url: updateBlueprintAppConfigUrl,
      method: "PATCH",
      data: action.newConfig,
    });

    yield put(updateBlueprintAppConfigSuccess({}));

    // TODO: Add translations
    yield put(openNotification("success", i18n.t("applications.updateAcessDetailsSuccess"), 3000));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(updateBlueprintAppConfigError({}));
    // TODO: Add translations
    yield put(openNotification("error", i18n.t("applications.updateAcessDetailsError"), 3000));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

export function* toggleBlueprintAppStatusActionSaga(action: ToggleBlueprintAppStatusAction) {
  try {
    // TODO: URL should not be hardcoded, I believe
    const toggleBlueprintAppStatusUrl = `${APP_CONNECTOR_URL}/apps/worker/`;

    yield call(request, {
      url: toggleBlueprintAppStatusUrl,
      method: "POST",
      data: action.appStatusData,
    });

    // TODO: Do not use "start" for the sake of comparison - use a constant
    yield put(toggleBlueprintAppStatusActionSuccess({ isActive: action.appStatusData.command === "start" }));

    yield put(openNotification("success", i18n.t("applications.toggleBlueprintAppStatusSuccess"), 3000));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(toggleBlueprintAppStatusActionError({}));
    yield put(openNotification("success", i18n.t("applications.toggleBlueprintAppStatusError"), 3000));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

function* rootSaga() {
  yield takeLatest(CREATE_APP, createAppActionSaga);
  yield takeLatest(DELETE_APP_MEDIA, deleteAppMediaActionSaga);
  yield takeLatest(DELETE_APP, deleteAppActionSaga);
  yield takeLatest(GET_ALL_USER_APPS, getAllUserAppsActionSaga);
  yield takeLatest(GET_APP_TYPES, getAppTypesActionSaga);
  yield takeLatest(GET_USER_APP, getUserAppActionSaga);
  yield takeLatest(REQUEST_API_ACCESS, requestAPIAccessActionSaga);
  yield takeLatest(UPDATE_APP, updateAppActionSaga);
  yield takeLatest(UPLOAD_APP_MEDIA, uploadAppMediaActionSaga);
  yield takeLatest(VALIDATE_ACCESS_DETAILS_ACTION, validateAccessDetailsActionSaga);
  yield takeLatest(CREATE_BLUEPRINT_APP, createBlueprintAppActionSaga);
  yield takeLatest(GET_BLUEPRINT_CONFIG, getBlueprintAppConfigActionSaga);
  yield takeLatest(UPDATE_BLUEPRINT_APP_CONFIG, updateBlueprintAppConfigActionSaga);
  yield takeLatest(TOGGLE_BLUEPRINT_APP_STATUS_ACTION, toggleBlueprintAppStatusActionSaga);
}

export default rootSaga;
