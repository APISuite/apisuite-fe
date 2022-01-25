import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  Box, Button, CircularProgress, Container, Grid, Icon, Switch, TextField, Typography, useTheme, useTranslation,
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
import { getUserApp } from "store/applications/actions/getUserApp";
import { updateApp } from "store/applications/actions/updatedApp";
import { applicationsViewSelector } from "./selector";
import useStyles from "./styles";
import { LocationHistory } from "./types";
import { toggleBlueprintAppStatusAction } from "store/applications/actions/toggleBlueprintAppStatus";
import { mapFieldsAction } from "store/applications/actions/mapFields";

export const BlueprintConnectorSettings: React.FC = () => {
  const classes = useStyles();
  const { palette, spacing } = useTheme();

  const { t } = useTranslation();

  const history = useHistory() as LocationHistory;
  const dispatch = useDispatch();

  const {
    app, createdId, currentBlueprintAppData, currentBlueprintAppFields,
    isActive, names: allUserAppNames, types, requesting,
  } = useSelector(applicationsViewSelector);
  const { profile } = useSelector(profileSelector);

  const appType = useRef<AppType>(types[0]);
  const { appId, typeId } = useParams<{ appId: string; typeId: string }>();
  const isNew = Number.isNaN(Number(appId));
  
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
    // TODO: Don't do it like this - make it respond to the inclusion of more fields.
    // TODO: Retrieve these fields from response given by the POST to (...appconnectorURL...)/apps
    defaultValues: {
      app_field_1: currentBlueprintAppFields[0],
      app_field_2: currentBlueprintAppFields[1],
      app_field_3: currentBlueprintAppFields[2],
      api_field_1: "",
      api_field_2: "",
      api_field_3: "",
    },
    mode: "onChange",
    resolver: yupResolver(appSchema),
    reValidateMode: "onChange",
  });

  /* App-related actions */

  // Mapping app/API fields

  const mapFields = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const allFields = {
      ...getValues(),
    };

    const newMappedFields = {
      app_name: currentBlueprintAppData.app_name,
      map: {
        [allFields.app_field_1]: allFields.api_field_1,
        [allFields.app_field_2]: allFields.api_field_2,
        [allFields.app_field_3]: allFields.api_field_3,
      },
    };
    
    dispatch(mapFieldsAction({ mappedFields: newMappedFields }));
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

  // 'Active app status' logic

  const [activeApp, setActiveApp] = React.useState(false);

  const toggleActiveAppStatus = (isAppActive: boolean) => {
    dispatch(toggleBlueprintAppStatusAction({
      toggleBlueprintAppStatusData: { app_name: currentBlueprintAppData.app_name, command: isAppActive ? "start" : "stop" },
    }));

    /* TODO: Will only be set if the above action/request is completed, which is fortunate in the case of errors,
    but still, look into this once time allows. */
    setActiveApp(isAppActive);
  };

  React.useEffect(() => {
    setActiveApp(isActive);
  }, [isActive]);

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
                        {currentBlueprintAppData.app_name}
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

              {/* 'Fields' section */}
              <Grid container spacing={3}>
                <Grid item md={12}>
                  <Box pb={1.5}>
                    <Typography display="block" gutterBottom variant="h6">
                      {t("dashboardTab.applicationsSubTab.appModal.connectorSettingsSectionTitle")}
                    </Typography>
                  </Box>

                  <Box pb={1.5}>
                    <Typography display="block" gutterBottom style={{ color: palette.text.secondary }} variant="body2">
                      {t("dashboardTab.applicationsSubTab.appModal.connectorSettingsSectionSubtitle")}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item md={6}>
                  <Box pb={1.5}>
                    <Typography display="block" gutterBottom style={{ color: palette.text.secondary }} variant="subtitle1">
                      {t("dashboardTab.applicationsSubTab.appModal.appFieldsTitle")}
                    </Typography>
                  </Box>

                  {/* TODO: Improve on this - one should be able to add as many app/API fields as one wants */}
                  <Box>
                    <Controller
                      control={control}
                      name="app_field_1"
                      render={({ field }) => (
                        <TextField
                          className={classes.inputFields}
                          error={!!errors.app_field_1}
                          {...field}
                          fullWidth
                          helperText={errors.app_field_1?.message}
                          label="App field 1"
                          margin="dense"
                          type="text"
                          variant="outlined"
                        />
                      )}
                    />
                  </Box>

                  <Box style={{ display: "flex" }}>
                    <Controller
                      control={control}
                      name="app_field_2"
                      render={({ field }) => (
                        <TextField
                          className={classes.inputFields}
                          error={!!errors.app_field_2}
                          {...field}
                          fullWidth
                          helperText={errors.app_field_2?.message}
                          label="App field 2"
                          margin="dense"
                          type="text"
                          variant="outlined"
                        />
                      )}
                    />

                    <Icon style={{ color: palette.grey[300], fontSize: 40, marginLeft: spacing(7.5) }}>sync_alt</Icon>
                  </Box>

                  <Box>
                    <Controller
                      control={control}
                      name="app_field_3"
                      render={({ field }) => (
                        <TextField
                          className={classes.inputFields}
                          error={!!errors.app_field_3}
                          {...field}
                          fullWidth
                          helperText={errors.app_field_3?.message}
                          label="App field 3"
                          margin="dense"
                          type="text"
                          variant="outlined"
                        />
                      )}
                    />
                  </Box>
                </Grid>

                <Grid item md={6}>
                  <Box pb={1.5}>
                    <Typography display="block" gutterBottom style={{ color: palette.text.secondary }} variant="subtitle1">
                      {t("dashboardTab.applicationsSubTab.appModal.apiProdFieldsTitle")}
                    </Typography>
                  </Box>

                  <Box>
                    <Controller
                      control={control}
                      name="api_field_1"
                      render={({ field }) => (
                        <TextField
                          className={classes.inputFields}
                          error={!!errors.api_field_1}
                          {...field}
                          fullWidth
                          helperText={errors.api_field_1?.message}
                          label="API field 1"
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
                      name="api_field_2"
                      render={({ field }) => (
                        <TextField
                          className={classes.inputFields}
                          error={!!errors.api_field_2}
                          {...field}
                          fullWidth
                          helperText={errors.api_field_2?.message}
                          label="API field 2"
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
                      name="api_field_3"
                      render={({ field }) => (
                        <TextField
                          className={classes.inputFields}
                          error={!!errors.api_field_3}
                          {...field}
                          fullWidth
                          helperText={errors.api_field_3?.message}
                          label="API field 3"
                          margin="dense"
                          type="text"
                          variant="outlined"
                        />
                      )}
                    />
                  </Box>
                </Grid>
              </Grid>

              {/* 'App status' section */}
              <Grid container spacing={3}>
                <Grid item md={12}>
                  <Box pb={1.5}>
                    <Typography display="block" gutterBottom variant="h6">
                      {t("dashboardTab.applicationsSubTab.appModal.appStatusTitle")}
                    </Typography>
                  </Box>

                  <Box pb={1.5}>
                    <Typography display="block" gutterBottom style={{ color: palette.text.secondary }} variant="body2">
                      {t("dashboardTab.applicationsSubTab.appModal.appStatusSubtitle")}
                    </Typography>
                  </Box>

                  <Box pb={4} style={{ alignItems: "center", display: "flex" }}>
                    <Switch
                      checked={activeApp}
                      onChange={() => toggleActiveAppStatus(!activeApp)}
                      color="primary"
                    />

                    <Typography display="block" gutterBottom style={{ color: palette.text.secondary }} variant="body2">
                      {
                        activeApp
                          ? t("dashboardTab.applicationsSubTab.appModal.activeApp")
                          : t("dashboardTab.applicationsSubTab.appModal.inactiveApp")
                      }
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* 'App action' buttons section */}
              <div className={classes.buttonsContainer}>
                <Grid container spacing={3}>
                  <Grid component={Box} display="flex" item justify="space-between" md={12}>
                    <Box>
                      {/* TODO: Keep disabled for now - only useful for created apps. */}
                      {/* <Button
                        color="primary"
                        disableElevation
                        onClick={_updateApp}
                        size="large"
                        variant="contained"
                      >
                        {t("applications.buttons.saveChanges")}
                      </Button> */}

                      <Button
                        color="primary"
                        disableElevation
                        size="large"
                        variant="contained"
                        onClick={mapFields}
                      >
                        {t("applications.buttons.submitApp")}
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
