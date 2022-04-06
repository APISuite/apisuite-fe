import { createSelector } from "reselect";
import { Store } from "store/types";

export const typesSelector = createSelector(
  ({ applications }: Store) => applications,
  (applications) => {
    return { types: applications.types };
  },
);
