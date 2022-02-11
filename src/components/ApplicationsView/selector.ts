import { createSelector } from "reselect";
import { Store } from "store/types";

export const applicationsViewSelector = createSelector(
  ({ applications }: Store) => applications,
  (applications) => {
    return {
      app: applications.currentApp,
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
