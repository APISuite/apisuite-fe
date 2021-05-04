import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@apisuite/fe-base";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import MenuOpenRoundedIcon from "@material-ui/icons/MenuOpenRounded";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";

import { apisByNameSelector } from "pages/Subscriptions/selectors";
import { AppInfo } from "store/subscriptions/types";
import Link from "components/Link";

import useStyles from "./styles";

export const SubscriptionsTable: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const apisByName = useSelector(apisByNameSelector);

  const generateAppIcons = (appNamesArray: AppInfo[]) => {
    const sortedAppNamesArray = appNamesArray.sort();

    const appIconsArray = sortedAppNamesArray.map((appName, key) => {
      const appSplitName = appName.appName.split(" ");
      const appInitials = appSplitName.length >= 2
        ? `${appSplitName[0].charAt(0)}${appSplitName[1].charAt(0)}`
        : appSplitName[0].slice(0, 2);

      return (
        <p
          className={classes.appNameIcon}
          key={`${appName}${key}`}
        >
          {appInitials}
        </p>
      );
    });

    return appIconsArray;
  };

  const generateTableEntries = () => {
    const tableEntriesArray = apisByName.map((api, index) => {
      return (
        // Will contain a particular API's details (its name, subscribed apps, and versions)
        <div key={`apiDetailsContainer${index}`}>
          {/* API's name and subscribed apps */}
          <div className={classes.apiNameAndAppsContainer}>
            <div className={classes.apiNameContainer}>
              <p className={classes.apiName}>{api.name}</p>
            </div>

            <div className={classes.apiAppsContainer}>
              {
                api.apps
                  ? (
                    generateAppIcons(api.apps)
                  )
                  : (
                    <p className={classes.noSubsMessage}>Subscribe applications...</p>
                  )
              }
            </div>

            <div className={classes.apiDetailsLinkContainer}>
              <Link
                className={classes.mostRecentAPIVersionLink}
                to={
                  api.versions.length
                    ? `/api-products/details/${api.versions[0].apiId}/spec/${api.versions[0].id}`
                    : "/api-products"
                }
              >
                <MenuOpenRoundedIcon />
              </Link>
            </div>
          </div>

          {/* API's versions */}
          {
            api.versions.map((apiVersion, index) => {
              return (
                <Link
                  className={classes.apiVersionLink}
                  key={`${apiVersion.title}${index}`}
                  to={`/api-products/details/${apiVersion.apiId}/spec/${apiVersion.id}`}
                >
                  <div className={classes.apiVersionDetailsContainer}>
                    <p className={classes.apiVersionNumber}>{apiVersion.version}</p>

                    <p className={classes.apiVersionName}>{apiVersion.title}</p>

                    <div className={classes.apiVersionIconsContainer}>
                      {
                        apiVersion.deprecated
                          ? <ReportProblemOutlinedIcon className={classes.deprecatedIcon} />
                          : null
                      }

                      <ChevronRightRoundedIcon className={classes.chevronIcon} />
                    </div>
                  </div>
                </Link>
              );
            })
          }
        </div>
      );
    });

    return tableEntriesArray;
  };

  return (
    <div className={classes.tableContentsContainer}>
      <div className={classes.tableHeader}>
        <p>{t("dashboardTab.subscriptionsSubTab.hasDataToShow.subscriptionsTable.title")}</p>

        <p>{t("dashboardTab.subscriptionsSubTab.hasDataToShow.subscriptionsTable.subtitle")}</p>
      </div>

      <div className={classes.tableBody}>
        {generateTableEntries()}
      </div>
    </div>
  );
};
