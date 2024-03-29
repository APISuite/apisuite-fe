import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  Avatar, Box, Button, Card, CardContent, Grid, Icon,
  Trans, Typography, useConfig, useTheme, useTranslation,
} from "@apisuite/fe-base";
import clsx from "clsx";

import adrift from "assets/adrift.svg";
import authFundamentals from "assets/authFundamentals.svg";
import launchApp from "assets/launchApp.svg";
import { ApplicationCard } from "components/ApplicationCard/ApplicationCard";
import { PageContainer } from "components/PageContainer";
import Link from "components/Link";
import Notice from "components/Notice";
import { AppTypesModal } from "components/AppTypesModal";
import { ROLES } from "constants/global";
import { AppData } from "store/applications/types";
import { getAllUserApps } from "store/applications/actions/getAllUserApps";
import { resetUserApp } from "store/applications/actions/getUserApp";
import { resetAppMedia } from "store/media/actions/uploadMedia";
import { Organization, Role } from "store/profile/types";
import { getSections } from "util/extensions";
import { applicationsSelector } from "./selector";
import useStyles from "./styles";

export const Applications: React.FC = () => {
  const classes = useStyles();
  const { portalName } = useConfig();
  const { palette } = useTheme();
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    allUserApps, createUserAppStatus, currentOrganisation, deleteUserAppStatus, org, updateUserAppStatus, user,
  } = useSelector(applicationsSelector);

  const MARKETPLACE_SECTION = "SUBBED_MARKETPLACE_APPS";

  const [hasCurrentOrgDetails, setHasCurrentOrgDetails] = useState(false);

  const isOrg = (_org: Organization | Organization & { member_since: string; role: Role }) => {
    return Object.keys(_org).length !== 0 && _org.id > 0;
  };

  /* With every change of our store's 'profile > profile > currentOrg' section
  (which goes from its initial state, to a filled or completely empty state),
  we do the following check, so as to know what view needs to be shown. */
  useEffect(() => {
    if (isOrg(currentOrganisation) || isOrg(org)) {
      setHasCurrentOrgDetails(true);
    }
  }, [currentOrganisation, org]);

  /* reset app */
  useEffect(() => {
    dispatch(resetUserApp());
    dispatch(resetAppMedia());
  }, [dispatch]);

  const toggleApp = useCallback((appId: string, typeId: number) => {
    history.push(`/dashboard/apps/${appId}/type/${typeId}/general`);
  }, [history]);

  const [open, setOpen] = React.useState<boolean>(false);

  const getCardContent = (app: AppData) => {
    return <>
      <Box clone py={1.5}>
        <Typography className={classes.clientApplicationCardTitle} variant="h4">
          {app.name}
        </Typography>
      </Box>

      <Box clone pb={1.5}>
        <Typography
          className={classes.clientApplicationCardDescription}
          style={{ color: palette.text.secondary }}
          variant="body1"
        >
          {app.shortDescription || t("dashboardTab.applicationsSubTab.listOfAppsSection.noAppSummary")}
        </Typography>
      </Box>

      <Box display="flex" pt={1.5}>
        {/* A mere dot */}
        <Box
          className={
            clsx(
              classes.subscribedClientApplicationCardStatusIcon,
              !app.subscriptions.length && classes.draftClientApplicationCardStatusIcon,
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
                ? t("dashboardTab.applicationsSubTab.listOfAppsSection.draftAppStatus")
                : t("dashboardTab.applicationsSubTab.listOfAppsSection.subscribedAppStatus")
            }
          </Typography>
        </Box>
      </Box>
    </>;
  };

  /* Generates an 'app card' for every app a user has. */
  const appCardGenerator = (allUserAppsArray: AppData[]) => {
    if (allUserAppsArray.length === 0) {
      return (
        <Typography style={{ color: palette.text.primary }} variant="body1">
          {t("dashboardTab.applicationsSubTab.listOfAppsSection.loadingApps")}
        </Typography>
      );
    }

    const allUserAppCardsArray = allUserAppsArray.map((userApp, index) => {
      const appNameInitialsArray = userApp.name.split(" ");
      const appNameInitials = appNameInitialsArray.length >= 2
        ? `${appNameInitialsArray[0][0]}${appNameInitialsArray[1][0]}`
        : `${appNameInitialsArray[0][0]}${appNameInitialsArray[0][1]}`;

      return (
        <Grid item key={`appCard${index}`} xs={4}>
          <ApplicationCard
            cardContent={getCardContent(userApp)}
            contentStyle={classes.clientApplicationCardBottomSection}
            icon="open_in_full"
            media={
              <Box textAlign="center">
                {
                  userApp.logo !== ""
                    ? (
                      <Avatar
                        className={classes.clientApplicationCardAvatar}
                        src={userApp.logo}
                      />
                    )
                    : (
                      <Avatar
                        className={classes.clientApplicationCardAvatar}
                      >
                        {appNameInitials}
                      </Avatar>
                    )
                }
              </Box>
            }
            onClick={() => {
              if (user) {
                toggleApp(userApp.id.toString(), userApp.appType.id);
              }
            }}
          />
        </Grid>
      );
    });

    return allUserAppCardsArray;
  };

  const appIDInURL = useParams<{ appID: string }>().appID;

  /* The following useEffect comes in handy when users want to quickly review & edit an app
  from some other place in our project (say, from the 'API Product' subscription's modal). */
  useEffect(() => {
    const parsedAppID = appIDInURL || undefined;

    if (parsedAppID !== undefined) toggleApp(parsedAppID, 1);
  }, [appIDInURL, toggleApp]);

  /* Triggers the retrieval and storage (on the app's Store, under 'applications > userApps')
  of all app-related information we presently have on a particular user the first time, and
  following any changes to 'applications > userApps' (i.e., 'allUserApps'). */
  useEffect(() => {
    if (
      user &&
      currentOrganisation.id &&
      !createUserAppStatus.isRequesting &&
      !deleteUserAppStatus.isRequesting &&
      !updateUserAppStatus.isRequesting
    ) {
      dispatch(getAllUserApps({orgID: currentOrganisation.id}));
    }
  }, [createUserAppStatus, currentOrganisation, deleteUserAppStatus, dispatch, updateUserAppStatus, user]);

  const renderNoOrgView = () => (
    <Box alignItems="center" display="flex" flexDirection="column" justifyContent="center">
      <Box clone pb={5} textAlign="center">
        <img className={classes.firstUseImage} src={adrift} />
      </Box>

      <Button
        className={classes.firstUseButton}
        href='/profile/organisation'
      >
        {t("dashboardTab.applicationsSubTab.noOrganisationsButtonLabel")}
      </Button>

      <Box clone py={3}>
        <Typography align="center" variant="body1">
          <Trans i18nKey="dashboardTab.applicationsSubTab.documentationLink">
            {[
              <Link
                key="dashboardTab.applicationsSubTab.documentationLink"
                rel='noopener noreferrer'
                style={{ color: palette.text.secondary }}
                target='_blank'
                to="https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/580321305/Client+Applications"
              />,
            ]}
          </Trans>
        </Typography>
      </Box>

      <Notice
        noticeIcon={<Icon>warning_amber</Icon>}
        noticeText={
          <Typography align="center" style={{ color: palette.warning.dark }} variant="body2">
            {t("dashboardTab.applicationsSubTab.noOrganisationWarning")}
          </Typography>
        }
        type="warning"
      />
    </Box>
  );

  const renderNoAppsView = () => (
    <Box alignItems="center" display="flex" flexDirection="column" justifyContent="center">
      <Box clone pb={5} textAlign="center">
        <img className={classes.firstUseImage} src={adrift} />
      </Box>

      <Button
        className={classes.firstUseButton}
        onClick={() => setOpen(true)}
      >
        {t("dashboardTab.applicationsSubTab.noApplicationsButtonLabel")}
      </Button>

      <Box clone py={3}>
        <Typography align="center" variant="body1">
          <Trans i18nKey="dashboardTab.applicationsSubTab.documentationLink">
            {[
              <Link
                key="dashboardTab.applicationsSubTab.documentationLink"
                rel='noopener noreferrer'
                style={{ color: palette.text.secondary }}
                target='_blank'
                to="https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/580321305/Client+Applications"
              />,
            ]}
          </Trans>
        </Typography>
      </Box>

      <hr className={classes.sectionSeparator} />

      {/* Subscribed Marketplace applications container */}
      <Box width={1}>
        {getSections(MARKETPLACE_SECTION)}
      </Box>
    </Box>
  );

  const renderAppsView = () => (
    <>
      <Box display="flex" flexDirection="column">
        <Box pb={2}>
          <Typography variant="h2">
            {t("dashboardTab.applicationsSubTab.listOfAppsSection.clientApplicationsTitle")}
          </Typography>
        </Box>

        <Box pb={5}>
          <Typography style={{ color: palette.text.secondary }} variant="body1">
            {t("dashboardTab.applicationsSubTab.listOfAppsSection.subtitle")}
          </Typography>
        </Box>

        {/* Client applications container */}
        <div>
          <Grid container spacing={3}>
            {appCardGenerator(allUserApps)}
            <Grid item key="appCard-addNew" xs={4}>
              <Card elevation={1}>
                <CardContent
                  className={classes.clientApplicationCardBottomSection}
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    minHeight: "337px",
                  }}
                >
                  <Button
                    className={classes.registerNewClientApplicationCardButton}
                    onClick={() => setOpen(true)}
                  >
                    {t("dashboardTab.applicationsSubTab.listOfAppsSection.registerNewAppButtonLabel")}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>

        {/* Subscribed Marketplace applications container */}
        <Box width={1}>
          {getSections(MARKETPLACE_SECTION)}
        </Box>
      </Box>

      <Box width={1}>
        <Box clone py={2}>
          <Typography variant="h3">
            {t("dashboardTab.applicationsSubTab.knowledgeBaseSection.title")}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Link style={{ textDecoration: "none" }} to='/documentation'>
              <ApplicationCard
                cardContent={
                  <>
                    <Box clone pb={3} px={3}>
                      <Typography style={{ color: palette.primary.main }} variant="h3">
                        {t("dashboardTab.applicationsSubTab.knowledgeBaseSection.launchAppCardTitle")}
                      </Typography>
                    </Box>

                    <Box clone pb={3} px={3}>
                      <Typography style={{ color: palette.text.secondary }} variant="body1">
                        {t("dashboardTab.applicationsSubTab.knowledgeBaseSection.launchAppCardSubtitle")}
                      </Typography>
                    </Box>
                  </>
                }
                icon="open_in_new"
                media={
                  <Box px={5} py={3}>
                    <img
                      src={launchApp}
                      style={{ height: "120px", maxHeight: "120px" }}
                      title="Documentation Image"
                    />
                  </Box>
                }
              />
            </Link>
          </Grid>

          <Grid item xs={6}>
            <Link
              style={{ textDecoration: "none" }}
              to='https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/580386833/Open+Authentication+2'
            >
              <ApplicationCard
                cardContent={
                  <>
                    <Box clone pb={3} px={3}>
                      <Typography style={{ color: palette.primary.main }} variant="h3">
                        {t("dashboardTab.applicationsSubTab.knowledgeBaseSection.authFundamentalsTitle")}
                      </Typography>
                    </Box>

                    <Box clone pb={3} px={3}>
                      <Typography style={{ color: palette.text.secondary }} variant="body1">
                        {t("dashboardTab.applicationsSubTab.knowledgeBaseSection.authFundamentalsSubtitle")}
                      </Typography>
                    </Box>
                  </>
                }
                icon="open_in_new"
                media={
                  <Box px={5} py={3}>
                    <img
                      src={authFundamentals}
                      style={{ height: "120px", maxHeight: "120px" }}
                      title="Auth Fundamentals Image"
                    />
                  </Box>
                }
              />
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );

  return (
    <PageContainer>
      {
        user?.role.name === `${ROLES.baseUser.value}` ?
          <Box width={1}>
            {getSections(MARKETPLACE_SECTION)}
          </Box>
          // If the user has yet to create/join an organisation, (...)
          : !hasCurrentOrgDetails
            ? renderNoOrgView()
            : (
              // If the user has already created/joined an organisation, but has yet to create any apps, (...)
              !allUserApps.length
                ? renderNoAppsView()
                : (
                  // If the user has already created one or more apps, we list them out (...)
                  renderAppsView()
                )
            )
      }

      <AppTypesModal
        open={open}
        showLogo={false}
        title={portalName}
        onClose={() => setOpen(false)}
        onClick={(selection) => {
          if (selection && selection.id) {
            setOpen(false);
            toggleApp("new", selection.id);
          }
        }}
      />
    </PageContainer>
  );
};
