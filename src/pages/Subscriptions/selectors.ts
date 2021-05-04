import { createSelector } from "reselect";
import { Store } from "store/types";

export const subscriptionsSelector = createSelector(
  ({ subscriptions }: Store) => subscriptions,
  ({ auth }: Store) => auth,
  (subscriptions, auth) => {
    return { subscriptions, auth };
  },
);

export const allUserAppsSelector = createSelector(
  ({ applications }: Store) => applications,
  (applications) => applications.userApps,
);

export const apisByNameSelector = createSelector(
  ({ subscriptions }: Store) => subscriptions,
  ({ applications }: Store) => applications,
  (subscriptions, applications) => {
    const allApis = subscriptions.apis;
    const allApps = applications.userApps;

    return allApis.map((api) => {
      const filteredApps = allApps.filter((app) => {
        return app.subscriptions.includes(api.id);
      });

      const apps = filteredApps.map((filteredApp) => {
        return {
          appName: filteredApp.name,
          appId: filteredApp.id,
        };
      });

      return {
        name: api.name,
        versions: api.apiVersions,
        apps,
        description: api.docs,
      };
    });
  },
);
