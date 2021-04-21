import React from 'react'
import { useConfig, useTranslation, useTheme, Button } from '@apisuite/fe-base'
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded'
import ChromeReaderModeRoundedIcon from '@material-ui/icons/ChromeReaderModeRounded'
import ControlCameraRoundedIcon from '@material-ui/icons/ControlCameraRounded'
import FlightLandRoundedIcon from '@material-ui/icons/FlightLandRounded'
import { DEFAULT_NON_INSTANCE_OWNER_SUPPORT_URL } from 'constants/global'
import APICatalog from 'components/APICatalog'
import Carousel from 'components/Carousel'
import Notice from 'components/Notice'
import useStyles from './styles'
import { SandboxProps } from './types'
import carouselBackground from 'assets/space-background.svg'
import carouselSlide1 from 'assets/carousel-slide-1.svg'
import carouselSlide2 from 'assets/carousel-slide-2.svg'
import carouselSlide3 from 'assets/carousel-slide-3.svg'

const Sandbox: React.FC<SandboxProps> = ({
  auth,
  getAPIs,
  subscriptions,
}) => {
  const classes = useStyles()
  const { palette } = useTheme()
  const { socialURLs, portalName, clientName, supportURL } = useConfig()

  const [t] = useTranslation()

  const [recentlyAddedAPIs, setRecentlyAddedAPIs] = React.useState<any[]>([])

  React.useEffect(() => {
    /* Triggers the retrieval and storage (on the app's Store, under 'subscriptions')
    of all API-related information we presently have. */
    getAPIs()
  }, [getAPIs])

  React.useEffect(() => {
    /* Once 'subscriptions' info is made available, we process it so as to display it
    on our 'API Catalog' section. */
    const allAvailableAPIs = subscriptions.apis

    if (allAvailableAPIs.length) {
      const newRecentlyAddedAPIs = allAvailableAPIs.map((api) => {
        return {
          /* Determines if an 'API Catalog' entry will be clickable, and link to its corresponding
          'API Details' view. For the time being, an 'API Catalog' entry should be clickable and
          link to its corresponding 'API Details' view if it has versions. */
          hasMoreDetails: api.apiVersions.length > 0,
          id: api.apiVersions.length ? api.apiVersions[0].apiId : api.id,
          apiName: api.apiVersions.length ? api.apiVersions[0].title : api.name,
          apiDescription: api?.docs?.info || 'No description presently available.',
          apiVersion: api.apiVersions.length ? api.apiVersions[0].version : 'No version available',
          // Used to link an 'API Catalog' entry to its corresponding 'API Details' view.
          apiRoutingId: api.apiVersions.length ? `${api.apiVersions[0].id}` : '',
          /* An API that is 'live' (i.e., 'production accessible') is one that has versions, and has
          its 'live' property set to 'true'. Ones that do NOT meet any of the above criteria are ones
          that, presently, only have 'API Documentation' to show for it. */
          apiAccess: (api.apiVersions.length > 0 && api.apiVersions[0].live),
        }
      })

      const twoMostRecentlyAddedAPIs = [newRecentlyAddedAPIs[0], newRecentlyAddedAPIs[1]]

      setRecentlyAddedAPIs(twoMostRecentlyAddedAPIs)
    }
  }, [subscriptions])

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
                slideButtonLabel: t('sandboxPage.newSlides.slideOne.slideButtonLabel'),
                slideButtonLink: '/auth/signup',
                slideContentsPlacement: 'top-to-bottom',
                slideForegroundImage: carouselSlide1,
                slideText: t('sandboxPage.newSlides.slideOne.slideText'),
              },
              {
                slideButton: true,
                slideButtonLabel: t('sandboxPage.newSlides.slideTwo.slideButtonLabel'),
                slideButtonLink: '/api-products',
                slideContentsPlacement: 'side-by-side',
                slideForegroundImage: carouselSlide2,
                slideText: t('sandboxPage.newSlides.slideTwo.slideText'),
              },
              {
                slideButton: true,
                slideButtonLabel: t('sandboxPage.newSlides.slideThree.slideButtonLabel'),
                slideButtonLink: '/documentation',
                slideContentsPlacement: 'side-by-side',
                slideForegroundImage: carouselSlide3,
                slideText: t('sandboxPage.newSlides.slideThree.slideText'),
              },
            ]
            : [
              {
                slideButton: true,
                slideButtonLabel: t('sandboxPage.newSlides.slideTwo.slideButtonLabel'),
                slideButtonLink: '/api-products',
                slideContentsPlacement: 'side-by-side',
                slideForegroundImage: carouselSlide2,
                slideText: t('sandboxPage.newSlides.slideTwo.slideText'),
              },
              {
                slideButton: true,
                slideButtonLabel: t('sandboxPage.newSlides.slideThree.slideButtonLabel'),
                slideButtonLink: '/documentation',
                slideContentsPlacement: 'side-by-side',
                slideForegroundImage: carouselSlide3,
                slideText: t('sandboxPage.newSlides.slideThree.slideText'),
              },
            ]}
          slidingAnimationDuration={1500}
          timeBetweenSlides={4000}
        />
      </section>

      {/* 'Steps' section */}
      <section className={classes.stepsSectionContainer}>
        <h1 className={classes.sectionIntroHeading}>
          {t('sandboxPage.stepsSection.intro')}
        </h1>

        <section className={classes.stepsSectionDescriptionsContainer}>
          <section className={classes.stepsDescriptionContainerOne}>
            <h3 className={classes.stepsDescriptionHeading}>
              {
                !auth.user
                  ? t('sandboxPage.stepsSection.notLoggedIn.heading')
                  : t('sandboxPage.stepsSection.loggedIn.heading')
              }
            </h3>

            <p className={classes.stepsDescriptionParagraphOne}>
              {
                !auth.user
                  ? t('sandboxPage.stepsSection.notLoggedIn.paragraphOne')
                  : `${portalName} ${t('sandboxPage.stepsSection.loggedIn.paragraphOne')}`
              }
            </p>

            <p className={classes.stepsDescriptionParagraphTwo}>
              <span>
                {
                  !auth.user
                    ? t('sandboxPage.stepsSection.notLoggedIn.paragraphTwoPartOne')
                    : t('sandboxPage.stepsSection.loggedIn.paragraphTwoPartOne')
                }
              </span>

              <>
                {
                  !auth.user
                    ? t('sandboxPage.stepsSection.notLoggedIn.paragraphTwoPartTwo')
                    : t('sandboxPage.stepsSection.loggedIn.paragraphTwoPartTwo')
                }
              </>
            </p>

            <Button
              className={
                !auth.user
                  ? classes.stepsDescriptionRegisterButton
                  : classes.stepsDescriptionContactSupportButton
              }
              href={
                !auth.user
                  ? '/auth/signup'
                  : supportURL || DEFAULT_NON_INSTANCE_OWNER_SUPPORT_URL
              }
              rel={
                auth.user
                  ? 'noopener noreferrer'
                  : ''
              }
              target={
                auth.user
                  ? '_blank'
                  : ''
              }
            >
              {
                !auth.user
                  ? t('sandboxPage.stepsSection.notLoggedIn.buttonLabel')
                  : t('sandboxPage.stepsSection.loggedIn.buttonLabel')
              }
            </Button>
          </section>

          <section className={classes.stepsDescriptionContainerTwo}>
            <div className={classes.individualStepsContainer}>
              <div className={`${classes.individualStep} ${classes.individualStepsDivider}`}>
                <h1 style={{ color: '#7DD291' }}>1.</h1>

                <h3 style={{ color: '#7DD291' }}>
                  {t('sandboxPage.stepsSection.individualSteps.stepOne.header')}
                </h3>

                <p>
                  <span>
                    {t('sandboxPage.stepsSection.individualSteps.stepOne.paragraphPartOne')}
                  </span>

                  <>
                    {t('sandboxPage.stepsSection.individualSteps.stepOne.paragraphPartTwo')}
                  </>
                </p>

                <Button
                  className={classes.individualStepButton}
                  disabled={!auth.user}
                  href='/dashboard/apps'
                >
                  {t('sandboxPage.stepsSection.individualSteps.stepOne.buttonLabel')}
                </Button>
              </div>

              <div className={`${classes.individualStep} ${classes.individualStepsDivider}`}>
                <h1 style={{ color: palette.secondary.main }}>2.</h1>

                <h3 style={{ color: palette.secondary.main }}>
                  {t('sandboxPage.stepsSection.individualSteps.stepTwo.header')}
                </h3>

                <p>
                  {t('sandboxPage.stepsSection.individualSteps.stepTwo.paragraph')}
                </p>

                <Button
                  className={classes.individualStepButton}
                  disabled={!auth.user}
                  href='/dashboard/subscriptions'
                >
                  {t('sandboxPage.stepsSection.individualSteps.stepTwo.buttonLabel')}
                </Button>
              </div>

              <div className={classes.individualStep}>
                <h1 style={{ color: '#007D7D' }}>3.</h1>

                <h3 style={{ color: '#007D7D' }}>
                  {t('sandboxPage.stepsSection.individualSteps.stepThree.header')}
                </h3>

                <p>
                  {t('sandboxPage.stepsSection.individualSteps.stepThree.paragraph')}
                </p>

                <Button
                  className={classes.individualStepButton}
                  disabled={!auth.user}
                  href='/dashboard/test'
                >
                  {t('sandboxPage.stepsSection.individualSteps.stepThree.buttonLabel')}
                </Button>
              </div>
            </div>
          </section>
        </section>
      </section>

      <hr className={classes.sectionSeparator} />

      {/* 'API Catalog' section */}
      <section className={classes.apiCatalogSectionContainer}>
        <h1 className={classes.sectionIntroHeading}>
          {t('sandboxPage.apiCatalog.intro')}
        </h1>

        <section className={classes.apiCatalogContainer}>
          {
            recentlyAddedAPIs.length === 0
              ? <p>{t('sandboxPage.apiCatalog.paragraph')}</p>
              : <APICatalog apisToDisplay={recentlyAddedAPIs} />
          }
        </section>
      </section>

      {/* Notice */}
      {socialURLs.length > 0 && (
        <section className={classes.noticeContainer}>
          <Notice
            noticeIcon={<CheckCircleOutlineRoundedIcon />}
            noticeText={
              <p>
                {portalName} {t('sandboxPage.notice.maintainedBy')} {clientName}.
                {t('sandboxPage.notice.visitUs')}
                <a
                  href={socialURLs[0]?.url ?? '#'}
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  {socialURLs[0].url}
                </a>
                  .
              </p>
            }
          />
        </section>
      )}
    </main>
  )
}

export default Sandbox
