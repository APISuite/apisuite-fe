import { createSelector } from "reselect";
import { Store } from "store/types";

export const organisationSelector = createSelector(
  ({ profile }: Store) => profile,
  ({ profile, org }) => {
    return { profile, org };
  },
);
