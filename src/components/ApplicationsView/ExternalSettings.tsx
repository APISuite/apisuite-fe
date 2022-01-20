import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  Box, Button, CircularProgress, Container, Grid, Icon,
  Typography, useTheme, useTranslation,
} from "@apisuite/fe-base";
import clsx from "clsx";
import {  useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { TypeChip } from "components/AppTypesModal";
import { RouterPrompt } from "components/RouterPrompt";
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

export const ExternalSettings: React.FC = () => {
  const classes = useStyles();
  const { appId, typeId } = useParams<{ appId: string; typeId: string  }>();
  const { palette, spacing } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory() as LocationHistory;
  const { app, createdId, requesting, types } = useSelector(applicationsViewSelector);
  const { profile } = useSelector(profileSelector);
  const appType = useRef<AppType>(types[0]);
  const isNew = Number.isNaN(Number(appId));

  useEffect(() => {
    if (isNew && createdId !== -1) {
      history.push(`/dashboard/apps/${createdId}/type/${typeId}/${AppTypesTab.GENERAL}`);
    }
    if (isNew) {
      history.push(`/dashboard/apps/new/type/${typeId}/${AppTypesTab.GENERAL}`);
    }
    if (!isNew && app.appType.id !== Number(typeId) && app.id !== -1 && app.appType.id !== 0) {
      history.push(`/dashboard/apps/${appId}/type/${app.appType.id}/${AppTypesTab.EXPERT}`);
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
    history.location.state?.redirected
      ? checkNextAction("alternativeGoToSubsView", hist)
      : checkNextAction("toggleModal", hist);
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



  const appSchema = yup.object().shape({});

  const {
    control,
    formState: { errors, isDirty, isValid },
    getValues,
    register,
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(appSchema),
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (!isNew) {
      setValue("directUrl", app.directUrl, { shouldDirty: false });
    }
  }, [app, isNew, setValue]);

  // Updating an app

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

  const hasChanged = () => {
    return (isValid || Object.keys(errors).length === 0) && isDirty;
  };

  const handleNext = (application: AppData) => {
    const next = getNextType(application.appType, AppTypesTab.EXTERNAL);
    history.push(`/dashboard/apps/${application.id}/type/${application.appType.id}/${next}`);
  };

  const handlePrevious = (application: AppData) => {
    const prev = getPreviousType(application.appType, AppTypesTab.EXTERNAL);
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
            <div className={classes.editApplicationHeaderContainer}>
              <Box py={3}>
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

            <Grid container spacing={3}>
              <Grid item md={12}>
                {
                  getSections(
                    "APPLICATION_NAV_FORM_SECTION",
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
              </Grid>
            </Grid>

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
                  !!getNextType(app.appType, AppTypesTab.EXTERNAL) && <Button
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
                  !!getPreviousType(app.appType, AppTypesTab.EXTERNAL) && <Button
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
