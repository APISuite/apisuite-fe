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
      currentBlueprintAppFields: applications.currentBlueprintAppFields,
      isActive: applications.isActive,
      createAppStatus: applications.createAppStatus,
      names: applications.userApps.map(app => app.name),
      requesting: applications.updateAppStatus.isRequesting || applications.getApp.isRequesting,
      types: applications.types,
      status: {
        create: applications.createAppStatus,
        get: applications.getApp,
        update: applications.updateAppStatus,
      },
    };
  },
);
