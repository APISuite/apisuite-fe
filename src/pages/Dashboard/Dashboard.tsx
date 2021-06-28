import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Container, Divider, Grid, Icon, Paper, Trans, Typography, useConfig, useTheme, useTranslation } from "@apisuite/fe-base";

import { API_DOCS_CONTENT_TARGET, DEFAULT_INSTANCE_OWNER_SUPPORT_URL, DEFAULT_NON_INSTANCE_OWNER_SUPPORT_URL } from "constants/global";
import { getAPIs } from "store/subscriptions/actions/getAPIs";
import ActionsCatalog from "components/ActionsCatalog";
import APICatalog from "components/APICatalog";
import Notice from "components/Notice";
import NotificationBanner from "components/NotificationBanner";
import { NotificationCard } from "components/NotificationCard";

import { testIds } from "testIds";

import apiSVG from "assets/icons/API.svg";
import billingSVG from "assets/icons/Billing.svg";
import dataCloudSVG from "assets/icons/DataCloud.svg";
import fingerprintSVG from "assets/icons/Fingerprint.svg";
import sandboxSVG from "assets/icons/Sandbox.svg";
import settingsSVG from "assets/icons/Settings.svg";
import shieldSVG from "assets/icons/Shield.svg";
import supportSVG from "assets/icons/Support.svg";
import teamSVG from "assets/icons/Team.svg";

import { dashboardSelector } from "./selector";
import useStyles from "./styles";
import Link from "components/Link";

export const Dashboard: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const { t } = useTranslation();
  const { socialURLs, supportURL, clientName, portalName } = useConfig();
  const { auth, subscriptions, notificationCards, profile } = useSelector(dashboardSelector);

  const typeOfUser = auth.user!.role.name;

  const [recentlyAddedAPIs, setRecentlyAddedAPIs] = useState<any[]>([]);

  useEffect(() => {
    /* Triggers the retrieval and storage (on the app's Store, under 'subscriptions')
    of all API-related information we presently have. */
    dispatch(getAPIs({}));
  }, [dispatch]);

  useEffect(() => {
    /* Once 'subscriptions' info is made available, we process it so as to display it
    on our 'API Catalog' section. */
    const allAvailableAPIs = subscriptions.apis;

    if (allAvailableAPIs.length) {
      const newRecentlyAddedAPIs = allAvailableAPIs.map((api) => {
        return {
          /* Determines if an 'API Catalog' entry will be clickable, and link to its corresponding
          'API Details' view. For the time being, an 'API Catalog' entry should be clickable and
          link to its corresponding 'API Details' view if it has versions. */
          hasMoreDetails: api.apiVersions.length > 0,
          id: api.apiVersions.length ? api.apiVersions[0].apiId : api.id,
          apiName: api.apiVersions.length ? api.apiVersions[0].title : api.name,
          // FIXME: not translated
          apiDescription: api?.docs?.find((x) => x.target === API_DOCS_CONTENT_TARGET.PRODUCT_INTRO)?.info || "No description presently available.",
          apiVersion: api.apiVersions.length ? api.apiVersions[0].version : "No version available",
          // Used to link an 'API Catalog' entry to its corresponding 'API Details' view.
          apiRoutingId: api.apiVersions.length ? `${api.apiVersions[0].id}` : "",
          /* An API that is 'live' (i.e., 'production accessible') is one that has versions, and has
          its 'live' property set to 'true'. Ones that do NOT meet any of the above criteria are ones
          that, presently, only have 'API Documentation' to show for it. */
          apiAccess: (api.apiVersions.length > 0 && api.apiVersions[0].live),
        };
      });

      setRecentlyAddedAPIs(newRecentlyAddedAPIs);
    }
  }, [subscriptions]);

  return (
    <>
      <main className="page-container">
        {/* 'Dashboard' page's header image */}
        <section
          className={notificationCards.show ? classes.expandedHeaderImageSection : classes.regularHeaderImageSection}
        />

        {/* 'Notification cards' section */}
        <section className={classes.notificationCardSection}>
          <NotificationCard
            notificationCardTitle={t("dashboardTab.landingPageSubTab.regularUser.notificationCards.completeYourTeam.notificationCardTitle")}
            notificationCardText={t("dashboardTab.landingPageSubTab.regularUser.notificationCards.completeYourTeam.notificationCardText")}
            notificationCardButtonClassName={classes.customNotificationCardButton}
            notificationCardButtonLabel={t("dashboardTab.landingPageSubTab.regularUser.notificationCards.completeYourTeam.notificationCardButtonLabel")}
            notificationCardButtonLink='/profile/team'
          />
        </section>

        <Container maxWidth="md">
          {/* 'Actions Catalog' section */}
          <section
            data-test-id={testIds.actionsSection}
            className={
              notificationCards.show
                ? classes.actionsCatalogSectionWithNotificationCards
                : classes.actionsCatalogSectionWithoutNotificationCards
            }
          >
            <ActionsCatalog
              actionsToDisplay={
                typeOfUser !== "admin"
                  ? [
                    {
                      actionImage: teamSVG,
                      actionLink: "/profile/team",
                      actionText: t("dashboardTab.landingPageSubTab.regularUser.actionsCatalog.team"),
                    },
                    {
                      actionImage: sandboxSVG,
                      actionLink: "/dashboard/apps",
                      actionText: t("dashboardTab.landingPageSubTab.regularUser.actionsCatalog.sandbox"),
                    },
                    {
                      actionImage: shieldSVG,
                      actionLink: "/dashboard/subscriptions",
                      actionText: t("dashboardTab.landingPageSubTab.regularUser.actionsCatalog.shield"),
                    },
                    {
                      actionImage: fingerprintSVG,
                      actionLink: "/profile/security",
                      actionText: t("dashboardTab.landingPageSubTab.regularUser.actionsCatalog.fingerprint"),
                    },
                    {
                      actionImage: apiSVG,
                      actionLink: "/dashboard/subscriptions",
                      actionText: t("dashboardTab.landingPageSubTab.regularUser.actionsCatalog.api"),
                    },
                    {
                      actionImage: supportSVG,
                      actionLink: supportURL || DEFAULT_NON_INSTANCE_OWNER_SUPPORT_URL,
                      actionText: t("dashboardTab.landingPageSubTab.regularUser.actionsCatalog.support"),
                    },
                  ]
                  : [
                    {
                      actionImage: apiSVG,
                      actionLink: "/dashboard/admin/api-catalog",
                      actionText: t("dashboardTab.landingPageSubTab.adminUser.actionsCatalog.api"),
                    },
                    {
                      actionImage: dataCloudSVG,
                      actionLink: "/dashboard/admin/integrations",
                      actionText: t("dashboardTab.landingPageSubTab.adminUser.actionsCatalog.dataCloud"),
                    },
                    {
                      actionImage: settingsSVG,
                      actionLink: "/dashboard/admin",
                      actionText: t("dashboardTab.landingPageSubTab.adminUser.actionsCatalog.settings"),
                    },
                    {
                      actionImage: billingSVG,
                      // TODO: Create a 'Billing' view or mechanism, and link to it
                      actionLink: "",
                      actionText: t("dashboardTab.landingPageSubTab.adminUser.actionsCatalog.billing"),
                    },
                    {
                      actionImage: teamSVG,
                      actionLink: "/profile/team",
                      actionText: t("dashboardTab.landingPageSubTab.adminUser.actionsCatalog.team"),
                    },
                    {
                      actionImage: supportSVG,
                      actionLink: supportURL || DEFAULT_INSTANCE_OWNER_SUPPORT_URL,
                      actionText: t("dashboardTab.landingPageSubTab.adminUser.actionsCatalog.support"),
                    },
                  ]
              }
            />
          </section>

          <Grid
            data-test-id={testIds.greetingSection}
            component={Box}
            clone
            p={5}
            container
            direction="row"
            wrap="nowrap"
          >
            <Paper elevation={3}>
              <Grid item xs>
                <Typography data-test-id={testIds.greetingCardParagraphOne} variant="h6" gutterBottom>
                  {t("dashboardTab.landingPageSubTab.regularUser.greetingCard.greet", { name: profile.profile.user.name })}
                </Typography>

                <Typography data-test-id={testIds.greetingCardParagraphTwo} variant="h6">
                  {t("dashboardTab.landingPageSubTab.regularUser.greetingCard.greetingCardText")}
                </Typography>

                {typeOfUser !== "admin" && (
                  <Typography data-test-id={testIds.greetingCardParagraphThree} variant="h6">
                    {t("dashboardTab.landingPageSubTab.regularUser.greetingCard.greetingCardTextAdmin")}
                  </Typography>
                )}
              </Grid>

              <Box pl={5} display="flex" alignItems="center" width="max-content">
                <Button
                  data-test-id={testIds.greetingCardButton}
                  href={typeOfUser !== "admin" ? (supportURL || DEFAULT_NON_INSTANCE_OWNER_SUPPORT_URL) : "/dashboard/admin"}
                  variant="contained"
                  disableElevation
                  color="secondary"
                  size="large"
                >
                  {t("dashboardTab.landingPageSubTab.regularUser.greetingCard.greetingCardButtonLabel", {
                    clientName,
                  })}
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* 'API Catalog' section */}
          {typeOfUser !== "admin" && (
            <>
              <Box my={5}>
                <Divider style={{ backgroundColor: palette.primary.main }} />
              </Box>

              <Typography data-test-id={testIds.recentAdditionsTitle} variant="h2">
                {t("sandboxPage.apiCatalog.intro")}
              </Typography>

              <Grid
                data-test-id={testIds.recentAdditionsCatalog}
                component={Box}
                container
                direction="row"
                justifyContent="space-between"
                mt={5}
              >
                {
                  recentlyAddedAPIs.length === 0
                    ? <p data-test-id={testIds.recentAdditionsEmpty}>{t("sandboxPage.apiCatalog.paragraph")}</p>
                    : <APICatalog apisToDisplay={recentlyAddedAPIs} limit={2} />
                }
              </Grid>
            </>
          )}

          {socialURLs.length > 0 && (
            <Box data-test-id={testIds.notice} py={5}>
              <Notice
                noticeIcon={<Icon>domain_verification</Icon>}
                noticeText={
                  <Typography variant="body2" align="center" style={{ color: palette.info.contrastText }}>
                    <Trans i18nKey="sandboxPage.notice" values={{ portalName, clientName, url: socialURLs[0].url }}>
                      {[
                        <Link
                          key="sandboxPage.notice"
                          to={socialURLs[0].url}
                          rel='noopener noreferrer'
                          target='_blank'
                        />,
                      ]}
                    </Trans>
                  </Typography>
                }
              />
            </Box>
          )}
        </Container>
      </main>

      {/* Notification banner */}
      {
        typeOfUser !== "admin"
          ? null
          : (
            <NotificationBanner
              customNotificationBannerContents={
                <Typography variant="body1" className={classes.customNotificationBannerParagraph}>
                  {t("dashboardTab.landingPageSubTab.adminUser.notificationBanner.textPartOne")}

                  <br />

                  <a
                    href='/dashboard/admin/integrations'
                  >
                    {t("dashboardTab.landingPageSubTab.adminUser.notificationBanner.textPartTwo")}
                  </a>
                </Typography>
              }
              notificationBannerTitle={
                t("dashboardTab.landingPageSubTab.adminUser.notificationBanner.title")
              }
              showNotificationBanner
            />
          )
      }
    </>
  );
};
