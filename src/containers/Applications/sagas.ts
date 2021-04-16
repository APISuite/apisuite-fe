import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import {
  CREATE_APP_ACTION,
  createAppActionError,
  createAppActionSuccess,
  DELETE_APP_ACTION,
  deleteAppActionError,
  deleteAppActionSuccess,
  GET_ALL_USER_APPS_ACTION,
  GET_USER_APP_ACTION,
  getAllUserAppsAction,
  getAllUserAppsActionSuccess,
  getUserAppActionSuccess,
  REQUEST_API_ACCESS_ACTION,
  requestAPIAccessActionError,
  requestAPIAccessActionSuccess,
  UPDATE_APP_ACTION,
  updateAppActionError,
  updateAppActionSuccess,
} from './ducks'

import {
  AppData,
  CreateAppAction,
  DeleteAppAction,
  GetUserAppAction,
  RequestAPIAccessAction,
  UpdateAppAction,
} from './types'

import { authActions } from 'containers/Auth/ducks'

import { API_URL } from 'constants/endpoints'

import request from 'util/request'

import { push } from 'connected-react-router'

import { Store } from 'store/types'

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
    }

    const createAppUrl = `${API_URL}/apps`

    yield call(request, {
      url: createAppUrl,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: data,
    })

    yield put(createAppActionSuccess())

    yield put(push('/dashboard/apps'))
  } catch (error) {
    yield put(createAppActionError())
    yield put(authActions.handleSessionExpire())
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
    }

    const updateAppUrl = `${API_URL}/apps/${action.appData.id}`

    const response = yield call(request, {
      url: updateAppUrl,
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      data: data,
    })

    yield put(updateAppActionSuccess({
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
    }))
  } catch (error) {
    yield put(updateAppActionError())
    yield put(authActions.handleSessionExpire())
  }
}

export function * deleteAppActionSaga (action: DeleteAppAction) {
  try {
    const deleteAppUrl = `${API_URL}/apps/${action.appId}`

    yield call(request, {
      url: deleteAppUrl,
      method: 'DELETE',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })

    yield put(deleteAppActionSuccess())

    if (action.orgId) {
      yield put(getAllUserAppsAction(action.orgId))
    }

    yield put(push('/dashboard/apps'))
  } catch (error) {
    /* TODO: Review the 'checkStatus' function in 'util/request.ts',
    as this Saga considers a response from the server whose status
    code is 204 (i.e., a 'No Content') as an error. */
    if (error.status === 204) {
      yield put(deleteAppActionSuccess())

      if (action.orgId) {
        yield put(getAllUserAppsAction(action.orgId))
      }

      yield put(push('/dashboard/apps'))
    } else {
      yield put(deleteAppActionError())
      yield put(authActions.handleSessionExpire())
    }
  }
}

export function * requestAPIAccessActionSaga (action: RequestAPIAccessAction) {
  try {
    const requestAPIAccessUrl = `${API_URL}/apps/${action.appId}/request`

    const accessToken = yield select(
      (state: Store) => state.auth.authToken)

    yield call(request, {
      url: requestAPIAccessUrl,
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-access-token': accessToken,
      },
    })

    yield put(requestAPIAccessActionSuccess())
  } catch (error) {
    yield put(requestAPIAccessActionError())
    yield put(authActions.handleSessionExpire())
  }
}

export function * getAllUserAppsActionSaga () {
  try {
    const getAllUserAppsActionUrl = `${API_URL}/apps`

    const response = yield call(request, {
      url: getAllUserAppsActionUrl,
      method: 'GET',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })

    const allUserApps = response.map((userApp: any) => (
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
    ))

    yield put(getAllUserAppsActionSuccess(
      allUserApps.sort((userAppA: AppData, userAppB: AppData) => userAppA.id - userAppB.id)),
    )
  } catch (error) {
    console.log('Error fetching all user apps')
    yield put(authActions.handleSessionExpire())
  }
}

export function * getUserAppActionSaga (action: GetUserAppAction) {
  try {
    const getAllUserAppsActionUrl = `${API_URL}/apps`

    const response = yield call(request, {
      url: getAllUserAppsActionUrl,
      method: 'GET',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })

    const allUserApps = response.map((userApp: any) => (
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
    ))

    const indexOfUserAppWeWant = allUserApps.findIndex((userApp: AppData) => userApp.id === action.appId)

    yield put(getUserAppActionSuccess(allUserApps[indexOfUserAppWeWant]))
  } catch (error) {
    console.log('Error fetching user app')
    yield put(authActions.handleSessionExpire())
  }
}

function * rootSaga () {
  yield takeLatest(CREATE_APP_ACTION, createAppActionSaga)
  yield takeLatest(DELETE_APP_ACTION, deleteAppActionSaga)
  yield takeLatest(GET_ALL_USER_APPS_ACTION, getAllUserAppsActionSaga)
  yield takeLatest(GET_USER_APP_ACTION, getUserAppActionSaga)
  yield takeLatest(REQUEST_API_ACCESS_ACTION, requestAPIAccessActionSaga)
  yield takeLatest(UPDATE_APP_ACTION, updateAppActionSaga)
}

export default rootSaga
