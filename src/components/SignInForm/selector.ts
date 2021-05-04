import { createSelector } from "reselect";
import { Store } from "store/types";

export const signinFormSelector = createSelector(({ auth }: Store) => auth, (auth) => ({
  providers: auth.providers,
  error: auth.error,
  isAuthorizing: auth.isAuthorizing,
}));
