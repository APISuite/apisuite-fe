import React from 'react'
import { useTranslation, Button } from '@apisuite/fe-base'
import SportsSoccerRoundedIcon from '@material-ui/icons/SportsSoccerRounded'

import Link from 'components/Link'
import SubscriptionsModal from 'components/SubscriptionsModal'
import SubscriptionsTable from 'components/SubscriptionsTable'
import rocket from 'assets/rocket.svg'

import useStyles from './styles'
import { SubscriptionsProps } from './types'

const Subscriptions: React.FC<SubscriptionsProps> = ({
  auth,
  getAllUserAppsAction,
  getAPIs,
  subscriptions,
}) => {
  const classes = useStyles()

  const [t] = useTranslation()

  /* Retrieval of our APIs' data */

  React.useEffect(() => {
    /* Triggers the retrieval and storage of all API and app-related information
    we presently have. Once this is done, the 'SubscriptionsTable' component will
    have all the information it needs. */
    if (auth?.user) {
      getAPIs()
      getAllUserAppsAction(auth.user.id)
    }
  }, [auth?.user, getAPIs, getAllUserAppsAction])

  /* Modal stuff */

  const [isModalOpen, setModalOpen] = React.useState(false)

  const toggleModal = () => {
    setModalOpen(!isModalOpen)
  }

  return (
    <main className='page-container'>
      {
        subscriptions.apis.length === 0
          ? (
            <section className={classes.noDataToShowContentContainer}>
              <div className={classes.noDataToShowImageContainer}>
                <img className={classes.noDataToShowImage} src={rocket} />
              </div>

              <div className={classes.addSubscriptionButtonContainer}>
                <Button
                  className={classes.addSubscriptionButton}
                  onClick={toggleModal}
                >
                  {t('dashboardTab.subscriptionsSubTab.hasNoDataToShow.buttonLabel')}
                </Button>
              </div>

              <Link
                className={classes.noDataToShowLink}
                to='https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/580517951/API+Subscriptions'
              >
                {t('dashboardTab.subscriptionsSubTab.hasNoDataToShow.linkText')}
              </Link>
            </section>
          )
          : (
            <section className={classes.dataToShowContentContainer}>
              <h1 className={classes.dataToShowTitle}>
                {t('dashboardTab.subscriptionsSubTab.hasDataToShow.title')}
              </h1>

              <p className={classes.dataToShowDescription}>
                {t('dashboardTab.subscriptionsSubTab.hasDataToShow.description')}
              </p>

              <div className={classes.dataToShowSubscriptionsTable}>
                <SubscriptionsTable />
              </div>

              <div className={classes.addSubscriptionButtonContainer}>
                <Button
                  className={classes.addSubscriptionButton}
                  onClick={toggleModal}
                >
                  {t('dashboardTab.subscriptionsSubTab.hasNoDataToShow.buttonLabel')}
                </Button>
              </div>

              <div className={classes.infoBox}>
                <SportsSoccerRoundedIcon className={classes.infoBoxIcon} />

                <p className={classes.infoBoxText}>
                  <>{t('dashboardTab.subscriptionsSubTab.hasDataToShow.notificationTextPartOne')} "</>
                  <a
                    href='https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/580517951/API+Subscriptions'
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    {t('dashboardTab.subscriptionsSubTab.hasDataToShow.notificationTextPartTwo')}
                  </a>
                  <>".</>
                </p>
              </div>
            </section>
          )
      }

      {
        isModalOpen &&
        <SubscriptionsModal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
        />
      }
    </main>
  )
}

export default Subscriptions
