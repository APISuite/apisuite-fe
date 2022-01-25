import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Box, Button, CircularProgress, Container, Grid, useTheme, useTranslation } from "@apisuite/fe-base";
import {  useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { RouterPrompt } from "components/RouterPrompt";
import { getNextType, getPreviousType } from "components/AppTypesModal/util";
import { getUserApp } from "store/applications/actions/getUserApp";
import { updateApp } from "store/applications/actions/updatedApp";
import { AppType } from "store/applications/types";
import { getProfile } from "store/profile/actions/getProfile";
import { getAppTypes } from "store/applications/actions/getAppTypes";
import { AppTypesTab } from "pages/AppView/types";
import { profileSelector } from "pages/Profile/selectors";
import { getSections } from "util/extensions";
import { applicationsViewSelector } from "./selector";
import useStyles from "./styles";
import { LocationHistory } from "./types";
import { AppHeader, handleNext, handlePrevious, checkHistory } from "./util";

export const ExternalSettings: React.FC = () => {
  const classes = useStyles();
  const { appId, typeId } = useParams<{ appId: string; typeId: string  }>();
  const { spacing } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory() as LocationHistory;
  const { app, createAppStatus, requesting, types } = useSelector(applicationsViewSelector);
  const { profile } = useSelector(profileSelector);
  const appType = useRef<AppType>(types[0]);
  const isNew = Number.isNaN(Number(appId));

  useEffect(() => {
    if (isNew && createAppStatus.id !== -1) {
      history.push(`/dashboard/apps/${createAppStatus.id}/type/${typeId}/${AppTypesTab.GENERAL}`);
    }
    if (isNew) {
      history.push(`/dashboard/apps/new/type/${typeId}/${AppTypesTab.GENERAL}`);
    }
    if (!isNew && app.id === Number(appId) && app.appType.id !== 0 && app.appType.id !== Number(typeId)) {
      history.push(`/dashboard/apps/${appId}/type/${app.appType.id}/${AppTypesTab.GENERAL}`);
    }
  }, [app.id, app.appType.id, appId, createAppStatus, history, isNew, typeId]);

  useEffect(() => {
    if (!types.length) {
      dispatch(getAppTypes({}));
    } else {
      appType.current = types.find((tp) => tp.id.toString() === typeId) as AppType;
    }
  }, [dispatch, typeId, types]);

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
                  !!getNextType(app.appType, AppTypesTab.EXTERNAL) && <Button
                    color="primary"
                    disableElevation
                    onClick={() => handleNext(app, AppTypesTab.EXTERNAL, history)}
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
                    onClick={() => handlePrevious(app, AppTypesTab.EXTERNAL, history)}
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
