import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation, Button, InputBase, Box, Typography, Chip, useTheme, FormControlLabel, Checkbox } from "@apisuite/fe-base";

// TODO: Uncomment once this view does account for 'sandbox' accessible API products.
// import SubscriptionsRoundedIcon from '@material-ui/icons/SubscriptionsRounded'
import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import FilterListRoundedIcon from "@material-ui/icons/FilterListRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import apiProductCard from "assets/apiProductCard.svg";
import noAPIProducts from "assets/noAPIProducts.svg";

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

  // 'Latest API product update' section

  console.log("latestUpdatedAPI", latestUpdatedAPI);

  const generateLatestAPIProductContents = () => {
    return recentlyUpdatedAPIs.length ? (
      <>
        <Box mb={1}>
          <Typography variant="h3" style={{ color: palette.secondary.main, fontWeight: 500 }}>
            {latestUpdatedAPI.apiName}
          </Typography>
        </Box>

        <Box mb={3} style={{ alignItems: "center", display: "flex" }}>
          {
            latestUpdatedAPI.apiContract !== t("fallbacks.noContract") && (
              <>
                <Typography variant="h5" style={{ color: palette.secondary.main, fontWeight: 300, marginRight: spacing(2) }}>
                  {latestUpdatedAPI.apiContract}
                </Typography>

                <Chip
                  color="secondary"
                  label={latestUpdatedAPI.apiVersion}
                  size="small"
                  style={{ marginRight: spacing(1.5) }}
                  variant="outlined"
                />
              </>
            )
          }

          <Chip
            className={clsx({
              [classes.prodAccessibleChip]: latestUpdatedAPI.apiAccess,
              [classes.docsAccessibleChip]: !latestUpdatedAPI.apiAccess,
            })}
            label={
              latestUpdatedAPI.apiAccess ? t("apiProductsTab.productionAccess") : t("apiProductsTab.documentationAccess")
            }
            size="small"
          />
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
            auth.user && latestUpdatedAPI.apiContract === t("fallbacks.noContract") && (
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
    ) : (
      <Box mt={1.5} mb={15}>
        <Typography variant="h4" color="inherit">
          {t("apiProductsTab.noAPIProducts.comingSoon")}
        </Typography>
      </Box>
    );
  };

  // 'All API products' section  

  const [showFilters, setShowFilters] = useState(false);

  const generateAllAPIProductContents = () => {
    return recentlyUpdatedAPIs.length ? (
      <>
        <Box
          className={
            clsx(classes.filtersContainer, {
              [classes.showingFilters]: showFilters,
              [classes.notShowingFilters]: !showFilters,
            })
          }
        >
          <InputBase
            className={classes.textFilter}
            endAdornment={
              <SearchRoundedIcon />
            }
            onChange={(changeEvent) => handleAPIFiltering(changeEvent, undefined)}
            placeholder={t("apiProductsTab.textFilterPlaceholder")}
          />

          <Box
            style={{ alignItems: "center", display: "flex" }}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Box mr={1}>
              <FilterListRoundedIcon />
            </Box>

            <Box mr={1}>
              <Typography variant="h3" style={{ fontSize: 20, fontWeight: 300 }}>
                {t("apiProductsTab.filterBy")}
              </Typography>
            </Box>

            {
              showFilters
                ? <ExpandLessRoundedIcon />
                : <ExpandMoreRoundedIcon />
            }
          </Box>
        </Box>

        {
          showFilters && (
            <Box style={{ alignItems: "right", display: "flex", justifyContent: "flex-end" }} mb={3} mt={3}>
              <Box mr={1.5}>
                <FormControlLabel
                  className={
                    clsx({
                      [classes.activeFilter]: apiFilters[3],
                      [classes.inactiveFilter]: !apiFilters[3],
                    })
                  }
                  control={
                    <Checkbox
                      checked={apiFilters[3]}
                      name="documentationAccessible"
                      onChange={() => handleAPIFiltering(undefined, 3)}
                    />
                  }
                  label={t("apiProductsTab.apiProductButtons.tooltipLabels.documentationAccessible")}
                />
              </Box>

              <Box mr={1.5}>
                <FormControlLabel
                  className={
                    clsx({
                      [classes.activeFilter]: apiFilters[1],
                      [classes.inactiveFilter]: !apiFilters[1],
                    })
                  }
                  control={
                    <Checkbox
                      checked={apiFilters[1]}
                      name="productionAccessible"
                      onChange={() => handleAPIFiltering(undefined, 1)}
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
                      [classes.activeFilter]: apiFilters[3],
                      [classes.inactiveFilter]: !apiFilters[3],
                    })
                  }
                  control={
                    <Checkbox
                      checked={apiFilters[2]}
                      name="sandboxAccessible"
                      onChange={() => handleAPIFiltering(undefined, 2)}
                    />
                  }
                  label={t("apiProductsTab.apiProductButtons.tooltipLabels.sandboxAccessible")}
                />
              </Box> */}
            </Box>
          )
        }

        {!recentlyUpdatedAPIs.length && (
          <Typography align="center" variant="body1">
            {t("apiProductsTab.retrievingAPIProductMessage")}
          </Typography>
        )}

        {!!recentlyUpdatedAPIs.length && (
          <Box className={classes.apiCatalogContainer}>
            <APICatalog
              apisToDisplay={
                apiFilters[0].length === 0 && !apiFilters[1] && !apiFilters[2] && !apiFilters[3]
                  ? recentlyUpdatedAPIs : filteredAPIs}
            />
          </Box>
        )}
      </>
    ) : (
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
  };

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
    <main style={{ backgroundColor: palette.grey[100], paddingBottom: spacing(5) }}>
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

            {generateLatestAPIProductContents()}
          </Box>
        </PageContainer>
      </section>

      {/* 'All API products' section */}
      <Box my={5}>
        <PageContainer disablePaddingY>
          {generateAllAPIProductContents()}
        </PageContainer>
      </Box>

      <SubscriptionsModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
      />
    </main>
  );
};
