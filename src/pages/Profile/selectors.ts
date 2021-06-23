import { createSelector } from "reselect";
import { Store } from "store/types";

export const getRoleName = createSelector(
  ({ profile }: Store) => profile,
  (profile) => profile.profile?.current_org?.role?.name || "anonymous",
);

export const profileSelector = createSelector(
  ({ auth }: Store) => auth,
  ({ profile }: Store) => profile,
  (auth, profile) => ({ profile: profile.profile, user: auth.user }),
);

export const getSSOAccountURLSelector = createSelector(
  ({ profile }: Store) => profile,
  (profile) => profile.profile?.ssoAccountURL,
);
