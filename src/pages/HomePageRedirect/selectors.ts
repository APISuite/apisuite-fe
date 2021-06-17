import { createSelector } from "reselect";
import { Store } from "store/types";

export const getRoleName = createSelector(
  ({ profile }: Store) => profile,
  (profile) => profile.profile?.current_org?.role?.name || "anonymous",
);
