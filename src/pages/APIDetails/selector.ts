import { createSelector } from "reselect";
import { Store } from "store/types";

export const apiDetailsSelector = createSelector(({ apiDetails }: Store) => apiDetails, (v) => v);
