import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Box, Grid, Typography, useTheme, useTranslation } from "@apisuite/fe-base";

import { AppTypesTab } from "pages/AppView/types";
import { profileSelector } from "pages/Profile/selectors";
import { RouterPrompt } from "components/RouterPrompt";
import { getBlueprintAppConfig } from "store/applications/actions/getBlueprintAppConfig";
import { applicationsViewSelector } from "./selector";
import { LocationHistory } from "./types";
import { ActionsFooter, AppContainer, useGetApp } from "./util";
import useStyles from "./styles";


export const ConnectorSettings: React.FC = () => {
  const classes = useStyles();
  const { palette } = useTheme();

  const { t } = useTranslation();

  const history = useHistory() as LocationHistory;
  const dispatch = useDispatch();

  const {
    app, blueprintConfig, getBlueprintAppConfigStatus,
    requesting, status, types, validateAccessDetailsStatus,
  } = useSelector(applicationsViewSelector);
  const { profile } = useSelector(profileSelector);

  const { appId, typeId } = useParams<{ appId: string; typeId: string }>();
  const isNew = Number.isNaN(Number(appId));


  useGetApp({
    app,
    appId,
    history,
    isNew,
    profile,
    requesting,
    status,
    typeId,
  });

  const {
    control,
    formState: { errors, isDirty, isValid },
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
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
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (!isNew) {
      setValue("app_id", blueprintConfig.app_id, { shouldDirty: false });
      setValue("app_method", blueprintConfig.app_method, { shouldDirty: false });
      setValue("app_name", blueprintConfig.app_name, { shouldDirty: getBlueprintAppConfigStatus.filled });
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
    }
  }, [app, isNew, setValue]);

  useEffect(() => {
    if (getBlueprintAppConfigStatus.isRequesting) return;
    /* If "getBlueprintAppConfigStatus.isError" amounts to "true",
    it means the blueprint app has yet to be configured. */
    if (getBlueprintAppConfigStatus.isError) {
      return;
    }

    if (blueprintConfig.app_id && !getBlueprintAppConfigStatus.retrieved) {
      dispatch(getBlueprintAppConfig({ appId: blueprintConfig.app_id }));
    }
  }, [
    blueprintConfig,
    dispatch,
    getBlueprintAppConfigStatus,
    getBlueprintAppConfigStatus.isError,
    getBlueprintAppConfigStatus.retrieved,
  ]);

  /* App-related actions */

  const hasChanges = () => {
    return true;
  };


  return (
    <>
      <AppContainer
        app={app}
        appId={appId}
        getFormValues={getValues}
        isNew={isNew}
        notFound={status.get.isError}
        orgId={profile.currentOrg.id}
        requesting={requesting}
        typeId={typeId}
        types={types}
      >
        <Grid container spacing={3}>
          <Grid item md={12}>
            <Box mb={1}>
              <Typography display="block" variant="h6">
                {t("dashboardTab.applicationsSubTab.appModal.accessDetailsSectionTitle")}
              </Typography>
            </Box>

            <Box mb={4}>
              <Typography display="block" gutterBottom style={{ color: palette.text.secondary }} variant="body2">
                {t("dashboardTab.applicationsSubTab.appModal.accessDetailsSectionSubtitle")}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <hr className={classes.regularSectionSeparator} />

        {/* "App action" buttons section */}
        <div className={classes.buttonsContainer}>
          <ActionsFooter
            altSaveButtonAction={
              () => {
              }
            }
            altSaveButtonLabel={t("applications.buttons.validateAccessDetails")}
            app={app}
            appId={appId}
            disableNextButton={!validateAccessDetailsStatus.validated}
            getFormValues={getValues}
            hasChanges={() => {
              return hasChanges();
            }}
            history={history}
            orgId={profile.currentOrg.id}
            tabType={AppTypesTab.CONNECTOR_SETTINGS}
          />
        </div>
      </AppContainer>

      <RouterPrompt
        bodyText={t("applications.prompt.body")}
        cancelText={t("applications.prompt.cancel")}
        okText={t("applications.prompt.ok")}
        subtitle={t("applications.prompt.subtitle")}
        title={t("applications.prompt.title")}
        type="warning"
        when={hasChanges()}
      />
    </>
  );
};
