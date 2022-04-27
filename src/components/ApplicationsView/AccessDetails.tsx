import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Box, Grid, Icon, Switch, TextField, Typography, useTheme, useTranslation } from "@apisuite/fe-base";
import clsx from "clsx";

import { AppTypesTab } from "pages/AppView/types";
import { profileSelector } from "pages/Profile/selectors";
import { RouterPrompt } from "components/RouterPrompt";
import { getBlueprintAppConfig } from "store/applications/actions/getBlueprintAppConfig";
import { updateAccessDetailsAction } from "store/applications/actions/updateAccessDetails";
import { validateAccessDetailsAction } from "store/applications/actions/validateAccessDetails";
import { VariablesType } from "store/applications/types";
import { applicationsViewSelector } from "./selector";
import { LocationHistory } from "./types";
import {ActionsFooter, AppContainer, createAppRegisterValues, createBlueprintConfig, useGetApp} from "./util";
import useStyles from "./styles";
import { fillBlueprintAppConfig } from "store/applications/actions/fillBlueprintAppConfig";
import Notice from "components/Notice";

export const AccessDetails: React.FC = () => {
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

  const AUTH_TYPES = {
    OAUTH: "oauth",
    TOKEN: "token",
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

  const getTableLabel = () => {
    return blueprintConfig.api_url ?
      t("dashboardTab.applicationsSubTab.appModal.nothingToShow")
      :
      t("dashboardTab.applicationsSubTab.appModal.noUrlDefined");
  };

  const {
    control,
    formState: { errors, isDirty, isValid },
    getValues,
    setValue,
  } = useForm({
    defaultValues:  createAppRegisterValues(blueprintConfig),
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
      setValue("fieldsRaw", blueprintConfig.fieldsRaw, { shouldDirty: false });
      setValue("fieldsMapping", blueprintConfig.fieldsMapping, { shouldDirty: false });
      if (
        blueprintConfig.variableValues &&
        blueprintConfig.variableValues.length === getURLVars(blueprintConfig.api_url).length
      ) {
        setAvailableVariables(blueprintConfig.variableValues);
      } else {
        validateVars(blueprintConfig.api_url);
      }
    }
  }, [app, isNew, setValue]);

  useEffect(() => {
    if (getBlueprintAppConfigStatus.isRequesting) return;
    /* If "getBlueprintAppConfigStatus.isError" amounts to "true",
    it means the blueprint app has yet to be configured. */
    if (getBlueprintAppConfigStatus.isError) {
      const metadata = app.metadata.filter((value) => value.key === "meta_origin_blueprint");
      if (metadata.length && !getBlueprintAppConfigStatus.retrieved) {
        dispatch(fillBlueprintAppConfig({ blueprintName: metadata[0].value, appId: app.id }));
      }
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

  // Authentication type logic

  const [selectedAuth, setSelectedAuth] = React.useState(blueprintConfig.app_conf.conn_auth_type);

  const [availableVariables, setAvailableVariables] = React.useState<VariablesType[]>([]);

  const handleAuthSelection = (selectedAuthType: string) => {
    setSelectedAuth(selectedAuthType);

    setValue("auth_type", selectedAuthType, { shouldDirty: false });
    setValue("conn_auth_type", selectedAuthType, { shouldDirty: false });
  };

  const getURLVars = (url: string) => {
    const matcher = (url || "").matchAll(/{([^{}]*?)}/g);
    const results = [];
    let value = matcher.next();
    while (!value.done) {
      results.push(value.value[1]);
      value = matcher.next();
    }
    return results;
  };

  const validateVars = (url: string) => {

    const urlVars = getURLVars(url);
    const newVariables = availableVariables.filter((element: VariablesType) => urlVars.includes(element.key));
    const currentVarNames = newVariables.map((element: VariablesType) => element.key);
    const urlsToAdd = urlVars.filter((element: string) => !currentVarNames.includes(element));
    for (const urlToAdd of urlsToAdd) {
      newVariables.push({
        key : urlToAdd,
        friendlyName: "",
        description: "",
      });
    }
    setAvailableVariables(newVariables);
  };

  React.useEffect(()=> {
    setValue("variableValues", availableVariables, { shouldDirty: true });
  }, [availableVariables, setValue]);
  /* App-related actions */

  const hasChanges = () => {
    return (isValid || Object.keys(errors).length === 0) && (isDirty || getBlueprintAppConfigStatus.filled);
  };

  const accessDetailsMissing = (selectedAuthType: string) => {
    // If the app's name, URL, and method are missing
    if (!getValues("app_name") || !getValues("app_url") || !getValues("app_method")) return true;

    // If "Token" auth type fields are missing
    if (selectedAuthType === AUTH_TYPES.TOKEN && (!getValues("token") || !getValues("polling_interval"))) {
      return true;
    }

    // If "OAuth" auth type fields are missing
    return selectedAuthType === AUTH_TYPES.OAUTH && (
      !getValues("clt_id") || !getValues("clt_secret") ||
      !getValues("auth_url") || !getValues("token_url") ||
      !getValues("polling_interval")
    );


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
      api_url: currentConfigDetails.api_url,
      app_id: currentConfigDetails.app_id,
      app_method: currentConfigDetails.app_method,
      app_name: currentConfigDetails.app_name,
      app_url: currentConfigDetails.app_url,
      auth_type: selectedAuthType === AUTH_TYPES.TOKEN ? AUTH_TYPES.TOKEN : AUTH_TYPES.OAUTH,
      polling_interval: currentConfigDetails.polling_interval,
      obo: currentConfigDetails.obo,
      fieldsRaw: currentConfigDetails.fieldsRaw,
      variableValues: currentConfigDetails.variableValues,
      fieldsMapping: currentConfigDetails.fieldsMapping,
    };

    dispatch(validateAccessDetailsAction({ blueprintConfig: newAppDetails }));
  };

  const updateAccessDetails = () => {
    dispatch(updateAccessDetailsAction({
      newConfig: createBlueprintConfig({
        ...getValues(),
      }),
      originalAppName: blueprintConfig.app_name,
    }));
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

          <Grid item md={12}>
            <Box>
              <Controller
                control={control}
                name="app_url"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className={classes.inputFields}
                    error={!!errors.app_url}
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
                    {...field}
                    className={classes.inputFields}
                    error={!!errors.app_method}
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
            <Box mb={2}>
              <Typography display="block" gutterBottom style={{ color: palette.text.secondary }} variant="subtitle1">
                {t("dashboardTab.applicationsSubTab.appModal.oboSubtitle")}
              </Typography>
            </Box>
            <Box style={{ alignItems: "center", display: "flex" }} mb={2}>
              <Controller
                name="obo"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    value={field.value}
                    onChange={(_event, value) => {
                      field.onChange(value);
                    }}
                  />
                )}
              />

              <Typography display="block" style={{ color: palette.text.secondary }} variant="body2">
                {
                  getValues("obo")
                    ? t("dashboardTab.applicationsSubTab.appModal.oboActive")
                    : t("dashboardTab.applicationsSubTab.appModal.oboInactive")
                }
              </Typography>
            </Box>
            <Box mb={2}>
              <Notice
                noticeText={
                  <Typography style={{ color: palette.info.dark }} variant="body2">
                    {t("dashboardTab.applicationsSubTab.appModal.oboAlert")}
                  </Typography>
                }
                type="info"
              />
            </Box>
            <Box mb={2}>
              <Typography display="block" gutterBottom style={{ color: palette.text.secondary }} variant="subtitle1">
                {t("dashboardTab.applicationsSubTab.appModal.authSubtitle")}
              </Typography>
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
                        {...field}
                        className={classes.inputFields}
                        error={!!errors.token}
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
                        {...field}
                        className={classes.inputFields}
                        error={!!errors.polling_interval}
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
                        {...field}
                        className={classes.inputFields}
                        error={!!errors.redirect_url}
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
                        {...field}
                        className={classes.inputFields}
                        error={!!errors.clt_id}
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
                        {...field}
                        className={classes.inputFields}
                        error={!!errors.clt_secret}
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
                        {...field}
                        className={classes.inputFields}
                        error={!!errors.auth_url}
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
                        {...field}
                        className={classes.inputFields}
                        error={!!errors.token_url}
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
                        {...field}
                        className={classes.inputFields}
                        error={!!errors.scope}
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
                    name="polling_interval"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className={classes.inputFields}
                        error={!!errors.polling_interval}
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

          <Grid item md={12}>
            <Box mb={1}>
              <Typography display="block" gutterBottom variant="h6">
                {t("dashboardTab.applicationsSubTab.appModal.apiProductSettingsTitle")}
              </Typography>
            </Box>

            <Box pb={4}>
              <Typography display="block" gutterBottom style={{ color: palette.text.secondary }} variant="body2">
                {t("dashboardTab.applicationsSubTab.appModal.apiProductSettingsSubtitle")}
              </Typography>
            </Box>
            <Box>
              <Controller
                control={control}
                name="api_url"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className={classes.inputFields}
                    error={!!errors.api_url}
                    fullWidth
                    helperText={errors.api_url?.message}
                    label={t("dashboardTab.applicationsSubTab.appModal.blueprintApp.apiURLFieldLabel")}
                    margin="dense"
                    type="text"
                    variant="outlined"
                    onChange={(event) => {
                      field.onChange(event);
                      validateVars(event.target.value);
                    }}
                  />
                )}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item md={12}>
            <Box mb={1}>
              <Typography display="block" variant="subtitle1">
                {t("dashboardTab.applicationsSubTab.appModal.variablesSubtitle")}
              </Typography>
            </Box>
          </Grid>
          <Grid item md={12}>
            <Box className={classes.customTableHeader}>
              <Box ml={2} mr={5}>
                <Typography style={{ color: palette.text.secondary }} variant="body1">
                  {t("dashboardTab.applicationsSubTab.appModal.variableName")}
                </Typography>
              </Box>
              <Box ml={2} mr={5}>
                <Typography style={{ color: palette.text.secondary }} variant="body1">
                  {t("dashboardTab.applicationsSubTab.appModal.variableFriendlyName")}
                </Typography>
              </Box>
              <Box mr={5}>
                <Typography style={{ color: palette.text.secondary }} variant="body1">
                  {t("dashboardTab.applicationsSubTab.appModal.variableDescription")}
                </Typography>
              </Box>
            </Box>
            {availableVariables.length ? (
              availableVariables.map((element : VariablesType, index : number) => (
                <Box className={clsx(classes.tableEntry, {
                  [classes.evenTableEntry]: index % 2 === 0,
                  [classes.oddTableEntry]: index % 2 !== 0,
                })}
                key={`variables${index}`}>
                  <Box  mr={5} style={{ width: "110px", marginLeft: "16px", alignItems: "center"}}>
                    <Typography variant="body1">{element.key}</Typography>
                  </Box>
                  <Box  mr={5} style={{ width: "110px", marginLeft: "16px", alignItems: "center"}}>
                    <TextField
                      className={classes.variables}
                      name="friendlyName"
                      value={element.friendlyName}
                      onChange={(event) => {
                        const newVariables = [...availableVariables];
                        newVariables[index].friendlyName = event.target.value;
                        setAvailableVariables(newVariables);
                      }}
                    />
                  </Box>
                  <Box  mr={5} style={{ width: "615px", alignItems: "center"}}>
                    <TextField
                      name="description"
                      value={element.description}
                      className={classes.variables}
                      onChange={(event) => {
                        const newVariables = [...availableVariables];
                        newVariables[index].description = event.target.value;
                        setAvailableVariables(newVariables);
                      }}
                      fullWidth
                    />
                  </Box >
                </Box>))
            ) : (
              <div className={classes.nothingToShow}>
                <Typography variant="body1">{getTableLabel()}</Typography>
              </div>
            )}
          </Grid>
        </Grid>
        <hr className={classes.regularSectionSeparator} />
        {/* "App action" buttons section */}
        <div className={classes.buttonsContainer}>
          <ActionsFooter
            altSaveButtonAction={
              () => {
                (validateAccessDetailsStatus.validated || getBlueprintAppConfigStatus.retrieved)
                  ? updateAccessDetails()
                  : validateAccessDetails(selectedAuth);
              }
            }
            altSaveButtonLabel={t("applications.buttons.validateAccessDetails")}
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
