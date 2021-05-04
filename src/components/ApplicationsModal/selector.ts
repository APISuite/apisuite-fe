import { createSelector } from "reselect";
import { Store } from "store/types";

export const applicationsModalSelector = createSelector(
  ({ applications }: Store) => applications,
  (applications) => {
    return { mostRecentlySelectedAppDetails: applications.currentApp };
  },
);
