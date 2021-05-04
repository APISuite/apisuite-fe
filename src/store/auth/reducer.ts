import { Reducer } from "redux";
import update from "immutability-helper";
import cookie from "js-cookie";

import { LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, LOGIN_USER, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS } from "./actions/login";
import { FORGOT_PASSWORD, FORGOT_PASSWORD_SUCCESS } from "./actions/forgotPassword";
import { LOGOUT } from "./actions/logout";
import { SSO_PROVIDERS_SUCCESS } from "./actions/ssoProviders";
import { AuthActions } from "./actions/types";
import { COO_KEY } from "./middleware";
import { AuthStore } from "./types";
import {
  VALIDATE_INVITATION_TOKEN_SUCCESS,
  ACCEPT_INVITATION_WITH_SIGN_IN_ERROR,
  ACCEPT_INVITATION_ERROR,
  INVITATION_SIGN_IN_ERROR,
  VALIDATE_INVITATION_TOKEN_ERROR,
} from "./actions/invitation";
import { SUBMIT_SIGN_UP_CREDENTIALS, SUBMIT_SIGN_UP_CREDENTIALS_ERROR, SUBMIT_SIGN_UP_CREDENTIALS_SUCCESS } from "./actions/submitSignUpCredentials";
import { SUBMIT_SIGN_UP_ORGANISATION, SUBMIT_SIGN_UP_ORGANISATION_ERROR, SUBMIT_SIGN_UP_ORGANISATION_SUCCESS } from "./actions/submitSignUpOrganisation";
import { SUBMIT_SIGN_UP_DETAILS, SUBMIT_SIGN_UP_DETAILS_ERROR, SUBMIT_SIGN_UP_DETAILS_SUCCESS } from "./actions/submitSignUpDetails";

// FIXME: remove the need for auth cookies as they are no longer used effectively
const authToken = cookie.get(COO_KEY) || "";

const initialState: AuthStore = {
  authToken,
  error: undefined,
  isAuthorizing: false,
  isRecoveringPassword: false,
  isSignUpWorking: false,
  providers: null,
  user: undefined,
  providerSignupURL: "",
  invitation: {
    organization: "",
    email: "",
    isUser: false,
    hasOrganizations: false,
  },
};

const reducer: Reducer<AuthStore, AuthActions> = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return update(state, {
        isAuthorizing: { $set: true },
        error: { $set: undefined },
      });
    }

    case LOGIN_USER: {
      return update(state, {
        isAuthorizing: { $set: true },
      });
    }

    case LOGIN_SUCCESS: {
      return update(state, {
        authToken: { $set: "TOKEN_COMES_FROM_BE_IN_COOKIE" },
        error: { $set: undefined },
      });
    }

    case LOGIN_USER_SUCCESS: {
      const { user } = action;
      return update(state, {
        user: { $set: user },
        isAuthorizing: { $set: false },
      });
    }

    case FORGOT_PASSWORD: {
      return update(state, {
        isRecoveringPassword: { $set: true },
      });
    }

    case FORGOT_PASSWORD_SUCCESS: {
      return update(state, {
        isRecoveringPassword: { $set: false },
      });
    }

    case VALIDATE_INVITATION_TOKEN_SUCCESS: {
      return update(state, {
        invitation: { $set: action.invitation },
      });
    }

    case LOGIN_ERROR:
    case LOGIN_USER_ERROR:
    case ACCEPT_INVITATION_WITH_SIGN_IN_ERROR:
    case ACCEPT_INVITATION_ERROR:
    case INVITATION_SIGN_IN_ERROR:
    case VALIDATE_INVITATION_TOKEN_ERROR: {
      return update(state, {
        error: { $set: action.error || "Whooops, something went wrong..." },
        isAuthorizing: { $set: false },
      });
    }

    case LOGOUT: {
      return initialState;
    }

    // FIXME: why do we do this? this might not work as expected
    // case LOCATION_CHANGE: {
    //   if (action.payload.action === 'POP') {
    //     return update(state, {
    //       error: { $set: undefined },
    //       providers: { $set: null },
    //     })
    //   }

    //   return state
    // }

    case SSO_PROVIDERS_SUCCESS: {
      return update(state, {
        providers: { $set: action.providers },
      });
    }

    case SUBMIT_SIGN_UP_CREDENTIALS_ERROR:
    case SUBMIT_SIGN_UP_ORGANISATION_ERROR:
    case SUBMIT_SIGN_UP_DETAILS_ERROR: {
      return update(state, {
        signUpError: { $set: action.error },
        isSignUpWorking: { $set: false },
      });
    }

    case SUBMIT_SIGN_UP_CREDENTIALS:
    case SUBMIT_SIGN_UP_ORGANISATION:
    case SUBMIT_SIGN_UP_DETAILS: {
      return update(state, {
        isSignUpWorking: { $set: true },
      });
    }

    case SUBMIT_SIGN_UP_CREDENTIALS_SUCCESS: {
      return update(state, {
        registrationToken: { $set: action.token },
        signUpError: { $set: undefined },
        isSignUpWorking: { $set: false },
      });
    }

    case SUBMIT_SIGN_UP_ORGANISATION_SUCCESS:
    case SUBMIT_SIGN_UP_DETAILS_SUCCESS: {
      return update(state, {
        signUpError: { $set: undefined },
        isSignUpWorking: { $set: false },
      });
    }

    default:
      return state;
  }
};

export default reducer;
