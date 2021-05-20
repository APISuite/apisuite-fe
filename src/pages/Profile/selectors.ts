import { createSelector } from "reselect";
import { Store } from "store/types";

export const getRoleName = createSelector(
  ({ profile }: Store) => profile,
  (profile) => profile.profile?.current_org?.role?.name || "anonymous",
);

export const profileSelector = createSelector(
  ({ profile }: Store) => profile,
  ({ profile }) => ({ profile }),
);

export const getSSOAccountURLSelector = createSelector(
  ({ profile }: Store) => profile,
  (profile) => profile.profile?.ssoAccountURL,
);
