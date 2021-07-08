import { createSelector } from "reselect";
import { Store } from "store/types";

export const invitationFormSelector = createSelector(
  ({ auth }: Store) => auth,
  ({ profile }: Store) => profile,
  (auth, profile) => ({
    isLogged: !!auth.authToken,
    invitation: auth.invitation,
    invitationError: auth.error,
    user: profile.profile.user,
  }),
);
