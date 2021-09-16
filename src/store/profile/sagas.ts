import { call, put, select, takeLatest } from "redux-saga/effects";
import { i18n } from "@apisuite/fe-base";

import { API_URL } from "constants/endpoints";
import { CHANGE_ROLE, changeRoleError, changeRoleSuccess } from "./actions/changeRole";
import { ChangeRoleAction, ConfirmInviteMemberAction, CreateOrgAction, FetchOrgAction, FetchTeamMembersAction, InviteTeamMemberAction, RemoveTeamMemberAction, SwitchOrgAction, UpdateOrgAction, UpdateProfileAction } from "./actions/types";
import { CONFIRM_INVITE_MEMBER, confirmInviteMemberError, confirmInviteMemberSuccess } from "./actions/confirmInviteMember";
import { CREATE_ORG, createOrgError, createOrgSuccess } from "./actions/createOrg";
import { DELETE_ACCOUNT, deleteAccountError, deleteAccountSuccess } from "./actions/deleteAccount";
import { FETCH_ORG, fetchOrgError, fetchOrgSuccess } from "./actions/fetchOrg";
import { FETCH_ROLE_OPTIONS, fetchRoleOptionsError, fetchRoleOptionsSuccess } from "./actions/fetchRoleOptions";
import { FETCH_TEAM_MEMBERS, fetchTeamMembers, fetchTeamMembersError, fetchTeamMembersSuccess } from "./actions/fetchTeamMembers";
import { FetchRoleOptionsResponse, FetchTeamMembersResponse, GetProfileResponse, OrgDetailsResponse, UpdateProfileResponse } from "./types";
import { GET_PROFILE, getProfile, getProfileError, getProfileSuccess } from "./actions/getProfile";
import { handleSessionExpire } from "store/auth/actions/expiredSession";
import { INVITE_TEAM_MEMBER, inviteTeamMemberError, inviteTeamMemberSuccess } from "./actions/inviteTeamMember";
import { LOCAL_STORAGE_KEYS } from "constants/global";
import { logout } from "store/auth/actions/logout";
import { openNotification } from "store/notificationStack/actions/notification";
import { removeTeamMemberError, removeTeamMemberSuccess, REMOVE_TEAM_MEMBER } from "./actions/removeTeamMember";
import { Store } from "store/types";
import { SWITCH_ORG, switchOrgError, switchOrgSuccess } from "./actions/switchOrg";
import { UPDATE_ORG, updateOrgError, updateOrgSuccess } from "./actions/updateOrg";
import { UPDATE_PROFILE, updateProfileError, updateProfileSuccess } from "./actions/updateProfile";
import request from "util/request";

export function* fetchTeamMembersSaga(action: FetchTeamMembersAction) {
  try {
    let orgID = action.orgID;

    if (!action.orgID) {
      orgID = yield select((state: Store) => state.profile.profile.current_org.id);
    }

    const members: FetchTeamMembersResponse[] = yield call(request, {
      url: `${API_URL}/organizations/${orgID}/users`,
      method: "GET",
    });

    yield put(fetchTeamMembersSuccess({ members }));
  } catch (error) {
    yield put(fetchTeamMembersError({ error: error.message }));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

export function* fetchRoleOptionsSaga() {
  try {
    const roles: FetchRoleOptionsResponse = yield call(request, {
      url: `${API_URL}/roles`,
      method: "GET",
    });

    yield put(fetchRoleOptionsSuccess({ roles }));
  } catch (error) {
    yield put(fetchRoleOptionsError({ error: error.message }));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

export function* inviteMemberSaga(action: InviteTeamMemberAction) {
  try {
    yield call(request, {
      url: `${API_URL}/organizations/${action.orgID}/users`,
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: JSON.stringify({
        email: action.email,
        role_id: action.role_id,
      }),
    });

    yield put(inviteTeamMemberSuccess({}));
    yield put(openNotification("success", i18n.t("messages.inviteMember.success"), 3000));
  } catch (error) {
    yield put(inviteTeamMemberError({ error: error.message || "Invitation failed." }));
    yield put(openNotification("error", i18n.t("messages.inviteMember.error"), 3000));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

export function* removeMemberSaga(action: RemoveTeamMemberAction) {
  try {
    yield call(request, {
      url: `${API_URL}/organizations/${action.orgID}/users/${action.idOfUserToRemove}`,
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });

    yield put(removeTeamMemberSuccess({}));
    yield put(openNotification("success", i18n.t("messages.removeMember.success"), 3000));
    if (action.idOfCurrentUser === action.idOfUserToRemove.toString()) yield put(logout({}));
  } catch (error) {
    yield put(removeTeamMemberError({ error: error.message || "Invitation failed." }));
    yield put(openNotification("error", i18n.t("messages.removeMember.error"), 3000));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

export function* confirmInviteSaga({ token }: ConfirmInviteMemberAction) {
  try {
    yield call(request, {
      url: `${API_URL}/users/invite/confirm`,
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: JSON.stringify({ token }),
    });

    yield put(confirmInviteMemberSuccess({}));
    yield put(openNotification("success", "You were added to a team! Check your new organisation on your profile!", 5000));
  } catch (error) {
    yield put(confirmInviteMemberError({ error: error.message }));
  }
}

export function* changeRoleSaga({ type, ...rest }: ChangeRoleAction) {
  try {
    yield call(request, {
      url: `${API_URL}/organizations/assign`,
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: JSON.stringify({ ...rest }),
    });

    yield put(changeRoleSuccess({}));
    yield put(fetchTeamMembers({}));
    yield put(openNotification("success", "Role updaded successfully.", 3000));
  } catch (error) {
    yield put(changeRoleError({ error: error.message }));
    yield put(openNotification("error", "Failed to update role.", 3000));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

export function* getProfileSaga() {
  try {
    const profile: GetProfileResponse = yield call(request, {
      url: `${API_URL}/users/profile`,
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    yield put(getProfileSuccess({ profile }));
  } catch (error) {
    yield put(getProfileError({ error: error.message }));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

export function* updateProfileSaga({ userId, type, ...rest }: UpdateProfileAction) {
  try {
    const response: UpdateProfileResponse = yield call(request, {
      // url: `${API_URL}/users/profile/update`,
      url: `${API_URL}/users/${userId}`,
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      data: JSON.stringify({ ...rest }),
    });

    yield put(updateProfileSuccess(response));
    yield put(getProfile({}));
  } catch (error) {
    yield put(updateProfileError({ error: error.message }));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

export function* fetchOrgSaga(action: FetchOrgAction) {
  try {
    let orgId = action.org_id;

    if (!orgId) {
      yield call(getProfileSaga);
      orgId = yield select((state: Store) => state.profile.profile.current_org.id);
    }

    const org: OrgDetailsResponse = yield call(request, {
      url: `${API_URL}/organizations/${orgId}`,
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    yield put(fetchOrgSuccess({ org }));
  } catch (error) {
    yield put(fetchOrgError({ error: error.message }));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

export function* createOrgSaga({ newOrgInfo }: CreateOrgAction) {
  try {
    const org: OrgDetailsResponse = yield call(request, {
      url: `${API_URL}/organizations/`,
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: JSON.stringify(newOrgInfo),
    });

    yield put(createOrgSuccess({ org }));
    yield put(openNotification("success", "Your organisation was successfully created!", 3000));
  } catch (error) {
    yield put(createOrgError({ error: error.message }));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

export function* updateOrgSaga({ orgId, orgInfo }: UpdateOrgAction) {
  try {
    const updatedOrgDetails: OrgDetailsResponse = yield call(request, {
      url: `${API_URL}/organizations/${orgId}`,
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      data: JSON.stringify(orgInfo),
    });

    yield put(updateOrgSuccess({ updatedOrgDetails }));
    yield put(openNotification("success", "Your organisation was successfully updated!", 3000));
  } catch (error) {
    yield put(updateOrgError({ error: error.message }));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

export function* switchOrgSaga({ type, ...props }: SwitchOrgAction) {
  try {
    yield call(request, {
      url: `${API_URL}/users/${props.id}/organizations/${props.orgId}`,
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: JSON.stringify(props),
    });

    yield put(switchOrgSuccess({}));
    yield put(getProfile({}));
  } catch (error) {
    yield put(switchOrgError({ error: error.message }));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

export function* deleteAccountSaga() {
  try {
    yield call(request, {
      url: `${API_URL}/users`,
      method: "DELETE",
    });

    // FIXME: this should be in the middleware and reacting to deleteAccountSuccess
    localStorage.removeItem(LOCAL_STORAGE_KEYS.SSO_STATE_STORAGE);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.SSO_PROVIDER_STATE_STORAGE);

    yield put(deleteAccountSuccess({}));
    yield put(openNotification("success", "Account deleted successfully.", 3000));
    yield put(logout({}));
  } catch (error) {
    yield put(deleteAccountError({ error: error.message }));
    yield put(openNotification("error", `Failed to delete account. ${error.message}`, 3000));
    if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
      yield put(handleSessionExpire({}));
    }
  }
}

function* rootSaga() {
  yield takeLatest(CHANGE_ROLE, changeRoleSaga);
  yield takeLatest(CONFIRM_INVITE_MEMBER, confirmInviteSaga);
  yield takeLatest(CREATE_ORG, createOrgSaga);
  yield takeLatest(DELETE_ACCOUNT, deleteAccountSaga);
  yield takeLatest(FETCH_ORG, fetchOrgSaga);
  yield takeLatest(FETCH_ROLE_OPTIONS, fetchRoleOptionsSaga);
  yield takeLatest(FETCH_TEAM_MEMBERS, fetchTeamMembersSaga);
  yield takeLatest(GET_PROFILE, getProfileSaga);
  yield takeLatest(INVITE_TEAM_MEMBER, inviteMemberSaga);
  yield takeLatest(REMOVE_TEAM_MEMBER, removeMemberSaga);
  yield takeLatest(SWITCH_ORG, switchOrgSaga);
  yield takeLatest(UPDATE_ORG, updateOrgSaga);
  yield takeLatest(UPDATE_PROFILE, updateProfileSaga);
}

export default rootSaga;
