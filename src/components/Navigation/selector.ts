import { createSelector } from "reselect";
import { Store } from "store/types";

export const navigationSelector = createSelector(
  ({ profile }: Store) => profile.profile.user,
  ({ profile }: Store) => profile.profile.currentOrg,
  ({ notificationCards }: Store) => notificationCards,
  (user, currentOrg, notificationCards) => ({ user, currentOrg, notificationCards }),
);
