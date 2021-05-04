import { createSelector } from "reselect";
import { Store } from "store/types";

export const teamPageSelector = createSelector(
  ({ profile }: Store) => profile,
  ({ auth }: Store) => auth,
  (profile, auth) => {
    return {
      currentOrganisation: profile.profile.current_org,
      members: profile.members,
      requestStatuses: profile.requestStatuses,
      roleOptions: profile.roleOptions,
      user: auth.user,
    };
  },
);
