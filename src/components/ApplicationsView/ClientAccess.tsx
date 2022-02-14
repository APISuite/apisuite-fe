import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  Box, Grid, Icon, IconButton, TextField,
  Trans, Typography, useTheme, useTranslation,
} from "@apisuite/fe-base";
import {  useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Link from "components/Link";
import { RouterPrompt } from "components/RouterPrompt";
import { isValidURL } from "util/forms";
import { AppTypesTab } from "pages/AppView/types";
import { profileSelector } from "pages/Profile/selectors";
import { applicationsViewSelector } from "./selector";
import useStyles from "./styles";
import { LocationHistory } from "./types";
import { ActionsFooter, AppContainer, useGetApp } from "./util";

export const ClientAccess: React.FC = () => {
  const classes = useStyles();
  const { appId, typeId } = useParams<{ appId: string; typeId: string  }>();
  const { palette } = useTheme();
  const { t } = useTranslation();
  const history = useHistory() as LocationHistory;
  const { app, status, requesting, types } = useSelector(applicationsViewSelector);
  const { profile } = useSelector(profileSelector);
  const isNew = Number.isNaN(Number(appId));

  const HTTPS_PREFIX = "https://";

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

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const hasChanges = () => {
    return (isValid || Object.keys(errors).length === 0) && isDirty;
  };

  return (
    <>
      <AppContainer
        app={app}
        appId={appId}
        isNew={isNew}
        getFormValues={getValues}
        notFound={status.get.isError}
        orgId={profile.currentOrg.id}
        requesting={requesting}
        types={types}
        typeId={typeId}
      >
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
          <ActionsFooter
            app={app}
            appId={appId}
            getFormValues={getValues}
            hasChanges={hasChanges}
            history={history}
            orgId={profile.currentOrg.id}
            tabType={AppTypesTab.CLIENT}
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
