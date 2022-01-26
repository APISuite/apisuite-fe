import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  Box, Button, CircularProgress, Container, Grid, Icon, IconButton,
  TextField, Trans, Typography, useTheme, useTranslation,
} from "@apisuite/fe-base";
import {  useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Link from "components/Link";
import { RouterPrompt } from "components/RouterPrompt";
import { getNextType, getPreviousType } from "components/AppTypesModal/util";
import { updateApp } from "store/applications/actions/updatedApp";
import { AppType } from "store/applications/types";
import { getAppTypes } from "store/applications/actions/getAppTypes";
import { isValidURL } from "util/forms";
import { AppTypesTab } from "pages/AppView/types";
import { profileSelector } from "pages/Profile/selectors";
import { applicationsViewSelector } from "./selector";
import useStyles from "./styles";
import { LocationHistory } from "./types";
import { AppHeader, checkHistory, handleNext, handlePrevious, useGetApp } from "./util";

export const ClientAccess: React.FC = () => {
  const classes = useStyles();
  const { appId, typeId } = useParams<{ appId: string; typeId: string  }>();
  const { palette, spacing } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory() as LocationHistory;
  const { app, createAppStatus, requesting, types } = useSelector(applicationsViewSelector);
  const { profile } = useSelector(profileSelector);
  const appType = useRef<AppType>(types[0]);
  const isNew = Number.isNaN(Number(appId));

  const HTTPS_PREFIX = "https://";

  useEffect(() => {
    if (!types.length) {
      dispatch(getAppTypes({}));
    } else {
      appType.current = types.find((tp) => tp.id.toString() === typeId) as AppType;
    }
  }, [dispatch, typeId, types]);

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
    redirectUrl: yup.string()
      .test("isAppRedirectURIValid", t("dashboardTab.applicationsSubTab.appModal.allOtherURLsError"), (value: string|undefined) => {
        const URI = value || "";
        return uriBasicChecks(URI);
      }).required(t("dashboardTab.applicationsSubTab.appModal.allOtherURLsError")),
  });

  const {
    control,
    formState: { errors, isDirty, isValid },
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      clientId: app.clientId || "",
      clientSecret: app.clientSecret || "",
      redirectUrl: app.redirectUrl || HTTPS_PREFIX,
    },
    mode: "onChange",
    resolver: yupResolver(appSchema),
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (!isNew) {
      setValue("redirectUrl", app.redirectUrl, { shouldDirty: false });
    }
  }, [app, isNew, setValue]);


  // 3. Updating an app

  const _updateApp = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const updatedAppDetails = {
      ...app,
      ...getValues(),
    };

    dispatch(updateApp({ orgID: profile.currentOrg.id, appData: updatedAppDetails }));
  };

  const updateAppType = (type: AppType) => {
    const updatedAppDetails = {
      ...app,
      ...getValues(),
      appTypeId: type.id,
    };

    dispatch(updateApp({ orgID: profile.currentOrg.id, appData: updatedAppDetails }));
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const hasChanged = () => {
    return (isValid || Object.keys(errors).length === 0) && isDirty;
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
            <AppHeader app={app} appType={appType} isNew={isNew} updateAppType={updateAppType} />

            {/* 'Access details' section */}
            <Grid container spacing={3}>
              {/* 'Redirect URI' subsection */}
              <Grid item md={12}>
                <Grid item md={6}>
                  <Box pb={1.5}>
                    <Typography display="block" gutterBottom variant="h6">
                      {t("dashboardTab.applicationsSubTab.appModal.subSectionLabelThree")}
                    </Typography>
                  </Box>

                  <Box pb={5}>
                    <Typography display="block" gutterBottom style={{ color: palette.text.secondary }} variant="body2">
                      <Trans i18nKey="dashboardTab.applicationsSubTab.appModal.subSectionLabelFour">
                        {[
                          <Link
                            key="dashboardTab.applicationsSubTab.appModal.subSectionLabelFour"
                            rel='noopener noreferrer'
                            target='_blank'
                            to="https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/580386833/Open+Authentication+2"
                          />,
                        ]}
                      </Trans>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Grid item md={6}>
                <Controller
                  control={control}
                  name="redirectUrl"
                  render={({ field }) => (
                    <TextField
                      className={classes.inputFields}
                      error={!!errors.redirectUrl}
                      {...field}
                      fullWidth
                      helperText={errors.redirectUrl?.message}
                      label={t("dashboardTab.applicationsSubTab.appModal.subSectionLabelThree")}
                      margin="dense"
                      required
                      type="url"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>

              {/* 'Client credentials' subsection */}
              <Grid item md={6}>
                <div className={classes.row}>
                  <Controller
                    control={control}
                    name="clientId"
                    render={({ field }) => (
                      <TextField
                        disabled
                        {...field}
                        fullWidth
                        label={t("dashboardTab.applicationsSubTab.appModal.appClientIDFieldLabel")}
                        margin="dense"
                        name="clientId"
                        type="text"
                        variant="outlined"
                      />
                    )}
                  />

                  <div className={classes.rowCta}>
                    <IconButton
                      disabled={!getValues("clientId")}
                      onClick={() => copyToClipboard(getValues("clientId"))}
                      size="medium"
                    >
                      <Icon>content_copy</Icon>
                    </IconButton>
                  </div>
                </div>

                <div className={classes.clientSecretInputFieldContainer}>
                  <Controller
                    control={control}
                    name="clientSecret"
                    render={({ field }) => (
                      <TextField
                        disabled
                        {...field}
                        fullWidth
                        label={t("dashboardTab.applicationsSubTab.appModal.appClientSecretFieldLabel")}
                        margin="dense"
                        name="clientSecret"
                        type="text"
                        variant="outlined"
                      />
                    )}
                  />

                  <div className={classes.copyCta}>
                    <IconButton
                      disabled={!getValues("clientSecret")}
                      onClick={() => copyToClipboard(getValues("clientSecret"))}
                      size="medium"
                    >
                      <Icon>content_copy</Icon>
                    </IconButton>
                  </div>

                  <div
                    className={classes.disabledClientSecretInputFieldRefreshButton}
                  >
                    <Icon>refresh</Icon>
                  </div>
                </div>
              </Grid>
            </Grid>

            <hr className={classes.regularSectionSeparator} />

            {/* 'App action' buttons section */}
            <div className={classes.buttonsContainer}>
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
                  !!getNextType(app.appType, AppTypesTab.CLIENT) && <Button
                    color="primary"
                    disableElevation
                    onClick={() => handleNext(app, AppTypesTab.CLIENT, history)}
                    size="large"
                    style={{ margin: spacing(0, 0, 0, 3) }}
                    variant="contained"
                  >
                    {t("applications.buttons.next")}
                  </Button>
                }
                {
                  !!getPreviousType(app.appType, AppTypesTab.CLIENT) && <Button
                    color="secondary"
                    disableElevation
                    onClick={() => handlePrevious(app, AppTypesTab.CLIENT, history)}
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
                onClick={() => checkHistory(history, appId)}
                color="primary"
                variant="outlined"
              >
                {t("applications.buttons.backToApps")}
              </Button>
            </div>
          </Container>
        </Box>
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
