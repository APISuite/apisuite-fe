import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {Box, Grid, TextField, Typography, useTheme, useTranslation, Checkbox, Switch} from "@apisuite/fe-base";
import { FieldMappingType } from "store/applications/types";
import { AppTypesTab } from "pages/AppView/types";
import { profileSelector } from "pages/Profile/selectors";
import { RouterPrompt } from "components/RouterPrompt";
import { getBlueprintAppConfig } from "store/applications/actions/getBlueprintAppConfig";
import { applicationsViewSelector } from "./selector";
import { LocationHistory } from "./types";
import {
  ActionsFooter,
  AppContainer,
  createAppRegisterValues,
  createBlueprintConfig,
  setCommonValues,
  useGetApp,
} from "./util";
import useStyles from "./styles";
import {updateAccessDetailsAction} from "store/applications/actions/updateAccessDetails";
import clsx from "clsx";
import {toggleBlueprintAppStatusAction} from "store/applications/actions/toggleBlueprintAppStatus";



export const ConnectorSettings: React.FC = () => {
  const classes = useStyles();
  const { palette } = useTheme();
  const { t } = useTranslation();
  const history = useHistory() as LocationHistory;
  const dispatch = useDispatch();
  const {
    app, blueprintConfig, getBlueprintAppConfigStatus,
    requesting, status, types, validateAccessDetailsStatus, isActive,
  } = useSelector(applicationsViewSelector);
  const { profile } = useSelector(profileSelector);

  const { appId, typeId } = useParams<{ appId: string; typeId: string }>();
  const isNew = Number.isNaN(Number(appId));
  const [fieldsMapping, setFieldsMapping] = React.useState<FieldMappingType[]>([]);
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
    defaultValues: createAppRegisterValues(blueprintConfig),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (!isNew) {
      setCommonValues(blueprintConfig, setValue);
      setValue("variableValues", blueprintConfig.variableValues, { shouldDirty: false });
      if (blueprintConfig.fieldsMapping && blueprintConfig.fieldsMapping.length) {
        setFieldsMapping([ ...blueprintConfig.fieldsMapping ]);
      } else {
        buildFieldsMapping(blueprintConfig.fieldsRaw);
      }
    }
  }, [app, isNew, setValue, blueprintConfig]);

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

    const newFieldMapping = [ ...fieldsMapping ];
    setValue("fieldsMapping", newFieldMapping, { shouldDirty: false });
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
    setHasChanges(false);
    dispatch(updateAccessDetailsAction({
      newConfig: createBlueprintConfig({
        ...getValues(),
      }),
      originalAppName: blueprintConfig.app_name,
    }));
  };

  const toggleActiveAppStatus = (isAppActive: boolean) => {
    dispatch(toggleBlueprintAppStatusAction({
      appStatusData: {
        app_name: blueprintConfig.app_name,
        command: isAppActive ? "start" : "stop",
      },
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
        notFound={status.get.isError}
        orgId={profile.currentOrg.id}
        requesting={requesting}
        typeId={typeId}
        types={types}
      >


        <Grid container spacing={3}>
          <Grid item md={12}>
            <Box mb={1}>
              <Typography display="block" gutterBottom variant="h6">
                {t("dashboardTab.applicationsSubTab.appModal.appStatusTitle")}
              </Typography>
            </Box>

            <Box pb={4}>
              <Typography display="block" gutterBottom style={{ color: palette.text.secondary }} variant="body2">
                {t("dashboardTab.applicationsSubTab.appModal.appStatusSubtitle")}
              </Typography>
            </Box>

            <Box style={{ alignItems: "center", display: "flex" }}>
              <Switch
                checked={isActive}
                onChange={() => toggleActiveAppStatus(!isActive)}
                color="primary"
              />
              <Typography display="block" style={{ color: palette.text.secondary }} variant="body2">
                {
                  isActive
                    ? t("dashboardTab.applicationsSubTab.appModal.activeApp")
                    : t("dashboardTab.applicationsSubTab.appModal.inactiveApp")
                }
              </Typography>
            </Box>
          </Grid>
          <hr className={classes.regularSectionSeparator} />
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
            {fieldsMapping.length > 0 && (
              fieldsMapping.map((element : FieldMappingType, index : number) => (
                <Box className={clsx(classes.tableEntry, {
                  [classes.evenTableEntry]: index % 2 === 0,
                  [classes.oddTableEntry]: index % 2 !== 0,
                })}
                key={`fieldsMapping${index}`}>
                  <Box  mr={5} style={{ width: "153px", marginLeft: "16px", alignItems: "center"}}>
                    <Typography variant="body1">{element.fieldIn}</Typography>
                  </Box>
                  <Box  mr={5} style={{ width: "123px", marginLeft: "32px", alignItems: "center"}}>
                    <TextField
                      className={classes.variables}
                      name="fieldOut"
                      value={element.fieldOut}
                      onChange={(event) => {
                        const newMapping = [...fieldsMapping];
                        newMapping[index].fieldOut = event.target.value;
                        setFieldsMapping(newMapping);
                        setHasChanges(true);
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
                        setHasChanges(true);
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
