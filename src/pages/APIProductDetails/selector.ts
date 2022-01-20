import { createSelector } from "reselect";
import { Store } from "store/types";

export const apiDetailsSelector = createSelector(
  ({ apiDetails }: Store) => apiDetails,
  ({ applications }: Store) => applications,
  ({ profile }: Store) => profile,
  ({ subscriptions }: Store) => subscriptions,
  (apiDetails, applications, profile, subscriptions) => {
    return {
      allUserApps: applications.userApps,
      apiDetails,
      error: apiDetails.error,
      orgDetails: profile.profile.currentOrg,
      requested: apiDetails.requested,
      subscriptions,
      userDetails: profile.profile.user,
    };
  },
);
