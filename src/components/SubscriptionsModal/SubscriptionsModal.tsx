import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useConfig, useTranslation, Button, Fade, MenuItem, Modal, Select, Typography, Icon, Box, Grid, useTheme } from "@apisuite/fe-base";
import CheckBoxOutlineBlankRoundedIcon from "@material-ui/icons/CheckBoxOutlineBlankRounded";
import CheckBoxRoundedIcon from "@material-ui/icons/CheckBoxRounded";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";

import { requestAPIAccess } from "store/applications/actions/requestApiAccess";
import { allUserAppsSelector, apisByNameSelector } from "pages/Subscriptions/selectors";

import { SubscriptionsModalProps } from "./types";
import useStyles from "./styles";
import { Logo } from "components/Logo";
import Notice from "components/Notice";

export const SubscriptionsModal: React.FC<SubscriptionsModalProps> = ({ isModalOpen, toggleModal }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const { t } = useTranslation();
  const { portalName, ownerInfo, clientName, navigation } = useConfig();
  // FIXME: unify these
  const apisByName = useSelector(apisByNameSelector);
  const allUserApps = useSelector(allUserAppsSelector);

  /* 'Client app' selection */

  const initialClientApp = {
    clientId: "",
    clientSecret: "",
    createdAt: "",
    description: "",
    id: "",
    logo: "",
    name: "",
    orgId: "",
    privacyUrl: "",
    redirectUrl: "",
    shortDescription: "",
    subscriptions: [],
    supportUrl: "",
    tosUrl: "",
    updatedAt: "",
    websiteUrl: "",
    youtubeUrl: "",
  };

  const [selectedClientApp, setSelectedClientApp] = React.useState(
    allUserApps.length === 1
      // If there's one single user app, we default the 'Client app' selection to it
      ? allUserApps[0]
      // If there's more than one single user app, we leave the 'Client app' selection up to the user
      : initialClientApp,
  );
  const [isClientAppSelected, setIsClientAppSelected] = React.useState(
    allUserApps.length === 1,
  );

  const handleClientAppSelection = (dataOfSelectedApp: any) => {
    setSelectedClientApp(dataOfSelectedApp);
    setIsClientAppSelected(true);
  };

  /* 'API product' selection */

  // const [selectedAPIProducts, setSelectedAPIProducts] = React.useState([])
  const [isAPIProductSelected, setIsAPIProductSelected] = React.useState(
    new Array(apisByName.length).fill(true),
  );

  /*
  TODO: Keep 'handleAPIProductsSelection' commented - for now, Koen wants all API Products to be selected by default.
  The selection and deselection features are to be added at a later date.
  */
  // const handleAPIProductsSelection = (dataOfSelectedAPIProduct: any, indexOfSelectedAPIProduct: number) => {
  //   const currentSelectionOfAPIProducts = [...selectedAPIProducts]
  //   const currentStateOfSelectedAPIProducts = [...isAPIProductSelected]

  //   // If there are API products that have already been selected, (...)
  //   if (currentSelectionOfAPIProducts.length > 0) {
  //     /* (...) we need to check if the currently selected API product is one that
  //     has already been previously selected, so as to handle selections and deselections. */
  //     const indexOfAPIProduct = currentSelectionOfAPIProducts.findIndex((apiProduct: any) => {
  //       return apiProduct.versions[0].id === dataOfSelectedAPIProduct.versions[0].id
  //     })

  //     // If the currently selected API product has NOT been selected yet, we handle its selection.
  //     if (indexOfAPIProduct === -1) {
  //       const newSelectionOfAPIProducts = currentSelectionOfAPIProducts.concat(dataOfSelectedAPIProduct)
  //       const newStateOfSelectedAPIProducts = currentStateOfSelectedAPIProducts
  //       newStateOfSelectedAPIProducts[indexOfSelectedAPIProduct] = true

  //       setSelectedAPIProducts(newSelectionOfAPIProducts)
  //       setIsAPIProductSelected(newStateOfSelectedAPIProducts)

  //       return
  //     }

  //     // If the currently selected API product has already been selected, we handle its deselection.
  //     currentSelectionOfAPIProducts.splice(indexOfSelectedAPIProduct, 1)
  //     const newSelectionOfAPIProducts = currentSelectionOfAPIProducts
  //     const newStateOfSelectedAPIProducts = currentStateOfSelectedAPIProducts
  //     newStateOfSelectedAPIProducts[indexOfSelectedAPIProduct] = false

  //     setSelectedAPIProducts(newSelectionOfAPIProducts)
  //     setIsAPIProductSelected(newStateOfSelectedAPIProducts)

  //     return
  //   }

  //   // If no API products have already been selected, (...)
  //   const newSelectionOfAPIProducts = currentSelectionOfAPIProducts.concat(dataOfSelectedAPIProduct)
  //   const newStateOfSelectedAPIProducts = currentStateOfSelectedAPIProducts
  //   newStateOfSelectedAPIProducts[indexOfSelectedAPIProduct] = true

  //   setSelectedAPIProducts(newSelectionOfAPIProducts)
  //   setIsAPIProductSelected(newStateOfSelectedAPIProducts)
  // }

  /* Selections reset */

  const resetModalSelections = () => {
    setSelectedClientApp(initialClientApp);
    setIsClientAppSelected(false);

    // setSelectedAPIProducts([])
    setIsAPIProductSelected(new Array(apisByName.length).fill(true));

    toggleModal();
  };

  /* 'API Product' access request */

  const handleAPIProductAccessRequest = () => {
    const idOfSelectedClientApp = Number(selectedClientApp.id);

    dispatch(requestAPIAccess({ appId: idOfSelectedClientApp }));
    resetModalSelections();
  };

  return (
    <Modal
      onClose={toggleModal}
      open={isModalOpen}
    >
      <Fade in={isModalOpen}>
        <div className={classes.modalContentsContainer}>
          {/* Modal header */}
          <div className={classes.modalHeaderContainer}>
            <div className={classes.logoAndNameContainer}>
              <Logo src={ownerInfo.logo} icon={navigation.title.iconFallbackName} />

              <Typography variant="h3">
                {portalName}
              </Typography>
            </div>

            <div
              className={classes.closeModalButtonContainer}
              onClick={resetModalSelections}
            >
              <Typography variant="body2">
                {t("dashboardTab.subscriptionsSubTab.subsModal.modalHeader.closeButtonLabel")}
              </Typography>

              <Icon>close</Icon>
            </div>
          </div>

          {/* Modal body */}
          <div className={classes.modalBodyContainer}>
            {/* Modal's title */}
            <Box clone mt={5}>
              <Typography variant="h3">
                {t("dashboardTab.subscriptionsSubTab.subsModal.modalBody.header")}
              </Typography>
            </Box>

            {/* 'Steps' section */}
            <ol className={classes.stepsContainer}>
              <Typography component="li" variant="body1">
                {t("dashboardTab.subscriptionsSubTab.subsModal.modalBody.steps.stepOne")}
              </Typography>
              <Typography component="li" variant="body1">
                {t("dashboardTab.subscriptionsSubTab.subsModal.modalBody.steps.stepTwo")}
              </Typography>
              <Typography component="li" variant="body1">
                {t("dashboardTab.subscriptionsSubTab.subsModal.modalBody.steps.stepThree")}
              </Typography>
              <Typography component="li" variant="body1">
                {t("dashboardTab.subscriptionsSubTab.subsModal.modalBody.steps.stepFour")}
              </Typography>
            </ol>

            <hr className={classes.sectionSeparator} />

            {/* 'Client applications' section */}
            <div className={classes.clientAppsContainer}>
              <div className={classes.clientAppSelectorContainer}>
                <Box clone mb={3}>
                  <Typography variant="h6">
                    {t("dashboardTab.subscriptionsSubTab.subsModal.modalBody.clientApps.title")}
                  </Typography>
                </Box>

                <Select
                  disableUnderline
                  displayEmpty
                  IconComponent={ExpandMoreRoundedIcon}
                  value={
                    selectedClientApp.id === ""
                      ? ""
                      : selectedClientApp.name
                  }
                >
                  <MenuItem disabled value=''>
                    {
                      allUserApps.length > 0
                        ? t("dashboardTab.subscriptionsSubTab.subsModal.modalBody.clientApps.selectorLabel.moreThanOneApp")
                        : t("dashboardTab.subscriptionsSubTab.subsModal.modalBody.clientApps.selectorLabel.noApps")
                    }
                  </MenuItem>

                  {
                    allUserApps.map((userApp, index) => {
                      return (
                        <MenuItem
                          key={`userApp${index}`}
                          onClick={() => handleClientAppSelection(userApp)}
                          value={userApp.name}
                        >
                          {userApp.name}
                        </MenuItem>
                      );
                    })
                  }
                </Select>
              </div>

              <div className={classes.clientAppNotificationContainer}>
                {/* TODO: bring back warning colors and icon */}
                <Notice
                  noticeIcon={<Icon>info</Icon>}
                  noticeText={
                    <Typography variant="body2" style={{ color: palette.info.contrastText }}>
                      {t(
                        !selectedClientApp.subscriptions.length ? "dashboardTab.subscriptionsSubTab.subsModal.modalBody.clientApps.infoBoxNotificationText" : "dashboardTab.subscriptionsSubTab.subsModal.modalBody.clientApps.warningBoxNotificationText",
                        { clientName },
                      )}
                    </Typography>
                  }
                />
              </div>
            </div>

            <hr className={classes.sectionSeparator} />

            {/* 'API product subscriptions' section */}
            <div className={classes.apiProductsSubsContainer}>
              <Grid container>
                <Grid item md>
                  <Typography variant="h6">
                    {t("dashboardTab.subscriptionsSubTab.subsModal.modalBody.apiProductSubsContainer.title")}
                  </Typography>
                </Grid>

                <Grid item md>
                  <Typography variant="body2" color="textSecondary">
                    {t("dashboardTab.subscriptionsSubTab.subsModal.modalBody.apiProductSubsContainer.subtitle")}
                  </Typography>
                </Grid>
              </Grid>

              <br />

              <div className={classes.apiProductsSubsTable}>
                <div className={classes.tableHeader}>
                  <Typography variant="body1">
                    <b>
                      {t("dashboardTab.subscriptionsSubTab.subsModal.modalBody.apiProductSubsContainer.apiProductsTable.title")}
                    </b>
                  </Typography>

                  <Typography variant="body1">
                    <b>
                      {t("dashboardTab.subscriptionsSubTab.subsModal.modalBody.apiProductSubsContainer.apiProductsTable.subtitle")}
                    </b>
                  </Typography>
                </div>

                <div className={classes.tableBody}>
                  {
                    apisByName.length > 0 && isClientAppSelected
                      ? (
                        apisByName.map((api, index) => {
                          return (
                            <div
                              className={
                                index % 2 === 0
                                  ? classes.regularAPIProductDetailsContainer
                                  : classes.alternativeAPIProductDetailsContainer
                              }
                              key={`apiProduct${index}`}
                            /*
                            TODO: Keep the call to 'handleAPIProductsSelection' commented - for now,
                            Koen wants all API Products to be selected by default. The selection and
                            deselection features are to be added at a later date.
                            */
                            // onClick={() => handleAPIProductsSelection(api, index)}
                            >
                              <Typography variant="body1">
                                {api.name}
                              </Typography>

                              <div className={classes.apiProductVersionAndSelectionContainer}>
                                <Typography variant="body1">
                                  {!!api.versions.length && api.versions[0].version}
                                </Typography>

                                <Box ml={1.5}>
                                  {
                                    isAPIProductSelected[index]
                                      ? <CheckBoxRoundedIcon className={classes.selectedAPIProduct} />
                                      : <CheckBoxOutlineBlankRoundedIcon className={classes.notSelectedAPIProduct} />
                                  }
                                </Box>
                              </div>
                            </div>
                          );
                        })
                      )
                      : (
                        <div className={classes.noAPIProductsToShow}>
                          <Typography variant="body1">Please, select an app</Typography>
                        </div>
                      )
                  }
                </div>
              </div>
            </div>

            <hr className={classes.sectionSeparator} />

            {/* 'Buttons' section */}
            <Grid container justify="space-between">
              <Grid item md={10}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  disableElevation
                  disabled={!!selectedClientApp.subscriptions.length || !selectedClientApp.id}
                  onClick={handleAPIProductAccessRequest}
                >
                  {
                    t("dashboardTab.subscriptionsSubTab.subsModal.modalBody.buttons.requestAccess")
                  }
                </Button>

                <Box clone mx={3}>
                  <Button
                    variant="outlined"
                    size="large"
                    href="/profile/organisation"
                  >
                    {t("dashboardTab.subscriptionsSubTab.subsModal.modalBody.buttons.reviewOrganisation")}
                  </Button>
                </Box>

                <Button
                  variant="outlined"
                  size="large"
                  disabled={!isClientAppSelected}
                  href={`/dashboard/apps/${selectedClientApp.id}`}
                >
                  {t("dashboardTab.subscriptionsSubTab.subsModal.modalBody.buttons.reviewApp")}
                </Button>
              </Grid>

              <Button
                variant="outlined"
                size="large"
                onClick={resetModalSelections}
              >
                {t("dashboardTab.subscriptionsSubTab.subsModal.modalBody.buttons.cancel")}
              </Button>
            </Grid>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};
