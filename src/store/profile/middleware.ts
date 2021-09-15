import { AnyAction, Dispatch } from "redux";
import { History } from "history";
import { REMOVE_TEAM_MEMBER_SUCCESS } from "./actions/removeTeamMember";

export const selfRemoveFromTeamMiddleware = (history: History) => () => (next: Dispatch) => (action: AnyAction) => {
  next(action);

  switch (action.type) {
    case REMOVE_TEAM_MEMBER_SUCCESS: {
      // If the user removes himself from a team, redirect him to the 'Profile' for him to potentially choose a new org
      if (action.idOfCurrentUser === action.idOfUserToRemove) {
        history.push("/profile");
      }

      break;
    }

    default:
      break;
  }
};
