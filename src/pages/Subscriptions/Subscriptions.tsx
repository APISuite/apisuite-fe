import React, { useEffect, useState } from "react";
import { useTranslation, Button, Typography, Box, Icon, Trans, useTheme } from "@apisuite/fe-base";

import { getAPIs } from "store/subscriptions/actions/getAPIs";
import { getAllUserApps } from "store/applications/actions/getAllUserApps";
import Link from "components/Link";
import { SubscriptionsModal } from "components/SubscriptionsModal";
import { SubscriptionsTable } from "components/SubscriptionsTable";
import rocket from "assets/rocket.svg";

import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { subscriptionsSelector } from "./selectors";
import { PageContainer } from "components/PageContainer";
import Notice from "components/Notice";

export const Subscriptions: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { palette } = useTheme();
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
    <PageContainer>
      {
        subscriptions.apis.length === 0
          ? (
            <Box display="flex" alignItems="center" flexDirection="column">
              <div className={classes.noDataToShowImageContainer}>
                <img className={classes.noDataToShowImage} src={rocket} />
              </div>

              <Button
                variant="contained"
                color="primary"
                size="large"
                disableElevation
                onClick={toggleModal}
              >
                {t("dashboardTab.subscriptionsSubTab.hasNoDataToShow.buttonLabel")}
              </Button>

              <Box pt={2}>
                <Typography variant="body1" style={{ color: palette.text.secondary }}>
                  <Link
                    to='https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/580517951/API+Subscriptions'
                  >
                    {t("dashboardTab.subscriptionsSubTab.hasNoDataToShow.linkText")}
                  </Link>
                </Typography>
              </Box>
            </Box>
          )
          : (
            <>
              <Typography variant="h2">
                {t("dashboardTab.subscriptionsSubTab.hasDataToShow.title")}
              </Typography>

              <Box mt={1.5}>
                <Typography variant="body1" color="textSecondary">
                  {t("dashboardTab.subscriptionsSubTab.hasDataToShow.description")}
                </Typography>
              </Box>

              <Box
                my={4}
                display="flex"
                flexDirection="row"
              >
                <SubscriptionsTable />
              </Box>

              <Button
                variant="contained"
                color="primary"
                size="large"
                disableElevation
                onClick={toggleModal}
              >
                {t("dashboardTab.subscriptionsSubTab.hasNoDataToShow.buttonLabel")}
              </Button>

              <Box mt={5}>
                <Notice
                  noticeIcon={<Icon>support</Icon>}
                  noticeText={
                    <Typography variant="body2" align="center" style={{ color: palette.info.contrastText }}>
                      <Trans i18nKey="dashboardTab.subscriptionsSubTab.hasDataToShow.notificationText">
                        {[
                          <Link
                            key="dashboardTab.subscriptionsSubTab.hasDataToShow.notificationText"
                            to="https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/580517951/API+Subscriptions"
                            rel='noopener noreferrer'
                            target='_blank'
                          />,
                        ]}
                      </Trans>
                    </Typography>
                  }
                />
              </Box>
            </>
          )
      }

      {isModalOpen && (
        <SubscriptionsModal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
        />
      )}
    </PageContainer>
  );
};
