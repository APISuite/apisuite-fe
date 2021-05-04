import { createSelector } from "reselect";
import { Store } from "store/types";

export const notificationStackSelector = createSelector(({ notifications }: Store) =>
  notifications.notifications, (notifications) => ({ notifications }));
