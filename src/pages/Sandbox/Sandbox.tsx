import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useConfig, useTranslation, Button, Trans, Typography, Box, Paper, Grid, Container, useTheme, Divider, Icon } from "@apisuite/fe-base";
import ChromeReaderModeRoundedIcon from "@material-ui/icons/ChromeReaderModeRounded";
import ControlCameraRoundedIcon from "@material-ui/icons/ControlCameraRounded";
import FlightLandRoundedIcon from "@material-ui/icons/FlightLandRounded";

import { API_DOCS_CONTENT_TARGET, DEFAULT_NON_INSTANCE_OWNER_SUPPORT_URL } from "constants/global";
import APICatalog from "components/APICatalog";
import { Carousel } from "components/Carousel";
import Notice from "components/Notice";

import { testIds } from "testIds";

import carouselBackground from "assets/space-background.svg";
import carouselSlide1 from "assets/carousel-slide-1.svg";
import carouselSlide2 from "assets/carousel-slide-2.svg";
import carouselSlide3 from "assets/carousel-slide-3.svg";

import { sandboxSelector } from "./selector";
import useStyles from "./styles";
import { getAPIs } from "store/subscriptions/actions/getAPIs";
import Link from "components/Link";

export const Sandbox: React.FC = () => {
  const classes = useStyles();
  const { palette, spacing } = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { socialURLs, portalName, clientName, supportURL, documentationURL } = useConfig();
  const { auth, subscriptions } = useSelector(sandboxSelector);

  const [recentlyAddedAPIs, setRecentlyAddedAPIs] = useState<any[]>([]);

  useEffect(() => {
    /* Triggers the retrieval and storage (on the app's Store, under 'subscriptions')
    of all API-related information we presently have. */
    dispatch(getAPIs({}));
  }, [dispatch]);

  useEffect(() => {
    console.log("Subscriptions", subscriptions);
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

      const twoMostRecentlyAddedAPIs = [newRecentlyAddedAPIs[0], newRecentlyAddedAPIs[1]];

      setRecentlyAddedAPIs(twoMostRecentlyAddedAPIs);
    }
  }, [subscriptions]);

  return (
    <main className='page-container'>
      {/* Carousel section */}
      <section className={classes.slideShowSectionContainer}>
        <Carousel
          carouselBackgroundImage={carouselBackground}
          iconsOfSliderButtonsArray={!auth.user
            ? [
              <FlightLandRoundedIcon key={1} />,
              <ControlCameraRoundedIcon key={2} />,
              <ChromeReaderModeRoundedIcon key={3} />,
            ]
            : [
              <ControlCameraRoundedIcon key={1} />,
              <ChromeReaderModeRoundedIcon key={2} />,
            ]}
          slidesAutoPlay
          slidesArray={!auth.user
            ? [
              {
                slideButton: true,
                slideButtonLabel: t("sandboxPage.newSlides.slideOne.slideButtonLabel"),
                slideButtonLink: "/auth/signup",
                slideContentsPlacement: "top-to-bottom",
                slideForegroundImage: carouselSlide1,
                slideText: t("sandboxPage.newSlides.slideOne.slideText"),
              },
              {
                slideButton: true,
                slideButtonLabel: t("sandboxPage.newSlides.slideTwo.slideButtonLabel"),
                slideButtonLink: "/api-products",
                slideContentsPlacement: "side-by-side",
                slideForegroundImage: carouselSlide2,
                slideText: t("sandboxPage.newSlides.slideTwo.slideText"),
              },
              {
                slideButton: true,
                slideButtonLabel: t("sandboxPage.newSlides.slideThree.slideButtonLabel"),
                slideButtonLink: "/documentation",
                slideContentsPlacement: "side-by-side",
                slideForegroundImage: carouselSlide3,
                slideText: t("sandboxPage.newSlides.slideThree.slideText"),
              },
            ]
            : [
              {
                slideButton: true,
                slideButtonLabel: t("sandboxPage.newSlides.slideTwo.slideButtonLabel"),
                slideButtonLink: "/api-products",
                slideContentsPlacement: "side-by-side",
                slideForegroundImage: carouselSlide2,
                slideText: t("sandboxPage.newSlides.slideTwo.slideText"),
              },
              {
                slideButton: true,
                slideButtonLabel: t("sandboxPage.newSlides.slideThree.slideButtonLabel"),
                slideButtonLink: "/documentation",
                slideContentsPlacement: "side-by-side",
                slideForegroundImage: carouselSlide3,
                slideText: t("sandboxPage.newSlides.slideThree.slideText"),
              },
            ]}
          slidingAnimationDuration={1500}
          timeBetweenSlides={4000}
        />
      </section>

      <Container maxWidth="md">
        <Box data-test-id={testIds.stepsSection} my={5}>
          <Typography variant="h2">
            {t("sandboxPage.stepsSection.intro")}
          </Typography>
        </Box>

        <Grid
          data-test-id={testIds.stepsSectionContent}
          container
          direction="row"
          xs
        >
          <Box data-test-id={testIds.stepsSectionLeftSide} maxWidth={360 - spacing(2.5)} pr={2.5}>
            <Typography variant="h3" gutterBottom>
              {
                !auth.user
                  ? t("sandboxPage.stepsSection.notLoggedIn.heading")
                  : t("sandboxPage.stepsSection.loggedIn.heading")
              }
            </Typography>

            <Typography variant="h5" gutterBottom>
              {
                !auth.user
                  ? t("sandboxPage.stepsSection.notLoggedIn.paragraphOne")
                  : `${portalName} ${t("sandboxPage.stepsSection.loggedIn.paragraphOne")}`
              }
            </Typography>

            <Typography variant="body2" gutterBottom style={{ whiteSpace: "pre-line" }}>
              {
                !auth.user
                  ? t("sandboxPage.stepsSection.notLoggedIn.paragraphTwo")
                  : t("sandboxPage.stepsSection.loggedIn.paragraphTwo")
              }
            </Typography>

            <Button
              className={classes.stepsDescriptionSupportButton}
              variant="contained"
              color="primary"
              size="large"
              disableElevation
              href={!auth.user ? "/auth/signup" : supportURL || DEFAULT_NON_INSTANCE_OWNER_SUPPORT_URL}
              rel={auth.user ? "noopener noreferrer" : ""}
              target={ auth.user ? "_blank" : ""}
            >
              {
                !auth.user
                  ? t("sandboxPage.stepsSection.notLoggedIn.buttonLabel")
                  : t("sandboxPage.stepsSection.loggedIn.buttonLabel")
              }
            </Button>
          </Box>

          <Grid
            component={Paper}
            variant="outlined"
            container
            md
            wrap="nowrap"
          >
            <Grid
              data-test-id={testIds.stepOne}
              component={Box}
              item
              xs={4}
              p={2}
              display="flex"
              flexDirection="column"
              borderRight={`1px solid ${palette.divider}`}
            >
              <Box mb={4}>
                <Typography variant="h1" color="primary" align="center">
                  <b>1.</b>
                </Typography>
              </Box>

              <Box mb={3}>
                <Typography variant="body1" color="primary" align="center">
                  {t("sandboxPage.stepsSection.individualSteps.stepOne.header")}
                </Typography>
              </Box>

              <Box mb={4}>
                <Typography variant="body2" color="textPrimary" align="center">
                  {t("sandboxPage.stepsSection.individualSteps.stepOne.paragraph")}
                </Typography>
              </Box>

              <Button
                className={classes.stepCta}
                color="primary"
                variant="outlined"
                size="large"
                fullWidth
                disabled={!auth.user}
                href='/dashboard/apps'
              >
                {t("sandboxPage.stepsSection.individualSteps.stepOne.buttonLabel")}
              </Button>
            </Grid>

            <Grid
              data-test-id={testIds.stepTwo}
              component={Box}
              item
              xs={4}
              p={2}
              display="flex"
              flexDirection="column"
              borderRight={`1px solid ${palette.divider}`}
            >
              <Box mb={5}>
                <Typography variant="h1" color="primary" align="center">
                  <b>2.</b>
                </Typography>
              </Box>

              <Box mb={4}>
                <Typography variant="body1" color="primary" align="center">
                  {t("sandboxPage.stepsSection.individualSteps.stepTwo.header")}
                </Typography>
              </Box>

              <Box mb={4}>
                <Typography variant="body2" color="textPrimary" align="center">
                  {t("sandboxPage.stepsSection.individualSteps.stepTwo.paragraph")}
                </Typography>
              </Box>

              <Button
                className={classes.stepCta}
                color="primary"
                variant="outlined"
                size="large"
                fullWidth
                disabled={!auth.user}
                href='/dashboard/subscriptions'
              >
                {t("sandboxPage.stepsSection.individualSteps.stepTwo.buttonLabel")}
              </Button>
            </Grid>

            <Grid
              data-test-id={testIds.stepThree}
              component={Box}
              item
              xs={4}
              p={2}
              display="flex"
              flexDirection="column"
            >
              <Box mb={5}>
                <Typography variant="h1" color="primary" align="center">
                  <b>3.</b>
                </Typography>
              </Box>

              <Box mb={4}>
                <Typography variant="body1" color="primary" align="center">
                  {t("sandboxPage.stepsSection.individualSteps.stepThree.header")}
                </Typography>
              </Box>

              <Box mb={4}>
                <Typography variant="body2" color="textPrimary" align="center">
                  {t("sandboxPage.stepsSection.individualSteps.stepThree.paragraph")}
                </Typography>
              </Box>

              <Button
                className={classes.stepCta}
                color="primary"
                variant="outlined"
                size="large"
                fullWidth
                disabled={!auth.user}
                href={documentationURL}
              >
                {t("sandboxPage.stepsSection.individualSteps.stepThree.buttonLabel")}
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Divider style={{ margin: `${spacing(5)}px 0`, backgroundColor: palette.primary.main }} />

        <Box data-test-id={testIds.recentAdditionsTitle} mb={5}>
          <Typography variant="h2" >
            {t("sandboxPage.apiCatalog.intro")}
          </Typography>
        </Box>

        <Box data-test-id={testIds.recentAdditionsCatalog} mb={6}>
          {!recentlyAddedAPIs.length ? <Typography data-test-id={testIds.recentAdditionsEmpty} variant="body1">
            {t("sandboxPage.apiCatalog.paragraph")}
          </Typography>
            : <APICatalog apisToDisplay={recentlyAddedAPIs} limit={2} />}
        </Box>

        {socialURLs.length > 0 && (
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
        )}
      </Container>
    </main>
  );
};
