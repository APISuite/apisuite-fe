import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import qs from "qs";
import { DefaultConfig } from "@apisuite/fe-base";

import request from "util/request";
import stateGenerator from "util/stateGenerator";
import { openNotification } from "store/notificationStack/actions/notification";
import { Profile } from "store/profile/types";
import { API_URL } from "constants/endpoints";
import { ROLES, LOCAL_STORAGE_KEYS } from "constants/global";
import { Store } from "store/types";
import { LOGIN, loginError, loginSuccess, loginUserError, loginUserSuccess, LOGIN_SUCCESS, LOGIN_USER } from "./actions/login";
import { EXPIRED_SESSION } from "./actions/expiredSession";
import { forgotPasswordError, forgotPasswordSuccess, FORGOT_PASSWORD } from "./actions/forgotPassword";
import { logout, LOGOUT, logoutError, logoutSuccess } from "./actions/logout";
import { recoverPasswordError, recoverPasswordSuccess, RECOVER_PASSWORD } from "./actions/recoverPassword";
import { SSO_LOGIN } from "./actions/ssoLogin";
import { ssoProvidersSuccess, SSO_PROVIDERS } from "./actions/ssoProviders";
import { SSO_TOKEN_EXCHANGE } from "./actions/ssoTokenExchange";
import {
  ConfirmRegistrationAction,
  ForgotPasswordAction,
  LoginAction,
  RecoverPasswordAction,
  SSOLoginAction,
  SSOTokenExchangeAction,
  SubmitSignUpDetails,
  ValidateRegistrationTokenAction,
  AcceptInvitationWithSSOSignInAction,
  InvitationSSOSignInAction,
  AcceptInvitationAction,
  RejectInvitationAction,
  ValidateInvitationTokenAction,
  SubmitSignUpOrganisation,
  SubmitSignUpCredentials,
  InvitationSignInAction,
  InvitationSignUpAction,
} from "./actions/types";

import { confirmRegistrationSuccess, CONFIRM_REGISTRATION } from "./actions/confirmRegistration";
import { validateRegistrationTokenError, validateRegistrationTokenSuccess, VALIDATE_REGISTRATION_TOKEN } from "./actions/validateRegistrationToken";

import { submitSignUpDetailsError, submitSignUpDetailsSuccess, SUBMIT_SIGN_UP_DETAILS } from "./actions/submitSignUpDetails";
import {
  acceptInvitationSuccess,
  acceptInvitationError,
  acceptInvitationWithSSOSignInSuccess,
  acceptInvitationWithSSOSignInError,
  invitationSSOSignInError,
  invitationSignInSuccess,
  invitationSignInError,
  invitationSignUpSuccess,
  invitationSignUpError,
  rejectInvitationSuccess,
  rejectInvitationError,
  validateInvitationTokenSuccess,
  validateInvitationTokenError,
  ACCEPT_INVITATION,
  ACCEPT_INVITATION_WITH_SSO_SIGN_IN,
  INVITATION_SSO_SIGN_IN,
  REJECT_INVITATION,
  VALIDATE_INVITATION_TOKEN,
  INVITATION_SIGN_IN,
  INVITATION_SIGN_UP,
} from "./actions/invitation";

import { Invitation } from "./types";
import { submitSignUpCredentialsError, submitSignUpCredentialsSuccess, SUBMIT_SIGN_UP_CREDENTIALS } from "./actions/submitSignUpCredentials";
import { submitSignUpOrganisationError, submitSignUpOrganisationSuccess, SUBMIT_SIGN_UP_ORGANISATION } from "./actions/submitSignUpOrganisation";

function * loginWorker (action: LoginAction) {
  try {
    const loginUrl = `${API_URL}/auth/login`;

    const data = {
      email: action.email,
      password: action.password,
    };

    yield call(request, {
      url: loginUrl,
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify(data),
    });

    yield put(loginSuccess({}));
  } catch (error) {
    yield put(loginError({ error: error.message }));
  }
}

function * loginUserWorker () {
  try {
    const profile: Profile = yield call(request, {
      url: `${API_URL}/users/profile`,
      method: "GET",
    });

    const user = profile.user;
    const userId = user.id;
    const userName = user.name.split(" ");
    const currentOrg = profile.current_org;

    // TODO: better types for this response
    const settings: { navigation: DefaultConfig["navigation"] } = yield call(request, {
      url: `${API_URL}/settings`,
      method: "GET",
    });

    const path = settings?.navigation[currentOrg?.role?.name || "baseUser"]?.events.afterLogin ?? "/";

    yield put(loginUserSuccess({
      path,
      user: {
        fName: userName[0],
        lName: userName[userName.length - 1],
        id: Number(userId),
        role: {
          id: currentOrg?.role?.id ?? `${ROLES.baseUser.level}`,
          name: currentOrg?.role?.name ?? ROLES.baseUser.value,
        },
      },
    }));
  } catch (error) {
    yield put(loginUserError({ error: error.message }));
  }
}

function * forgotPasswordSaga ({ email }: ForgotPasswordAction) {
  try {
    yield call(request, {
      url: `${API_URL}/users/forgot`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ email }),
    });

    yield put(forgotPasswordSuccess({}));
  } catch (error) {
    forgotPasswordError({ error: error.message });
  }
}

function * recoverPasswordSaga ({ password, token }: RecoverPasswordAction) {
  try {
    yield call(request, {
      url: `${API_URL}/users/recover`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ password, token }),
    });

    yield put(recoverPasswordSuccess({}));

    // FIXME: use middleware
    // action.history.replace('auth/login')

    yield put(openNotification("success", "Password successfully changed! You may now sign in.", 3000));
  } catch (error) {
    recoverPasswordError({ error: error.message });
  }
}

function * logoutWorker () {
  try {
    const logoutUrl = `${API_URL}/auth/logout`;

    yield call(request, {
      url: logoutUrl,
      method: "POST",
    });

    yield put(logoutSuccess({}));
  } catch (error) {
    yield put(logoutError({ error: error.message }));
  }
}

function * expiredSessionWorker () {
  try {
    // Tries to exchange the refresh token for a new access token
    yield call(request, {
      url: `${API_URL}/auth/refresh`,
      method: "POST",
    });
  } catch (error) {
    // If the token has expired, we sign out
    const authToken: string = yield select((state: Store) => state.auth.authToken);

    // We only sign out if we have the session token
    if (authToken) {
      if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
        yield put(openNotification("error", "Your session has expired! You need to sign in again.", 5000));
        yield delay(1000);
        yield put(logout({}));
      }
    }
  }
}

function * getProviders () {
  try {
    const settingsURL = `${API_URL}/settings`;

    const response: { sso: string[] } = yield call(request, {
      url: settingsURL,
      method: "GET",
    });

    yield put(ssoProvidersSuccess({ providers: response.sso }));
  } catch (error) {
    console.log("Error retrieving SSO providers.");
  }
}

function * ssoLoginWorker ({ provider }: SSOLoginAction) {
  try {
    let state = localStorage.getItem(LOCAL_STORAGE_KEYS.SSO_STATE_STORAGE);

    if (!state) {
      state = stateGenerator();

      localStorage.setItem(LOCAL_STORAGE_KEYS.SSO_STATE_STORAGE, state);
    }

    const ssoLoginUrl = `${API_URL}/auth/oidc/${provider}?state=${state}`;

    const response: { url: string } = yield call(window.fetch, ssoLoginUrl);

    window.location.href = response.url;
  } catch (error) {
    yield put(loginError({ error: error.message }));
  }
}

function * ssoTokenExchangeWorker ({ code, provider }: SSOTokenExchangeAction) {
  try {
    const ssoLoginUrl = `${API_URL}/auth/oidc/${provider}/token`;

    yield call(request, {
      url: ssoLoginUrl,
      method: "POST",
      data: { code },
    });

    // FIXME: move to middleware
    localStorage.removeItem(LOCAL_STORAGE_KEYS.SSO_STATE_STORAGE);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.SSO_PROVIDER_STATE_STORAGE);

    yield put(loginSuccess({}));

    // FIXME: move to middleware
    // window.location.href = "/auth";
  } catch (error) {
    yield put(loginError({ error: error.message }));
  }
}

export function * submitSignUpCredentialsSaga ({ details }: SubmitSignUpCredentials) {
  try {
    const { token }: { token: string } = yield call(request, {
      url: `${API_URL}/registration/user`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        name: details.name,
        email: details.email,
      }),
    });

    yield put(submitSignUpCredentialsSuccess({ token }));
  } catch (error) {
    yield put(submitSignUpCredentialsError({ error: error.message }));
  }
}

export function * submitSignUpOrganisationSaga ({ details }: SubmitSignUpOrganisation) {
  try {
    const registrationToken: string = yield select((state: Store) => state.auth.registrationToken);

    yield call(request, {
      url: `${API_URL}/registration/organization`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        name: details.orgName,
        website: details.website,
        registrationToken,
      }),
    });

    yield put(submitSignUpOrganisationSuccess({}));
  } catch (error) {
    yield put(submitSignUpOrganisationError({ error: error.message }));
  }
}

export function * submitSignUpDetailsSaga ({ details }: SubmitSignUpDetails) {
  try {
    const registrationToken: string = yield select((state: Store) => state.auth.registrationToken);

    yield call(request, {
      url: `${API_URL}/registration/security`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        password: details.password,
        registrationToken,
      }),
    });

    yield put(submitSignUpDetailsSuccess({}));
  } catch (error) {
    yield put(submitSignUpDetailsError({ error: error.message }));
  }
}

export function * confirmRegistrationSaga ({ token }: ConfirmRegistrationAction) {
  try {
    yield call(request, {
      url: `${API_URL}/registration/confirm`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ token }),
    });

    yield put(openNotification("success", "We have confirmed your account! You can now sign in.", 4000));
    yield put(confirmRegistrationSuccess({}));
  } catch (error) {
    yield put(confirmRegistrationSuccess({ error: error.message }));
  }
}

export function * validateRegisterTokenSaga ({ token }: ValidateRegistrationTokenAction) {
  try {
    yield call(request, {
      url: `${API_URL}/registration/invitation`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ token }),
    });

    yield put(validateRegistrationTokenSuccess({}));
  } catch (error) {
    yield put(validateRegistrationTokenError({ error: error.message }));
  }
}

export function * invitationWithSSOSignInSaga ({ token, code, provider }: AcceptInvitationWithSSOSignInAction) {
  try {
    yield call(request, {
      url: `${API_URL}/auth/oidc/${provider}/token?invite=true`,
      method: "POST",
      data: { code },
    });

    yield call(request, {
      url: `${API_URL}/invites/${token}/accept`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // FIXME: move to middleware
    localStorage.removeItem(LOCAL_STORAGE_KEYS.SSO_STATE_STORAGE);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.SSO_INVITATION_STATE_STORAGE);
    yield put(loginSuccess({}));
    yield put(acceptInvitationWithSSOSignInSuccess({}));
    yield put(openNotification("success", "You have accepted your invitation.", 4000));
  } catch (error) {
    yield put(acceptInvitationWithSSOSignInError(error));
  }
}

export function * invitationSSOSignInSaga ({ token, provider }: InvitationSSOSignInAction) {
  try {
    let state = localStorage.getItem(LOCAL_STORAGE_KEYS.SSO_STATE_STORAGE);

    if (!state) {
      state = stateGenerator();
      localStorage.setItem(LOCAL_STORAGE_KEYS.SSO_STATE_STORAGE, state);
    }
    localStorage.setItem(LOCAL_STORAGE_KEYS.SSO_INVITATION_STATE_STORAGE, token);

    const ssoLoginURL = `${API_URL}/auth/oidc/${provider}?state=${state}&invite=true`;
    const response: { url: string } = yield call(window.fetch, ssoLoginURL);

    window.location.href = response.url;
  } catch (error) {
    yield put(invitationSSOSignInError(error));
  }
}

export function * acceptInvitationSaga ({ token }: AcceptInvitationAction) {
  try {
    yield call(request, {
      url: `${API_URL}/invites/${token}/accept`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    yield put(openNotification("success", "You have accepted your invitation.", 4000));
    yield put(loginSuccess({}));
    yield put(acceptInvitationSuccess({}));
  } catch (error) {
    yield put(acceptInvitationError({ error: error.message }));
  }
}

export function * rejectInvitationSaga ({ token }: RejectInvitationAction) {
  try {
    yield call(request, {
      url: `${API_URL}/invites/${token}/reject`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    yield put(openNotification("success", "You have rejected your invitation.", 4000));
    yield put(rejectInvitationSuccess({ path: "/" }));
  } catch (error) {
    yield put(rejectInvitationError({ error: error.message }));
  }
}

export function * validateInvitationTokenSaga ({ token }: ValidateInvitationTokenAction) {
  try {
    const response: Invitation = yield call(request, {
      url: `${API_URL}/invites/${token}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    yield put(validateInvitationTokenSuccess({
      invitation: response,
    }));
  } catch (error) {
    yield put(validateInvitationTokenError(error.message));
  }
}

export function * invitationSignInSaga ({ token, email, password }: InvitationSignInAction) {
  try {
    const loginUrl = `${API_URL}/auth/login`;

    yield call(request, {
      url: loginUrl,
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({ email, password }),
    });

    yield call(request, {
      url: `${API_URL}/invites/${token}/accept`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    yield put(loginSuccess({}));
    yield put(invitationSignInSuccess({}));
    yield put(openNotification("success", "You have accepted your invitation.", 4000));
  } catch (error) {
    yield put(invitationSignInError(error));
  }
}

export function * invitationSignUpSaga ({ token, name, password }: InvitationSignUpAction) {
  try {
    yield call(request, {
      url: `${API_URL}/invites/${token}/signup`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { name, password },
    });

    yield put(invitationSignUpSuccess({ path: "/" }));
    yield put(openNotification("success", "You have accepted your invitation.", 4000));
  } catch (error) {
    yield put(invitationSignUpError(error));
  }
}

export function * rootSaga () {
  yield takeLatest([LOGIN_SUCCESS, LOGIN_USER], loginUserWorker);
  yield takeLatest(EXPIRED_SESSION, expiredSessionWorker);
  yield takeLatest(FORGOT_PASSWORD, forgotPasswordSaga);
  yield takeLatest(LOGIN, loginWorker);
  yield takeLatest(LOGOUT, logoutWorker);
  yield takeLatest(RECOVER_PASSWORD, recoverPasswordSaga);
  yield takeLatest(SSO_LOGIN, ssoLoginWorker);
  yield takeLatest(SSO_PROVIDERS, getProviders);
  yield takeLatest(SSO_TOKEN_EXCHANGE, ssoTokenExchangeWorker);
  yield takeLatest(SUBMIT_SIGN_UP_CREDENTIALS, submitSignUpCredentialsSaga);
  yield takeLatest(SUBMIT_SIGN_UP_ORGANISATION, submitSignUpOrganisationSaga);
  yield takeLatest(SUBMIT_SIGN_UP_DETAILS, submitSignUpDetailsSaga);
  yield takeLatest(VALIDATE_REGISTRATION_TOKEN, validateRegisterTokenSaga);
  yield takeLatest(ACCEPT_INVITATION, acceptInvitationSaga);
  yield takeLatest(INVITATION_SSO_SIGN_IN, invitationSSOSignInSaga);
  yield takeLatest(ACCEPT_INVITATION_WITH_SSO_SIGN_IN, invitationWithSSOSignInSaga);
  yield takeLatest(REJECT_INVITATION, rejectInvitationSaga);
  yield takeLatest(VALIDATE_INVITATION_TOKEN, validateInvitationTokenSaga);
  yield takeLatest(INVITATION_SIGN_IN, invitationSignInSaga);
  yield takeLatest(INVITATION_SIGN_UP, invitationSignUpSaga);
  yield takeLatest(CONFIRM_REGISTRATION, confirmRegistrationSaga);
}

export default rootSaga;
