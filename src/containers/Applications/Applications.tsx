import * as React from 'react'

import { useTranslation } from 'react-i18next'

import ApplicationsModal from 'components/ApplicationsModal'
import Link from 'components/Link'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'

import HeightRoundedIcon from '@material-ui/icons/HeightRounded'
import OpenInNewRoundedIcon from '@material-ui/icons/OpenInNewRounded'
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined'

import adrift from 'assets/adrift.svg'
import authFundamentals from 'assets/authFundamentals.svg'
import launchApp from 'assets/launchApp.svg'

import { AppData, ModalDetails, ApplicationsProps } from './types'

import useStyles from './styles'

import { config } from 'constants/global'

const Applications: React.FC<ApplicationsProps> = ({
  allUserApps,
  createAppStatus,
  currentOrganisation,
  deleteAppStatus,
  getAllUserAppsAction,
  requestAPIAccessStatus,
  updateAppStatus,
  user,
}) => {
  const classes = useStyles()

  const [t] = useTranslation()

  /* Modal stuff */
  const [modalDetails, setModalDetails] = React.useState<ModalDetails>({
    userID: 0,
    userAppID: 0,
  })
  const [modalMode, setModalMode] = React.useState('')
  const [isModalOpen, setModalOpen] = React.useState(false)

  const toggleModal = (
    modalMode: string,
    userID: number,
    userAppID: number,
  ) => {
    const newModalDetails = {
      userID: userID,
      userAppID: userAppID,
    }

    setModalDetails(newModalDetails)
    setModalMode(modalMode)
    setModalOpen(!isModalOpen)
  }

  let allUserAppNames: string[] = []

  /* Generates an 'app card' for every app a user has. */
  const appCardGenerator = (allUserAppsArray: AppData[]) => {
    if (allUserAppsArray.length === 0) {
      return (
        <p className={classes.loadingClientApplicationCards}>
          {t('dashboardTab.applicationsSubTab.listOfAppsSection.loadingApps', { config })}
        </p>
      )
    }

    const allUserAppCardsArray = allUserAppsArray.map((userApp, index) => {
      const appNameInitialsArray = userApp.name.split(' ')
      const appNameInitials = appNameInitialsArray.length >= 2
        ? `${appNameInitialsArray[0][0]}${appNameInitialsArray[1][0]}`
        : `${appNameInitialsArray[0][0]}${appNameInitialsArray[0][1]}`

      allUserAppNames = [...allUserAppNames, userApp.name]

      return (
        <div
          className={classes.clientApplicationCard}
          key={`appCard${index}`}
          onClick={() => toggleModal('edit', user.id, userApp.id)}
        >
          <div className={classes.clientApplicationCardTopSection}>
            <HeightRoundedIcon className={
              userApp.logo !== ''
                ? classes.clientApplicationCardWithImageIcon
                : classes.clientApplicationCardWithAvatarIcon
            }
            />

            {
              userApp.logo !== ''
                ? (
                  <img
                    className={classes.clientApplicationCardImage}
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
          </div>

          <div className={classes.clientApplicationCardBottomSection}>
            <p className={classes.clientApplicationCardTitle}>
              {userApp.name}
            </p>

            <p className={classes.clientApplicationCardDescription}>
              {
                userApp.shortDescription
                  ? userApp.shortDescription
                  : (
                    userApp.description
                      ? userApp.description
                      : t('dashboardTab.applicationsSubTab.listOfAppsSection.noAppDescription', { config })
                  )
              }
            </p>

            <div className={classes.clientApplicationCardStatus}>
              {/* A mere dot */}
              <span
                className={
                  userApp.subscriptions.length === 0
                    ? classes.draftClientApplicationCardStatusIcon
                    : classes.subscribedClientApplicationCardStatusIcon
                }
              >
                <>&#9679;</>
              </span>

              <p className={classes.clientApplicationCardStatusText}>
                {
                  userApp.subscriptions.length === 0
                    ? t('dashboardTab.applicationsSubTab.listOfAppsSection.draftAppStatus', { config })
                    : t('dashboardTab.applicationsSubTab.listOfAppsSection.subscribedAppStatus', { config })
                }
              </p>
            </div>
          </div>
        </div>
      )
    })

    return allUserAppCardsArray
  }

  /* Triggers the retrieval and storage (on the app's Store, under 'applications > userApps')
  of all app-related information we presently have on a particular user the first time, and
  following any changes to 'applications > userApps' (i.e., 'allUserApps'). */
  React.useEffect(() => {
    if (user) getAllUserAppsAction(user.id)
  }, [modalMode, createAppStatus, updateAppStatus, deleteAppStatus, requestAPIAccessStatus])

  return (
    <main>
      {
        // If the user has yet to create/join an organisation, (...)
        currentOrganisation.id === ''
          ? (
            <section className={classes.firstUseContentContainer}>
              <div className={classes.firstUseImageContainer}>
                <img className={classes.firstUseImage} src={adrift} />
              </div>

              <div className={classes.firstUseButtonContainer}>
                <Button
                  className={classes.firstUseButton}
                  href='/profile/organisation'
                >
                  {t('dashboardTab.applicationsSubTab.noOrganisationsButtonLabel', { config })}
                </Button>
              </div>

              <Link
                className={classes.firstUseLink}
                to='https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/580321305/Client+Applications'
              >
                {t('dashboardTab.applicationsSubTab.documentationLink', { config })}
              </Link>

              <div className={classes.warningBox}>
                <ReportProblemOutlinedIcon className={classes.warningBoxIcon} />

                <p className={classes.warningBoxText}>
                  {t('dashboardTab.applicationsSubTab.noOrganisationWarning', { config })}
                </p>
              </div>
            </section>
          )
          : (
            // If the user has already created/joined an organisation, but has yet to create any apps, (...)
            allUserApps.length === 0
              ? (
                <section className={classes.firstUseContentContainer}>
                  <div className={classes.firstUseImageContainer}>
                    <img className={classes.firstUseImage} src={adrift} />
                  </div>

                  <div className={classes.firstUseButtonContainer}>
                    <Button
                      className={classes.firstUseButton}
                      onClick={() => toggleModal('new', 0, 0)}
                    >
                      {t('dashboardTab.applicationsSubTab.noApplicationsButtonLabel', { config })}
                    </Button>
                  </div>

                  <Link
                    className={classes.firstUseLink}
                    to='https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/580321305/Client+Applications'
                  >
                    {t('dashboardTab.applicationsSubTab.documentationLink', { config })}
                  </Link>
                </section>
              )
              : (
                // If the user has already created one or more apps, we list them out (...)
                <>
                  <section className={classes.clientApplicationsContentContainer}>
                    <h1 className={classes.clientApplicationsTitle}>
                      {t('dashboardTab.applicationsSubTab.listOfAppsSection.title', { config })}
                    </h1>

                    <p className={classes.clientApplicationsSubtitle}>
                      {t('dashboardTab.applicationsSubTab.listOfAppsSection.subtitle', { config })}
                    </p>

                    <div className={classes.clientApplicationCardsContainer}>
                      {appCardGenerator(allUserApps)}

                      <div
                        className={classes.registerClientApplicationCard}
                      >
                        <Button
                          className={classes.registerClientApplicationCardButton}
                          onClick={() => toggleModal('new', 0, 0)}
                        >
                          {t('dashboardTab.applicationsSubTab.listOfAppsSection.registerAppButtonLabel', { config })}
                        </Button>
                      </div>
                    </div>
                  </section>

                  <section className={classes.knowledgeBaseContentContainer}>
                    <h1 className={classes.knowledgeBaseTitle}>
                      {t('dashboardTab.applicationsSubTab.knowledgeBaseSection.title', { config })}
                    </h1>

                    <div className={classes.knowledgeBaseCardsContainer}>
                      <Link
                        className={classes.knowledgeBaseCard}
                        to='/documentation'
                      >
                        <OpenInNewRoundedIcon className={classes.knowledgeBaseCardIcon} />

                        <img className={classes.knowledgeBaseCardImage} src={launchApp} />

                        <p className={classes.knowledgeBaseCardTitle}>
                          {t('dashboardTab.applicationsSubTab.knowledgeBaseSection.launchAppCardTitle', { config })}
                        </p>

                        <p className={classes.knowledgeBaseCardDescription}>
                          {t('dashboardTab.applicationsSubTab.knowledgeBaseSection.launchAppCardSubtitle', { config })}
                        </p>
                      </Link>

                      <Link
                        className={classes.knowledgeBaseCard}
                        to='https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/580386833/Open+Authentication+2'
                      >
                        <OpenInNewRoundedIcon className={classes.knowledgeBaseCardIcon} />

                        <img className={classes.knowledgeBaseCardImage} src={authFundamentals} />

                        <p className={classes.knowledgeBaseCardTitle}>
                          {t('dashboardTab.applicationsSubTab.knowledgeBaseSection.authFundamentalsTitle', { config })}
                        </p>

                        <p className={classes.knowledgeBaseCardDescription}>
                          {t('dashboardTab.applicationsSubTab.knowledgeBaseSection.authFundamentalsSubtitle', { config })}
                        </p>
                      </Link>
                    </div>
                  </section>
                </>
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
          toggleModal={() => toggleModal('', 0, 0)}
        />
      }
    </main>
  )
}

export default Applications
