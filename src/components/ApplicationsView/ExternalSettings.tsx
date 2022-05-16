import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Grid, useTranslation } from "@apisuite/fe-base";
import {  useForm } from "react-hook-form";

import { RouterPrompt } from "components/RouterPrompt";
import { AppTypesTab } from "pages/AppView/types";
import { profileSelector } from "pages/Profile/selectors";
import { getSections } from "util/extensions";
import { applicationsViewSelector } from "./selector";
import useStyles from "./styles";
import { LocationHistory } from "./types";
import { ActionsFooter, AppContainer, useGetApp } from "./util";

export const ExternalSettings: React.FC = () => {
  const classes = useStyles();
  const { appId, typeId } = useParams<{ appId: string; typeId: string  }>();
  const { t } = useTranslation();
  const history = useHistory() as LocationHistory;
  const { app, status, requesting, types } = useSelector(applicationsViewSelector);
  const { profile } = useSelector(profileSelector);
  const isNew = Number.isNaN(Number(appId));

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
    formState: { errors, isDirty, isValid },
    getValues,
    register,
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const hasChanges = () => {
    return (isValid || Object.keys(errors).length === 0) && isDirty;
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
        types={types}
        typeId={typeId}
      >
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
