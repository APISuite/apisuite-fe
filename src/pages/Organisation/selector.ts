import { createSelector } from "reselect";
import { Store } from "store/types";

export const organisationSelector = createSelector(
  ({ auth }: Store) => auth,
  ({ profile }: Store) => profile,
  (auth, { org, profile }) => {
    return { auth, org, profile };
  },
);
