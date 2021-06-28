import React from "react";
import { useHistory } from "react-router";
import { Avatar, Box, Grid, Typography, useTheme, useTranslation } from "@apisuite/fe-base";

import { Tag } from "components/Tag";
import { ApplicationCard } from "components/ApplicationCard/ApplicationCard";
import useStyles from "./styles";
import { APICatalogProps, APIDetails } from "./types";

import { testIds } from "testIds";

const APICatalog: React.FC<APICatalogProps> = ({ apisToDisplay, limit }) => {
  const classes = useStyles();
  const { palette } = useTheme();
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

        const tagColor = apiDetails.apiAccess ? palette.primary.main : palette.secondary.light;

        return (
          <Grid
            data-test-id={testIds.apiCatalogCard}
            item
            key={apiDetails.id}
            xs={6}
          >
            <ApplicationCard className={classes.card} onClick={handleOnCardClick(apiDetails)}>
              <Grid
                component={Box}
                data-test-id={testIds.apiCardAvatar}
                item
                xs={2}
                pl={2}
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
                xs={10}
                pt={1}
                pl={2}
              >
                <Typography data-test-id={testIds.apiCardName} variant="h5" gutterBottom>
                  {apiDetails.apiName}
                </Typography>

                <Typography variant="subtitle1" gutterBottom>
                  <Tag v={apiDetails.apiVersion} color={tagColor}/>
                  {
                    apiDetails.apiAccess
                      ? <span data-test-id={testIds.apiCardAccessType}>{t("sandboxPage.apiCatalog.productionAccess")}</span>
                      : <span data-test-id={testIds.apiCardAccessType}>{t("sandboxPage.apiCatalog.documentationAccess")}</span>
                  }
                </Typography>

                <Box
                  maxHeight={50}
                  overflow="hidden"
                  clone
                >
                  <Typography data-test-id={testIds.apiCardDescription} variant="subtitle1">
                    {apiDetails.apiDescription}
                  </Typography>
                </Box>
              </Grid>
            </ApplicationCard>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default APICatalog;
