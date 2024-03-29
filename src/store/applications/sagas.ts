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
import { AppData, AppType, BlueprintData } from "./types";
import {
  BlueprintAppConfigResponse,
  CreateAppAction,
  DeleteAppAction,
  DeleteAppMediaAction,
  GetAllUserAppsAction,
  GetBlueprintAppConfigAction,
  GetUserAppAction,
  OAuthValidationResponse,
  RequestAPIAccessAction,
  ToggleBlueprintAppStatusAction,
  TokenValidationResponse,
  UpdateAppAction,
  UpdateAccessDetailsAction,
  UploadAppMediaAction,
  ValidateAccessDetailsAction,
  GetBlueprintDetailsAction,
  RevokeAPIAccessAction, FillBlueprintAppConfigAction,
} from "./actions/types";
import { CREATE_APP, createAppError, createAppSuccess } from "./actions/createApp";
import { DELETE_APP_MEDIA, deleteAppMediaError, deleteAppMediaSuccess } from "./actions/deleteAppMedia";
import { DELETE_APP, deleteAppError, deleteAppSuccess } from "./actions/deleteApp";
import { GET_ALL_USER_APPS, getAllUserApps, getAllUserAppsError, getAllUserAppsSuccess } from "./actions/getAllUserApps";
import { GET_USER_APP, getUserAppError, getUserAppSuccess } from "./actions/getUserApp";
import { getAppTypesError, getAppTypesSuccess, GET_APP_TYPES } from "./actions/getAppTypes";
import { REQUEST_API_ACCESS, requestAPIAccessError, requestAPIAccessSuccess } from "./actions/requestApiAccess";
import { REVOKE_API_ACCESS, revokeAPIAccessError, revokeAPIAccessSuccess } from "./actions/revokeApiAccess";
import { UPDATE_APP, updateAppError, updateAppSuccess } from "./actions/updatedApp";
import { UPLOAD_APP_MEDIA, uploadAppMediaError, uploadAppMediaSuccess } from "./actions/appMediaUpload";
import { UploadResponse } from "./actions/types";
import { getBlueprintAppConfigError, getBlueprintAppConfigSuccess, GET_BLUEPRINT_CONFIG } from "./actions/getBlueprintAppConfig";
import { validateAccessDetailsActionError, validateAccessDetailsActionSuccess, VALIDATE_ACCESS_DETAILS_ACTION } from "./actions/validateAccessDetails";
import { updateAccessDetailsActionError, updateAccessDetailsActionSuccess, UPDATE_ACCESS_DETAILS_ACTION } from "./actions/updateAccessDetails";
import { getBlueprintDetailsActionError, getBlueprintDetailsActionSuccess, GET_BLUEPRINT_DETAILS_ACTION } from "./actions/getBlueprintDetails";
import { TOGGLE_BLUEPRINT_APP_STATUS_ACTION, toggleBlueprintAppStatusActionError, toggleBlueprintAppStatusActionSuccess } from "./actions/toggleBlueprintAppStatus";
import {
  FILL_BLUEPRINT_CONFIG,
  fillBlueprintAppConfigError,
  fillBlueprintAppConfigSuccess,
} from "store/applications/actions/fillBlueprintAppConfig";

const appDataFilter = ["appType", "clientId", "clientSecret", "createdAt", "id", "idpProvider", "org_id", "orgId", "redirect_url", "state", "updatedAt"];

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
    if (!data.redirectUrl) {
      delete data.redirectUrl;
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
    if (["blueprint", "connector"].includes(action.appType)) {
      const getBlueprintAppConfigActionUrl = `${APP_CONNECTOR_URL}/apps/getid/${action.appId}`;
      const response: BlueprintAppConfigResponse = yield call(request, {
        url: getBlueprintAppConfigActionUrl,
        method: "GET",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      });
      if (response.data.workerStatus === "started") {
        const toggleBlueprintAppStatusUrl = `${APP_CONNECTOR_URL}/apps/worker/`;

        yield call(request, {
          url: toggleBlueprintAppStatusUrl,
          method: "POST",
          data: {
            app_name: response.data.name,
            command: "stop",
          },
        });
      }
      const deleteAppConnectorUrl = `${APP_CONNECTOR_URL}/apps/delete/${response.data.name}`;
      yield call(request, {
        url: deleteAppConnectorUrl,
        method: "DELETE",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      });
    }

    yield put(deleteAppSuccess({ id: action.appId }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(deleteAppError({}));

    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

export function* revokeAPIAccessActionSaga(action: RevokeAPIAccessAction) {
  try {
    const revokeAPIAccessUrl = `${API_URL}/organizations/${action.orgID}/apps/${action.appId}/revoke`;

    const accessToken: string = yield select((state: Store) => state.auth.authToken);

    yield call(request, {
      url: revokeAPIAccessUrl,
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "x-access-token": accessToken,
      },
    });

    yield put(revokeAPIAccessSuccess({}));
    yield put(openNotification("success", i18n.t("applications.revokeAPIAcessSuccess"), 3000));

    /* We need to retrieve the user"s apps after the above request, as we want up-to-date
    info on every app"s "Request access" status. */
    yield put(getAllUserApps({ orgID: action.orgID }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(revokeAPIAccessError({}));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
    yield put(openNotification("error", i18n.t("applications.revokeAPIAcessError"), 3000));
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

export function* validateAccessDetailsActionSaga(action: ValidateAccessDetailsAction) {
  try {
    const validateAccessDetailsUrl = `${APP_CONNECTOR_URL}/apps/`;

    const response: TokenValidationResponse | OAuthValidationResponse = yield call(request, {
      url: validateAccessDetailsUrl,
      method: "POST",
      data: action.blueprintConfig,
    });

    if (action.blueprintConfig.auth_type === "oauth") {
      window.open(
        response.data.toString(),
        "_self"
      );
    }

    yield put(validateAccessDetailsActionSuccess({ blueprintConfig: action.blueprintConfig }));

    yield put(openNotification("success", i18n.t("applications.validateAcessDetailsSuccess"), 3000));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(validateAccessDetailsActionError({}));
    yield put(openNotification("error", i18n.t("applications.validateAcessDetailsError"), 3000));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

export function* getBlueprintDetailsActionSaga(action: GetBlueprintDetailsAction) {
  try {
    const getBlueprintDetailsActionUrl = `${BLUEPRINT_APPS_URL}/${action.blueprintName}`;

    const response: BlueprintData = yield call(request, {
      url: getBlueprintDetailsActionUrl,
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    yield put(getBlueprintDetailsActionSuccess({ blueprintData: response }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(getBlueprintDetailsActionError(error));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

const convertToString = (object: unknown) : string => {
  return typeof object === "string" ? object : "";
};

const convertToBool = (object: unknown) : boolean => {
  return typeof object === "boolean" ? object : false;
};

export function* fillBlueprintAppConfigActionSaga(action: FillBlueprintAppConfigAction) {
  try {
    const getBlueprintDetailsActionUrl = `${BLUEPRINT_APPS_URL}/${action.blueprintName}`;

    const response: BlueprintData = yield call(request, {
      url: getBlueprintDetailsActionUrl,
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const blueprintConfig = {
      app_id : action.appId,
      app_conf: {
        auth_url: convertToString(response.data.configuration.auth_url),
        clt_id: convertToString(response.data.configuration.clt_id),
        clt_secret: convertToString(response.data.configuration.clt_secret),
        conn_auth_type:  convertToString(response.data.configuration.conn_auth_type),
        redirect_url: convertToString(response.data.configuration.redirect_url),
        scope: convertToString(response.data.configuration.scope),
        token_url: convertToString(response.data.configuration.token_url),
        token: convertToString(response.data.configuration.token),
      },
      app_method: convertToString(response.data.configuration.app_method),
      app_name: convertToString(response.data.appName).toLowerCase().replace(" ","_") + Date.now(),
      app_url: convertToString(response.data.configuration.app_url),
      auth_type: convertToString(response.data.configuration.auth_type),
      polling_interval: `${response.data.configuration.polling_interval}`,
      obo:  convertToBool(response.data.configuration.obo),
      api_url: "",
      fieldsRaw: [],
      variableValues: [],
      fieldsMapping: [],
      doneUrl: "",
      blueprint: true,
    };

    yield put(fillBlueprintAppConfigSuccess({
      config: blueprintConfig,
    }));
  } catch (error: any) {
    yield put(fillBlueprintAppConfigError(error));
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
    const blueprintConfig = {
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
      obo: response.data.obo,
      api_url: response.data.apiUrl,
      fieldsRaw: response.data.fieldsRaw,
      variableValues: response.data.variableValues || [],
      fieldsMapping: response.data.fieldsMapping || [],
      doneUrl: "",
      blueprint: response.data.blueprint,
    };

    yield put(getBlueprintAppConfigSuccess({
      config: blueprintConfig,
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

export function* updateAccessDetailsActionSaga(action: UpdateAccessDetailsAction) {
  try {
    const updateAccessDetailsUrl = `${APP_CONNECTOR_URL}/apps/${action.originalAppName}`;

    yield call(request, {
      url: updateAccessDetailsUrl,
      method: "PATCH",
      data: action.newConfig,
    });

    yield put(updateAccessDetailsActionSuccess({}));

    yield put(openNotification("success", i18n.t("applications.updateAcessDetailsSuccess"), 3000));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(updateAccessDetailsActionError({}));
    yield put(openNotification("error", i18n.t("applications.updateAcessDetailsError"), 3000));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

export function* toggleBlueprintAppStatusActionSaga(action: ToggleBlueprintAppStatusAction) {
  try {
    const toggleBlueprintAppStatusUrl = `${APP_CONNECTOR_URL}/apps/worker/`;

    yield call(request, {
      url: toggleBlueprintAppStatusUrl,
      method: "POST",
      data: action.appStatusData,
    });

    yield put(toggleBlueprintAppStatusActionSuccess({ isActive: action.appStatusData.command === "start" }));

    yield put(openNotification("success", i18n.t("applications.toggleBlueprintAppStatusSuccess"), 3000));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(toggleBlueprintAppStatusActionError({}));
    yield put(openNotification("error", i18n.t("applications.toggleBlueprintAppStatusError"), 3000));
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
  yield takeLatest(REVOKE_API_ACCESS, revokeAPIAccessActionSaga);
  yield takeLatest(UPDATE_APP, updateAppActionSaga);
  yield takeLatest(UPLOAD_APP_MEDIA, uploadAppMediaActionSaga);
  yield takeLatest(VALIDATE_ACCESS_DETAILS_ACTION, validateAccessDetailsActionSaga);
  yield takeLatest(GET_BLUEPRINT_DETAILS_ACTION, getBlueprintDetailsActionSaga);
  yield takeLatest(GET_BLUEPRINT_CONFIG, getBlueprintAppConfigActionSaga);
  yield takeLatest(FILL_BLUEPRINT_CONFIG, fillBlueprintAppConfigActionSaga);
  yield takeLatest(UPDATE_ACCESS_DETAILS_ACTION, updateAccessDetailsActionSaga);
  yield takeLatest(TOGGLE_BLUEPRINT_APP_STATUS_ACTION, toggleBlueprintAppStatusActionSaga);
}

export default rootSaga;
