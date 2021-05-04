import { createSelector } from "reselect";
import { Store } from "store/types";

export const applicationsSelector = createSelector(
  ({ applications }: Store) => applications,
  ({ profile }: Store) => profile,
  ({ auth }: Store) => auth,
  (applications, profile, auth) => {
    return {
      allUserApps: applications.userApps,
      currentOrganisation: profile.profile.current_org,
      user: auth.user,
    };
  },
);
