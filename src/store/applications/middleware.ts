import { AnyAction, Dispatch } from "redux";
import { History } from "history";
import { CREATE_APP_SUCCESS } from "./actions/createApp";
import { DELETE_APP_SUCCESS } from "./actions/deleteApp";

export const createApplicationsMiddleware = (history: History) => () => (next: Dispatch) => (action: AnyAction) => {
  next(action);

  switch (action.type) {
    case CREATE_APP_SUCCESS:
    case DELETE_APP_SUCCESS: {
      history.push("/dashboard/apps");
      break;
    }
    default:
      break;
  }
};
