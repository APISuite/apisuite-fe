import {
  takeLatest,
  put,
  call,
} from 'redux-saga/effects'
import request from 'util/request'
import stateGenerator from 'util/stateGenerator'

import { openNotification } from 'containers/NotificationStack/ducks'
import { authActions } from 'containers/Auth/ducks'

import { API_URL } from 'constants/endpoints'

import {
  InvitationFormActionsTypes,
  acceptInvitationWithSignInActions,
  acceptInvitationActions,
  rejectInvitationActions,
  validateInvitationTokenActions,
  invitationSignInActions,
} from './ducks'
import {
  InvitationResponse,
} from './types'

const STATE_STORAGE = 'ssoStateStorage'
const STATE_STORAGE_INVITATION = 'ssoStateInvitationStorage'

export function * invitationWithSignInSaga (
  action: ReturnType<typeof acceptInvitationWithSignInActions.request>,
) {
  try {
    yield call(request, {
      url: `${API_URL}/auth/oidc/${action.payload.provider}/token?invite=true`,
      method: 'POST',
      data: { code: action.payload.code },
    })

    yield call(request, {
      url: `${API_URL}/invites/${action.payload.token}/accept`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    localStorage.removeItem(STATE_STORAGE)
    localStorage.removeItem(STATE_STORAGE_INVITATION)
    yield put(authActions.loginSuccess())
    yield put(acceptInvitationWithSignInActions.success('/'))
    yield put(openNotification('success', 'You have accepted your invitation.', 4000))
  } catch (error) {
    yield put(acceptInvitationWithSignInActions.error(error))
  }
}

export function * invitationSignInSaga (
  action: ReturnType<typeof invitationSignInActions.request>,
) {
  try {
    let state = localStorage.getItem(STATE_STORAGE)

    if (!state) {
      state = stateGenerator()
      localStorage.setItem(STATE_STORAGE, state)
    }
    localStorage.setItem(STATE_STORAGE_INVITATION, action.payload.token)

    const ssoLoginURL = `${API_URL}/auth/oidc/${action.payload.provider}?state=${state}&invite=true`
    const response: { url: string } = yield call(window.fetch, ssoLoginURL)

    window.location.href = response.url
  } catch (error) {
    yield put(invitationSignInActions.error(error))
  }
}

export function * acceptInvitationSaga (
  action: ReturnType<typeof acceptInvitationActions.request>,
) {
  try {
    yield call(request, {
      url: `${API_URL}/invites/${action.payload.token}/accept`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    yield put(openNotification('success', 'You have accepted your invitation.', 4000))
    yield put(acceptInvitationActions.success('/'))
  } catch (error) {
    yield put(acceptInvitationActions.error(error))
  }
}

export function * rejectInvitationSaga (
  action: ReturnType<typeof rejectInvitationActions.request>,
) {
  try {
    yield call(request, {
      url: `${API_URL}/invites/${action.payload.token}/reject`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    yield put(openNotification('success', 'You have rejected your invitation.', 4000))
    yield put(rejectInvitationActions.success('/'))
  } catch (error) {
    yield put(rejectInvitationActions.error(error))
  }
}

export function * validateInvitationTokenSaga (
  action: ReturnType<typeof validateInvitationTokenActions.request>,
) {
  try {
    const response: InvitationResponse = yield call(request, {
      url: `${API_URL}/invites/${action.payload.token}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    yield put(validateInvitationTokenActions.success(response))
  } catch (error) {
    yield put(validateInvitationTokenActions.error(error.message))
  }
}

function * rootSaga () {
  yield takeLatest(InvitationFormActionsTypes.ACCEPT_INVITATION_REQUEST, acceptInvitationSaga)
  yield takeLatest(InvitationFormActionsTypes.INVITATION_SIGN_IN_REQUEST, invitationSignInSaga)
  yield takeLatest(InvitationFormActionsTypes.ACCEPT_INVITATION_WITH_SIGN_REQUEST, invitationWithSignInSaga)
  yield takeLatest(InvitationFormActionsTypes.REJECT_INVITATION_REQUEST, rejectInvitationSaga)
  yield takeLatest(InvitationFormActionsTypes.VALIDATE_INVITATION_TOKEN_REQUEST, validateInvitationTokenSaga)
}

export default rootSaga
