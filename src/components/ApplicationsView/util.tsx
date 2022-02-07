import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  Box, Button, CircularProgress, Container,
  Icon, Typography, useTheme, useTranslation,
} from "@apisuite/fe-base";
import clsx from "clsx";
import { TypeChip } from "components/AppTypesModal";
import { getNextType, getPreviousType } from "components/AppTypesModal/util";
import { AppData, AppType } from "store/applications/types";
import { getAppTypes } from "store/applications/actions/getAppTypes";
import { getUserApp } from "store/applications/actions/getUserApp";
import { updateApp } from "store/applications/actions/updatedApp";
import { getProfile } from "store/profile/actions/getProfile";
import { AppTypesTab } from "pages/AppView/types";
import { ActionsFooterProps, AppHeaderProps, LocationHistory, UseGetAppParams } from "./types";
import useStyles from "./styles";

const isDraft = (app: AppData) => {
  return app.subscriptions.length === 0 ? "draftApp" : "subbedApp";
};

const dialogFunctions: { [index: string]: (hist: LocationHistory, appId?: string) => void } = {
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

export const AppContainer: React.FC<AppHeaderProps & { requesting: boolean }> = ({
  app,
  children,
  isNew,
  getFormValues,
  orgId,
  requesting,
  types,
  typeId,
}) => {
  const classes = useStyles();

  return (
    <>
      {
        requesting && <div className={classes.centerContent}>
          <CircularProgress size={50} className={classes.loading} />
        </div>
      }
      {
        !requesting && <Box clone>
          <Container maxWidth="lg">
            <AppHeader
              app={app}
              isNew={isNew}
              getFormValues={getFormValues}
              orgId={orgId}
              types={types}
              typeId={typeId}
            />
            {children}
          </Container>
        </Box>
      }
    </>
  );
};

export const AppHeader: React.FC<AppHeaderProps> = ({
  app,
  isNew,
  getFormValues,
  orgId,
  types,
  typeId,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const appType = useRef<AppType>(types[0]);

  useEffect(() => {
    if (!types.length) {
      dispatch(getAppTypes({}));
    } else {
      appType.current = types.find((tp) => tp.id.toString() === typeId) as AppType;
    }
  }, [dispatch, typeId, types]);

  const updateAppType = (type: AppType) => {
    const updatedAppDetails = {
      ...app,
      ...getFormValues(),
      appTypeId: type.id,
    };

    dispatch(updateApp({ orgID: orgId, appData: updatedAppDetails }));
  };

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

export const ActionsFooter: React.FC<ActionsFooterProps> = ({
  app,
  appId,
  getFormValues,
  hasChanges,
  history,
  orgId,
  tabType,
}) => {
  const classes = useStyles();
  const { spacing } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleNext = (application: AppData, tab: AppTypesTab, hist: LocationHistory) => {
    const next = getNextType(application.appType, tab);
    hist.push(`/dashboard/apps/${application.id}/type/${application.appType.id}/${next}`);
  };

  const handlePrevious = (application: AppData, tab: AppTypesTab, hist: LocationHistory) => {
    const prev = getPreviousType(application.appType, tab);
    hist.push(`/dashboard/apps/${application.id}/type/${application.appType.id}/${prev}`);
  };

  // Update an app

  const _updateApp = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const updatedAppDetails = {
      ...app,
      ...getFormValues(),
    };

    dispatch(updateApp({ orgID: orgId, appData: updatedAppDetails }));
  };

  return (
    <Box display="flex" justifyContent="space-between" width="100%">
      <div>
        <Button
          color="primary"
          disabled={!hasChanges()}
          disableElevation
          onClick={_updateApp}
          size="large"
          variant="contained"
        >
          {t("dashboardTab.applicationsSubTab.appModal.editAppButtonLabel")}
        </Button>
        {
          !!getNextType(app.appType, tabType) && <Button
            color="primary"
            disableElevation
            onClick={() => handleNext(app, tabType, history)}
            size="large"
            style={{ margin: spacing(0, 0, 0, 3) }}
            variant="contained"
          >
            {t("applications.buttons.next")}
          </Button>
        }
        {
          !!getPreviousType(app.appType, tabType) && <Button
            color="secondary"
            disableElevation
            onClick={() => handlePrevious(app, tabType, history)}
            size="large"
            style={{ margin: spacing(0, 0, 0, 3) }}
            variant="outlined"
          >
            {t("applications.buttons.back")}
          </Button>
        }
      </div>

      <Button
        className={classes.otherButtons}
        onClick={() => checkHistory(history, appId)}
        color="primary"
        variant="outlined"
      >
        {t(`applications.buttons.${history.location.state?.redirected ? "backToSubs" : "backToApps"}`)}
      </Button>
    </Box>
  );
};
