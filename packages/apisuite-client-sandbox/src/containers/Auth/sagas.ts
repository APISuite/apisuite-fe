import { put, call, takeLatest } from 'redux-saga/effects'
import request from 'util/request'
import { authActions, LOGIN } from './ducks'
import { AUTH_URL, LOGIN_PORT } from 'constants/endpoints'
import qs from 'qs'

// mock avatar
import requireImage from 'util/requireImage'
import { AnyAction } from 'redux'

function * loginWorker (action: AnyAction) {
  try {
    const credentialsUrl = `${AUTH_URL}${LOGIN_PORT}/auth/apisuite`
    const loginUrl = `${AUTH_URL}/auth/login`
    const userInfoUrl = `${AUTH_URL}/userinfo`

    const responseCred = yield call(request, {
      url: credentialsUrl,
      method: 'GET',
    })

    const challenge = responseCred.challenge

    const data = {
      challenge: challenge,
      email: action.payload.email,
      password: action.payload.password,
    }

    const { token } = yield call(request, {
      url: loginUrl,
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify(data),
    })

    const userinfo = yield call(request, {
      url: userInfoUrl,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    const user = userinfo.userinfo
    const userName = user.name.split(' ')
    yield put(authActions.loginSuccess({
      token,
      user: { fName: userName[0], lName: userName[userName.length - 1], avatar: requireImage('goncalo-avatar.jpg') },
    }))
  } catch (error) {
    yield put(authActions.loginError(error))
  }
}

function * rootSaga () {
  yield takeLatest(LOGIN, loginWorker)
}

export default rootSaga
