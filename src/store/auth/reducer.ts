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
import { SUBMIT_SIGN_UP_DETAILS, SUBMIT_SIGN_UP_DETAILS_ERROR, SUBMIT_SIGN_UP_DETAILS_SUCCESS } from "./actions/submitSignUpDetails";
import { CLEAR_SIGN_UP_DETAILS_ACTION } from "./actions/clearSignUpDetails";

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

  signUpName: "",
  signUpEmail: "",
  signUpOrgName: "",
  signUpOrgWebsite: "",
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

    case SSO_PROVIDERS_SUCCESS: {
      return update(state, {
        providers: { $set: action.providers },
      });
    }

    case SUBMIT_SIGN_UP_DETAILS: {
      return update(state, {
        isSignUpWorking: { $set: true },
      });
    }

    case SUBMIT_SIGN_UP_DETAILS_SUCCESS:
    case SUBMIT_SIGN_UP_DETAILS_ERROR: {
      return update(state, {
        isSignUpWorking: { $set: false },
      });
    }

    case CLEAR_SIGN_UP_DETAILS_ACTION: {
      return update(state, {
        signUpName: { $set: "" },
        signUpEmail: { $set: "" },
        signUpOrgName: { $set: "" },
        signUpOrgWebsite: { $set: "" },
        signUpError: { $set: undefined },
        isSignUpWorking: { $set: false },
      });
    }

    default:
      return state;
  }
};

export default reducer;
