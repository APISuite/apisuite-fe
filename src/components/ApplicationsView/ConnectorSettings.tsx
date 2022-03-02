import React, { } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Box, Grid, Switch, Typography, useTheme, useTranslation } from "@apisuite/fe-base";

import { AppTypesTab } from "pages/AppView/types";
import { profileSelector } from "pages/Profile/selectors";
import { toggleBlueprintAppStatusAction } from "store/applications/actions/toggleBlueprintAppStatus";
import { applicationsViewSelector } from "./selector";
import { LocationHistory } from "./types";
import { useGetApp, AppContainer, ActionsFooter } from "./util";
import useStyles from "./styles";

export const ConnectorSettings: React.FC = () => {
  const classes = useStyles();
  const { palette } = useTheme();

  const { t } = useTranslation();

  const history = useHistory() as LocationHistory;
  const dispatch = useDispatch();

  const { app, blueprintAppConfig, isActive, requesting, status, types } = useSelector(applicationsViewSelector);
  const { profile } = useSelector(profileSelector);

  const { appId, typeId } = useParams<{ appId: string; typeId: string }>();
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

  // "Active app status" logic

  const toggleActiveAppStatus = (isAppActive: boolean) => {
    dispatch(toggleBlueprintAppStatusAction({
      appStatusData: {
        app_name: blueprintAppConfig.app_name,
        command: isAppActive ? "start" : "stop",
      },
    }));
  };

  return (
    <>
      <AppContainer
        app={app}
        appId={appId}
        isNew={isNew}
        getFormValues={null}
        notFound={status.get.isError}
        orgId={profile.currentOrg.id}
        requesting={requesting}
        types={types}
        typeId={typeId}
      >
        {/* "App status" section */}
        <Grid container spacing={3}>
          <Grid item md={12}>
            <Box mb={1}>
              <Typography display="block" gutterBottom variant="h6">
                {t("dashboardTab.applicationsSubTab.appModal.appStatusTitle")}
              </Typography>
            </Box>

            <Box pb={4}>
              <Typography display="block" gutterBottom style={{ color: palette.text.secondary }} variant="body2">
                {t("dashboardTab.applicationsSubTab.appModal.appStatusSubtitle")}
              </Typography>
            </Box>

            <Box style={{ alignItems: "center", display: "flex" }}>
              <Switch
                checked={isActive}
                onChange={() => toggleActiveAppStatus(!isActive)}
                color="primary"
              />

              <Typography display="block" style={{ color: palette.text.secondary }} variant="body2">
                {
                  isActive
                    ? t("dashboardTab.applicationsSubTab.appModal.activeApp")
                    : t("dashboardTab.applicationsSubTab.appModal.inactiveApp")
                }
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <hr className={classes.regularSectionSeparator} />

        {/* "App action" buttons section */}
        <div className={classes.buttonsContainer}>
          <ActionsFooter
            app={app}
            appId={appId}
            getFormValues={null}
            hasChanges={() => false}
            history={history}
            orgId={profile.currentOrg.id}
            tabType={AppTypesTab.CONNECTOR}
          />
        </div>
      </AppContainer>
    </>
  );
};