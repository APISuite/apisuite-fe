import { call, put, select, takeLatest } from 'redux-saga/effects'

import request from 'util/request'

import {
  confirmRegistrationActions,
  nextStepAction,
  SignUpFormActionTypes,
  submitOrganisationDetailsActions,
  submitProfileDetailsActions,
  submitSecurityDetailsActions,
  validateRegisterTokenActions,
} from './ducks'

import { openNotification } from 'containers/NotificationStack/ducks'

import { Store } from 'store/types'

import { API_URL } from 'constants/endpoints'

export function * submitProfileDetailsSaga (
  action: ReturnType<typeof submitProfileDetailsActions.request>,
) {
  try {
    const previousData = {
      personal: action.payload,
    }

    const response = yield call(request, {
      url: `${API_URL}/registration/user`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(action.payload),
    })

    yield put(submitProfileDetailsActions.success(response))
    yield put(nextStepAction(previousData))
  } catch (error) {
    yield put(submitProfileDetailsActions.error(error))
  }
}

export function * submitOrganisationDetailsSaga (
  action: ReturnType<typeof submitOrganisationDetailsActions.request>,
) {
  try {
    const previousData = {
      org: action.payload,
    }

    if (
      action.payload.name === '' ||
      (action.payload.name === '' && action.payload.website === '')
    ) {
      yield put(submitOrganisationDetailsActions.success())
      yield put(nextStepAction(previousData))

      return
    }

    action.payload.registrationToken = yield select((state: Store) => state.register.registrationToken)

    yield call(request, {
      url: `${API_URL}/registration/organization`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(action.payload),
    })

    yield put(submitOrganisationDetailsActions.success())
    yield put(nextStepAction(previousData))
  } catch (error) {
    yield put(submitOrganisationDetailsActions.error(error))
  }
}

export function * submitSecurityDetailsSaga (
  action: ReturnType<typeof submitSecurityDetailsActions.request>,
) {
  try {
    action.payload.registrationToken = yield select((state: Store) => state.register.registrationToken)

    if (action.payload.token) {
      action.payload.registrationToken = action.payload.token

      delete action.payload.token
    }

    yield call(request, {
      url: `${API_URL}/registration/security`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(action.payload),
    })

    yield put(submitSecurityDetailsActions.success())
    yield put(nextStepAction({}))
  } catch (error) {
    yield put(submitSecurityDetailsActions.error(error))
  }
}

export function * confirmRegistrationSaga (
  action: ReturnType<typeof confirmRegistrationActions.request>,
) {
  try {
    yield call(request, {
      url: `${API_URL}/registration/confirm`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(action.payload),
    })

    yield put(openNotification('success', 'We have confirmed your account! You can now sign in.', 4000))
  } catch (error) {
    yield put(confirmRegistrationActions.error(error))
  }
}

export function * validateRegisterTokenSaga (
  action: ReturnType<typeof validateRegisterTokenActions.request>,
) {
  try {
    const response = yield call(request, {
      url: `${API_URL}/registration/invitation`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(action.payload),
    })

    yield put(validateRegisterTokenActions.success(response))
  } catch (error) {
    yield put(validateRegisterTokenActions.error(error.message))
  }
}

function * rootSaga () {
  yield takeLatest(SignUpFormActionTypes.CONFIRM_REGISTRATION_REQUEST, confirmRegistrationSaga)
  yield takeLatest(SignUpFormActionTypes.SUBMIT_ORGANISATION_DETAILS_REQUEST, submitOrganisationDetailsSaga)
  yield takeLatest(SignUpFormActionTypes.SUBMIT_PERSONAL_DETAILS_REQUEST, submitProfileDetailsSaga)
  yield takeLatest(SignUpFormActionTypes.SUBMIT_SECURITY_STEP_REQUEST, submitSecurityDetailsSaga)
  yield takeLatest(SignUpFormActionTypes.VALIDATE_REGISTRATION_TOKEN_REQUEST, validateRegisterTokenSaga)
}

export default rootSaga
