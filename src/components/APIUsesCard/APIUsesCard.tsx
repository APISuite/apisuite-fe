import React from "react";
import { Box, Grid, Icon, Typography, useTheme } from "@apisuite/fe-base";

import { APIUsesCardProps } from "./types";
import useStyles from "./styles";

export const APIUsesCard: React.FC<APIUsesCardProps> = ({
  title,
  description,
  image,
}) => {
  const classes = useStyles();
  const { palette } = useTheme();

  return (
    <Grid item md={6}>
      <Box className={classes.cardContentContainer}>
        <Box mb={3.75}>
          {
            image
              ? <img src={image} />
              : <Icon className={classes.highlightIcon}>view_carousel</Icon>
          }
        </Box>

        <Box mb={3}>
          <Typography display="block" style={{ color: palette.primary.main }} variant="h6">
            {title}
          </Typography>
        </Box>

        <Box>
          <Typography display="block" style={{ color: palette.text.primary }} variant="body1">
            {description}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};
