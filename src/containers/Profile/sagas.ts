import { call, put, select, takeLatest } from 'redux-saga/effects'

import request from 'util/request'

import { authActions } from 'containers/Auth/ducks'
import { openNotification } from 'containers/NotificationStack/ducks'

import {
  changeRoleActions,
  confirmInviteActions,
  createOrgActions,
  deleteAccountActions,
  fetchOrgActions,
  fetchRoleOptionsActions,
  fetchTeamMembersActions,
  getProfileActions,
  inviteMemberActions,
  ProfileActionTypes,
  switchOrgActions,
  updateOrgActions,
  updateProfileActions,
} from './ducks'

import {
  ChangeRoleResponse,
  FetchOrgResponse,
  FetchRoleOptionsResponse,
  FetchTeamMembersResponse,
  GetProfileResponse,
  InviteMemberResponse,
  UpdateOrgResponse,
  UpdateProfileResponse,
} from './types'

import { Store } from 'store/types'

import { API_URL } from 'constants/endpoints'

const STATE_STORAGE = 'ssoStateStorage'

export function * fetchTeamMembersSaga (
  action: ReturnType<typeof fetchTeamMembersActions.request>,
) {
  try {
    let orgID

    if (!action.payload.orgID) {
      orgID = yield select((state: Store) => state.profile.profile.current_org.id)
    }

    const response: FetchTeamMembersResponse[] = yield call(request, {
      url: `${API_URL}/organizations/${orgID}/users`,
      method: 'GET',
    })

    yield put(fetchTeamMembersActions.success(response))
  } catch (error) {
    yield put(fetchTeamMembersActions.error(error))
    yield put(authActions.handleSessionExpire())
  }
}

export function * fetchRoleOptionsSaga () {
  try {
    const response: FetchRoleOptionsResponse = yield call(request, {
      url: `${API_URL}/roles`,
      method: 'GET',
    })

    yield put(fetchRoleOptionsActions.success(response))
  } catch (error) {
    yield put(fetchRoleOptionsActions.error(error))
    yield put(authActions.handleSessionExpire())
  }
}

export function * inviteMemberSaga (
  action: ReturnType<typeof inviteMemberActions.request>,
) {
  try {
    const response: InviteMemberResponse = yield call(request, {
      url: `${API_URL}/users/invite`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(action.payload),
    })

    yield put(inviteMemberActions.success(response))
    yield put(openNotification('success', 'Member was successfully invited.', 3000))
  } catch (error) {
    yield put(inviteMemberActions.error(error.message || 'Invitation failed.'))
    yield put(openNotification('error', 'Error inviting member.', 3000))
    yield put(authActions.handleSessionExpire())
  }
}

export function * confirmInviteSaga (
  action: ReturnType<typeof confirmInviteActions.request>,
) {
  try {
    const response: InviteMemberResponse = yield call(request, {
      url: `${API_URL}/users/invite/confirm`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(action.payload),
    })

    yield put(confirmInviteActions.success(response))
    yield put(openNotification('success', 'You were added to a team! Check your new organisation on your profile!', 5000))
  } catch (error) {
    yield put(confirmInviteActions.error(error))
  }
}

export function * changeRoleSaga (
  action: ReturnType<typeof changeRoleActions.request>,
) {
  try {
    const response: ChangeRoleResponse = yield call(request, {
      url: `${API_URL}/organizations/assign`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(action.payload),
    })

    yield put(changeRoleActions.success(response))
    yield put(fetchTeamMembersActions.request())
    yield put(openNotification('success', 'Role updaded successfully.', 3000))
  } catch (error) {
    yield put(changeRoleActions.error(error.message))
    yield put(openNotification('error', 'Failed to update role.', 3000))
    yield put(authActions.handleSessionExpire())
  }
}

export function * getProfileSaga () {
  try {
    const response: GetProfileResponse = yield call(request, {
      url: `${API_URL}/users/profile`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })

    yield put(getProfileActions.success(response))
  } catch (error) {
    yield put(getProfileActions.error(error))
    yield put(authActions.handleSessionExpire())
  }
}

export function * updateProfileSaga (
  action: ReturnType<typeof updateProfileActions.request>,
) {
  try {
    const response: UpdateProfileResponse = yield call(request, {
      // url: `${API_URL}/users/profile/update`,
      url: `${API_URL}/users/${action.userId}`,
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(action.payload),
    })

    yield put(updateProfileActions.success(response))
    yield put(getProfileActions.request())
  } catch (error) {
    yield put(updateProfileActions.error(error.message))
    yield put(authActions.handleSessionExpire())
  }
}

export function * fetchOrgSaga (
  action: ReturnType<typeof fetchOrgActions.request>,
) {
  try {
    let orgId

    if (!action.payload.org_id) {
      yield call(getProfileSaga)
      orgId = yield select((state: Store) => state.profile.profile.current_org.id)
    }

    const response: FetchOrgResponse = yield call(request, {
      url: `${API_URL}/organizations/${action.payload.org_id !== '' ? action.payload.org_id : orgId}`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })

    yield put(fetchOrgActions.success(response))
  } catch (error) {
    yield put(fetchOrgActions.error(error))
    yield put(authActions.handleSessionExpire())
  }
}

export function * createOrgSaga (
  action: ReturnType<typeof createOrgActions.request>,
) {
  try {
    const response: UpdateOrgResponse = yield call(request, {
      url: `${API_URL}/organizations/`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(action.payload),
    })

    yield put(createOrgActions.success(response))
    yield put(openNotification('success', 'Your organisation was successfully created!', 3000))
  } catch (error) {
    yield put(createOrgActions.error(error.message))
    yield put(authActions.handleSessionExpire())
  }
}

export function * updateOrgSaga (
  action: ReturnType<typeof updateOrgActions.request>,
) {
  try {
    const response: UpdateOrgResponse = yield call(request, {
      url: `${API_URL}/organizations/${action.orgId}`,
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(action.payload),
    })

    yield put(updateOrgActions.success(response))
    yield put(fetchOrgActions.request(action.orgId))
    yield put(openNotification('success', 'Your organisation was successfully updated!', 3000))
  } catch (error) {
    yield put(updateOrgActions.error(error.message))
    yield put(authActions.handleSessionExpire())
  }
}

export function * switchOrgSaga (
  action: ReturnType<typeof switchOrgActions.request>,
) {
  try {
    yield call(request, {
      url: `${API_URL}/users/${action.payload.id}/organizations/${action.payload.orgId}`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(action.payload),
    })

    yield put(switchOrgActions.success())
    yield put(getProfileActions.request())
  } catch (error) {
    yield put(switchOrgActions.error(error.message))
    yield put(authActions.handleSessionExpire())
  }
}

export function * deleteAccountSaga () {
  try {
    yield call(request, {
      url: `${API_URL}/users`,
      method: 'DELETE',
    })

    localStorage.removeItem(STATE_STORAGE)
    localStorage.removeItem('attemptingSignInWithProvider')

    yield put(deleteAccountActions.success())
    yield put(openNotification('success', 'Account deleted successfully.', 3000))
    yield put(authActions.logout())
  } catch (error) {
    yield put(deleteAccountActions.error())
    yield put(openNotification('error', `Failed to delete account. ${error.message}`, 3000))
    yield put(authActions.handleSessionExpire())
  }
}

function * rootSaga () {
  yield takeLatest(ProfileActionTypes.CHANGE_ROLE_REQUEST, changeRoleSaga)
  yield takeLatest(ProfileActionTypes.CONFIRM_INVITE_MEMBER_REQUEST, confirmInviteSaga)
  yield takeLatest(ProfileActionTypes.CREATE_ORG_REQUEST, createOrgSaga)
  yield takeLatest(ProfileActionTypes.DELETE_ACCOUNT_REQUEST, deleteAccountSaga)
  yield takeLatest(ProfileActionTypes.FETCH_ORG_REQUEST, fetchOrgSaga)
  yield takeLatest(ProfileActionTypes.FETCH_ROLE_OPTIONS_REQUEST, fetchRoleOptionsSaga)
  yield takeLatest(ProfileActionTypes.FETCH_TEAM_MEMBERS_REQUEST, fetchTeamMembersSaga)
  yield takeLatest(ProfileActionTypes.GET_PROFILE_REQUEST, getProfileSaga)
  yield takeLatest(ProfileActionTypes.INVITE_MEMBER_REQUEST, inviteMemberSaga)
  yield takeLatest(ProfileActionTypes.SWITCH_ORG_REQUEST, switchOrgSaga)
  yield takeLatest(ProfileActionTypes.UPDATE_ORG_REQUEST, updateOrgSaga)
  yield takeLatest(ProfileActionTypes.UPDATE_PROFILE_REQUEST, updateProfileSaga)
}

export default rootSaga
