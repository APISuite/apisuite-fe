import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Box, Grid, Icon, TextField, Typography, useTheme, useTranslation } from "@apisuite/fe-base";
import clsx from "clsx";

import { AppTypesTab } from "pages/AppView/types";
import { profileSelector } from "pages/Profile/selectors";
import { RouterPrompt } from "components/RouterPrompt";
import { validateAccessDetailsAction } from "store/applications/actions/validateAccessDetails";
import { applicationsViewSelector } from "./selector";
import useStyles from "./styles";
import { LocationHistory } from "./types";
import { useGetApp, AppContainer, ActionsFooter } from "./util";
import { getBlueprintAppConfig } from "store/applications/actions/getBlueprintAppConfig";
import { updateAccessDetailsAction } from "store/applications/actions/updateAccessDetails";

export const AccessDetails: React.FC = () => {
  const classes = useStyles();
  const { palette } = useTheme();

  const { t } = useTranslation();

  const history = useHistory() as LocationHistory;
  const dispatch = useDispatch();

  const {
    app, blueprintAppConfig, getBlueprintAppConfigStatus,
    requesting, status, types, validateAccessDetailsStatus,
  } = useSelector(applicationsViewSelector);
  const { profile } = useSelector(profileSelector);

  const { appId, typeId } = useParams<{ appId: string; typeId: string }>();
  const isNew = Number.isNaN(Number(appId));

  const AUTH_TYPES = {
    TOKEN: "token",
    OAUTH: "oauth",
  };

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
      app_id: blueprintAppConfig.app_id,
      app_method: blueprintAppConfig.app_method || "",
      app_name: blueprintAppConfig.app_name || "",
      app_url: blueprintAppConfig.app_url || "",
      auth_type: blueprintAppConfig.app_conf.conn_auth_type,
      auth_url: blueprintAppConfig.app_conf.auth_url || "",
      clt_id: blueprintAppConfig.app_conf.clt_id || "",
      clt_secret: blueprintAppConfig.app_conf.clt_secret || "",
      conn_auth_type: blueprintAppConfig.app_conf.conn_auth_type,
      polling_interval: blueprintAppConfig.polling_interval || "",
      redirect_url: blueprintAppConfig.app_conf.redirect_url || "",
      scope: blueprintAppConfig.app_conf.scope || "",
      token_url: blueprintAppConfig.app_conf.token_url || "",
      token: blueprintAppConfig.app_conf.token || "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (!isNew) {
      setValue("app_id", blueprintAppConfig.app_id, { shouldDirty: false });
      setValue("app_method", blueprintAppConfig.app_method, { shouldDirty: false });
      setValue("app_name", blueprintAppConfig.app_name, { shouldDirty: false });
      setValue("app_url", blueprintAppConfig.app_url, { shouldDirty: false });
      setValue("auth_type", blueprintAppConfig.app_conf.conn_auth_type, { shouldDirty: false });
      setValue("auth_url", blueprintAppConfig.app_conf.auth_url, { shouldDirty: false });
      setValue("clt_id", blueprintAppConfig.app_conf.clt_id, { shouldDirty: false });
      setValue("clt_secret", blueprintAppConfig.app_conf.clt_secret, { shouldDirty: false });
      setValue("conn_auth_type", blueprintAppConfig.app_conf.conn_auth_type, { shouldDirty: false });
      setValue("polling_interval", blueprintAppConfig.polling_interval, { shouldDirty: false });
      setValue("redirect_url", blueprintAppConfig.app_conf.redirect_url, { shouldDirty: false });
      setValue("scope", blueprintAppConfig.app_conf.scope, { shouldDirty: false });
      setValue("token_url", blueprintAppConfig.app_conf.token_url, { shouldDirty: false });
      setValue("token", blueprintAppConfig.app_conf.token, { shouldDirty: false });
    }
  }, [app, isNew, setValue]);

  useEffect(() => {
    /* If "getBlueprintAppConfigStatus.isError" amounts to "true",
    it means the blueprint app has yet to be configured. */
    if (getBlueprintAppConfigStatus.isError) return;

    if (blueprintAppConfig.app_id && !getBlueprintAppConfigStatus.retrieved) {
      dispatch(getBlueprintAppConfig({ appId: blueprintAppConfig.app_id }));
    }
  }, [blueprintAppConfig]);

  // Authentication type logic

  const [selectedAuth, setSelectedAuth] = React.useState(blueprintAppConfig.app_conf.conn_auth_type);

  const handleAuthSelection = (selectedAuthType: string) => {
    setSelectedAuth(selectedAuthType);

    setValue("auth_type", selectedAuthType, { shouldDirty: false });
    setValue("conn_auth_type", selectedAuthType, { shouldDirty: false });
  };

  /* App-related actions */

  const hasChanges = () => {
    return (isValid || Object.keys(errors).length === 0) && isDirty;
  };

  const accessDetailsMissing = (selectedAuthType: string) => {
    // If the app's name, URL, and method are missing
    if (!getValues("app_name") || !getValues("app_url") || !getValues("app_method")) return true

    // If "Token" auth type fields are missing
    if (selectedAuthType === AUTH_TYPES.TOKEN && (!getValues("token") || !getValues("polling_interval"))) {
      return true;
    }

    // If "OAuth" auth type fields are missing
    if (selectedAuthType === AUTH_TYPES.OAUTH && (
      !getValues("redirect_url") || !getValues("clt_id") ||
      !getValues("clt_secret") || !getValues("auth_url") ||
      !getValues("token_url")
    )) {
      return true;
    }

    return false;
  };

  const validateAccessDetails = (selectedAuthType: string) => {
    const currentConfigDetails = {
      ...getValues(),
    };

    const newAppDetails = {
      app_conf: {
        auth_url: selectedAuthType === AUTH_TYPES.TOKEN ? "" : currentConfigDetails.auth_url,
        clt_id: selectedAuthType === AUTH_TYPES.TOKEN ? "" : currentConfigDetails.clt_id,
        clt_secret: selectedAuthType === AUTH_TYPES.TOKEN ? "" : currentConfigDetails.clt_secret,
        conn_auth_type: currentConfigDetails.conn_auth_type,
        redirect_url: selectedAuthType === AUTH_TYPES.TOKEN ? "" : currentConfigDetails.redirect_url,
        scope: selectedAuthType === AUTH_TYPES.TOKEN ? "" : currentConfigDetails.scope,
        token_url: selectedAuthType === AUTH_TYPES.TOKEN ? "" : currentConfigDetails.token_url,
        token: currentConfigDetails.token,
      },
      app_id: currentConfigDetails.app_id,
      app_method: currentConfigDetails.app_method,
      app_name: currentConfigDetails.app_name,
      app_url: currentConfigDetails.app_url,
      auth_type: selectedAuthType === AUTH_TYPES.TOKEN ? AUTH_TYPES.TOKEN : AUTH_TYPES.OAUTH,
      polling_interval: currentConfigDetails.polling_interval,
    };

    dispatch(validateAccessDetailsAction({ blueprintAppConfig: newAppDetails }));
  };

  const updateAccessDetails = () => {
    const currentConfigDetails = {
      ...getValues(),
    };

    const newConfigDetails = {
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
      app_id: currentConfigDetails.app_id,
      app_method: currentConfigDetails.app_method,
      app_name: currentConfigDetails.app_name,
      app_url: currentConfigDetails.app_url,
      auth_type: currentConfigDetails.auth_type,
      polling_interval: currentConfigDetails.polling_interval,
    };

    dispatch(updateAccessDetailsAction({
      originalAppName: blueprintAppConfig.app_name,
      newConfig: newConfigDetails,
    }));
  };

  return (
    <>
      <AppContainer
        app={app}
        appId={appId}
        isNew={isNew}
        getFormValues={getValues}
        notFound={status.get.isError}
        orgId={profile.currentOrg.id}
        requesting={requesting}
        types={types}
        typeId={typeId}
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

          <Grid item md={12}>
            <Box>
              <Controller
                control={control}
                name="app_name"
                render={({ field }) => (
                  <TextField
                    className={classes.inputFields}
                    error={!!errors.app_name}
                    {...field}
                    fullWidth
                    helperText={errors.app_name?.message}
                    label={t("dashboardTab.applicationsSubTab.appModal.blueprintApp.appNameFieldLabel")}
                    margin="dense"
                    type="text"
                    variant="outlined"
                  />
                )}
              />
            </Box>

            <Box>
              <Controller
                control={control}
                name="app_url"
                render={({ field }) => (
                  <TextField
                    className={classes.inputFields}
                    error={!!errors.app_url}
                    {...field}
                    fullWidth
                    helperText={errors.app_url?.message}
                    label={t("dashboardTab.applicationsSubTab.appModal.blueprintApp.appURLFieldLabel")}
                    margin="dense"
                    type="text"
                    variant="outlined"
                  />
                )}
              />
            </Box>

            <Box>
              <Controller
                control={control}
                name="app_method"
                render={({ field }) => (
                  <TextField
                    className={classes.inputFields}
                    error={!!errors.app_method}
                    {...field}
                    fullWidth
                    helperText={errors.app_method?.message}
                    label={t("dashboardTab.applicationsSubTab.appModal.blueprintApp.appMethodFieldLabel")}
                    margin="dense"
                    placeholder={t("dashboardTab.applicationsSubTab.appModal.blueprintApp.appMethodFieldPlaceholder")}
                    type="text"
                    variant="outlined"
                  />
                )}
              />
            </Box>

            <Box style={{ display: "flex" }}>
              <Box
                className={clsx({
                  [classes.selectedAuthType]: selectedAuth === AUTH_TYPES.TOKEN,
                  [classes.authType]: selectedAuth !== AUTH_TYPES.TOKEN,
                })}
                mr={8}
                onClick={() => handleAuthSelection(AUTH_TYPES.TOKEN)}
              >
                <Icon>
                  {selectedAuth === AUTH_TYPES.TOKEN ? "radio_button_checked" : "radio_button_unchecked"}
                </Icon>

                <Typography>{t("dashboardTab.applicationsSubTab.appModal.blueprintApp.tokenLabel")}</Typography>
              </Box>

              <Box
                className={clsx({
                  [classes.selectedAuthType]: selectedAuth === AUTH_TYPES.OAUTH,
                  [classes.authType]: selectedAuth !== AUTH_TYPES.OAUTH,
                })}
                onClick={() => handleAuthSelection(AUTH_TYPES.OAUTH)}
              >
                <Icon>
                  {selectedAuth === AUTH_TYPES.OAUTH ? "radio_button_checked" : "radio_button_unchecked"}
                </Icon>

                <Typography>{t("dashboardTab.applicationsSubTab.appModal.blueprintApp.oauthLabel")}</Typography>
              </Box>
            </Box>
          </Grid>

          {/* "Token" subsection */}
          {
            selectedAuth === AUTH_TYPES.TOKEN && (
              <Grid item md={12}>
                <Box>
                  <Controller
                    control={control}
                    name="token"
                    render={({ field }) => (
                      <TextField
                        className={classes.inputFields}
                        error={!!errors.token}
                        {...field}
                        fullWidth
                        helperText={errors.token?.message}
                        label={t("dashboardTab.applicationsSubTab.appModal.blueprintApp.tokenIDFieldLabel")}
                        margin="dense"
                        type="text"
                        variant="outlined"
                      />
                    )}
                  />
                </Box>

                <Box>
                  <Controller
                    control={control}
                    name="polling_interval"
                    render={({ field }) => (
                      <TextField
                        className={classes.inputFields}
                        error={!!errors.polling_interval}
                        {...field}
                        fullWidth
                        helperText={errors.polling_interval?.message}
                        label={t("dashboardTab.applicationsSubTab.appModal.blueprintApp.pollingIntervalFieldLabel")}
                        margin="dense"
                        type="text"
                        variant="outlined"
                      />
                    )}
                  />
                </Box>
              </Grid>
            )
          }

          {/* "OAuth" subsection */}
          {
            selectedAuth === AUTH_TYPES.OAUTH && (
              <Grid item md={12}>
                <Box>
                  <Controller
                    control={control}
                    name="redirect_url"
                    render={({ field }) => (
                      <TextField
                        className={classes.inputFields}
                        error={!!errors.redirect_url}
                        {...field}
                        fullWidth
                        helperText={errors.redirect_url?.message}
                        label={t("dashboardTab.applicationsSubTab.appModal.blueprintApp.redirectURLFieldLabel")}
                        margin="dense"
                        type="text"
                        variant="outlined"
                      />
                    )}
                  />
                </Box>

                <Box>
                  <Controller
                    control={control}
                    name="clt_id"
                    render={({ field }) => (
                      <TextField
                        className={classes.inputFields}
                        error={!!errors.clt_id}
                        {...field}
                        fullWidth
                        helperText={errors.clt_id?.message}
                        label={t("dashboardTab.applicationsSubTab.appModal.blueprintApp.clientIDFieldLabel")}
                        margin="dense"
                        type="text"
                        variant="outlined"
                      />
                    )}
                  />
                </Box>

                <Box>
                  <Controller
                    control={control}
                    name="clt_secret"
                    render={({ field }) => (
                      <TextField
                        className={classes.inputFields}
                        error={!!errors.clt_secret}
                        {...field}
                        fullWidth
                        helperText={errors.clt_secret?.message}
                        label={t("dashboardTab.applicationsSubTab.appModal.blueprintApp.clientSecretFieldLabel")}
                        margin="dense"
                        type="text"
                        variant="outlined"
                      />
                    )}
                  />
                </Box>

                <Box>
                  <Controller
                    control={control}
                    name="auth_url"
                    render={({ field }) => (
                      <TextField
                        className={classes.inputFields}
                        error={!!errors.auth_url}
                        {...field}
                        fullWidth
                        helperText={errors.auth_url?.message}
                        label={t("dashboardTab.applicationsSubTab.appModal.blueprintApp.authURLFieldLabel")}
                        margin="dense"
                        type="text"
                        variant="outlined"
                      />
                    )}
                  />
                </Box>

                <Box>
                  <Controller
                    control={control}
                    name="token_url"
                    render={({ field }) => (
                      <TextField
                        className={classes.inputFields}
                        error={!!errors.token_url}
                        {...field}
                        fullWidth
                        helperText={errors.token_url?.message}
                        label={t("dashboardTab.applicationsSubTab.appModal.blueprintApp.tokenURLFieldLabel")}
                        margin="dense"
                        type="text"
                        variant="outlined"
                      />
                    )}
                  />
                </Box>

                <Box>
                  <Controller
                    control={control}
                    name="scope"
                    render={({ field }) => (
                      <TextField
                        className={classes.inputFields}
                        error={!!errors.scope}
                        {...field}
                        fullWidth
                        helperText={errors.scope?.message}
                        label={t("dashboardTab.applicationsSubTab.appModal.blueprintApp.scopeFieldLabel")}
                        margin="dense"
                        type="text"
                        variant="outlined"
                      />
                    )}
                  />
                </Box>
              </Grid>
            )
          }
        </Grid>

        <hr className={classes.regularSectionSeparator} />

        {/* "App action" buttons section */}
        <div className={classes.buttonsContainer}>
          <ActionsFooter
            altSaveButtonAction={
              () => validateAccessDetailsStatus.validated || getBlueprintAppConfigStatus.retrieved
                ? updateAccessDetails()
                : validateAccessDetails(selectedAuth)
            }
            altSaveButtonLabel={
              validateAccessDetailsStatus.validated || getBlueprintAppConfigStatus.retrieved
                ? t("applications.buttons.updateAccessDetails")
                : t("applications.buttons.validateAccessDetails")
            }
            app={app}
            appId={appId}
            disableNextButton={!validateAccessDetailsStatus.validated}
            getFormValues={getValues}
            hasChanges={() => {
              return !accessDetailsMissing(selectedAuth) && hasChanges();
            }}
            history={history}
            orgId={profile.currentOrg.id}
            tabType={AppTypesTab.ACCESS_DETAILS}
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
