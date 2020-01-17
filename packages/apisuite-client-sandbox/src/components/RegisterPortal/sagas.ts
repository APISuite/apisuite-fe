/**
 * @module RegisterPortal/sagas
 */

import { REGISTER_USER } from './ducks'
import { takeLatest, call, put } from 'redux-saga/effects'
import { RegisterAction } from './types'
import { API_URL, SIGNUP_PORT, SIGNUP_ROUTE } from 'constants/endpoints'
import request from 'util/request'
import { authActions } from 'containers/Auth/ducks'
import requireImage from 'util/requireImage'

export function * registerUser (action: RegisterAction) {
  try {
    const requestUrl = `${API_URL}:${SIGNUP_PORT}${SIGNUP_ROUTE}`

    yield call(request, requestUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action.userData),
    })

    yield put(authActions.loginSuccess({
      token: 'mock_token',
      user: { fName: 'Quentin', lName: 'Felice', avatar: requireImage('goncalo-avatar.jpg') },
    }))
  } catch (error) {
    console.log(error)
  }
}

function * rootSaga () {
  yield takeLatest(REGISTER_USER, registerUser)
}

export default rootSaga
