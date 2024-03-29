import React, { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  Box, Button, CircularProgress, Container, Grid, Icon,
  InputAdornment, TextField, Typography, useTheme, useTranslation,
} from "@apisuite/fe-base";
import clsx from "clsx";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import markdownIcon from "assets/markdownIcon.svg";
import { AppTypesTab } from "pages/AppView/types";
import { profileSelector } from "pages/Profile/selectors";
import { AvatarDropzone } from "components/AvatarDropzone";
import { CustomizableTooltip } from "components/CustomizableTooltip";
import { RouterPrompt } from "components/RouterPrompt";
import CustomizableDialog from "components/CustomizableDialog/CustomizableDialog";
import Notice from "components/Notice";
import { AppType } from "store/applications/types";
import { createApp } from "store/applications/actions/createApp";
import { deleteApp } from "store/applications/actions/deleteApp";
import { getBlueprintDetailsAction } from "store/applications/actions/getBlueprintDetails";
import { resetUserApp } from "store/applications/actions/getUserApp";
import { applicationsViewSelector } from "./selector";
import { LocationHistory } from "./types";
import useStyles from "./styles";
import { getSections } from "util/extensions";
import { ActionsFooter, AppHeader, checkHistory, checkNextAction, getAppType, NotFound, useGetApp } from "./util";

export const GeneralSettings: React.FC = () => {
  const classes = useStyles();
  const { palette, spacing } = useTheme();

  const { t } = useTranslation();

  const { appId, typeId } = useParams<{ appId: string; typeId: string }>();
  const history = useHistory() as LocationHistory;

  const { app, status, types, requesting, getBlueprintDetailsStatus } = useSelector(applicationsViewSelector);
  const { profile } = useSelector(profileSelector);
  const dispatch = useDispatch();

  // Set-up logic

  const appType = useRef<AppType>(getAppType(types, typeId));
  const isNew = Number.isNaN(Number(appId));

  /* To create a blueprint-derived app, we need the blueprint's name so as to retrieve its details.
  This blueprint's name will be made available to us as a URL parameter. */
  const encodedBlueprintName = new URLSearchParams(window.location.search).get("blueprintID");
  const decodedBlueprintName = encodedBlueprintName ? decodeURIComponent(encodedBlueprintName) : null;

  if (isNew && decodedBlueprintName && decodedBlueprintName !== getBlueprintDetailsStatus.name) {
    /* Triggers the retrieval and storage (on the app's Store, under 'applications')
    of all details related to a particular blueprint. */
    dispatch(getBlueprintDetailsAction({ blueprintName: decodedBlueprintName }));
  }

  useEffect(() => {
    /* If we're creating a new app, but we have some app's details in our Store,
    we reset the Store's details so they don't unintentionally show up on the new one. */
    if (isNew && app.id !== 0 || isNew && app.name !== "") {
      dispatch(resetUserApp());
    }
  }, [app.id, app.name, decodedBlueprintName, dispatch, getBlueprintDetailsStatus.name, isNew]);

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

  const appSchema = yup.object().shape({
    name: yup.string()
      .required(t("dashboardTab.applicationsSubTab.appModal.noAppNameError")),
    shortDescription: yup.string()
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
      description: app.description || "",
      logo: app.logo || "",
      name: app.name || "",
      shortDescription: app.shortDescription || "",
    },
    mode: "onChange",
    resolver: yupResolver(appSchema),
    reValidateMode: "onChange",
  });

  const [avatar, setAvatar] = React.useState("");

  useEffect(() => {
    if (!isNew) {
      setAvatar(app.logo);
      setValue("description", app.description, { shouldDirty: false });
      setValue("logo", app.logo, { shouldDirty: false });
      setValue("name", app.name, { shouldDirty: false });
      setValue("shortDescription", app.shortDescription, { shouldDirty: false });
    }
    if (app.logo && decodedBlueprintName) {
      setAvatar(app.logo);
    }
  }, [app, isNew, setValue]);

  /* App-related actions */

  // Creating an app

  const createNewApp = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const newAppDetails = {
      ...app,
      ...getValues(),
      appType: {
        createdAt: app.appType.createdAt,
        updatedAt: app.appType.updatedAt,
        ...appType.current,
      },
      appTypeId: Number(typeId),
    };

    dispatch(createApp({
      appData: newAppDetails,
      blueprintName: encodedBlueprintName || undefined,
      orgID: profile.currentOrg.id,
    }));
  };

  // Deleting an app

  const [openDialog, setOpenDialog] = React.useState(false);

  const openDeleteDialog = (isOpen: boolean) => {
    setOpenDialog(isOpen);
  };

  const _deleteApp = () => {
    dispatch(deleteApp({ orgID: profile.currentOrg.id, appId: Number(appId), appType: app.appType.type }));

    openDeleteDialog(false);
    history.push("/dashboard/apps");
  };

  const hasChanges = () => {
    return (isValid || Object.keys(errors).length === 0) && (isDirty || avatar !== app.logo);
  };

  const getBackToTranslation = () => {
    const fromSubs = history.location.state?.redirected;
    if (fromSubs) {
      return t("applications.buttons.backToSubs");
    }
    return t("applications.buttons.backToApps");
  };

  const appNotFound = () => {
    return status.get.isError && app.id !== Number(appId);
  };

  return (
    <>
      {
        requesting && <div className={classes.centerContent}>
          <CircularProgress size={50} className={classes.loading} />
        </div>
      }
      {
        (!requesting && !appNotFound()) && <Box clone>
          <Container maxWidth="lg">
            {/* App title */}
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
                  <AppHeader
                    app={app}
                    getFormValues={getValues}
                    orgId={profile.currentOrg.id}
                    types={types}
                    typeId={typeId}
                  />
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
                      {...field}
                      className={classes.inputFields}
                      error={!!errors.name}
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
                  name="shortDescription"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className={classes.inputFields}
                      error={!!errors.shortDescription}
                      fullWidth
                      helperText={errors.shortDescription?.message}
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
                  image={avatar}
                  onDeletePressed={() => {
                    setAvatar("");
                    setValue("logo", "");
                  }}
                  onFileLoaded={(image: string) => {
                    setAvatar(image);
                    setValue("logo", image);
                  }}
                />
              </Grid>

              <Grid item md={12}>
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className={clsx(classes.inputFields, classes.descriptionField)}
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
                  userRole: "admin",
                  showLabels: true,
                  showVisibility: !(appType.current && ["connector", "blueprint"].includes(appType.current.type)),
                  visibilityEnabled: true,
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
                          color="secondary"
                          onClick={() => checkHistory(history, appId)}
                          variant="outlined"
                        >
                          {getBackToTranslation()}
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
                    <ActionsFooter
                      app={app}
                      appId={appId}
                      getFormValues={getValues}
                      hasChanges={hasChanges}
                      history={history}
                      orgId={profile.currentOrg.id}
                      tabType={AppTypesTab.GENERAL}
                    />
                  )
              }
            </div>
          </Container>
        </Box>
      }

      {
        (!requesting && appNotFound() && !isNew) && <NotFound />
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
        when={hasChanges()}
      />
    </>
  );
};
