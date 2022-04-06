import { AnyAction, Dispatch } from "redux";
import { LOCAL_STORAGE_KEYS } from "constants/global";
import { SWITCH_ORG } from "./actions/switchOrg";
import { SwitchOrgAction } from "./actions/types";

export const createProfileMiddleware = () => () => (next: Dispatch) => (action: AnyAction) => {
  next(action);

  if (action.type === SWITCH_ORG) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.STORED_ORG, (action as SwitchOrgAction).newOrg.id.toString());
    } catch (error) {
      // ignore
    }
  }
};
