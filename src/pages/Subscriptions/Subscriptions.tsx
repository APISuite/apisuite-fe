import React, { useEffect, useState } from "react";
import { useTranslation, Button } from "@apisuite/fe-base";
import SportsSoccerRoundedIcon from "@material-ui/icons/SportsSoccerRounded";

import { getAPIs } from "store/subscriptions/actions/getAPIs";
import { getAllUserApps } from "store/applications/actions/getAllUserApps";
import Link from "components/Link";
import { SubscriptionsModal } from "components/SubscriptionsModal";
import { SubscriptionsTable } from "components/SubscriptionsTable";
import rocket from "assets/rocket.svg";

import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { subscriptionsSelector } from "./selectors";

export const Subscriptions: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { auth, subscriptions } = useSelector(subscriptionsSelector);

  /* Retrieval of our APIs' data */

  useEffect(() => {
    /* Triggers the retrieval and storage of all API and app-related information
    we presently have. Once this is done, the 'SubscriptionsTable' component will
    have all the information it needs. */
    if (auth.user) {
      dispatch(getAPIs({}));
      dispatch(getAllUserApps({ userId: auth.user.id }));
    }
  }, [auth.user, dispatch]);

  /* Modal stuff */

  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

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
                  {t("dashboardTab.subscriptionsSubTab.hasNoDataToShow.buttonLabel")}
                </Button>
              </div>

              <Link
                className={classes.noDataToShowLink}
                to='https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/580517951/API+Subscriptions'
              >
                {t("dashboardTab.subscriptionsSubTab.hasNoDataToShow.linkText")}
              </Link>
            </section>
          )
          : (
            <section className={classes.dataToShowContentContainer}>
              <h1 className={classes.dataToShowTitle}>
                {t("dashboardTab.subscriptionsSubTab.hasDataToShow.title")}
              </h1>

              <p className={classes.dataToShowDescription}>
                {t("dashboardTab.subscriptionsSubTab.hasDataToShow.description")}
              </p>

              <div className={classes.dataToShowSubscriptionsTable}>
                <SubscriptionsTable />
              </div>

              <div className={classes.addSubscriptionButtonContainer}>
                <Button
                  className={classes.addSubscriptionButton}
                  onClick={toggleModal}
                >
                  {t("dashboardTab.subscriptionsSubTab.hasNoDataToShow.buttonLabel")}
                </Button>
              </div>

              <div className={classes.infoBox}>
                <SportsSoccerRoundedIcon className={classes.infoBoxIcon} />

                <p className={classes.infoBoxText}>
                  <>{t("dashboardTab.subscriptionsSubTab.hasDataToShow.notificationTextPartOne")} &quot;</>
                  <a
                    href='https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/580517951/API+Subscriptions'
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    {t("dashboardTab.subscriptionsSubTab.hasDataToShow.notificationTextPartTwo")}
                  </a>
                  <>&quot;.</>
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
  );
};
