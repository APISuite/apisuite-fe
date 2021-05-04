import { createSelector } from "reselect";
import { Store } from "store/types";

export const dashboardSelector = createSelector(
  ({ subscriptions }: Store) => subscriptions,
  ({ auth }: Store) => auth,
  ({ notificationCards }: Store) => notificationCards,
  ({ profile }: Store) => profile,
  (subscriptions, auth, notificationCards, profile) => {
    return { subscriptions, auth, notificationCards, profile };
  },
);
