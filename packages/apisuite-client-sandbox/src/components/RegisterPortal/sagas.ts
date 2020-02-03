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
    const response = yield call(request, {
      url: requestUrl,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(action.userData),
    })
    if (response.success && response.message === 'User created') {
      yield put(registerSuccess())
    } else if (!response.success && response.messages === 'user exists') {
      yield put(registerError('User already registered, click here to be redirect to log in'))
    }
  } catch (error) {
    yield put(registerError('Internal error'))
  }
}

function * rootSaga () {
  yield takeLatest(REGISTER_USER, registerUser)
}

export default rootSaga
