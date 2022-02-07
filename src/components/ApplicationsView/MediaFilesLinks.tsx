import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  Box, Fade, Grid, Icon, Menu, MenuItem, TextField,
  Typography, useTheme, useTranslation,
} from "@apisuite/fe-base";
import {  useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { MediaUpload } from "components/MediaUpload";
import { RouterPrompt } from "components/RouterPrompt";
import { profileSelector } from "pages/Profile/selectors";
import { AppTypesTab } from "pages/AppView/types";
import { deleteAppMedia } from "store/applications/actions/deleteAppMedia";
import { uploadAppMedia } from "store/applications/actions/appMediaUpload";
import { isValidURL } from "util/forms";
import { applicationsViewSelector } from "./selector";
import useStyles from "./styles";
import { LocationHistory } from "./types";
import { ActionsFooter, AppContainer, useGetApp } from "./util";

export const MediaFilesLinks: React.FC = () => {
  const classes = useStyles();
  const { appId, typeId } = useParams<{ appId: string; typeId: string  }>();
  const { palette } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory() as LocationHistory;
  const { app, createAppStatus, requesting, types } = useSelector(applicationsViewSelector);
  const { profile } = useSelector(profileSelector);
  const isNew = Number.isNaN(Number(appId));

  useGetApp({
    app,
    appId,
    createAppStatus,
    history,
    isNew,
    profile,
    typeId,
  });

  // Performs some basic checks on user-provided URIs
  const uriBasicChecks = (uri: string | number) => {
    const stringURI = uri ? uri.toString() : null;

    if (stringURI === null || stringURI.length === 0) return true;
    if (stringURI.length > 0) return isValidURL(stringURI);

    return false;
  };

  const appSchema = yup.object().shape({
    privacyUrl: yup.string()
      .test("isAppPrivacyURLValid", t("dashboardTab.applicationsSubTab.appModal.allOtherURLsError"), (value: string|undefined) => {
        const URI = value || "";
        return uriBasicChecks(URI);
      }),
    supportUrl: yup.string()
      .test("isAppSupportURLValid", t("dashboardTab.applicationsSubTab.appModal.allOtherURLsError"), (value: string|undefined) => {
        const URI = value || "";
        return uriBasicChecks(URI);
      }),
    tosUrl: yup.string()
      .test("isAppTermsURLValid", t("dashboardTab.applicationsSubTab.appModal.allOtherURLsError"), (value: string|undefined) => {
        const URI = value || "";
        return uriBasicChecks(URI);
      }),
    websiteUrl: yup.string()
      .test("isAppWebsiteURLValid", t("dashboardTab.applicationsSubTab.appModal.allOtherURLsError"), (value: string|undefined) => {
        const URI = value || "";
        return uriBasicChecks(URI);
      }),
    youtubeUrl: yup.string()
      .test("isAppYoutubeURLValid", t("dashboardTab.applicationsSubTab.appModal.allOtherURLsError"), (value: string|undefined) => {
        const URI = value || "";
        return uriBasicChecks(URI);
      }),
  });

  const {
    control,
    formState: { errors, isDirty, isValid },
    getValues,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      privacyUrl:  app.privacyUrl || "",
      supportUrl: app.supportUrl || "",
      tosUrl: app.tosUrl || "",
      websiteUrl: app.websiteUrl || "",
      youtubeUrl: app.youtubeUrl || "",
    },
    mode: "onChange",
    resolver: yupResolver(appSchema),
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (!isNew) {
      setValue("privacyUrl", app.privacyUrl, { shouldDirty: false });
      setValue("supportUrl", app.supportUrl, { shouldDirty: false });
      setValue("tosUrl", app.tosUrl, { shouldDirty: false });
      setValue("websiteUrl", app.websiteUrl, { shouldDirty: false });
      setValue("youtubeUrl", app.youtubeUrl, { shouldDirty: false });
    }
  }, [app, isNew, setValue]);

  /* Optional URL selector */

  const [anchorElement, setAnchorElement] = React.useState<HTMLElement|null>(null);
  const [isShowing, setIsShowing] = React.useState([false, false, false, false]);

  /* Whenever the store's 'applications > currentApp' details become available
  (i.e., upon mounting this React.Component, and immediately after saving an app's details),
  we need to determine what optional URLs have been provided, and are meant to be shown. */
  useEffect(() => {
    setIsShowing([
      !!app.tosUrl,
      !!app.privacyUrl,
      !!app.youtubeUrl,
      !!app.supportUrl,
    ]);
  }, [app]);

  const handleOpenSelector = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    setAnchorElement(e.currentTarget);
  };

  const handleCloseSelector = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    event.stopPropagation();

    setAnchorElement(null);
  };

  const handleShowOptionalURLField = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    indexOfFormFieldToAdd: number,
  ) => {
    event.stopPropagation();

    const newIsShowingArray = [...isShowing];

    newIsShowingArray[indexOfFormFieldToAdd] = true;

    setIsShowing(newIsShowingArray);
    setAnchorElement(null);
  };

  const handleHideOptionalURLField = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    indexOfFormFieldToRemove: number,
  ) => {
    event.stopPropagation();

    const newIsShowingArray = [...isShowing];

    newIsShowingArray[indexOfFormFieldToRemove] = false;

    if (indexOfFormFieldToRemove === 0 && getValues("tosUrl")) {
      reset({ ...getValues(), tosUrl: "" }, { keepDirty: true });
    } else if (indexOfFormFieldToRemove === 1 && getValues("privacyUrl")) {
      reset({ ...getValues(), privacyUrl: "" }, { keepDirty: true });
    } else if (indexOfFormFieldToRemove === 2 && getValues("youtubeUrl")) {
      reset({ ...getValues(), youtubeUrl: "" }, { keepDirty: true });
    } else if (indexOfFormFieldToRemove === 3 && getValues("supportUrl")) {
      reset({ ...getValues(), supportUrl: "" }, { keepDirty: true });
    }

    setIsShowing(newIsShowingArray);
    setAnchorElement(null);
  };

  /* App-related actions */

  const uploadMedia = (files: File[]) => {
    const formData = new FormData();
    for (const file of files) {
      formData.append(file.name, file);
    }

    dispatch(uploadAppMedia({
      orgID: profile.currentOrg.id,
      appId: app.id,
      media: formData,
    }));
  };

  const deleteMedia = (file: string) => {
    dispatch(deleteAppMedia({
      orgID: profile.currentOrg.id,
      appId: app.id,
      media: file,
    }));
  };

  const hasChanges = () => {
    return (isValid || Object.keys(errors).length === 0) && isDirty;
  };

  return (
    <>
      <AppContainer
        app={app}
        isNew={isNew}
        getFormValues={getValues}
        orgId={profile.currentOrg.id}
        requesting={requesting}
        types={types}
        typeId={typeId}
      >
        <Grid alignItems="center" container direction="row" justify="space-between" spacing={3}>
          <Grid item md={12}>
            <Grid item md={6}>
              <Box pb={1.5}>
                <Typography display="block" gutterBottom variant="h6">
                  {t("mediaUpload.title")}
                </Typography>
              </Box>

              <Box pb={5}>
                <Typography
                  display="block"
                  gutterBottom
                  style={{ color: palette.text.secondary }}
                  variant="body2"
                >
                  {t("mediaUpload.description")}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Grid item md={12}>
            <MediaUpload
              accept="image/jpg, image/jpeg, image/png, image/gif, image/svg, image/svg+xml"
              images={app.images || []}
              onDeletePressed={deleteMedia}
              onFileLoaded={uploadMedia}
            />
          </Grid>
        </Grid>

        <hr className={classes.regularSectionSeparator} />

        {/* 'Additional information' section */}
        <Grid container spacing={3}>
          {/* Section's intro */}
          <Grid item md={12}>
            <Grid item md={6}>
              <Box pb={1.5}>
                <Typography display="block" gutterBottom variant="h6">
                  {t("dashboardTab.applicationsSubTab.appModal.subSectionLabelFive")}
                </Typography>
              </Box>

              <Box pb={5}>
                <Typography display="block" gutterBottom style={{ color: palette.text.secondary }} variant="body2">
                  {t("dashboardTab.applicationsSubTab.appModal.subSectionLabelSix")}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* 'Optional URLs' subsection */}
          <Grid item md={6}>
            <div className={classes.appURLFieldWrapper}>
              <Controller
                control={control}
                name="websiteUrl"
                render={({ field }) => (
                  <TextField
                    className={classes.inputFields}
                    error={!!errors.websiteUrl}
                    {...field}
                    fullWidth
                    helperText={errors.websiteUrl?.message}
                    label={t("dashboardTab.applicationsSubTab.appModal.appWebsiteURLFieldLabel")}
                    margin="dense"
                    type="url"
                    variant="outlined"
                  />
                )}
              />

              <div onClick={handleOpenSelector}>
                <Icon>add</Icon>
              </div>
            </div>

            <Menu
              anchorEl={anchorElement}
              onClose={handleCloseSelector}
              open={Boolean(anchorElement)}
              TransitionComponent={Fade}
            >
              <MenuItem
                className={classes.selectorTitle}
                disabled
              >
                {t("dashboardTab.applicationsSubTab.appModal.selectorTitle")}
              </MenuItem>

              <MenuItem
                className={classes.selectorOption}
                disabled={isShowing[0]}
                onClick={(clickEvent) => handleShowOptionalURLField(clickEvent, 0)}
              >
                {t("dashboardTab.applicationsSubTab.appModal.appToSFieldLabel")}
              </MenuItem>

              <MenuItem
                className={classes.selectorOption}
                disabled={isShowing[1]}
                onClick={(clickEvent) => handleShowOptionalURLField(clickEvent, 1)}
              >
                {t("dashboardTab.applicationsSubTab.appModal.appPrivacyPolicyFieldLabel")}
              </MenuItem>

              <MenuItem
                className={classes.selectorOption}
                disabled={isShowing[2]}
                onClick={(clickEvent) => handleShowOptionalURLField(clickEvent, 2)}
              >
                {t("dashboardTab.applicationsSubTab.appModal.appYouTubeChannelFieldLabel")}
              </MenuItem>

              <MenuItem
                className={classes.selectorOption}
                disabled
              >
                {t("dashboardTab.applicationsSubTab.appModal.appWebsiteFieldLabel")}
              </MenuItem>

              <MenuItem
                className={classes.selectorOption}
                disabled={isShowing[3]}
                onClick={(clickEvent) => handleShowOptionalURLField(clickEvent, 3)}
              >
                {t("dashboardTab.applicationsSubTab.appModal.appSupportFieldLabel")}
              </MenuItem>
            </Menu>

            {
              isShowing[0] &&
                    <div className={classes.appURLFieldWrapper}>
                      <Controller
                        control={control}
                        name="tosUrl"
                        render={({ field }) => (
                          <TextField
                            className={classes.inputFields}
                            error={!!errors.tosUrl}
                            {...field}
                            fullWidth
                            helperText={errors.tosUrl?.message}
                            label={t("dashboardTab.applicationsSubTab.appModal.appToSURLFieldLabel")}
                            margin="dense"
                            type="url"
                            variant="outlined"
                          />
                        )}
                      />

                      <div onClick={(clickEvent) => handleHideOptionalURLField(clickEvent, 0)}>
                        <Icon>close</Icon>
                      </div>
                    </div>
            }

            {
              isShowing[1] &&
                    <div className={classes.appURLFieldWrapper}>
                      <Controller
                        control={control}
                        name="privacyUrl"
                        render={({ field }) => (
                          <TextField
                            className={classes.inputFields}
                            error={!!errors.privacyUrl}
                            {...field}
                            fullWidth
                            helperText={errors.privacyUrl?.message}
                            label={t("dashboardTab.applicationsSubTab.appModal.appPrivacyPolicyURLFieldLabel")}
                            margin="dense"
                            type="url"
                            variant="outlined"
                          />
                        )}
                      />

                      <div onClick={(clickEvent) => handleHideOptionalURLField(clickEvent, 1)}>
                        <Icon>close</Icon>
                      </div>
                    </div>
            }

            {
              isShowing[2] &&
                    <div className={classes.appURLFieldWrapper}>
                      <Controller
                        control={control}
                        name="youtubeUrl"
                        render={({ field }) => (
                          <TextField
                            className={classes.inputFields}
                            error={!!errors.youtubeUrl}
                            {...field}
                            fullWidth
                            helperText={errors.youtubeUrl?.message}
                            label={t("dashboardTab.applicationsSubTab.appModal.appYouTubeChannelURLFieldLabel")}
                            margin="dense"
                            type="url"
                            variant="outlined"
                          />
                        )}
                      />

                      <div onClick={(clickEvent) => handleHideOptionalURLField(clickEvent, 2)}>
                        <Icon>close</Icon>
                      </div>
                    </div>
            }

            {
              isShowing[3] &&
                    <div className={classes.appURLFieldWrapper}>
                      <Controller
                        control={control}
                        name="supportUrl"
                        render={({ field }) => (
                          <TextField
                            className={classes.inputFields}
                            error={!!errors.supportUrl}
                            {...field}
                            fullWidth
                            helperText={errors.supportUrl?.message}
                            label={t("dashboardTab.applicationsSubTab.appModal.appSupportURLFieldLabel")}
                            margin="dense"
                            type="url"
                            variant="outlined"
                          />
                        )}
                      />

                      <div onClick={(clickEvent) => handleHideOptionalURLField(clickEvent, 3)}>
                        <Icon>close</Icon>
                      </div>
                    </div>
            }
          </Grid>
        </Grid>

        <hr className={classes.regularSectionSeparator} />

        {/* 'App action' buttons section */}
        <div className={classes.buttonsContainer}>
          <ActionsFooter
            app={app}
            appId={appId}
            getFormValues={getValues}
            hasChanges={hasChanges}
            history={history}
            orgId={profile.currentOrg.id}
            tabType={AppTypesTab.MEDIA}
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
