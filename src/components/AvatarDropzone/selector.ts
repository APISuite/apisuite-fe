import { createSelector } from "reselect";
import { Store } from "store/types";

export const mediaSelector = createSelector(
  ({ profile, media }: Store) => ({ profile: profile.profile, media }),
  ({ profile, media }) => {
    return { orgId: profile.current_org.id, media };
  },
);
