import React, { useEffect } from "react";
import {Controller, useForm} from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {Box, Grid, TextField, Typography, useTheme, useTranslation} from "@apisuite/fe-base";
import {VariablesType} from "store/applications/types";
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



export const ConnectorOutput: React.FC = () => {
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
    control,
    formState: { errors, isDirty },
    getValues,
    setValue,
  } = useForm({
    defaultValues: createAppRegisterValues(blueprintConfig),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [availableVariables, setAvailableVariables] = React.useState<VariablesType[]>([]);
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

  useEffect(() => {
    if (!isNew) {
      setCommonValues(blueprintConfig, setValue);
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
  }, [app, isNew, setValue, blueprintConfig]);

  const getTableLabel = () => {
    return blueprintConfig.api_url ?
      t("dashboardTab.applicationsSubTab.appModal.nothingToShow")
      :
      t("dashboardTab.applicationsSubTab.appModal.noUrlDefined");
  };

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
        variableValues: [ ...availableVariables ],
      }),
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
                {t("dashboardTab.applicationsSubTab.appModal.apiProductSettingsTitle")}
              </Typography>
            </Box>
            <Box pb={4}>
              <Typography display="block" gutterBottom style={{ color: palette.text.secondary }} variant="body2">
                {t("dashboardTab.applicationsSubTab.appModal.apiProductSettingsSubtitle")}
              </Typography>
            </Box>
          </Grid>
          <Grid item md={12}>
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
                })} key={`variables${index}`}>
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
            tabType={AppTypesTab.CONNECTOR_OUTPUT}
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
