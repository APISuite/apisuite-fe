import { createSelector } from "reselect";
import { Store } from "store/types";

export const apiProductsSelector = createSelector(
  ({ subscriptions }: Store) => subscriptions,
  ({ auth }: Store) => auth,
  (subscriptions, auth) => {
    return { subscriptions, auth };
  },
);
