import React from "react";
import { Box, Chip, Grid, Typography, useTheme, useTranslation } from "@apisuite/fe-base";
import clsx from "clsx";

import { APIProductBannerProps } from "./types";
import useStyles from "./styles";

export const APIProductBanner: React.FC<APIProductBannerProps> = ({
  currentAPIDetails,
}) => {
  const classes = useStyles();
  const { palette } = useTheme();

  const [t] = useTranslation();

  return (
    <Box style={{ backgroundColor: palette.background.default }}>
      <Box
        className={
          clsx(classes.backgroundBanner, {
            [classes.prodAccessibleAPIProductBanner]: currentAPIDetails.version?.live,
            [classes.docsAccessibleAPIProductBanner]: !currentAPIDetails.version?.live,
          })
        }
      >
        <Box className={classes.bannerContentContainer}>
          <Box mb={1.25}>
            <Typography display="block" variant="h3" style={{ color: palette.text.primary }}>
              {currentAPIDetails.name}
            </Typography>
          </Box>

          {
            currentAPIDetails.version?.title && (
              <Box mb={1.25}>
                <Typography display="block" style={{ color: palette.text.primary, fontWeight: 300 }} variant="h5">
                  {currentAPIDetails.version.title}
                </Typography>
              </Box>
            )
          }

          <Grid container>
            {
              currentAPIDetails.version?.version && (
                <Grid item>
                  <Box mr={1.25}>
                    <Chip color="secondary" label={currentAPIDetails.version.version} size="small" />
                  </Box>
                </Grid>
              )
            }

            <Grid item>
              <Box>
                <Chip
                  className={currentAPIDetails.version?.live ? classes.prodChip : classes.docsChip}
                  label={
                    currentAPIDetails.version?.live
                      ? t("apiProductDetails.productionAccess")
                      : t("apiProductDetails.documentationAccess")
                  }
                  size="small"
                />
              </Box>
            </Grid>
          </Grid>

          <Box mt={1.25}>
            {/* TODO: According to the design team, this is to be provided by an Admin
            once a 'Description' field is made available in the 'Admin area'. */}

            {/*
              <Typography display="block" style={{ fontWeight: 300 }} variant="body1">
              Description support coming soon!
              </Typography>
            */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
