import { createSelector } from "reselect";
import { Store } from "store/types";

export const getPageContent = createSelector(
  ({ markdownPages }: Store) => markdownPages,
  (markdownPages) => markdownPages,
);
