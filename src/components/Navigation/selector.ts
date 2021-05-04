import { createSelector } from "reselect";
import { Store } from "store/types";

export const navigationSelector = createSelector(
  ({ auth }: Store) => auth.user,
  ({ profile }: Store) => profile.profile.user,
  ({ notificationCards }: Store) => notificationCards,
  (user, userProfile, notificationCards) => ({ user, userProfile, notificationCards }),
);
