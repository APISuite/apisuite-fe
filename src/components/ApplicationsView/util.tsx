import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Box, Icon, Typography, useTheme, useTranslation } from "@apisuite/fe-base";
import clsx from "clsx";
import { TypeChip } from "components/AppTypesModal";
import { getNextType, getPreviousType } from "components/AppTypesModal/util";
import { AppData } from "store/applications/types";
import { getUserApp } from "store/applications/actions/getUserApp";
import { getProfile } from "store/profile/actions/getProfile";
import { AppTypesTab } from "pages/AppView/types";
import { AppHeaderProps, LocationHistory, UseGetAppParams } from "./types";
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

export function useGetApp(data: UseGetAppParams) {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (data.isNew && data.createAppStatus.id !== -1 && !data.createAppStatus.isError) {
      data.history.push(`/dashboard/apps/${data.createAppStatus.id}/type/${data.typeId}/${AppTypesTab.GENERAL}`);
    }
    if (data.isNew && location.pathname.indexOf(AppTypesTab.GENERAL) === -1) {
      data.history.push(`/dashboard/apps/new/type/${data.typeId}/${AppTypesTab.GENERAL}`);
    }
    if (
      !data.isNew &&
      data.app.id === Number(data.appId) &&
      data.app.appType.id !== 0 &&
      data.app.appType.id !== Number(data.typeId)
    ) {
      data.history.push(`/dashboard/apps/${data.appId}/type/${data.app.appType.id}/${AppTypesTab.GENERAL}`);
    }
  }, [data, location.pathname]);

  useEffect(() => {
    if (!data.profile.currentOrg.id) {
      dispatch(getProfile({}));
    }
  });

  useEffect(() => {
    if (!data.isNew && data.profile.currentOrg.id && (data.app.id === 0 || data.app.id !== Number(data.appId))) {
      dispatch(getUserApp({ orgID: data.profile.currentOrg.id, appId: Number(data.appId) }));
    }
  }, [data, dispatch]);
}
