import { createSelector } from "reselect";
import { Store } from "store/types";

export const dashboardSelector = createSelector(
  ({ auth }: Store) => auth,
  ({ gatewaySettings }: Store) => gatewaySettings,
  ({ notificationCards }: Store) => notificationCards,
  ({ profile }: Store) => profile,
  ({ subscriptions }: Store) => subscriptions,
  (auth, gatewaySettings, notificationCards, profile, subscriptions) => {
    return { auth, gatewaySettings, notificationCards, profile, subscriptions };
  },
);
