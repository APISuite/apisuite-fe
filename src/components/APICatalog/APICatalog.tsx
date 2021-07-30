import React from "react";
import { useHistory } from "react-router";
import { Avatar, Box, Chip, Grid, Typography, useTranslation } from "@apisuite/fe-base";

import { ApplicationCard } from "components/ApplicationCard/ApplicationCard";
import useStyles from "./styles";
import { APICatalogProps, APIDetails } from "./types";

import { testIds } from "testIds";

const APICatalog: React.FC<APICatalogProps> = ({ apisToDisplay, limit }) => {
  const classes = useStyles();

  const history = useHistory();

  const { t } = useTranslation();

  const handleOnCardClick = (details: APIDetails) => () => {
    history.push(`/api-products/details/${details.id}/spec/${details.apiRoutingId || 0}`);
  };

  return (
    <Grid
      component={Box}
      container
      spacing={3}
      justifyContent="space-between"
    >
      {apisToDisplay.slice(0, limit).map((apiDetails) => {
        if (!apiDetails) return null;

        const chipColor = apiDetails.apiAccess ? "primary" : "secondary";

        return (
          <Grid
            data-test-id={testIds.apiCatalogCard}
            item
            key={apiDetails.id}
            xs={6}
          >
            <ApplicationCard className={classes.card} onClick={handleOnCardClick(apiDetails)}>
              <Grid container>
                <Grid
                  data-test-id={testIds.apiCardAvatar}
                  component={Box}
                  item
                  xs={1}
                >
                  <Avatar
                    classes={{
                      colorDefault: apiDetails.apiAccess
                        ? classes.colorsOfProductionAPI : classes.colorsOfAPIDocumentation,
                    }}
                  >
                    {apiDetails.apiName.slice(0, 2)}
                  </Avatar>
                </Grid>

                <Grid
                  component={Box}
                  item
                  pl={2}
                  pt={1}
                  xs={11}
                >
                  <Typography data-test-id={testIds.apiCardName} variant="h5">
                    {apiDetails.apiName}
                  </Typography>

                  <Typography variant="body1">
                    {apiDetails.apiContract}
                  </Typography>

                  <Box mb={1.5} mt={1}>
                    <Typography variant="subtitle1">
                      <Chip data-test-id={testIds.apiCardVersion} color={chipColor} label={apiDetails.apiVersion} />

                      <Box data-test-id={testIds.apiCardAccessType} component="span" ml={1}>
                        {
                          apiDetails.apiAccess
                            ? t("sandboxPage.apiCatalog.productionAccess")
                            : t("sandboxPage.apiCatalog.documentationAccess")
                        }
                      </Box>
                    </Typography>
                  </Box>

                  <Typography
                    data-test-id={testIds.apiCardDescription}
                    noWrap
                    variant="subtitle1"
                  >
                    {apiDetails.apiDescription}
                  </Typography>
                </Grid>
              </Grid>
            </ApplicationCard>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default APICatalog;
