import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {Box, Grid, TextField, Typography, useTheme, useTranslation, Checkbox} from "@apisuite/fe-base";
import { FieldMappingType } from "store/applications/types";
import { AppTypesTab } from "pages/AppView/types";
import { profileSelector } from "pages/Profile/selectors";
import { RouterPrompt } from "components/RouterPrompt";
import { getBlueprintAppConfig } from "store/applications/actions/getBlueprintAppConfig";
import { applicationsViewSelector } from "./selector";
import { LocationHistory } from "./types";
import { ActionsFooter, AppContainer, useGetApp } from "./util";
import useStyles from "./styles";
import {updateAccessDetailsAction} from "store/applications/actions/updateAccessDetails";
import clsx from "clsx";



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
  const [fieldsMapping, setFieldsMapping] = React.useState<any>([]);
  const [hasChangesValue, setHasChanges] = React.useState<boolean>(false);
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
    formState: { isDirty },
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
      variableValues: blueprintConfig.variableValues,
      fieldsRaw: blueprintConfig.fieldsRaw,
      fieldsMapping: blueprintConfig.fieldsMapping,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (!isNew) {
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
      setValue("variableValues", blueprintConfig.variableValues, { shouldDirty: false });
      setValue("fieldsRaw", blueprintConfig.fieldsRaw, { shouldDirty: false });
      if (blueprintConfig.fieldsMapping && blueprintConfig.fieldsMapping.length)
        setFieldsMapping(blueprintConfig.fieldsMapping);
      else
        buildFieldsMapping(blueprintConfig.fieldsRaw);

    }
  }, [app, isNew, setValue]);

  const buildFieldsMapping = (fieldsRaw : string[]) => {
    const newMapping = [];
    for (const field of fieldsRaw) {
      newMapping.push({
        fieldIn: field,
        fieldOut: "",
        editable: false,
      });
    }
    setFieldsMapping(newMapping);
  };

  React.useEffect(() => {

    const currentValues = { ...getValues()};
    console.log(currentValues.fieldsMapping);
    console.log(fieldsMapping);
    const changed = JSON.stringify(currentValues.fieldsMapping) !== JSON.stringify(fieldsMapping);
    setValue("fieldsMapping", {...fieldsMapping}, { shouldDirty: false });
    setHasChanges(changed);
  }, [fieldsMapping]);


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
    };
    setHasChanges(false);
    dispatch(updateAccessDetailsAction({
      newConfig: newConfigDetails,
      originalAppName: blueprintConfig.app_name,
    }));
  };

  /* App-related actions */

  const hasChanges = () => {
    return isDirty || hasChangesValue;
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
                {t("dashboardTab.applicationsSubTab.appModal.fieldMappingTitle")}
              </Typography>
            </Box>

            <Box mb={4}>
              <Typography display="block" gutterBottom style={{ color: palette.text.secondary }} variant="body2">
                {t("dashboardTab.applicationsSubTab.appModal.fieldMappingSubtitle")}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item md={12}>
            <Box className={classes.customTableHeader}>
              <Box ml={2} mr={5} style={{ width: "153px"}}>
                <Typography style={{ color: palette.text.secondary }} variant="body1">
                  {t("dashboardTab.applicationsSubTab.appModal.integrationField")}
                </Typography>
              </Box>
              <Box ml={2} mr={5}>
                <Typography style={{ color: palette.text.secondary }} variant="body1">
                  {t("dashboardTab.applicationsSubTab.appModal.apiProductField")}
                </Typography>
              </Box>
              <Box mr={5}>
                <Typography style={{ color: palette.text.secondary }} variant="body1">
                  {t("dashboardTab.applicationsSubTab.appModal.endUserEditable")}
                </Typography>
              </Box>
            </Box>
            {fieldsMapping.length && (
              fieldsMapping.map((element : FieldMappingType, index : number) => (
                <Box className={clsx(classes.tableEntry, {
                  [classes.evenTableEntry]: index % 2 === 0,
                  [classes.oddTableEntry]: !(index % 2 === 0),
                })}
                key={`fieldsMapping${index}`}>
                  <Box  mr={5} style={{ width: "153px", marginLeft: "16px", alignItems: "center"}}>
                    <Typography variant="body1">{element.fieldIn}</Typography>
                  </Box>
                  <Box  mr={5} style={{ width: "123px", marginLeft: "16px", alignItems: "center"}}>
                    <TextField
                      className={classes.variables}
                      name="fieldOut"
                      value={element.fieldOut}
                      onChange={(event) => {
                        const newMapping = [...fieldsMapping];
                        newMapping[index].fieldOut = event.target.value;
                        setFieldsMapping(newMapping);
                      }}
                    />
                  </Box>
                  <Box  mr={5} style={{ width: "615px", alignItems: "center"}}>
                    <Checkbox
                      name="description"
                      checked={element.editable}
                      onChange={(event) => {
                        const newFieldsMapping = [...fieldsMapping];
                        newFieldsMapping[index].editable = event.target.checked;
                        setFieldsMapping(newFieldsMapping);
                      }}
                    />
                  </Box >
                </Box>))
            )}
          </Grid>
        </Grid>
        <hr className={classes.regularSectionSeparator} />

        {/* "App action" buttons section */}
        <div className={classes.buttonsContainer}>
          <ActionsFooter
            altSaveButtonAction={updateAccessDetails}
            altSaveButtonLabel={t("applications.buttons.update")}
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
