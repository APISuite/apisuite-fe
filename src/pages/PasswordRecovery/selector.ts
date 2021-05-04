import { createSelector } from "reselect";
import { Store } from "store/types";

export const passwordRecoverySelector = createSelector(({ auth }: Store) => auth, (auth) => ({
  isRecoveringPassword: auth.isRecoveringPassword,
}));
