import update from "immutability-helper";
import { Reducer } from "redux";
import { CLOSE_NOTIFICATION, OPEN_NOTIFICATION } from "./actions/notification";
import { NotificationActions } from "./actions/types";
import { NotificationStackStore } from "./types";

const initialState: NotificationStackStore = {
  notifications: [],
};

const reducer: Reducer<NotificationStackStore, NotificationActions> = (state = initialState, action) => {
  const notificationNumber = state.notifications.length;

  switch (action.type) {
    case OPEN_NOTIFICATION:
      return update(state, {
        notifications: {
          $push: [{
            notificationNumber: notificationNumber,
            open: true,
            type: action.notificationType,
            msg: action.msg,
            timer: action.timer,
          }],
        },
      });

    case CLOSE_NOTIFICATION: {
      return update(state, {
        notifications: { [action.notificationNumber]: { open: { $set: false } } },
      });
    }

    default:
      return state;
  }
};

export default reducer;
