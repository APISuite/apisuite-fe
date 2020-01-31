/**
 * @module RegisterPortal/sagas
 */

import { REGISTER_USER, registerSuccess, registerError } from './ducks'
import { takeLatest, call, put } from 'redux-saga/effects'
import { RegisterAction } from './types'
import { API_URL, SIGNUP_PORT } from 'constants/endpoints'
import request from 'util/request'

export function * registerUser (action: RegisterAction) {
  const requestUrl = `${API_URL}${SIGNUP_PORT}/users/register`

  try {
    yield call(request, {
      url: requestUrl,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(action.userData),
    })
    yield put(registerSuccess())
  } catch (error) {
    yield put(registerError(error.message))
  }
}

function * rootSaga () {
  yield takeLatest(REGISTER_USER, registerUser)
}

export default rootSaga
