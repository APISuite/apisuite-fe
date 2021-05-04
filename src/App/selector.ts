import { createSelector } from "reselect";
import { Store } from "store/types";

export const authSelector = createSelector(({ auth }: Store) => auth, (auth) => auth);
