import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  Box, Button, CircularProgress, Container,
  Icon, Typography, useTheme, useTranslation,
} from "@apisuite/fe-base";
import clsx from "clsx";

import adrift from "assets/adrift.svg";
import { TypeChip } from "components/AppTypesModal";
import { getNextType, getPreviousType } from "components/AppTypesModal/util";
import {AppData, AppRegisterValues, AppType, CurrentBlueprintConfig} from "store/applications/types";
import { getAppTypes } from "store/applications/actions/getAppTypes";
import { getUserApp } from "store/applications/actions/getUserApp";
import { updateApp } from "store/applications/actions/updatedApp";
import { AppTypesTab } from "pages/AppView/types";
import { ActionsFooterProps, AppHeaderProps, LocationHistory, UseGetAppParams } from "./types";
import useStyles from "./styles";
import {UseFormSetValue} from "react-hook-form/dist/types/form";

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
    if (data.isNew && data.status.create.id !== -1 && !data.status.create.isError) {
      data.history.push(`/dashboard/apps/${data.status.create.id}/type/${data.typeId}/${AppTypesTab.GENERAL}`);
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
    if (
      !data.isNew && !data.requesting &&
      data.profile.currentOrg.id > 0 &&
      (data.app.id === 0 || data.app.id !== Number(data.appId)) &&
      data.status.get.id !== Number(data.appId)
    ) {
      dispatch(getUserApp({ orgID: data.profile.currentOrg.id, appId: Number(data.appId) }));
    }
  }, [data, dispatch]);
}

export const NotFound: React.FC = () => {
  const { t } = useTranslation();
  const { spacing } = useTheme();

  return (
    <Box alignItems="center" display="flex" flexDirection="column" justifyContent="center" p={3} width="100%">
      <Typography display="block" variant="h2">
        {t("applications.notfound")}
      </Typography>
      <img src={adrift} style={{ filter: "grayscale(1)", maxHeight: "200px", opacity: 0.7, padding: spacing(5) }} />
    </Box>
  );
};

export const AppContainer: React.FC<AppHeaderProps & { appId: string; notFound: boolean; requesting: boolean }> = ({
  app,
  appId,
  children,
  getFormValues,
  notFound,
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
        (!requesting && !notFound && app.id === Number(appId)) && <Box clone>
          <Container maxWidth="lg">
            <AppHeader
              app={app}
              getFormValues={getFormValues}
              orgId={orgId}
              types={types}
              typeId={typeId}
            />
            {children}
          </Container>
        </Box>
      }
      {
        (!requesting && notFound && app.id !== Number(appId)) && <NotFound />
      }
    </>
  );
};

export const setCommonValues = (
  blueprintConfig: CurrentBlueprintConfig,
  setValue: UseFormSetValue<AppRegisterValues>
) : void => {
  setValue("app_id", blueprintConfig.app_id, { shouldDirty: false });
  setValue("app_method", blueprintConfig.app_method, { shouldDirty: false });
  setValue("app_name", blueprintConfig.app_name, { shouldDirty: false });
  setValue("app_url", blueprintConfig.app_url, { shouldDirty: false });
  setValue("auth_type", blueprintConfig.app_conf.conn_auth_type, { shouldDirty: false });
  setValue("auth_url", blueprintConfig.app_conf.auth_url, { shouldDirty: false });
  setValue("clt_id", blueprintConfig.app_conf.clt_id, { shouldDirty: false });
  setValue("clt_secret", blueprintConfig.app_conf.clt_secret, { shouldDirty: false });
  setValue("conn_auth_type", blueprintConfig.app_conf.conn_auth_type, { shouldDirty: false });
  setValue("polling_interval", blueprintConfig.polling_interval, { shouldDirty: false });
  setValue("redirect_url", blueprintConfig.app_conf.redirect_url, { shouldDirty: false });
  setValue("scope", blueprintConfig.app_conf.scope, { shouldDirty: false });
  setValue("token_url", blueprintConfig.app_conf.token_url, { shouldDirty: false });
  setValue("token", blueprintConfig.app_conf.token, { shouldDirty: false });
  setValue("obo", blueprintConfig.obo, { shouldDirty: false });
  setValue("api_url", blueprintConfig.api_url, { shouldDirty: false });
  setValue("fieldsRaw", blueprintConfig.fieldsRaw, { shouldDirty: false });
  setValue("blueprint", blueprintConfig.blueprint, {shouldDirty: false});
};

export const createAppRegisterValues = (blueprintConfig: CurrentBlueprintConfig) : AppRegisterValues => {
  return {
    app_id: blueprintConfig.app_id,
    app_method: blueprintConfig.app_method || "",
    app_name: blueprintConfig.app_name || "",
    app_url: blueprintConfig.app_url || "",
    auth_type: blueprintConfig.app_conf.conn_auth_type,
    auth_url: blueprintConfig.app_conf.auth_url || "oauth",
    clt_id: blueprintConfig.app_conf.clt_id || "",
    clt_secret: blueprintConfig.app_conf.clt_secret || "",
    conn_auth_type: blueprintConfig.app_conf.conn_auth_type,
    polling_interval: blueprintConfig.polling_interval || "",
    redirect_url: blueprintConfig.app_conf.redirect_url || "",
    scope: blueprintConfig.app_conf.scope || "",
    token_url: blueprintConfig.app_conf.token_url || "",
    token: blueprintConfig.app_conf.token || "",
    obo: blueprintConfig.obo || false,
    api_url: blueprintConfig.api_url || "",
    variableValues: blueprintConfig.variableValues,
    fieldsRaw: blueprintConfig.fieldsRaw,
    fieldsMapping: blueprintConfig.fieldsMapping,
    blueprint: blueprintConfig.blueprint,
  };
};

export const createBlueprintConfig = (currentConfigDetails: AppRegisterValues ) : CurrentBlueprintConfig => {
  return {
    app_conf: {
      auth_url: currentConfigDetails.auth_url,
      clt_id: currentConfigDetails.clt_id,
      clt_secret: currentConfigDetails.clt_secret,
      conn_auth_type: currentConfigDetails.conn_auth_type,
      redirect_url: currentConfigDetails.redirect_url,
      scope: currentConfigDetails.scope,
      token_url: currentConfigDetails.token_url,
      token: currentConfigDetails.token,
    },
    api_url: currentConfigDetails.api_url,
    polling_interval: currentConfigDetails.polling_interval,
    obo: currentConfigDetails.obo,
    app_id: currentConfigDetails.app_id,
    app_method: currentConfigDetails.app_method,
    app_name: currentConfigDetails.app_name,
    app_url: currentConfigDetails.app_url,
    auth_type: currentConfigDetails.auth_type,
    fieldsRaw: currentConfigDetails.fieldsRaw,
    variableValues: currentConfigDetails.variableValues,
    fieldsMapping: currentConfigDetails.fieldsMapping,
    doneUrl: "",
    blueprint:  currentConfigDetails.blueprint,
  };
};

export const getAppType = (types: AppType[], typeId: string) => {
  let type = types[0];
  if (types.length > 1) {
    const fType = types.find((tp) => tp.id.toString() === typeId);
    type = fType || type;
  }
  return type;
};

export const AppHeader: React.FC<AppHeaderProps> = ({
  app,
  getFormValues,
  orgId,
  types,
  typeId,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const appType = useRef<AppType>(getAppType(types, typeId));

  useEffect(() => {
    if (!types.length) {
      dispatch(getAppTypes({}));
    } else {
      appType.current = getAppType(types, typeId);
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
          <TypeChip color="primary" editable={false} onTypeSelected={updateAppType} type={appType.current} />
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
  altSaveButtonAction,
  altSaveButtonLabel,
  disableNextButton = false,
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
          onClick={altSaveButtonAction || _updateApp}
          size="large"
          variant="contained"
        >
          {altSaveButtonLabel || t("dashboardTab.applicationsSubTab.appModal.editAppButtonLabel")}
        </Button>

        {
          !!getNextType(app.appType, tabType) && <Button
            color="primary"
            disabled={disableNextButton}
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
