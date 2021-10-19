import { createSelector } from "reselect";
import { Store } from "store/types";

export const apiDetailsSelector = createSelector(
  ({ apiDetails }: Store) => apiDetails,
  ({ applications }: Store) => applications,
  ({ auth }: Store) => auth,
  ({ profile }: Store) => profile,
  ({ subscriptions }: Store) => subscriptions,
  (apiDetails, applications, auth, profile, subscriptions) => {
    return {
      allUserApps: applications.userApps,
      apiDetails,
      orgDetails: profile.profile.current_org,
      subscriptions,
      userDetails: auth.user,
    };
  },
);
