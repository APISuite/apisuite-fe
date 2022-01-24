import { createSelector } from "reselect";
import { Store } from "store/types";

export const applicationsViewSelector = createSelector(
  ({ applications }: Store) => applications,
  (applications) => {
    return {
      allBlueprintApps: applications.allBlueprintApps,
      app: applications.currentApp,
      createdId: applications.createAppStatus.id,
      currentBlueprintAppData: applications.currentBlueprintAppData,
      checkBlueprintAuthStatus: applications.checkBlueprintAuthStatus,
      names: applications.userApps.map(app => app.name),
      requesting: applications.updateAppStatus.isRequesting || applications.getApp.isRequesting,
      types: applications.types,
    };
  },
);
