// Temporary until notification cards become clearer

import { Reducer, AnyAction } from "redux";
import update from "immutability-helper";

import { TOGGLE_NOTIFICATION_CARD } from "./actions/toggleNotificationCard";
import { NotificationCardsStore } from "./types";

/** Initial state */
const initialState: NotificationCardsStore = {
  show: false,
  instanceOwnerNotificationCardsData: [{}],
  nonInstanceOwnerNotificationCardsData: [{}],
};

/** Reducer */
const reducer: Reducer<NotificationCardsStore, AnyAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case TOGGLE_NOTIFICATION_CARD: {
      return update(state, {
        show: { $set: !state.show },
      });
    }

    default:
      return state;
  }
};

export default reducer;
