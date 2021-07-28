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
                      <Tag color={tagColor} v={apiDetails.apiVersion} />

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
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
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
