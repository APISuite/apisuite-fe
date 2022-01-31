import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Box, CircularProgress, Container, Grid, useTranslation } from "@apisuite/fe-base";
import {  useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { RouterPrompt } from "components/RouterPrompt";
import { AppTypesTab } from "pages/AppView/types";
import { profileSelector } from "pages/Profile/selectors";
import { getSections } from "util/extensions";
import { applicationsViewSelector } from "./selector";
import useStyles from "./styles";
import { LocationHistory } from "./types";
import { ActionsFooter, AppHeader, useGetApp } from "./util";

export const ExternalSettings: React.FC = () => {
  const classes = useStyles();
  const { appId, typeId } = useParams<{ appId: string; typeId: string  }>();
  const { t } = useTranslation();
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

  const hasChanges = () => {
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
            <AppHeader
              app={app}
              isNew={isNew}
              getFormValues={getValues}
              orgId={profile.currentOrg.id}
              types={types}
              typeId={typeId}
            />

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
              <ActionsFooter
                app={app}
                appId={appId}
                getFormValues={getValues}
                hasChanges={hasChanges}
                history={history}
                orgId={profile.currentOrg.id}
                tabType={AppTypesTab.EXTERNAL}
              />
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
        when={hasChanges()}
      />
    </>
  );
};
