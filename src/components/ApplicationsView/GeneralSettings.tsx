import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  Box, Button, CircularProgress, Container, Grid, Icon,
  InputAdornment, TextField, Typography, useTheme, useTranslation,
} from "@apisuite/fe-base";
import clsx from "clsx";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import markdownIcon from "assets/markdownIcon.svg";
import { AvatarDropzone } from "components/AvatarDropzone";
import { CustomizableTooltip } from "components/CustomizableTooltip";
import { TypeChip } from "components/AppTypesModal";
import CustomizableDialog from "components/CustomizableDialog/CustomizableDialog";
import Notice from "components/Notice";
import { RouterPrompt } from "components/RouterPrompt";
import { createApp } from "store/applications/actions/createApp";
import { deleteApp } from "store/applications/actions/deleteApp";
import { getUserApp } from "store/applications/actions/getUserApp";
import { updateApp } from "store/applications/actions/updatedApp";
import { AppData, AppType } from "store/applications/types";
import { getProfile } from "store/profile/actions/getProfile";
import { getSections } from "util/extensions";
import { applicationsViewSelector } from "./selector";
import { profileSelector } from "pages/Profile/selectors";
import useStyles from "./styles";
import { LocationHistory } from "./types";
import { getAppTypes } from "store/applications/actions/getAppTypes";
import { getNextType, getPreviousType } from "components/AppTypesModal/util";
import { AppTypesTab } from "pages/AppView/types";

export const GeneralSettings: React.FC = () => {
  const classes = useStyles();
  const { appId, typeId } = useParams<{ appId: string; typeId: string  }>();
  const { palette, spacing } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory() as LocationHistory;
  const { app, createdId, names: allUserAppNames, types, requesting } = useSelector(applicationsViewSelector);
  const { profile } = useSelector(profileSelector);
  const [avatar, setAvatar] = React.useState("");
  const appType = useRef<AppType>(types[0]);
  const isNew = Number.isNaN(Number(appId));

  useEffect(() => {
    if (isNew && createdId !== -1) {
      history.push(`/dashboard/apps/${createdId}/type/${typeId}/${AppTypesTab.GENERAL}`);
    }
    if (!isNew && app.appType.id !== Number(typeId) && app.id !== -1 && app.appType.id !== 0) {
      history.push(`/dashboard/apps/${appId}/type/${app.appType.id}/${AppTypesTab.GENERAL}`);
    }
  }, [app.id, app.appType.id, appId, createdId, history, isNew, typeId]);

  useEffect(() => {
    if (!types.length) {
      dispatch(getAppTypes({}));
    } else {
      appType.current = types.find((tp) => tp.id.toString() === typeId) as AppType;
    }
  }, [dispatch, typeId, types]);

  const dialogFunctions: { [index: string]: (hist: LocationHistory) => void } = {
    toggleModal: (hist: LocationHistory) => hist.push("/dashboard/apps"),
    regularGoToSubsView: (hist: LocationHistory) => hist.push("/dashboard/subscriptions"),
    alternativeGoToSubsView: (hist: LocationHistory) => hist.push("/dashboard/subscriptions", {
      redirected: true,
      appID: hist.location.state?.appID || appId,
    }),
  };

  const checkNextAction = (fn: string, hist: LocationHistory) => {
    dialogFunctions[fn](hist);
  };

  const checkHistory = (hist: LocationHistory) => {
    hist.location.state?.redirected
      ? checkNextAction("alternativeGoToSubsView", hist)
      : checkNextAction("toggleModal", hist);
  };

  useEffect(() => {
    if (!profile.current_org.id) {
      dispatch(getProfile({}));
    }
  });

  useEffect(() => {
    if (!isNew && profile.current_org.id && (app.id === 0 || app.id !== Number(appId))) {
      dispatch(getUserApp({ orgID: profile.current_org.id, appId: Number(appId) }));
    }
  }, [app.id, appId, dispatch, isNew, profile]);

  const appSchema = yup.object().shape({
    name: yup.string()
      .test("isAppNameValid", t("dashboardTab.applicationsSubTab.appModal.existingAppNameError"),
        (value: string|undefined) => {
          return !(isNew && allUserAppNames.includes(value || ""));
        })
      .required(t("dashboardTab.applicationsSubTab.appModal.noAppNameError")),
    summary: yup.string()
      .max(60, t("dashboardTab.applicationsSubTab.appModal.errors.summaryLimit")),
  });

  const {
    control,
    formState: { errors, isDirty, isValid },
    getValues,
    register,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      logo: app.logo || "",
      description: app.description || "",
      name: app.name || "",
      summary: app.summary || "",
    },
    mode: "onChange",
    resolver: yupResolver(appSchema),
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (!isNew) {
      setValue("logo", app.logo, { shouldDirty: false });
      setValue("description", app.description, { shouldDirty: false });
      setValue("name", app.name, { shouldDirty: false });
      setValue("summary", app.summary, { shouldDirty: false });
    }
  }, [app, isNew, setValue]);

  /* App-related actions */

  // Creating an app

  const createNewApp = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const newAppDetails = {
      ...app,
      ...getValues(),
    };

    dispatch(createApp({ orgID: profile.current_org.id, appData: newAppDetails, appType: Number(appType) }));
  };

  // Updating an app

  const _updateApp = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const updatedAppDetails = {
      ...app,
      ...getValues(),
    };

    dispatch(updateApp({ orgID: profile.current_org.id, appData: updatedAppDetails }));
  };

  const updateAppType = (type: AppType) => {
    const updatedAppDetails = {
      ...app,
      ...getValues(),
      appTypeId: type.id,
    };

    dispatch(updateApp({ orgID: profile.current_org.id, appData: updatedAppDetails }));
  };

  // Deleting an app

  const [openDialog, setOpenDialog] = React.useState(false);

  const openDeleteDialog = (isOpen: boolean) => {
    setOpenDialog(isOpen);
  };

  const _deleteApp = () => {
    dispatch(deleteApp({ orgID: profile.current_org.id, appId: Number(appId) }));

    openDeleteDialog(false);
    history.push("/dashboard/apps");
  };

  const hasChanged = () => {
    return (isValid || Object.keys(errors).length === 0) && isDirty;
  };

  const handleNext = (application: AppData) => {
    const next = getNextType(application.appType, AppTypesTab.GENERAL);
    history.push(`/dashboard/apps/${application.id}/type/${application.appType.id}/${next}`);
  };

  const handlePrevious = (application: AppData) => {
    const prev = getPreviousType(application.appType, AppTypesTab.GENERAL);
    history.push(`/dashboard/apps/${application.id}/type/${application.appType.id}/${prev}`);
  };

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
            {/* Modal's title */}
            {
              isNew
                ? (
                  <Box pb={3}>
                    <Typography display="block" gutterBottom variant="h2">
                      {t("dashboardTab.applicationsSubTab.appModal.newAppLabel")}
                    </Typography>
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
                        {/* A mere dot */}
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

            {/* 'General information' section */}
            <Grid container spacing={3}>
              {/* 'App name and summary' subsection */}
              <Grid item md={12}>
                <Grid item md={6}>
                  <Box pb={1.5}>
                    <Typography display="block" gutterBottom variant="h6">
                      {t("dashboardTab.applicationsSubTab.appModal.subSectionLabelOne")}
                    </Typography>
                  </Box>

                  <Box pb={5}>
                    <Typography display="block" gutterBottom style={{ color: palette.text.secondary }} variant="body2">
                      {t("dashboardTab.applicationsSubTab.appModal.subSectionLabelTwo")}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Grid item md={6}>

                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <TextField
                      className={classes.inputFields}
                      error={!!errors.name}
                      {...field}
                      fullWidth
                      helperText={errors.name?.message}
                      label={t("dashboardTab.applicationsSubTab.appModal.appNameFieldLabel")}
                      margin="dense"
                      required
                      type="text"
                      variant="outlined"
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="summary"
                  render={({ field }) => (
                    <TextField
                      className={classes.inputFields}
                      error={!!errors.summary}
                      {...field}
                      fullWidth
                      helperText={errors.summary?.message}
                      label={t("dashboardTab.applicationsSubTab.appModal.appSummaryFieldLabel")}
                      margin="dense"
                      multiline
                      rows={2}
                      style={{ height: 60 }}
                      type="text"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>

              {/* 'App avatar' subsection */}
              <Grid item md={6}>

                <AvatarDropzone
                  image={avatar || getValues("logo")}
                  onDeletePressed={() => {
                    setValue("logo", "", { shouldDirty: true });
                    setAvatar("");
                  }}
                  onFileLoaded={(image: string) => {
                    setAvatar(image);
                    setValue("logo", image, { shouldDirty: true });
                  }}
                />
              </Grid>

              <Grid item md={12}>
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <TextField
                      className={clsx(classes.inputFields, classes.descriptionField)}
                      {...field}
                      fullWidth
                      label={t("dashboardTab.applicationsSubTab.appModal.appDescriptionFieldLabel")}
                      margin="dense"
                      multiline
                      rows={9}
                      type="text"
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            className={classes.markdownIcon}
                            position="end"
                          >
                            <CustomizableTooltip
                              tooltipContent={
                                <Typography variant="caption">
                                  {t("dashboardTab.applicationsSubTab.appModal.markdownTooltipText")}
                                </Typography>
                              }
                            >
                              <img src={markdownIcon} style={{ height: 24, width: 24 }} />
                            </CustomizableTooltip>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>

            </Grid>

            <hr className={classes.alternativeSectionSeparator} />

            {
              getSections(
                "MARKETPLACE_APP_SETTINGS",
                {
                  formUtil: {
                    control,
                    errors,
                    getValues,
                    register,
                    reset,
                    setValue,
                  },
                  data: app,
                }
              )
            }

            {
              !isNew && (
                <Grid container spacing={3}>
                  <Grid container item md={12}>
                    <Grid item md={6}>
                      <Box clone pb={1.5}>
                        <Typography display="block" variant="h6">
                          {t("dashboardTab.applicationsSubTab.appModal.appSubsTitle")}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item md={6}>
                      <Typography style={{ color: palette.text.secondary }} variant="body2">
                        {t("dashboardTab.applicationsSubTab.appModal.appSubsDescription")}
                      </Typography>
                    </Grid>

                    <Grid item md={12}>
                      <Button
                        className={classes.otherButtons}
                        color="secondary"
                        onClick={() => checkNextAction(history.location.state?.redirected ? "alternativeGoToSubsView" : "regularGoToSubsView", history)}
                        style={{ margin: spacing(2, 0, 0, 0) }}
                        variant="outlined"
                      >
                        {t("dashboardTab.applicationsSubTab.appModal.appSubsButtonLabel")}
                      </Button>
                    </Grid>
                  </Grid>

                  <hr className={classes.alternativeSectionSeparator} />

                  <Grid item md={12}>
                    <Box clone pb={1.5}>
                      <Typography display="block" variant="h6">
                        {t("dashboardTab.applicationsSubTab.appModal.removeAppTitle")}
                      </Typography>
                    </Box>
                    <Button
                      className={classes.removeAppButton}
                      onClick={() => openDeleteDialog(true)}
                      style={{ margin: spacing(2, 0, 5, 0) }}
                    >
                      {t("dashboardTab.applicationsSubTab.appModal.removeAppButtonLabel")}
                    </Button>
                  </Grid>
                </Grid>
              )
            }

            {/* 'App action' buttons section */}
            <div className={classes.buttonsContainer}>
              {
                isNew
                  ? (
                    <Grid container spacing={3}>
                      <Grid component={Box} display="flex" item justify="space-between" md={12}>
                        <Button
                          color="primary"
                          disabled={!getValues("name") || !!errors.name}
                          disableElevation
                          onClick={createNewApp}
                          size="large"
                          variant="contained"
                        >
                          {t("applications.buttons.registerApp")}
                        </Button>

                        <Button
                          className={classes.otherButtons}
                          onClick={() => checkHistory(history)}
                          color="secondary"
                          variant="outlined"
                        >
                          {t("applications.buttons.backToApps")}
                        </Button>
                      </Grid>

                      <Grid item md={6}>
                        <Notice
                          noticeIcon={<Icon>query_builder</Icon>}
                          noticeText={
                            <Box display="flex" flexDirection="column">
                              <Typography display="block" style={{ color: palette.info.dark }} variant="body2">
                                {t("dashboardTab.applicationsSubTab.appModal.infoBoxTitleLabel")}
                              </Typography>

                              <Typography display="block" style={{ color: palette.info.dark }} variant="body2">
                                {t("dashboardTab.applicationsSubTab.appModal.infoBoxSubTitleLabel")}
                              </Typography>
                            </Box>
                          }
                          type="info"
                        />
                      </Grid>
                    </Grid>
                  )
                  : (
                    <>
                      <div>
                        <Button
                          color="primary"
                          disabled={!hasChanged()}
                          disableElevation
                          onClick={_updateApp}
                          size="large"
                          variant="contained"
                        >
                          {t("dashboardTab.applicationsSubTab.appModal.editAppButtonLabel")}
                        </Button>
                        {
                          !!getNextType(app.appType, AppTypesTab.GENERAL) && <Button
                            color="primary"
                            disableElevation
                            onClick={() => handleNext(app)}
                            size="large"
                            style={{ margin: spacing(0, 0, 0, 3) }}
                            variant="contained"
                          >
                            {t("applications.buttons.next")}
                          </Button>
                        }
                        {
                          !!getPreviousType(app.appType, AppTypesTab.GENERAL) && <Button
                            color="secondary"
                            disableElevation
                            onClick={() => handlePrevious(app)}
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
                        onClick={() => checkHistory(history)}
                        color="primary"
                        variant="outlined"
                      >
                        {t("applications.buttons.backToApps")}
                      </Button>
                    </>
                  )
              }
            </div>
          </Container>
        </Box>
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
