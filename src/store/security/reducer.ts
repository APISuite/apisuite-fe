import update from "immutability-helper";
import { UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_REQUEST_ERROR, UPDATE_PASSWORD_REQUEST_SUCCESS } from "./actions/updatePassword";
import { SecurityActions } from "./actions/types";

// Initial state
const initialState = {
  isRequesting: false,
};

// Reducer
export default function securityReducer (
  state = initialState,
  action: SecurityActions,
) {
  switch (action.type) {
    case UPDATE_PASSWORD_REQUEST:
      return update(state, {
        isRequesting: { $set: true },
      });
    case UPDATE_PASSWORD_REQUEST_SUCCESS:
    case UPDATE_PASSWORD_REQUEST_ERROR:
    default:
      return update(state, {
        isRequesting: { $set: true },
      });
  }
}
