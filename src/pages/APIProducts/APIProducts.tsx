import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation, Button, InputBase, Box, Typography, Chip, useTheme, FormControlLabel, Checkbox, Icon } from "@apisuite/fe-base";

import apiProductCard from "assets/apiProductCard.svg";
import noAPIProducts from "assets/noAPIProducts.svg";
import { API_DOCS_CONTENT_TARGET, Filter } from "constants/global";
import { APIDetails } from "components/APICatalog/types";
import { PageContainer } from "components/PageContainer";
import { SubscriptionsModal } from "components/SubscriptionsModal";
import APICatalog from "components/APICatalog";
import Link from "components/Link";
import { getAllUserApps } from "store/applications/actions/getAllUserApps";
import { getAPIs } from "store/subscriptions/actions/getAPIs";
import { APIFilters } from "./types";
import useStyles from "./styles";
import { apiProductsSelector } from "./selector";
import { profileSelector } from "pages/Profile/selectors";
import clsx from "clsx";

/* TODO: This view does NOT account for 'sandbox' accessible API products.
In the future, add logic for this kind of API product. */
export const APIProducts: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { auth, subscriptions } = useSelector(apiProductsSelector);
  const { profile } = useSelector(profileSelector);
  const { palette, spacing } = useTheme();

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
      dispatch(getAllUserApps({ orgID: profile.current_org.id }));
    }
  }, [auth, dispatch, profile]);

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
          apiContract: api.apiVersions.length ? api.apiVersions[0].title : null,
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

  // 'Latest API product update' section

  const generateLatestAPIProductContents = (
    apiDetails: APIDetails[],
    mostRecentAPI: APIDetails
  ) => {
    if (!apiDetails.length) {
      return (
        <Box mt={1.5} mb={15}>
          <Typography variant="h4" color="inherit">
            {t("apiProductsTab.noAPIProducts.comingSoon")}
          </Typography>
        </Box>
      );
    }

    return (
      <>
        <Box mb={1}>
          <Typography variant="h3" style={{ color: palette.secondary.main, fontWeight: 500 }}>
            {mostRecentAPI.apiName}
          </Typography>
        </Box>
  
        <Box mb={3} style={{ alignItems: "center", display: "flex" }}>
          {
            mostRecentAPI.apiContract && (
              <>
                <Typography variant="h5" style={{ color: palette.secondary.main, fontWeight: 300, marginRight: spacing(2) }}>
                  {mostRecentAPI.apiContract}
                </Typography>
  
                <Chip
                  color="secondary"
                  label={mostRecentAPI.apiVersion}
                  size="small"
                  style={{ marginRight: spacing(1.5) }}
                  variant="outlined"
                />
              </>
            )
          }
  
          <Chip
            className={clsx({
              [classes.prodAccessibleChip]: mostRecentAPI.apiAccess,
              [classes.docsAccessibleChip]: !mostRecentAPI.apiAccess,
            })}
            label={
              mostRecentAPI.apiAccess ? t("apiProductsTab.productionAccess") : t("apiProductsTab.documentationAccess")
            }
            size="small"
          />
        </Box>
  
        <div className={classes.apiProductButtons}>
          <Button
            color="primary"
            disabled={!(mostRecentAPI.id && mostRecentAPI.apiRoutingId)}
            disableElevation
            href={`/api-products/details/${mostRecentAPI.id}/spec/${mostRecentAPI.apiRoutingId}`}
            size="large"
            variant="contained"
          >
            {t("apiProductsTab.apiProductButtons.viewDetailsButtonLabel")}
          </Button>
  
          {
            auth.user && mostRecentAPI.apiContract && (
              <Box clone ml={1}>
                <Button
                  onClick={toggleModal}
                  size="large"
                  style={{
                    backgroundColor: palette.common.white,
                    border: "none",
                    outline: `1px solid ${palette.secondary.main}`,
                  }}
                  variant="outlined"
                >
                  {t("apiProductsTab.apiProductButtons.subscribeButtonLabel")}
                </Button>
              </Box>
            )
          }
        </div>
      </>
    );
  };

  // 'All API products' section  

  const [showFilters, setShowFilters] = useState(false);

  const generateAllAPIProductContents = (
    apiDetails: APIDetails[],
    displayFilters: boolean,
    apiFiltersStatus: APIFilters,
  ) => {
    if (!apiDetails.length) {
      return (
        <Box m='auto' textAlign='center' width={675}>
          <Box mt={9.125}>
            <img
              className={classes.noAPIProductsIllustration}
              src={noAPIProducts}
            />
          </Box>

          <Box mt={4}>
            <Typography style={{ color: palette.action.active }} variant="h3">
              {t("apiProductsTab.noAPIProducts.text")}
            </Typography>
          </Box>

          <Box mt={3}>
            <Typography style={{ color: palette.text.primary }} variant="body1">
              {t("apiProductsTab.noAPIProducts.subText")}
            </Typography>
          </Box>

          <Box mb={12.5} mt={5}>
            <Typography variant="body1">
              <Link
                className={classes.documentationLink}
                to="/documentation"
              >
                {t("apiProductsTab.noAPIProducts.documentationButtonLabel")}
              </Link>
            </Typography>
          </Box>
        </Box>
      );
    }

    return (
      <>
        <Box
          className={
            clsx(classes.filtersContainer, {
              [classes.showingFilters]: displayFilters,
              [classes.notShowingFilters]: !displayFilters,
            })
          }
        >
          <InputBase
            className={classes.textFilter}
            endAdornment={
              <Icon>search</Icon>
            }
            onChange={(changeEvent) => handleAPIFiltering(changeEvent)}
            placeholder={t("apiProductsTab.textFilterPlaceholder")}
          />

          <Box
            style={{ alignItems: "center", display: "flex" }}
            onClick={() => setShowFilters(!displayFilters)}
          >
            <Box mr={1}>
              <Icon>filter_list</Icon>
            </Box>

            <Box mr={1}>
              <Typography variant="h3" style={{ fontSize: 20, fontWeight: 300 }}>
                {t("apiProductsTab.filterBy")}
              </Typography>
            </Box>

            {
              displayFilters
                ? <Icon>expand_less</Icon>
                : <Icon>expand_more</Icon>
            }
          </Box>
        </Box>

        {
          displayFilters && (
            <Box style={{ alignItems: "right", display: "flex", justifyContent: "flex-end" }} mb={3} mt={3}>
              <Box mr={1.5}>
                <FormControlLabel
                  className={
                    clsx({
                      [classes.activeFilter]: apiFiltersStatus.docs,
                      [classes.inactiveFilter]: !apiFiltersStatus.docs,
                    })
                  }
                  control={
                    <Checkbox
                      checked={!!apiFiltersStatus.docs}
                      name="documentationAccessible"
                      onChange={() => handleAPIFiltering(undefined, Filter.docs)}
                    />
                  }
                  label={t("apiProductsTab.apiProductButtons.tooltipLabels.documentationAccessible")}
                />
              </Box>

              <Box mr={1.5}>
                <FormControlLabel
                  className={
                    clsx({
                      [classes.activeFilter]: apiFiltersStatus.prod,
                      [classes.inactiveFilter]: !apiFiltersStatus.prod,
                    })
                  }
                  control={
                    <Checkbox
                      checked={!!apiFiltersStatus.prod}
                      name="productionAccessible"
                      onChange={() => handleAPIFiltering(undefined, Filter.prod)}
                    />
                  }
                  label={t("apiProductsTab.apiProductButtons.tooltipLabels.productionAccessible")}
                />
              </Box>

              {/*
              TODO: Uncomment once we have sandbox accessible API Products
              <Box mr={3}>
                <FormControlLabel
                  className={
                    clsx({
                      [classes.activeFilter]: apiFiltersStatus.sandbox,
                      [classes.inactiveFilter]: !apiFiltersStatus.sandbox,
                    })
                  }
                  control={
                    <Checkbox
                      checked={!!apiFiltersStatus.sandbox}
                      name="sandboxAccessible"
                      onChange={() => handleAPIFiltering(undefined, Filter.sandbox)}
                    />
                  }
                  label={t("apiProductsTab.apiProductButtons.tooltipLabels.sandboxAccessible")}
                />
              </Box> */}
            </Box>
          )
        }

        {!apiDetails.length && (
          <Typography align="center" variant="body1">
            {t("apiProductsTab.retrievingAPIProductMessage")}
          </Typography>
        )}

        {!!apiDetails.length && (
          <Box className={classes.apiCatalogContainer}>
            <APICatalog
              apisToDisplay={
                (
                  apiFiltersStatus.text.length ||
                  apiFiltersStatus.prod ||
                  apiFiltersStatus.sandbox ||
                  apiFiltersStatus.docs
                )
                  ? filteredAPIs
                  : apiDetails
              }
            />
          </Box>
        )}
      </>
    );
  };

  // API filtering logic

  const [filteredAPIs, setFilteredAPIs] = useState<any[]>([]);
  const [apiFilters, setAPIFilters] = useState<APIFilters>({
    text: "",
    prod: false,
    sandbox: false,
    docs: false,
  });

  const handleAPIFiltering = (
    changeEvent?: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    buttonFilter?: Filter.prod | Filter.sandbox | Filter.docs,
  ) => {
    const apisToFilter: APIDetails[] = recentlyUpdatedAPIs;
    let newFilteredAPIs: APIDetails[] = [];
    const newAPIFilters: APIFilters = apiFilters;

    // Filtering by access type
    let productionAccessibleAPIs: APIDetails[] = [];
    const sandboxAccessibleAPIs: APIDetails[] = [];
    let documentationAccessibleAPIs: APIDetails[] = [];

    if (buttonFilter) {
      newAPIFilters[buttonFilter] = !newAPIFilters[buttonFilter];
    }
    
    if (newAPIFilters.prod) {
      productionAccessibleAPIs = apisToFilter.filter((api) => {
        return api.apiAccess === true;
      });
    }

    if (newAPIFilters.sandbox) {
      /* TODO: Fully handle this case once we have the means to
      determine if a particular API product is 'sandbox' accessible. */
    }

    if (newAPIFilters.docs) {
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

    let textFilterContents = apiFilters.text;

    if (changeEvent) {
      textFilterContents = changeEvent?.target.value;

      newAPIFilters.text = textFilterContents;
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
    <main style={{ backgroundColor: palette.grey[100], height: "100%", paddingBottom: spacing(5) }}>
      {/* 'Latest API product update' section */}
      <section className={classes.latestAPIProductUpdateSection}>
        <PageContainer disablePaddingY display="flex" position="relative">
          <img
            className={classes.latestAPIProductImage}
            src={apiProductCard}
          />

          <Box
            display="flex"
            flexDirection="column"
            maxWidth={560}
            style={{ transform: "translateX(350px)" }}
            width="100%"
          >
            <Typography variant="caption" style={{ color: palette.secondary.main, fontWeight: 700 }}>
              <b>{t("apiProductsTab.latestAPIProductTitle")}</b>
            </Typography>

            {generateLatestAPIProductContents(recentlyUpdatedAPIs, latestUpdatedAPI)}
          </Box>
        </PageContainer>
      </section>

      {/* 'All API products' section */}
      <Box my={5}>
        <PageContainer disablePaddingY>
          {generateAllAPIProductContents(recentlyUpdatedAPIs, showFilters, apiFilters)}
        </PageContainer>
      </Box>

      <SubscriptionsModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
      />
    </main>
  );
};
