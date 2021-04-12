import * as React from 'react'

import { useTranslation } from 'react-i18next'

import ActionsCatalog from 'components/ActionsCatalog'
import APICatalog from 'components/APICatalog'
import GreetingCard from 'components/GreetingCard'
import Notice from 'components/Notice'
import NotificationBanner from 'components/NotificationBanner'
import NotificationCard from 'components/NotificationCard'

import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded'

import apiSVG from 'assets/icons/API.svg'
import billingSVG from 'assets/icons/Billing.svg'
import dataCloudSVG from 'assets/icons/DataCloud.svg'
import fingerprintSVG from 'assets/icons/Fingerprint.svg'
import sandboxSVG from 'assets/icons/Sandbox.svg'
import settingsSVG from 'assets/icons/Settings.svg'
import shieldSVG from 'assets/icons/Shield.svg'
import supportSVG from 'assets/icons/Support.svg'
import teamSVG from 'assets/icons/Team.svg'

import useStyles from './styles'

import { DashboardProps } from './types'

import {
  config,
  DEFAULT_INSTANCE_OWNER_SUPPORT_URL,
  DEFAULT_NON_INSTANCE_OWNER_SUPPORT_URL,
} from 'constants/global'

const Dashboard: React.FC<DashboardProps> = ({
  auth,
  getAPIs,
  // Temporary until notification cards become clearer
  notificationCards,
  profile,
  settings,
  subscriptions,
}) => {
  const classes = useStyles()

  const [t] = useTranslation()

  const typeOfUser = auth.user!.role.name

  const [recentlyAddedAPIs, setRecentlyAddedAPIs] = React.useState<any[]>([])

  React.useEffect(() => {
    /* Triggers the retrieval and storage (on the app's Store, under 'subscriptions')
    of all API-related information we presently have. */
    getAPIs()
  }, [])

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

      setRecentlyAddedAPIs(newRecentlyAddedAPIs)
    }
  }, [subscriptions])

  const hasSocials = () => {
    return settings && settings.socialURLs && settings.socialURLs.length > 0
  }

  return (
    <>
      <main className={`page-container ${classes.dashboardContentsContainer}`}>
        {/* 'Dashboard' page's header image */}
        <section
          className={
            (typeOfUser === 'admin' && notificationCards.showInstanceOwnerNotificationCards)
              ? classes.expandedHeaderImageSection
              : (typeOfUser !== 'admin' && notificationCards.showNonInstanceOwnerNotificationCards)
                ? classes.expandedHeaderImageSection
                : classes.regularHeaderImageSection
          }
        />

        {/* 'Notification cards' section */}
        <section className={classes.notificationCardSection}>
          <NotificationCard
            notificationCardTitle={t('dashboardTab.landingPageSubTab.regularUser.notificationCards.completeYourTeam.notificationCardTitle', { config })}
            notificationCardText={t('dashboardTab.landingPageSubTab.regularUser.notificationCards.completeYourTeam.notificationCardText', { config })}
            notificationCardButtonClassName={classes.customNotificationCardButton}
            notificationCardButtonLabel={t('dashboardTab.landingPageSubTab.regularUser.notificationCards.completeYourTeam.notificationCardButtonLabel', { config })}
            notificationCardButtonLink='/dashboard/team'
            typeOfUser={typeOfUser}
          />
        </section>

        {/* 'Actions Catalog' section */}
        <section
          className={
            (typeOfUser === 'admin' && notificationCards.showInstanceOwnerNotificationCards)
              ? classes.actionsCatalogSectionWithNotificationCards
              : (typeOfUser !== 'admin' && notificationCards.showNonInstanceOwnerNotificationCards)
                ? classes.actionsCatalogSectionWithNotificationCards
                : classes.actionsCatalogSectionWithoutNotificationCards
          }
        >
          <ActionsCatalog
            actionsToDisplay={
              typeOfUser !== 'admin'
                ? [
                  {
                    actionImage: teamSVG,
                    actionLink: '/dashboard/team',
                    actionText: t('dashboardTab.landingPageSubTab.regularUser.actionsCatalog.team', { config }),
                  },
                  {
                    actionImage: sandboxSVG,
                    actionLink: '/dashboard/apps',
                    actionText: t('dashboardTab.landingPageSubTab.regularUser.actionsCatalog.sandbox', { config }),
                  },
                  {
                    actionImage: shieldSVG,
                    actionLink: '/dashboard/subscriptions',
                    actionText: t('dashboardTab.landingPageSubTab.regularUser.actionsCatalog.shield', { config }),
                  },
                  {
                    actionImage: fingerprintSVG,
                    // TODO: Create an 'Update your password' view or mechanism, and link to it
                    actionLink: '',
                    actionText: t('dashboardTab.landingPageSubTab.regularUser.actionsCatalog.fingerprint', { config }),
                  },
                  {
                    actionImage: apiSVG,
                    actionLink: '/dashboard/subscriptions',
                    actionText: t('dashboardTab.landingPageSubTab.regularUser.actionsCatalog.api', { config }),
                  },
                  {
                    actionImage: supportSVG,
                    actionLink: settings.supportURL || DEFAULT_NON_INSTANCE_OWNER_SUPPORT_URL,
                    actionText: t('dashboardTab.landingPageSubTab.regularUser.actionsCatalog.support', { config }),
                  },
                ]
                : [
                  {
                    actionImage: apiSVG,
                    actionLink: '/dashboard/admin/api-catalog',
                    actionText: t('dashboardTab.landingPageSubTab.adminUser.actionsCatalog.api', { config }),
                  },
                  {
                    actionImage: dataCloudSVG,
                    actionLink: '/dashboard/admin/integrations',
                    actionText: t('dashboardTab.landingPageSubTab.adminUser.actionsCatalog.dataCloud', { config }),
                  },
                  {
                    actionImage: settingsSVG,
                    actionLink: '/dashboard/admin',
                    actionText: t('dashboardTab.landingPageSubTab.adminUser.actionsCatalog.settings', { config }),
                  },
                  {
                    actionImage: billingSVG,
                    // TODO: Create a 'Billing' view or mechanism, and link to it
                    actionLink: '',
                    actionText: t('dashboardTab.landingPageSubTab.adminUser.actionsCatalog.billing', { config }),
                  },
                  {
                    actionImage: teamSVG,
                    actionLink: '/dashboard/team',
                    actionText: t('dashboardTab.landingPageSubTab.adminUser.actionsCatalog.team', { config }),
                  },
                  {
                    actionImage: supportSVG,
                    actionLink: settings.supportURL || DEFAULT_INSTANCE_OWNER_SUPPORT_URL,
                    actionText: t('dashboardTab.landingPageSubTab.adminUser.actionsCatalog.support', { config }),
                  },
                ]
            }
          />
        </section>

        {/* 'Greeting card' section */}
        <section className={classes.greetingCardSection}>
          <GreetingCard
            greetingCardText={
              <div className={classes.customGreetingCardTextContainer}>
                {
                  typeOfUser !== 'admin'
                    ? (
                      <>
                        <p className={classes.customGreetingCardText}>
                          <>{t('dashboardTab.landingPageSubTab.regularUser.greetingCard.greetingCardTextPartOne', { config })} </>
                          <>{profile.profile.user.name}! </>
                          {t('dashboardTab.landingPageSubTab.regularUser.greetingCard.greetingCardTextPartTwo', { config })}
                        </p>

                        <p className={classes.customGreetingCardText}>
                          {t('dashboardTab.landingPageSubTab.regularUser.greetingCard.greetingCardTextPartThree', { config })}
                        </p>
                      </>
                    )
                    : (
                      <>
                        <p className={classes.customGreetingCardText}>
                          <>{t('dashboardTab.landingPageSubTab.adminUser.greetingCard.greetingCardTextPartOne', { config })} </>
                          <>{profile.profile.user.name}! </>
                        </p>

                        <p className={classes.customGreetingCardText}>
                          {t('dashboardTab.landingPageSubTab.adminUser.greetingCard.greetingCardTextPartTwo', { config })}
                        </p>
                      </>
                    )
                }
              </div>
            }
            greetingCardButtonClassName={classes.customGreetingCardButton}
            greetingCardButtonLabel={
              typeOfUser !== 'admin'
                ? (
                  t('dashboardTab.landingPageSubTab.regularUser.greetingCard.greetingCardButtonLabel', { config }) +
                  ` ${settings.clientName}`
                )
                : t('dashboardTab.landingPageSubTab.adminUser.greetingCard.greetingCardButtonLabel', { config })
            }
            greetingCardButtonLink={
              typeOfUser !== 'admin'
                ? (settings.supportURL || DEFAULT_NON_INSTANCE_OWNER_SUPPORT_URL)
                : '/dashboard/admin'
            }
          />
        </section>

        {/* 'API Catalog' section */}
        {
          typeOfUser !== 'admin' &&
          (
            <>
              <hr className={classes.sectionSeparator} />

              <section className={classes.apiCatalogSectionContainer}>
                <h1 className={classes.sectionIntroHeading}>
                  {t('sandboxPage.apiCatalog.intro', { config })}
                </h1>

                <section className={classes.apiCatalogContainer}>
                  {
                    recentlyAddedAPIs.length === 0
                      ? <p>{t('sandboxPage.apiCatalog.paragraph', { config })}</p>
                      : <APICatalog apisToDisplay={recentlyAddedAPIs} />
                  }
                </section>
              </section>
            </>
          )
        }

        {/* Notice */}
        {
          hasSocials() &&
          <section className={classes.noticeContainer}>
            <Notice
              noticeIcon={
                <CheckCircleOutlineRoundedIcon />
              }
              noticeText={
                <p>
                  <>{settings?.portalName} {t('sandboxPage.notice.maintainedBy', { config })} {settings?.clientName}.</>
                  {
                    hasSocials() && (
                      <>
                        <> {t('sandboxPage.notice.visitUs', { config })} </>
                        <a
                          href={hasSocials() ? settings.socialURLs[0].url : '#'}
                          rel='noopener noreferrer'
                          target='_blank'
                        >
                          {hasSocials() ? settings.socialURLs[0].url : ''}
                        </a>
                        <>.</>
                      </>
                    )
                  }
                </p>
              }
            />
          </section>
        }
      </main>

      {/* Notification banner */}
      {
        typeOfUser !== 'admin'
          ? null
          : (
            <NotificationBanner
              customNotificationBannerContents={
                <p className={classes.customNotificationBannerParagraph}>
                  {t('dashboardTab.landingPageSubTab.adminUser.notificationBanner.textPartOne', { config })}

                  <br />

                  <a
                    href='/dashboard/admin/integrations'
                  >
                    {t('dashboardTab.landingPageSubTab.adminUser.notificationBanner.textPartTwo', { config })}
                  </a>
                </p>
              }
              notificationBannerTitle={
                t('dashboardTab.landingPageSubTab.adminUser.notificationBanner.title', { config })
              }
              showNotificationBanner
            />
          )
      }
    </>
  )
}

export default Dashboard
