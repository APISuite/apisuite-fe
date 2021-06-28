import { createSelector } from "reselect";
import { Store } from "store/types";

export const navigationSelector = createSelector(
  ({ profile }: Store) => profile.profile.user,
  ({ profile }: Store) => profile.profile.current_org,
  ({ notificationCards }: Store) => notificationCards,
  (user, currentOrg, notificationCards) => ({ user, currentOrg, notificationCards }),
);
