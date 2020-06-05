import {
  CREATE_APP,
  UPDATE_APP,
  DELETE_APP,
  GET_APP_DETAILS,
  getAppDetailsSuccess,
  getUserAppsSuccess,
  GET_USER_APPS,
  getUserApps,
  createAppError,
  updateAppError,
  deleteAppError,
  deleteAppSuccess,
  updateAppSuccess,
  createAppSuccess,
  addAppSubscriptionSuccess,
  removeAppSubscriptionSuccess,
} from './ducks'
import { SubscriptionsActionTypes } from 'containers/Subscriptions/ducks'
import {
  AddAppSubscriptionAction,
  RemoveAppSubscriptionAction,
  Api,
} from 'containers/Subscriptions/types'
import {
  takeLatest,
  call,
  put,
  select,
} from 'redux-saga/effects'
import {
  CreateAppAction,
  UpdateAppAction,
  DeleteAppAction,
  GetUserAppsAction,
  GetAppDetails,
  AppData,
} from './types'
import {
  API_URL,
  SIGNUP_PORT,
} from 'constants/endpoints'
import request from 'util/request'
import { push } from 'connected-react-router'
import { Store } from 'store/types'
import qs from 'qs'

export function * createApp (action: CreateAppAction) {
  try {
    const data = {
      name: action.appData.name,
      description: action.appData.description,
      'redirect_url': action.appData.redirectUrl,
      logo: action.appData.logo,
      visibility: action.appData.visibility,
      'user_id': action.appData.userId,
      subscriptions: action.appData.subscriptions,
      // TODO: change
      // 'pub_urls': [{
      //   url: 'http://ssss.com',
      //   type: 'client',
      // }],
    }
    const accessToken = yield select(
      (state: Store) => state.auth.authToken)
    const createAppUrl = `${API_URL}${SIGNUP_PORT}/app/create`

    yield call(request, {
      url: createAppUrl,
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-access-token': accessToken,
      },
      data: qs.stringify(data),
    })
    yield put(createAppSuccess())
    yield put(push('/dashboard/apps'))
  } catch (error) {
    yield put(createAppError())
  }
}

export function * updateApp (action: UpdateAppAction) {
  try {
    const data = {
      name: action.appData.name,
      description: action.appData.description,
      'redirect_url': action.appData.redirectUrl,
      logo: action.appData.logo,
      visibility: action.appData.visibility,
      'user_id': action.appData.userId,
      'sandbox_id': '1',
      'pub_urls': [action.appData.pubUrls],
    }
    const accessToken = yield select(
      (state: Store) => state.auth.authToken)
    const updateAppUrl = `${API_URL}${SIGNUP_PORT}/app/update/${action.appData.appId}`

    yield call(request, {
      url: updateAppUrl,
      method: 'PUT',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-access-token': accessToken,
      },
      data: qs.stringify(data),
    })
    yield put(updateAppSuccess({
      appId: action.appData.appId,
      name: action.appData.description,
      description: action.appData.description,
      redirectUrl: action.appData.redirectUrl,
      logo: action.appData.logo,
      userId: action.appData.userId,
      visibility: action.appData.visibility,
      subscriptions: action.appData.subscriptions,
      pubUrls: action.appData.pubUrls,
      enable: action.appData.enable,
      clientId: action.appData.clientId,
      clientSecret: action.appData.clientSecret,
    }))
  } catch (error) {
    yield put(updateAppError())
  }
}

export function * getUsersApps (action: GetUserAppsAction) {
  try {
    const getUserAppsUrl = `${API_URL}${SIGNUP_PORT}/app/list/${action.userId}`
    const accessToken = yield select(
      (state: Store) => state.auth.authToken)
    const response = yield call(request, {
      url: getUserAppsUrl,
      method: 'GET',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-access-token': accessToken,
      },
    })

    const userApps = response.map((userApp: any) => (
      {
        appId: userApp.id,
        name: userApp.name,
        description: userApp.description,
        redirectUrl: userApp.redirect_url,
        logo: userApp.logo,
        userId: userApp.userId,
        subscriptions: userApp.subscriptions,
        pubUrls: '',
        enable: userApp.enable,
        createdAt: userApp.createdAt,
        updatedAt: userApp.updatedAt,
        clientId: userApp.client_data.client_id,
        clientSecret: userApp.client_data.client_secret,
      }
    ))
    yield put(getUserAppsSuccess(userApps.sort((a: AppData, b: AppData) => a.appId - b.appId)))
  } catch (error) {
    console.log('Error fecthing user apps')
  }
}

export function * deleteApp (action: DeleteAppAction) {
  try {
    const deleteAppUrl = `${API_URL}${SIGNUP_PORT}/app/delete/${action.appId}`
    const accessToken = yield select(
      (state: Store) => state.auth.authToken)

    yield call(request, {
      url: deleteAppUrl,
      method: 'DELETE',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-access-token': accessToken,
      },
    })
    yield put(deleteAppSuccess())
    if (action.userId) {
      yield put(getUserApps(action.userId))
    }
    yield put(push('/dashboard/apps'))
  } catch (error) {
    yield put(deleteAppError())
  }
}

export function * getAppDetails (action: GetAppDetails) {
  const getUserAppsUrl = `${API_URL}${SIGNUP_PORT}/app/list/${action.userId}`
  const accessToken = yield select(
    (state: Store) => state.auth.authToken)

  const response = yield call(request, {
    url: getUserAppsUrl,
    method: 'GET',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'x-access-token': accessToken,
    },
  })

  // TODO change request when BE allows to fetch a specific app
  const userApps = response.map((userApp: any) => (
    {
      appId: userApp.id,
      name: userApp.name,
      description: userApp.description,
      redirectUrl: userApp.redirect_url,
      logo: userApp.logo,
      userId: userApp.userId,
      subscriptions: userApp.subscriptions,
      pubUrls: '',
      enable: userApp.enable,
      createdAt: userApp.createdAt,
      updatedAt: userApp.updatedAt,
      clientId: userApp.client_data.client.client_id,
      clientSecret: userApp.client_data.client.client_secret,
    }
  ))

  const appIndx = userApps.findIndex((app: AppData) => app.appId === action.appId)
  yield put(getAppDetailsSuccess(userApps[appIndx]))
}

export function * addAppSubscriptionSaga (action: AddAppSubscriptionAction) {
  const addAppSubscriptionUrl = `${API_URL}/app/${action.appId}/subscribe`
  const apis: Api[] = yield select((store: Store) => store.subscriptions.apis)
  const userApps: AppData[] = yield select((store: Store) => store.applications.userApps)
  const appInfo: AppData[] = userApps.filter(app => app.appId === action.appId)
  const appSubscriptions = appInfo[0].subscriptions.map((sub: Api) => sub.id)
  const accessToken = yield select(
    (state: Store) => state.auth.authToken)

  for (const apiIndx in apis) {
    if (apis[apiIndx].name === action.apiName) appSubscriptions.push(apis[apiIndx].id)
  }

  const data = {
    subscriptions: [...new Set(appSubscriptions)],
  }

  try {
    // TODO: add response type
    const response = yield call(request, {
      url: addAppSubscriptionUrl,
      method: 'PUT',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-access-token': accessToken,
      },
      data: qs.stringify(data),
    })

    const updatedApp = {
      appId: response.app.id,
      name: response.app.name,
      description: response.app.description,
      redirectUrl: response.app.redirect_url,
      logo: response.app.logo,
      userId: response.app.userId,
      subscriptions: response.app.subscriptions,
      pubUrls: response.app.pub_urls,
      visibility: response.app.visibility,
      enable: response.app.enable,
      createdAt: response.app.createdAt,
      updatedAt: response.app.updatedAt,
      clientId: response.app.client_data.client_id,
      clientSecret: response.app.client_data.client_secret,
    }

    const appIndx = userApps.map((app: AppData) => app.appId).indexOf(action.appId)
    yield put(addAppSubscriptionSuccess(updatedApp, appIndx))
  } catch {
    console.log('error adding subscription')
  }
}

export function * removeAppSubscriptionSaga (action: RemoveAppSubscriptionAction) {
  const addAppSubscriptionUrl = `${API_URL}/app/${action.appId}/subscribe`
  const apis: Api[] = yield select((store: Store) => store.subscriptions.apis)
  const userApps: AppData[] = yield select((store: Store) => store.applications.userApps)
  const appInfo: AppData[] = userApps.filter(app => app.appId === action.appId)
  const appSubscriptions = appInfo[0].subscriptions.map((sub: Api) => sub.id)
  const subscriptionsToRemove = apis.filter((api: Api) => api.name === action.apiName).map((api: Api) => api.id)
  const accessToken = yield select(
    (state: Store) => state.auth.authToken)

  const data = {
    subscriptions: appSubscriptions.filter(apiId => !subscriptionsToRemove.includes(apiId)),
  }

  try {
    // TODO: add response type
    const response = yield call(request, {
      url: addAppSubscriptionUrl,
      method: 'PUT',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-access-token': accessToken,
      },
      data: qs.stringify(data),
    })

    const updatedApp = {
      appId: response.app.id,
      name: response.app.name,
      description: response.app.description,
      redirectUrl: response.app.redirect_url,
      logo: response.app.logo,
      userId: response.app.userId,
      subscriptions: response.app.subscriptions,
      pubUrls: response.app.pub_urls,
      visibility: response.app.visibility,
      enable: response.app.enable,
      createdAt: response.app.createdAt,
      updatedAt: response.app.updatedAt,
      clientId: response.app.client_data.client_id,
      clientSecret: response.app.client_data.client_secret,
    }

    const appIndx = userApps.map((app: AppData) => app.appId).indexOf(action.appId)
    yield put(removeAppSubscriptionSuccess(updatedApp, appIndx))
  } catch {
    console.log('error removing subscription')
  }
}

function * rootSaga () {
  yield takeLatest(CREATE_APP, createApp)
  yield takeLatest(UPDATE_APP, updateApp)
  yield takeLatest(DELETE_APP, deleteApp)
  yield takeLatest(GET_APP_DETAILS, getAppDetails)
  yield takeLatest(GET_USER_APPS, getUsersApps)
  yield takeLatest(SubscriptionsActionTypes.ADD_APP_SUBSCRIPTION, addAppSubscriptionSaga)
  yield takeLatest(SubscriptionsActionTypes.REMOVE_APP_SUBSCRIPTION, removeAppSubscriptionSaga)
}

export default rootSaga
