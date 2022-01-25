import React from "react";
import { Box, Icon, Typography, useTheme, useTranslation } from "@apisuite/fe-base";
import clsx from "clsx";
import { TypeChip } from "components/AppTypesModal";
import { getNextType, getPreviousType } from "components/AppTypesModal/util";
import { AppData } from "store/applications/types";
import { AppTypesTab } from "pages/AppView/types";
import { AppHeaderProps, LocationHistory } from "./types";
import useStyles from "./styles";

export const dialogFunctions: { [index: string]: (hist: LocationHistory, appId?: string) => void } = {
  goToApps: (hist: LocationHistory) => hist.push("/dashboard/apps"),
  regularGoToSubsView: (hist: LocationHistory) => hist.push("/dashboard/subscriptions"),
  alternativeGoToSubsView: (hist: LocationHistory, appId?: string) => hist.push("/dashboard/subscriptions", {
    redirected: true,
    appID: hist.location.state?.appID || appId,
  }),
};

export const checkNextAction = (fn: string, hist: LocationHistory, appId?: string) => {
  dialogFunctions[fn](hist, appId);
};

export const checkHistory = (hist: LocationHistory, appId?: string) => {
  hist.location.state?.redirected
    ? checkNextAction("alternativeGoToSubsView", hist, appId)
    : checkNextAction("goToApps", hist);
};

export const handleNext = (application: AppData, tab: AppTypesTab, hist: LocationHistory) => {
  const next = getNextType(application.appType, tab);
  hist.push(`/dashboard/apps/${application.id}/type/${application.appType.id}/${next}`);
};

export const handlePrevious = (application: AppData, tab: AppTypesTab, hist: LocationHistory) => {
  const prev = getPreviousType(application.appType, tab);
  hist.push(`/dashboard/apps/${application.id}/type/${application.appType.id}/${prev}`);
};

const isDraft = (app: AppData) => {
  return app.subscriptions.length === 0 ? "draftApp" : "subbedApp";
};

export const AppHeader: React.FC<AppHeaderProps> = ({
  app,
  appType,
  isNew,
  updateAppType,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { palette } = useTheme();

  return (
    <div className={classes.editApplicationHeaderContainer}>
      <Box display="flex" flexDirection="column" mb={5}>
        <Box alignItems="center" display="flex" flexDirection="row">
          <Box mb={1}>
            <Typography display="block" variant="h2">
              {app.name}
            </Typography>
          </Box>

          <div className={classes.editApplicationHeaderStatusContainer}>
            <Box display="flex" mb={1}>
              {/* A mere dot */}
              <Box
                className={
                  clsx(
                    classes.subscribedClientApplicationCardStatusIcon,
                    !app.subscriptions.length &&
                    classes.draftClientApplicationCardStatusIcon,
                  )
                }
                pr={1}
              >
                <Icon fontSize="small">circle</Icon>
              </Box>

              <Box clone>
                <Typography style={{ color: palette.text.secondary }} variant="body2">
                  {t(`dashboardTab.applicationsSubTab.appModal.${isDraft(app)}Status`)}
                </Typography>
              </Box>
            </Box>
          </div>
        </Box>
        <Box display="flex">
          <TypeChip color="primary" editable={!isNew} onTypeSelected={updateAppType} type={appType.current} />
        </Box>
      </Box>
    </div>
  );
};
