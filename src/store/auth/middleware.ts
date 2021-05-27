import { AnyAction, Dispatch } from "redux";
import { History } from "history";
import cookie from "js-cookie";

import { LOGIN_ERROR, LOGIN_SUCCESS, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS } from "./actions/login";
import { LOGOUT, LOGOUT_ERROR } from "./actions/logout";
import { REJECT_INVITATION_SUCCESS } from "./actions/invitation";

export const COO_KEY = "apiSuiteSession";
export const COO_KEY_MAX_AGE = 30 * 24 * 60; // <-- 1 month

export const createAuthMiddleware = (history: History) => () => (next: Dispatch) => (action: AnyAction) => {
  next(action);

  if (action.type === LOGIN_SUCCESS) {
    cookie.set(COO_KEY, "TOKEN_COMES_FROM_BE_IN_COOKIE", {
      expires: new Date(new Date().getTime() + COO_KEY_MAX_AGE * 60 * 1000),
      path: "/",
    });
  } else if (action.type === LOGIN_ERROR || action.type === LOGIN_USER_ERROR) {
    cookie.remove(COO_KEY, { path: "/" });
    history.replace("/auth/signin");
  } else if (action.type === LOGOUT || action.type === LOGOUT_ERROR) {
    cookie.remove(COO_KEY, { path: "/" });
    history.replace("/auth/signin");
  } else if (action.type === REJECT_INVITATION_SUCCESS || action.type === LOGIN_USER_SUCCESS) {
    history.push(action.path);
  }
};
