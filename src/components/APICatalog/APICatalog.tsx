import React from "react";
import { useHistory } from "react-router";
import { Avatar, Box, Chip, Grid, Typography, useTheme, useTranslation } from "@apisuite/fe-base";

import { ApplicationCard } from "components/ApplicationCard/ApplicationCard";
import useStyles from "./styles";
import { APICatalogProps, APIDetails } from "./types";

import { testIds } from "testIds";
import clsx from "clsx";

const APICatalog: React.FC<APICatalogProps> = ({ apisToDisplay, limit }) => {
  const classes = useStyles();
  const { palette, spacing } = useTheme();

  const history = useHistory();

  const { t } = useTranslation();

  const handleOnCardClick = (details: APIDetails) => () => {
    history.push(`/api-products/details/${details.id}/spec/${details.routingId || 0}`);
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

        return (
          <Grid
            data-test-id={testIds.apiCatalogCard}
            item
            key={apiDetails.id}
            xs={6}
          >
            <ApplicationCard
              className={classes.card}
              onClick={handleOnCardClick(apiDetails)}
            >
              <Grid container>
                <Grid
                  data-test-id={testIds.apiCardAvatar}
                  component={Box}
                  item
                  xs={1}
                >
                  <Avatar
                    classes={{
                      colorDefault: apiDetails.access
                        ? classes.colorsOfProductionAPI
                        : classes.colorsOfAPIDocumentation,
                    }}
                  >
                    <Typography variant="body1" style={{ fontWeight: 300 }}>
                      {apiDetails.name.slice(0, 2)}
                    </Typography>
                  </Avatar>
                </Grid>

                <Grid
                  component={Box}
                  item
                  pl={2}
                  xs={11}
                >
                  <Typography data-test-id={testIds.apiCardName} variant="h5" style={{ fontWeight: 300 }}>
                    {apiDetails.name}
                  </Typography>

                  {
                    apiDetails.contract && (
                      <Typography variant="h6">
                        {apiDetails.contract}
                      </Typography>
                    )
                  }

                  <Box my={1.5} style={{ display: "flex" }}>
                    {
                      apiDetails.contract &&
                        (
                          <Chip
                            data-test-id={testIds.apiCardVersion}
                            color="secondary"
                            label={apiDetails.version || t("fallbacks.noVersion")}
                            size="small"
                            style={{ marginRight: spacing(1.5) }}
                            variant="outlined"
                          />
                        )
                    }

                    <Chip
                      data-test-id={testIds.apiCardAccessType}
                      className={clsx({
                        [classes.prodChip]: apiDetails.access,
                        [classes.docsChip]: !apiDetails.access,
                      })}
                      label={
                        apiDetails.access
                          ? t("sandboxPage.apiCatalog.productionAccess")
                          : t("sandboxPage.apiCatalog.documentationAccess")
                      }
                      size="small"
                    />
                  </Box>

                  <Typography
                    data-test-id={testIds.apiCardDescription}
                    noWrap
                    style={{ color: palette.text.secondary }}
                    variant="body2"
                  >
                    {apiDetails.description || t("fallbacks.noDescription")}
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
