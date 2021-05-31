import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useConfig, useTranslation, Button, Trans } from "@apisuite/fe-base";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import ChromeReaderModeRoundedIcon from "@material-ui/icons/ChromeReaderModeRounded";
import ControlCameraRoundedIcon from "@material-ui/icons/ControlCameraRounded";
import FlightLandRoundedIcon from "@material-ui/icons/FlightLandRounded";

import { DEFAULT_NON_INSTANCE_OWNER_SUPPORT_URL } from "constants/global";
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

export const Sandbox: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { socialURLs, portalName, clientName, supportURL } = useConfig();
  const { auth, subscriptions } = useSelector(sandboxSelector);

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
          apiDescription: api?.docs?.info || "No description presently available.",
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

      {/* 'Steps' section */}
      <section className={classes.stepsSectionContainer} data-test-id={testIds.stepsSection}>
        <h1 className={classes.sectionIntroHeading}>
          {t("sandboxPage.stepsSection.intro")}
        </h1>

        <section className={classes.stepsSectionDescriptionsContainer} data-test-id={testIds.stepsSectionContent}>
          <section className={classes.stepsDescriptionContainerOne}>
            <h3 className={classes.stepsDescriptionHeading}>
              {
                !auth.user
                  ? t("sandboxPage.stepsSection.notLoggedIn.heading")
                  : t("sandboxPage.stepsSection.loggedIn.heading")
              }
            </h3>

            <p className={classes.stepsDescriptionParagraphOne}>
              {
                !auth.user
                  ? t("sandboxPage.stepsSection.notLoggedIn.paragraphOne")
                  : `${portalName} ${t("sandboxPage.stepsSection.loggedIn.paragraphOne")}`
              }
            </p>

            <p className={classes.stepsDescriptionParagraphTwo}>
              <span>
                {
                  !auth.user
                    ? t("sandboxPage.stepsSection.notLoggedIn.paragraphTwoPartOne")
                    : t("sandboxPage.stepsSection.loggedIn.paragraphTwoPartOne")
                }
              </span>

              <>
                {
                  !auth.user
                    ? t("sandboxPage.stepsSection.notLoggedIn.paragraphTwoPartTwo")
                    : t("sandboxPage.stepsSection.loggedIn.paragraphTwoPartTwo")
                }
              </>
            </p>

            <Button
              className={classes.stepsDescriptionSupportButton}
              variant="contained"
              color="primary"
              disableElevation
              href={
                !auth.user
                  ? "/auth/signup"
                  : supportURL || DEFAULT_NON_INSTANCE_OWNER_SUPPORT_URL
              }
              rel={
                auth.user
                  ? "noopener noreferrer"
                  : ""
              }
              target={
                auth.user
                  ? "_blank"
                  : ""
              }
            >
              {
                !auth.user
                  ? t("sandboxPage.stepsSection.notLoggedIn.buttonLabel")
                  : t("sandboxPage.stepsSection.loggedIn.buttonLabel")
              }
            </Button>
          </section>

          <section className={classes.stepsDescriptionContainerTwo}>
            <div className={classes.individualStepsContainer}>
              <div className={`${classes.individualStep} ${classes.individualStepsDivider}`} data-test-id={testIds.stepOne}>
                <h1 className={classes.individualStepOne}>1.</h1>

                <h3 className={classes.individualStepOne}>
                  {t("sandboxPage.stepsSection.individualSteps.stepOne.header")}
                </h3>

                <p>
                  <span>
                    {t("sandboxPage.stepsSection.individualSteps.stepOne.paragraphPartOne")}
                  </span>

                  <>
                    {t("sandboxPage.stepsSection.individualSteps.stepOne.paragraphPartTwo")}
                  </>
                </p>

                <Button
                  className={classes.individualStepButton}
                  color="primary"
                  variant="outlined"
                  fullWidth
                  disabled={!auth.user}
                  href='/dashboard/apps'
                >
                  {t("sandboxPage.stepsSection.individualSteps.stepOne.buttonLabel")}
                </Button>
              </div>

              <div className={`${classes.individualStep} ${classes.individualStepsDivider}`} data-test-id={testIds.stepTwo}>
                <h1 className={classes.individualStepTwo}>2.</h1>

                <h3 className={classes.individualStepTwo}>
                  {t("sandboxPage.stepsSection.individualSteps.stepTwo.header")}
                </h3>

                <p>
                  {t("sandboxPage.stepsSection.individualSteps.stepTwo.paragraph")}
                </p>

                <Button
                  className={classes.individualStepButton}
                  color="primary"
                  variant="outlined"
                  fullWidth
                  disabled={!auth.user}
                  href='/dashboard/subscriptions'
                >
                  {t("sandboxPage.stepsSection.individualSteps.stepTwo.buttonLabel")}
                </Button>
              </div>

              <div className={classes.individualStep} data-test-id={testIds.stepThree}>
                <h1 className={classes.individualStepThree}>3.</h1>

                <h3 className={classes.individualStepThree}>
                  {t("sandboxPage.stepsSection.individualSteps.stepThree.header")}
                </h3>

                <p>
                  {t("sandboxPage.stepsSection.individualSteps.stepThree.paragraph")}
                </p>

                <Button
                  className={classes.individualStepButton}
                  color="primary"
                  variant="outlined"
                  fullWidth
                  disabled={!auth.user}
                  href='/dashboard/test'
                >
                  {t("sandboxPage.stepsSection.individualSteps.stepThree.buttonLabel")}
                </Button>
              </div>
            </div>
          </section>
        </section>
      </section>

      <hr className={classes.sectionSeparator} />

      {/* 'API Catalog' section */}
      <section className={classes.apiCatalogSectionContainer} data-test-id={testIds.recentAdditionsTitle}>
        <h1 className={classes.sectionIntroHeading}>
          {t("sandboxPage.apiCatalog.intro")}
        </h1>

        <section className={classes.apiCatalogContainer} data-test-id={testIds.recentAdditionsCatalog}>
          {
            recentlyAddedAPIs.length === 0
              ? <p data-test-id={testIds.recentAdditionsEmpty}>{t("sandboxPage.apiCatalog.paragraph")}</p>
              : <APICatalog apisToDisplay={recentlyAddedAPIs}/>
          }
        </section>
      </section>

      {/* Notice */}
      {socialURLs.length > 0 && (
        <section className={classes.noticeContainer} data-test-id={testIds.notice}>
          <Notice
            noticeIcon={
              <CheckCircleOutlineRoundedIcon />
            }
            noticeText={
              <p>
                <Trans i18nKey="sandboxPage.notice" values={{ portalName, clientName, url: socialURLs[0].url }}>
                  {[
                    <a
                      key="sandboxPage.notice"
                      href={socialURLs[0].url}
                      rel='noopener noreferrer'
                      target='_blank'
                    />,
                  ]}
                </Trans>
              </p>
            }
          />
        </section>
      )}
    </main>
  );
};
