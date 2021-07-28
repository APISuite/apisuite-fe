import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation, Button, InputBase, Box, Typography, Chip, useTheme, Icon } from "@apisuite/fe-base";

// TODO: Uncomment once this view does account for 'sandbox' accessible API products.
// import SubscriptionsRoundedIcon from '@material-ui/icons/SubscriptionsRounded'
import ChromeReaderModeRoundedIcon from "@material-ui/icons/ChromeReaderModeRounded";
import PowerRoundedIcon from "@material-ui/icons/PowerRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import apiProductCard from "assets/apiProductCard.svg";

import { API_DOCS_CONTENT_TARGET } from "constants/global";
import APICatalog from "components/APICatalog";
import { APIDetails } from "components/APICatalog/types";
import { SubscriptionsModal } from "components/SubscriptionsModal";
import { getAPIs } from "store/subscriptions/actions/getAPIs";
import { getAllUserApps } from "store/applications/actions/getAllUserApps";
import { PageContainer } from "components/PageContainer";
import Link from "components/Link";

import useStyles from "./styles";
import { apiProductsSelector } from "./selector";

/* TODO: This view does NOT account for 'sandbox' accessible API products.
In the future, add logic for this kind of API product. */
export const APIProducts: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { auth, subscriptions } = useSelector(apiProductsSelector);
  const { palette } = useTheme();

  const initialAPIState: APIDetails = {
    apiAccess: false,
    apiContract: "",
    apiDescription: "",
    apiName: "",
    apiRoutingId: "",
    apiVersion: "",
    hasMoreDetails: false,
    id: 0,
  };

  const [recentlyUpdatedAPIs, setRecentlyUpdatedAPIs] = useState<APIDetails[]>([]);
  const [latestUpdatedAPI, setLatestUpdatedAPI] = useState(initialAPIState);

  useEffect(() => {
    /* Triggers the retrieval and storage (on the app's Store, under 'subscriptions')
    of all API-related information we presently have. */
    dispatch(getAPIs({}));
  }, [dispatch]);

  useEffect(() => {
    /* Triggers the retrieval and storage of all app-related information we presently
    have on a given user. */
    if (auth?.user) {
      dispatch(getAllUserApps({}));
    }
  }, [auth, dispatch]);

  useEffect(() => {
    /* Once 'subscriptions' info is made available, we process it so as to display it
    on our 'All API products' section. */
    const allAvailableAPIs = subscriptions.apis;

    if (allAvailableAPIs.length) {
      const newRecentlyUpdatedAPIs: APIDetails[] = allAvailableAPIs.map((api) => {
        return {
          /* An API that is 'live' (i.e., 'production accessible') is one that has versions, and has
          its 'live' property set to 'true'. Ones that do NOT meet any of the above criteria are ones
          that, presently, only have 'API Documentation' to show for it. */
          apiAccess: (api.apiVersions.length > 0 && api.apiVersions[0].live),
          apiContract: api.apiVersions.length ? api.apiVersions[0].title : t("fallbacks.noContract"),
          apiDescription: api?.docs?.find((x) => x.target === API_DOCS_CONTENT_TARGET.PRODUCT_INTRO)?.info || t("fallbacks.noDescription"),
          apiName: api.name,
          // Used to link an 'API Catalog' entry to its corresponding 'API Details' view.
          apiRoutingId: api.apiVersions.length ? `${api.apiVersions[0].id}` : "",
          apiVersion: api.apiVersions.length ? api.apiVersions[0].version : t("fallbacks.noVersion"),
          /* Determines if an 'API Catalog' entry will be clickable, and link to its corresponding
          'API Details' view. For the time being, an 'API Catalog' entry should be clickable and
          link to its corresponding 'API Details' view if it has versions. */
          hasMoreDetails: api.apiVersions.length > 0,
          id: api.apiVersions.length ? api.apiVersions[0].apiId : api.id,
        };
      });

      setRecentlyUpdatedAPIs(newRecentlyUpdatedAPIs);
      setLatestUpdatedAPI(newRecentlyUpdatedAPIs[0]);
    }
  }, [subscriptions]);

  // API filtering logic

  const [filteredAPIs, setFilteredAPIs] = useState<any[]>([]);
  const [apiFilters, setAPIFilters] = useState<any[]>(["", false, false, false]);

  const handleAPIFiltering = (
    changeEvent?: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    buttonFilterIndex?: number,
  ) => {
    const apisToFilter: APIDetails[] = recentlyUpdatedAPIs;
    let newFilteredAPIs: APIDetails[] = [];
    const newAPIFilters = apiFilters;

    // Filtering by access type
    let productionAccessibleAPIs: APIDetails[] = [];
    const sandboxAccessibleAPIs: APIDetails[] = [];
    let documentationAccessibleAPIs: APIDetails[] = [];

    if (buttonFilterIndex) {
      if (newAPIFilters[buttonFilterIndex] === false) {
        newAPIFilters[buttonFilterIndex] = true;
      } else {
        newAPIFilters[buttonFilterIndex] = false;
      }
    }

    if (newAPIFilters[1]) {
      productionAccessibleAPIs = apisToFilter.filter((api) => {
        return api.apiAccess === true;
      });
    }

    if (newAPIFilters[2]) {
      /* TODO: Fully handle this case once we have the means to
      determine if a particular API product is 'sandbox' accessible. */
    }

    if (newAPIFilters[3]) {
      documentationAccessibleAPIs = apisToFilter.filter((api) => {
        return api.apiAccess === false;
      });
    }

    newFilteredAPIs = newFilteredAPIs.concat(
      productionAccessibleAPIs,
      sandboxAccessibleAPIs,
      documentationAccessibleAPIs,
    );

    // Filtering by name

    let textFilterContents = apiFilters[0];

    if (changeEvent) {
      textFilterContents = changeEvent?.target.value;

      newAPIFilters[0] = textFilterContents;
    }

    if (newFilteredAPIs.length) {
      newFilteredAPIs = newFilteredAPIs.filter((api) => {
        return api.apiName.toLowerCase().includes(textFilterContents.toLowerCase());
      });
    } else {
      newFilteredAPIs = apisToFilter.filter((api) => {
        return api.apiName.toLowerCase().includes(textFilterContents.toLowerCase());
      });
    }

    setFilteredAPIs(newFilteredAPIs);
    setAPIFilters(newAPIFilters);
  };

  /* Modal stuff */

  const [isModalOpen, setModalOpen] = React.useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <main>
      {/* 'Latest API product update' section */}
      <section className={classes.latestAPIProductUpdateSection}>
        <PageContainer disablePaddingY display="flex" position="relative">
          <img
            className={classes.latestAPIProductImage}
            src={apiProductCard}
          />

          <Box width={800} />

          <Box
            display="flex"
            flexDirection="column"
            maxWidth={560}
            width="100%"
            style={{ color: palette.common.white }}
          >
            <Typography variant="body1" color="inherit">
              <b>{t("apiProductsTab.latestAPIProductTitle")}</b>
            </Typography>

            <Box mt={1.5} mb={3}>
              <Typography variant="h4" color="inherit">
                {latestUpdatedAPI.apiName} &nbsp;
                <Chip label={latestUpdatedAPI.apiVersion} color="secondary" />
              </Typography>
            </Box>

            <div className={classes.apiProductButtons}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                disableElevation
                href={
                  (latestUpdatedAPI.id && latestUpdatedAPI.apiRoutingId)
                    ? `/api-products/details/${latestUpdatedAPI.id}/spec/${latestUpdatedAPI.apiRoutingId}`
                    : "#"
                }
              >
                {t("apiProductsTab.apiProductButtons.viewDetailsButtonLabel")}
              </Button>

              {
                auth.user && (
                  <Box clone ml={1}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="large"
                      onClick={toggleModal}
                    >
                      {t("apiProductsTab.apiProductButtons.subscribeButtonLabel")}
                    </Button>
                  </Box>
                )
              }
            </div>

            <Box
              display="flex"
              alignItems="center"
              height={50}
            >
              {auth.user && (
                <>
                  <Icon fontSize="small">circle</Icon>

                  &nbsp;

                  <Typography variant="body2" color="secondary">
                    {
                      latestUpdatedAPI.apiAccess
                        ? t("apiProductsTab.productionAccess")
                        : t("apiProductsTab.documentationAccess")
                    }
                  </Typography>
                </>
              )}

              {!auth.user &&(
                <Typography variant="body1">
                  <Link to="/auth/signup">
                    {t("apiProductsTab.registerForMoreMessage")}
                  </Link>
                </Typography>
              )}
            </Box>
          </Box>
        </PageContainer>
      </section>

      {/* 'All API products' section */}
      <Box my={5}>
        <PageContainer disablePaddingY>
          <div className={classes.filtersContainer}>
            <InputBase
              className={classes.textFilter}
              endAdornment={
                <SearchRoundedIcon />
              }
              onChange={(changeEvent) => handleAPIFiltering(changeEvent, undefined)}
              placeholder={t("apiProductsTab.textFilterPlaceholder")}
            />

            <div
              className={
                apiFilters[1]
                  ? classes.activeFilterButtonContainer
                  : classes.inactiveFilterButtonContainer
              }
              onClick={() => handleAPIFiltering(undefined, 1)}
              title={t("apiProductsTab.apiProductButtons.tooltipLabels.productionAccessible")}
            >
              <PowerRoundedIcon
                className={
                  apiFilters[1]
                    ? classes.activeProductionAccessFilterButtonIcon
                    : classes.inactiveFilterButtonIcon
                }
              />
            </div>

            <div
              className={
                apiFilters[3]
                  ? (
                    `${classes.activeFilterButtonContainer} ${classes.lastFilterButtonContainer}`
                  )
                  : (
                    `${classes.inactiveFilterButtonContainer} ${classes.lastFilterButtonContainer}`
                  )
              }
              onClick={() => handleAPIFiltering(undefined, 3)}
              title={t("apiProductsTab.apiProductButtons.tooltipLabels.documentationAccessible")}
            >
              <ChromeReaderModeRoundedIcon
                className={
                  apiFilters[3]
                    ? classes.activeDocumentationAccessFilterButtonIcon
                    : classes.inactiveFilterButtonIcon
                }
              />
            </div>
          </div>

          {!recentlyUpdatedAPIs.length && (
            <Typography variant="body1" align="center">
              {t("apiProductsTab.retrievingAPIProductMessage")}
            </Typography>
          )}

          {!!recentlyUpdatedAPIs.length && (
            <div className={classes.apiCatalogContainer}>
              <APICatalog
                apisToDisplay={
                  apiFilters[0].length === 0 && !apiFilters[1] && !apiFilters[2] && !apiFilters[3]
                    ? recentlyUpdatedAPIs : filteredAPIs}
              />
            </div>
          )}
        </PageContainer>
      </Box>

      <SubscriptionsModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
      />
    </main>
  );
};
