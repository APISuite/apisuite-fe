import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useTheme, useTranslation, Avatar, Box, Button,
  Card, CardContent, Grid, Icon, Trans, Typography,
} from "@apisuite/fe-base";
import clsx from "clsx";

import { AppData, ModalDetails } from "store/applications/types";
import { getAllUserApps } from "store/applications/actions/getAllUserApps";
import { getSections } from "util/extensions";
import { ApplicationCard } from "components/ApplicationCard/ApplicationCard";
import { ApplicationsModal } from "components/ApplicationsModal";
import Link from "components/Link";
import Notice from "components/Notice";
import { PageContainer } from "components/PageContainer";
import { ROLES } from "constants/global";

import adrift from "assets/adrift.svg";
import authFundamentals from "assets/authFundamentals.svg";
import launchApp from "assets/launchApp.svg";

import { applicationsSelector } from "./selector";
import useStyles from "./styles";

export const Applications: React.FC = () => {
  const MARKETPLACE_SECTION = "SUBBED_MARKETPLACE_APPS";
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { palette } = useTheme();
  const { allUserApps, currentOrganisation, user } = useSelector(applicationsSelector);

  const [hasCurrentOrgDetails, setHasCurrentOrgDetails] = useState(false);

  /* With every change of our store's 'profile > profile > current_org' section
  (which goes from its initial state, to a filled or completely empty state),
  we do the following check, so as to know what view needs to be shown. */
  useEffect(() => {
    if (Object.keys(currentOrganisation).length !== 0 && currentOrganisation.id !== "") {
      setHasCurrentOrgDetails(true);
    }
  }, [currentOrganisation]);

  /* Modal stuff */
  const [modalDetails, setModalDetails] = useState<ModalDetails>({
    userID: 0,
    userAppID: 0,
  });
  const [modalMode, setModalMode] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = useCallback((
    modalMode: string,
    userID: number,
    userAppID: number,
  ) => {
    const newModalDetails = {
      userID: userID,
      userAppID: userAppID,
    };

    setModalDetails(newModalDetails);
    setModalMode(modalMode);
    setModalOpen(!isModalOpen);
  }, [isModalOpen]);

  let allUserAppNames: string[] = [];

  const getCardContent = (app: AppData) => {
    return <>
      <Box py={1.5} clone>
        <Typography variant="h4" className={classes.clientApplicationCardTitle}>
          {app.name}
        </Typography>
      </Box>

      <Box pb={1.5} clone>
        <Typography variant="body1" className={classes.clientApplicationCardDescription} style={{ color: palette.text.secondary }}>
          {
            app.shortDescription
              ? app.shortDescription
              : (
                app.description
                  ? app.description
                  : t("dashboardTab.applicationsSubTab.listOfAppsSection.noAppDescription")
              )
          }
        </Typography>
      </Box>

      <Box pt={1.5} display="flex">
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

        <Box pb={1.5} clone>
          <Typography variant="body2" style={{ color: palette.text.secondary }}>
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
        <Typography variant="body1" style={{ color: palette.text.primary }}>
          {t("dashboardTab.applicationsSubTab.listOfAppsSection.loadingApps")}
        </Typography>
      );
    }

    const allUserAppCardsArray = allUserAppsArray.map((userApp, index) => {
      const appNameInitialsArray = userApp.name.split(" ");
      const appNameInitials = appNameInitialsArray.length >= 2
        ? `${appNameInitialsArray[0][0]}${appNameInitialsArray[1][0]}`
        : `${appNameInitialsArray[0][0]}${appNameInitialsArray[0][1]}`;

      allUserAppNames = [...allUserAppNames, userApp.name];

      return (
        <Grid item key={`appCard${index}`} xs={4}>
          <ApplicationCard
            media={<Box textAlign="center" >
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
            </Box>}
            cardContent={getCardContent(userApp)}
            contentStyle={classes.clientApplicationCardBottomSection}
            icon="open_in_full"
            onClick={() => {
              if (user) {
                toggleModal("edit", user.id, userApp.id);
              }
            }}
          />
        </Grid>
      );
    });

    return allUserAppCardsArray;
  };

  /* The following useEffect comes in handy when users want to quickly review & edit an app
  from some other place in our project (say, from the 'API Product' subscription's modal). */
  useEffect(() => {
    /*
    - 'window.location.pathname' will amount to '/dashboard/apps/X'.
    - '.split('/')[3]' will amount to 'X', our app's ID.
    - 'parseInt()' will convert the 'X' string into a number.
    */
    const appIDInURL = parseInt(window.location.pathname.split("/")[3]) || undefined;

    if (appIDInURL !== undefined && user) toggleModal("edit", user.id, appIDInURL);
  }, [toggleModal, user]);

  /* Triggers the retrieval and storage (on the app's Store, under 'applications > userApps')
  of all app-related information we presently have on a particular user the first time, and
  following any changes to 'applications > userApps' (i.e., 'allUserApps'). */
  useEffect(() => {
    if (user) {
      dispatch(getAllUserApps({ userId: user.id }));
    }
  }, [user, dispatch]);

  const renderNoOrgView = () => (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box pb={5} textAlign="center" clone>
        <img className={classes.firstUseImage} src={adrift} />
      </Box>

      <Button
        className={classes.firstUseButton}
        href='/profile/organisation'
      >
        {t("dashboardTab.applicationsSubTab.noOrganisationsButtonLabel")}
      </Button>

      <Box py={3} clone>
        <Typography variant="body1" align="center">
          <Trans i18nKey="dashboardTab.applicationsSubTab.documentationLink">
            {[
              <Link
                key="dashboardTab.applicationsSubTab.documentationLink"
                to="https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/580321305/Client+Applications"
                rel='noopener noreferrer'
                target='_blank'
                style={{ color: palette.text.secondary }}
              />,
            ]}
          </Trans>
        </Typography>
      </Box>

      <Notice
        type="warning"
        noticeIcon={<Icon>warning_amber</Icon>}
        noticeText={
          <Typography variant="body2" align="center" style={{ color: palette.warning.dark }}>
            {t("dashboardTab.applicationsSubTab.noOrganisationWarning")}
          </Typography>
        }
      />
    </Box>
  );

  const renderNoAppsView = () => (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box pb={5} textAlign="center" clone>
        <img className={classes.firstUseImage} src={adrift} />
      </Box>

      <Button
        className={classes.firstUseButton}
        onClick={() => toggleModal("new", 0, 0)}
      >
        {t("dashboardTab.applicationsSubTab.noApplicationsButtonLabel")}
      </Button>

      <Box py={3} clone>
        <Typography variant="body1" align="center">
          <Trans i18nKey="dashboardTab.applicationsSubTab.documentationLink">
            {[
              <Link
                key="dashboardTab.applicationsSubTab.documentationLink"
                to="https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/580321305/Client+Applications"
                rel='noopener noreferrer'
                target='_blank'
                style={{ color: palette.text.secondary }}
              />,
            ]}
          </Trans>
        </Typography>
      </Box>

      <hr className={classes.sectionSeparator} />

      {/* Subscribed Marketplace applications container */}
      <Box width={1}>
        { getSections(MARKETPLACE_SECTION) }
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
          <Typography variant="body1" style={{ color: palette.text.secondary }}>
            {t("dashboardTab.applicationsSubTab.listOfAppsSection.subtitle")}
          </Typography>
        </Box>

        {/* Client applications container */}
        <div>
          <Grid container spacing={3}>
            {appCardGenerator(allUserApps)}
            <Grid item key="appCard-addNew" xs={4}>
              <Card elevation={1}>
                <CardContent style={{ 
                  display: "flex",
                  alignItems: "center",
                  minHeight: "337px",
                  justifyContent: "center",
                }} className={classes.clientApplicationCardBottomSection}>
                  <Button
                    className={classes.registerNewClientApplicationCardButton}
                    onClick={() => toggleModal("new", 0, 0)}
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
          { getSections(MARKETPLACE_SECTION) }
        </Box>
      </Box>

      <Box width={1}>
        <Box py={2} clone>
          <Typography variant="h3">
            {t("dashboardTab.applicationsSubTab.knowledgeBaseSection.title")}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Link to='/documentation' style={{ textDecoration: "none" }}>
              <ApplicationCard
                media={<Box px={5} py={3}>
                  <img
                    src={launchApp}
                    title="Documentation Image"
                    style={{ height: "120px", maxHeight: "120px" }}
                  />
                </Box>}
                cardContent={<>
                  <Box px={3} pb={3} clone>
                    <Typography variant="h3" style={{ color: palette.primary.main }}>
                      {t("dashboardTab.applicationsSubTab.knowledgeBaseSection.launchAppCardTitle")}
                    </Typography>
                  </Box>

                  <Box px={3} pb={3} clone>
                    <Typography variant="body1" style={{ color: palette.text.secondary }}>
                      {t("dashboardTab.applicationsSubTab.knowledgeBaseSection.launchAppCardSubtitle")}
                    </Typography>
                  </Box>
                </>}
                icon="open_in_new"
              />
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Link
              style={{ textDecoration: "none" }}
              to='https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/580386833/Open+Authentication+2'
            >
              <ApplicationCard
                media={<Box px={5} py={3}>
                  <img
                    src={authFundamentals}
                    title="Auth Fundamentals Image"
                    style={{ height: "120px", maxHeight: "120px" }}
                  />
                </Box>}
                cardContent={<>
                  <Box px={3} pb={3} clone>
                    <Typography variant="h3" style={{ color: palette.primary.main }}>
                      {t("dashboardTab.applicationsSubTab.knowledgeBaseSection.authFundamentalsTitle")}
                    </Typography>
                  </Box>

                  <Box px={3} pb={3} clone>
                    <Typography variant="body1" style={{ color: palette.text.secondary }}>
                      {t("dashboardTab.applicationsSubTab.knowledgeBaseSection.authFundamentalsSubtitle")}
                    </Typography>
                  </Box>
                </>}
                icon="open_in_new"
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
        user?.role.id === `${ROLES.baseUser.level}` ?
          <Box width={1}>
            { getSections(MARKETPLACE_SECTION) }
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

      {
        isModalOpen &&
        <ApplicationsModal
          allUserAppNames={allUserAppNames}
          isModalOpen={isModalOpen}
          modalDetails={modalDetails}
          modalMode={modalMode}
          toggleModal={() => toggleModal("", 0, 0)}
        />
      }
    </PageContainer>
  );
};
