import { createSelector } from "reselect";
import { Store } from "store/types";

export const securitySelector = createSelector(({ profile }: Store) =>
  profile.profile, (profile) => ({ profile }));
