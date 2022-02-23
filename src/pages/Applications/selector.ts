import { createSelector } from "reselect";
import { Store } from "store/types";

export const applicationsSelector = createSelector(
  ({ applications }: Store) => applications,
  ({ profile }: Store) => profile,
  ({ auth }: Store) => auth,
  (applications, profile, auth) => {
    return {
      allBlueprintApps: applications.allBlueprintApps,
      allUserApps: applications.userApps,
      createUserAppStatus: applications.createAppStatus,
      currentOrganisation: profile.profile.currentOrg,
      deleteUserAppStatus: applications.deleteAppStatus,
      org: profile.org,
      updateUserAppStatus: applications.updateAppStatus,
      user: auth.user,
    };
  },
);
