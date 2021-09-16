import { AnyAction, Dispatch } from "redux";
import { History } from "history";
import cookie from "js-cookie";

import { REMOVE_TEAM_MEMBER_SUCCESS } from "./actions/removeTeamMember";

export const COO_KEY = "apiSuiteSession";
export const HACK_KEY = "hk";

export const selfRemoveFromTeamMiddleware = (history: History) => () => (next: Dispatch) => (action: AnyAction) => {
  next(action);

  switch (action.type) {
    case REMOVE_TEAM_MEMBER_SUCCESS: {
      // If the user removes himself from a team, redirect him to the 'Profile' for him to potentially choose a new org
      if (action.idOfCurrentUser === action.idOfUserToRemove) {
        cookie.remove(COO_KEY, { path: "/" });
        cookie.remove(HACK_KEY, { path: "/" });
        history.replace("/auth/signin");
      }

      break;
    }

    default:
      break;
  }
};
