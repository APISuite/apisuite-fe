import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  Box, Button, CircularProgress, Container, Grid, Icon, TextField, Typography, useTheme, useTranslation,
} from "@apisuite/fe-base";
import clsx from "clsx";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { AppTypesTab } from "pages/AppView/types";
import { profileSelector } from "pages/Profile/selectors";
import { RouterPrompt } from "components/RouterPrompt";
import { TypeChip } from "components/AppTypesModal";
import CustomizableDialog from "components/CustomizableDialog/CustomizableDialog";
import { AppType } from "store/applications/types";
import { deleteApp } from "store/applications/actions/deleteApp";
import { getAppTypes } from "store/applications/actions/getAppTypes";
import { getProfile } from "store/profile/actions/getProfile";
import { getUserApp, resetUserApp } from "store/applications/actions/getUserApp";
import { updateApp } from "store/applications/actions/updatedApp";
import { applicationsViewSelector } from "./selector";
import useStyles from "./styles";
import { LocationHistory } from "./types";
import { checkBlueprintAuthAction } from "store/applications/actions/checkBlueprintAuth";

export const BlueprintGeneralSettings: React.FC = () => {
  const classes = useStyles();
  const { palette, spacing } = useTheme();

  const { t } = useTranslation();

  const history = useHistory() as LocationHistory;
  const dispatch = useDispatch();

  const {
    app, checkBlueprintAuthStatus, createdId, currentBlueprintAppData, names: allUserAppNames, types, requesting,
  } = useSelector(applicationsViewSelector);
  const { profile } = useSelector(profileSelector);

  const appType = useRef<AppType>(types[0]);
  const { appId, typeId } = useParams<{ appId: string; typeId: string }>();
  const isNew = Number.isNaN(Number(appId));

  const AUTH_TYPES = {
    TOKEN: "token",
    OAUTH: "oauth",
  };

  useEffect(() => {
    if (!profile.currentOrg.id) {
      dispatch(getProfile({}));
    }
  });

  useEffect(() => {
    if (!isNew && profile.currentOrg.id && (app.id === 0 || app.id !== Number(appId))) {
      dispatch(getUserApp({ orgID: profile.currentOrg.id, appId: Number(appId) }));
    }
  }, [app.id, appId, dispatch, isNew, profile]);

  useEffect(() => {
    if (isNew && createdId !== -1) {
      history.push(`/dashboard/apps/${createdId}/type/${typeId}/${AppTypesTab.GENERAL}`);
    }

    if (!isNew && app.appType.id !== Number(typeId) && app.id !== -1 && app.appType.id !== 0) {
      history.push(`/dashboard/apps/${appId}/type/${app.appType.id}/${AppTypesTab.GENERAL}`);
    }
  }, [app.appType.id, app.id, appId, createdId, history, isNew, typeId]);

  useEffect(() => {
    if (!types.length) {
      dispatch(getAppTypes({}));
    } else {
      appType.current = types.find((type) => type.id.toString() === typeId) as AppType;
    }
  }, [dispatch, typeId, types]);

  const dialogFunctions: { [index: string]: (hist: LocationHistory) => void } = {
    alternativeGoToSubsView: (hist: LocationHistory) => hist.push("/dashboard/subscriptions", {
      appID: hist.location.state?.appID || appId,
      redirected: true,
    }),
    regularGoToSubsView: (hist: LocationHistory) => hist.push("/dashboard/subscriptions"),
    toggleModal: (hist: LocationHistory) => hist.push("/dashboard/apps"),
  };

  const checkNextAction = (fn: string, hist: LocationHistory) => {
    dialogFunctions[fn](hist);
  };

  const checkHistory = (hist: LocationHistory) => {
    hist.location.state?.redirected
      ? checkNextAction("alternativeGoToSubsView", hist)
      : checkNextAction("toggleModal", hist);
  };

  const appSchema = yup.object().shape({
    app_name: yup.string()
      .test("isAppNameValid", t("dashboardTab.applicationsSubTab.appModal.existingAppNameError"),
        (value: string | undefined) => {
          return !(isNew && allUserAppNames.includes(value || ""));
        })
      .required(t("dashboardTab.applicationsSubTab.appModal.noAppNameError")),
  });

  const {
    control,
    formState: { errors, isDirty, isValid },
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      // TODO: Included this field by request of D. To be removed later.
      auth_type: currentBlueprintAppData.app_conf.conn_auth_type || AUTH_TYPES.TOKEN,
      api_method: currentBlueprintAppData.api_method || "",
      api_url: currentBlueprintAppData.api_url || "",
      app_method: currentBlueprintAppData.app_method || "",
      app_name: currentBlueprintAppData.app_name || "",
      app_url: currentBlueprintAppData.app_url || "",
      auth_url: currentBlueprintAppData.app_conf.auth_url || "",
      clt_id: currentBlueprintAppData.app_conf.clt_id || "",
      clt_secret: currentBlueprintAppData.app_conf.clt_secret || "",
      conn_auth_type: currentBlueprintAppData.app_conf.conn_auth_type || AUTH_TYPES.TOKEN,
      polling_interval: currentBlueprintAppData.polling_interval || "",
      redirect_url: currentBlueprintAppData.app_conf.redirect_url || "",
      scope: currentBlueprintAppData.app_conf.scope || "",
      token_url: currentBlueprintAppData.app_conf.token_url || "",
      token: currentBlueprintAppData.app_conf.token || "",
    },
    mode: "onChange",
    resolver: yupResolver(appSchema),
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (!isNew) {
      setValue("auth_type", currentBlueprintAppData.app_conf.conn_auth_type, { shouldDirty: false });
      setValue("api_method", currentBlueprintAppData.api_method, { shouldDirty: false });
      setValue("api_url", currentBlueprintAppData.api_url, { shouldDirty: false });
      setValue("app_method", currentBlueprintAppData.app_method, { shouldDirty: false });
      setValue("app_name", currentBlueprintAppData.app_name, { shouldDirty: false });
      setValue("app_url", currentBlueprintAppData.app_url, { shouldDirty: false });
      setValue("auth_url", currentBlueprintAppData.app_conf.auth_url, { shouldDirty: false });
      setValue("clt_id", currentBlueprintAppData.app_conf.clt_id, { shouldDirty: false });
      setValue("clt_secret", currentBlueprintAppData.app_conf.clt_secret, { shouldDirty: false });
      setValue("conn_auth_type", currentBlueprintAppData.app_conf.conn_auth_type, { shouldDirty: false });
      setValue("polling_interval", currentBlueprintAppData.polling_interval, { shouldDirty: false });
      setValue("redirect_url", currentBlueprintAppData.app_conf.redirect_url, { shouldDirty: false });
      setValue("scope", currentBlueprintAppData.app_conf.scope, { shouldDirty: false });
      setValue("token_url", currentBlueprintAppData.app_conf.token_url, { shouldDirty: false });
      setValue("token", currentBlueprintAppData.app_conf.token, { shouldDirty: false });
    }
  }, [app, isNew, setValue]);

  /* App-related actions */

  const checkBlueprintAuth = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const allAppDetails = {
      ...getValues(),
    };

    const newAppDetails = {
      auth_type: allAppDetails.conn_auth_type,
      api_method: allAppDetails.api_method,
      api_url: allAppDetails.api_url,
      app_conf: {
        auth_url: allAppDetails.auth_url,
        clt_id: allAppDetails.clt_id,
        clt_secret: allAppDetails.clt_secret,
        conn_auth_type: allAppDetails.conn_auth_type,
        redirect_url: allAppDetails.redirect_url,
        scope: allAppDetails.scope,
        token_url: allAppDetails.token_url,
        token: allAppDetails.token,
      },
      app_method: allAppDetails.app_method,
      app_name: allAppDetails.app_name,
      app_url: allAppDetails.app_url,
      polling_interval: allAppDetails.polling_interval,
    };
    
    dispatch(
      checkBlueprintAuthAction({ currentBlueprintAppData: newAppDetails }));
  };

  // Updating an app

  const _updateApp = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const updatedAppDetails = {
      ...app,
      ...getValues(),
    };

    dispatch(updateApp({ appData: updatedAppDetails, orgID: profile.currentOrg.id }));
  };

  const updateAppType = (type: AppType) => {
    const updatedAppDetails = {
      ...app,
      ...getValues(),
      appTypeId: type.id,
    };

    dispatch(updateApp({ appData: updatedAppDetails, orgID: profile.currentOrg.id }));
  };

  // Deleting an app

  const [openDialog, setOpenDialog] = React.useState(false);

  const openDeleteDialog = (isOpen: boolean) => {
    setOpenDialog(isOpen);
  };

  const _deleteApp = () => {
    dispatch(deleteApp({ appId: Number(appId), orgID: profile.currentOrg.id }));

    openDeleteDialog(false);
    history.push("/dashboard/apps");
  };

  const hasChanged = () => {
    return (isValid || Object.keys(errors).length === 0) && isDirty;
  };

  const goToConnectorSettings = () => {
    history.push(`/dashboard/apps/${appId}/type/${typeId}/${AppTypesTab.CONNECTOR}`);
  };

  // Authentication type logic

  const [selectedAuth, setSelectedAuth] = React.useState(AUTH_TYPES.TOKEN);

  const handleAuthSelection = (selectedAuthType: string) => {
    setSelectedAuth(selectedAuthType);

    setValue("auth_type", selectedAuthType, { shouldDirty: false });
    setValue("conn_auth_type", selectedAuthType, { shouldDirty: false });
  };

  return (
    <>
      {
        requesting && (
          <div className={classes.centerContent}>
            <CircularProgress size={50} className={classes.loading} />
          </div>
        )
      }

      {
        !requesting && (
          <Box clone>
            <Container maxWidth="lg">
              {
                isNew
                  ? (
                    <Box pb={3}>
                      <Typography display="block" gutterBottom variant="h2">
                        {t("dashboardTab.applicationsSubTab.appModal.newAppLabel")}
                      </Typography>

                      <TypeChip
                        color="primary"
                        editable={!isNew}
                        onTypeSelected={updateAppType}
                        type={{id: 4, type: "blueprint"}}
                      />
                    </Box>
                  )
                  : (
                    <div className={classes.editApplicationHeaderContainer}>
                      <Box pb={3}>
                        <Typography display="block" gutterBottom variant="h2">
                          {app.name}
                        </Typography>

                        <TypeChip color="primary" editable={!isNew} onTypeSelected={updateAppType} type={appType.current} />
                      </Box>

                      <div className={classes.editApplicationHeaderStatusContainer}>
                        <Box display="flex">
                          <Box
                            className={
                              clsx(
                                classes.subscribedClientApplicationCardStatusIcon,
                                !app.subscriptions.length &&
                              classes.draftClientApplicationCardStatusIcon,
                              )
                            }
                            pb={1.5}
                            pr={1}
                          >
                            <Icon fontSize="small">circle</Icon>
                          </Box>

                          <Box clone pb={1.5}>
                            <Typography style={{ color: palette.text.secondary }} variant="body2">
                              {
                                app.subscriptions.length === 0
                                  ? t("dashboardTab.applicationsSubTab.appModal.draftAppStatus")
                                  : t("dashboardTab.applicationsSubTab.appModal.subbedAppStatus")
                              }
                            </Typography>
                          </Box>
                        </Box>
                      </div>
                    </div>
                  )
              }

              {/* 'App info' section */}
              <Grid container spacing={3}>
                <Grid item md={12}>
                  <Box pb={1.5}>
                    <Typography display="block" gutterBottom variant="h6">
                      {t("dashboardTab.applicationsSubTab.appModal.altSubSectionLabelOne")}
                    </Typography>
                  </Box>

                  <Box pb={1.5}>
                    <Typography display="block" gutterBottom style={{ color: palette.text.secondary }} variant="body2">
                      {t("dashboardTab.applicationsSubTab.appModal.subSectionLabelTwo")}
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
                          label={t("dashboardTab.applicationsSubTab.appModal.appNameFieldLabel")}
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
                          label={t("dashboardTab.applicationsSubTab.appModal.blueprintApp.urlFieldLabel")}
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
                          label={t("dashboardTab.applicationsSubTab.appModal.blueprintApp.methodFieldLabel")}
                          margin="dense"
                          type="text"
                          variant="outlined"
                        />
                      )}
                    />
                  </Box>
                </Grid>
              </Grid>

              {/* 'Authentication type' section */}
              <Grid container spacing={3}>
                <Grid item md={12}>
                  <Box pb={1.5}>
                    <Typography display="block" gutterBottom variant="h6">
                      {t("dashboardTab.applicationsSubTab.appModal.blueprintApp.authTypeTitle")}
                    </Typography>
                  </Box>

                  <Box style={{ display: "flex" }}>
                    <Box
                      className={clsx({
                        [classes.selectedAuthType]: selectedAuth === AUTH_TYPES.TOKEN,
                        [classes.authType]: selectedAuth !== AUTH_TYPES.TOKEN,
                      })}
                      onClick={() => handleAuthSelection(AUTH_TYPES.TOKEN)}
                    >
                      <Icon style={{ marginRight: spacing(1) }}>
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
                      <Icon style={{ marginRight: spacing(1) }}>
                        {selectedAuth === AUTH_TYPES.OAUTH ? "radio_button_checked" : "radio_button_unchecked"}
                      </Icon>

                      <Typography>{t("dashboardTab.applicationsSubTab.appModal.blueprintApp.oauthLabel")}</Typography>
                    </Box>
                  </Box>
                </Grid>

                {/* 'Token' subsection */}
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
                          name="api_url"
                          render={({ field }) => (
                            <TextField
                              className={classes.inputFields}
                              error={!!errors.api_url}
                              {...field}
                              fullWidth
                              helperText={errors.api_url?.message}
                              label={t("dashboardTab.applicationsSubTab.appModal.blueprintApp.apiProdURLFieldLabel")}
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

                {/* 'OAuth' subsection */}
                {
                  selectedAuth === AUTH_TYPES.OAUTH && (
                    <Grid item md={12}>
                      <Box style={{ display: "flex" }}>
                        <Box style={{ marginRight: spacing(1.25) }}>
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
                          name="api_url"
                          render={({ field }) => (
                            <TextField
                              className={classes.inputFields}
                              error={!!errors.api_url}
                              {...field}
                              fullWidth
                              helperText={errors.api_url?.message}
                              label={t("dashboardTab.applicationsSubTab.appModal.blueprintApp.apiProdURLFieldLabel")}
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
                          name="api_method"
                          render={({ field }) => (
                            <TextField
                              className={classes.inputFields}
                              error={!!errors.api_method}
                              {...field}
                              fullWidth
                              helperText={errors.api_method?.message}
                              label={t("dashboardTab.applicationsSubTab.appModal.blueprintApp.apiProdMethodFieldLabel")}
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
              </Grid>

              {/* 'App action' buttons section */}
              <div className={classes.buttonsContainer}>
                <Grid container spacing={3}>
                  <Grid component={Box} display="flex" item justify="space-between" md={12}>
                    <Box>
                      <Button
                        color="primary"
                        // TODO: Make this a function
                        disabled={
                          // If general fields are missing
                          !getValues("app_name") || !getValues("app_url") || !getValues("app_method") || !getValues("api_url") ||
                          // If 'Token' auth type fields are missing
                          (selectedAuth === AUTH_TYPES.TOKEN && (!getValues("token") || !getValues("polling_interval"))) ||
                          // If 'OAuth' auth type fields are missing
                          (selectedAuth === AUTH_TYPES.OAUTH && (
                            !getValues("clt_id") || !getValues("clt_secret") || !getValues("auth_url") ||
                            !getValues("token_url") || !getValues("api_method") || !getValues("polling_interval"))
                          ) || !!errors.app_name ||
                          // If blueprint auth has been checked and it's okay
                          (checkBlueprintAuthStatus.isChecked && !checkBlueprintAuthStatus.isError)
                        }
                        disableElevation
                        onClick={checkBlueprintAuth}
                        size="large"
                        variant="contained"
                      >
                        {t("applications.buttons.submitApp")}
                      </Button>

                      <Button
                        className={classes.otherButtons}
                        disabled={
                          !checkBlueprintAuthStatus.isChecked ||
                          (checkBlueprintAuthStatus.isChecked && checkBlueprintAuthStatus.isError)
                        }
                        onClick={() => goToConnectorSettings()}
                        color="secondary"
                        variant="outlined"
                      >
                        {t("applications.buttons.editConnectorSettings")}
                      </Button>
                    </Box>

                    <Button
                      className={classes.otherButtons}
                      onClick={() => checkHistory(history)}
                      color="secondary"
                      variant="outlined"
                    >
                      {t("applications.buttons.backToApps")}
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </Box>
        )
      }

      {
        <CustomizableDialog
          cancelButtonProps={{
            variant: "outlined",
            color: "primary",
          }}
          closeDialogCallback={() => openDeleteDialog(false)}
          confirmButtonCallback={_deleteApp}
          confirmButtonLabel={t("dashboardTab.applicationsSubTab.appModal.dialogConfirmButtonLabel")}
          confirmButtonStyle={classes.deleteAppButtonStyles}
          open={openDialog}
          optionalTitleIcon="warning"
          providedSubText={t("dashboardTab.applicationsSubTab.appModal.dialogSubText")}
          providedText={t("dashboardTab.applicationsSubTab.appModal.dialogText")}
          providedTitle={t("dashboardTab.applicationsSubTab.appModal.dialogTitle")}
        />
      }

      <RouterPrompt
        bodyText={t("applications.prompt.body")}
        cancelText={t("applications.prompt.cancel")}
        okText={t("applications.prompt.ok")}
        subtitle={t("applications.prompt.subtitle")}
        title={t("applications.prompt.title")}
        type="warning"
        when={hasChanged()}
      />
    </>
  );
};
