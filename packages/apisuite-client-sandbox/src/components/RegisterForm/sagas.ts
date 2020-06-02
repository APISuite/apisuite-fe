import {
  takeLatest,
  put,
  call,
  select,
} from 'redux-saga/effects'
import request from 'util/request'
import {
  RegisterFormActionTypes,
  nextStepAction,
  submitPersonalDetailsActions,
  submitOrganisationDetailsActions,
  submitSecurityStepActions,
  confirmRegistrationActions,
} from './ducks'
import { openNotification } from 'containers/NotificationStack/ducks'
import {
  Store,
} from 'store/types'
import { API_URL } from 'constants/endpoints'

export function * submitPersonalDetailsSaga (
  action: ReturnType<typeof submitPersonalDetailsActions.request>,
) {
  try {
    const response = yield call(request, {
      url: `${API_URL}/registration/user`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(action.payload),
    })

    yield put(submitPersonalDetailsActions.success(response))
    yield put(nextStepAction())
  } catch (error) {
    yield put(submitPersonalDetailsActions.error(error))
  }
}

export function * submitOrganisationDetailsSaga (
  action: ReturnType<typeof submitOrganisationDetailsActions.request>,
) {
  try {
    const registrationToken = yield select(
      (state: Store) => state.register.registrationToken)
    yield call(request, {
      url: `${API_URL}/registration/organization`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${registrationToken}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(action.payload),
    })

    yield put(submitOrganisationDetailsActions.success())
    yield put(nextStepAction())
  } catch (error) {
    yield put(submitOrganisationDetailsActions.error(error))
  }
}

export function * submitSecurityStepSaga (
  action: ReturnType<typeof submitSecurityStepActions.request>,
) {
  try {
    const registrationToken = yield select(
      (state: Store) => state.register.registrationToken)
    yield call(request, {
      url: `${API_URL}/registration/security`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${registrationToken}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(action.payload),
    })

    yield put(submitSecurityStepActions.success())
    yield put(nextStepAction())
  } catch (error) {
    yield put(submitSecurityStepActions.error(error))
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

    yield put(openNotification('success', 'We have confirmed your account, you can login!', 4000))
    // yield put(confirmRegistrationActions.success())
  } catch (error) {
    yield put(confirmRegistrationActions.error(error))
  }
}

function * rootSaga () {
  yield takeLatest(RegisterFormActionTypes.SUBMIT_PERSONAL_DETAILS_REQUEST, submitPersonalDetailsSaga)
  yield takeLatest(RegisterFormActionTypes.SUBMIT_ORGANISATION_DETAILS_REQUEST, submitOrganisationDetailsSaga)
  yield takeLatest(RegisterFormActionTypes.SUBMIT_SECURITY_STEP_REQUEST, submitSecurityStepSaga)
  yield takeLatest(RegisterFormActionTypes.CONFIRM_REGISTRATION_REQUEST, confirmRegistrationSaga)
}

export default rootSaga
