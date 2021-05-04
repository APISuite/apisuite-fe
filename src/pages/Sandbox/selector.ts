import { createSelector } from "reselect";
import { Store } from "store/types";

export const sandboxSelector = createSelector(
  ({ subscriptions }: Store) => subscriptions,
  ({ auth }: Store) => auth,
  (subscriptions, auth) => {
    return { subscriptions, auth };
  },
);
