import { createSelector } from "reselect";
import { Store } from "store/types";

export const notificationCardSelector = createSelector(
  ({ notificationCards }: Store) => notificationCards,
  (notificationCards) => notificationCards,
);
