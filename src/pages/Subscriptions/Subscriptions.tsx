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
import { profileSelector } from "pages/Profile/selectors";
import { PageContainer } from "components/PageContainer";
import Notice from "components/Notice";
import { useHistory } from "react-router-dom";

export const Subscriptions: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history: any = useHistory();
  const { palette } = useTheme();
  const { t } = useTranslation();
  const { auth, subscriptions } = useSelector(subscriptionsSelector);
  const { profile } = useSelector(profileSelector);

  /* Retrieval of our APIs' data */

  useEffect(() => {
    /* Triggers the retrieval and storage of all API and app-related information
    we presently have. Once this is done, the 'SubscriptionsTable' component will
    have all the information it needs. */
    if (auth.user) {
      dispatch(getAPIs({}));
      dispatch(getAllUserApps({ orgID: profile.current_org.id }));
    }
  }, [auth.user, dispatch, profile]);

  /* Modal stuff */

  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    /*
    If the modal is open and the user's trying to close it, we:
      1. Check if the user's been redirected from the 'API Product details' view
      (something we can determine through the history's state).

      2. Push the user back to that 'API Product details' view using the history's state.
    */
    if (
      isModalOpen &&
      history.location.state?.redirected &&
      (history.location.state?.apiID && history.location.state?.apiVersionID)
    ) {
      history.push(
        `/api-products/details/${history.location.state?.apiID}/spec/${history.location.state?.apiVersionID}`
      );

      return;
    }

    setModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (history.location.state?.appID) {
      toggleModal();
    }
  }, [history.location.state?.appID]);

  return (
    <>
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
      </PageContainer>

      <SubscriptionsModal
        // 'appID' is passed along to the 'SubscriptionsModal' component if the user is redirected from someplace else
        appID={history.location.state?.redirected ? history.location.state?.appID : ""}
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
      />
    </>
  );
};
