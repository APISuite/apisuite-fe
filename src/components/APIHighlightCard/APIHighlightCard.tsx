import React from "react";
import { Box, Icon, Typography, useTheme } from "@apisuite/fe-base";

import { APIHighlightCardProps } from "./types";
import useStyles from "./styles";

export const APIHighlightCard: React.FC<APIHighlightCardProps> = ({
  title,
  description,
  image,
}) => {
  const classes = useStyles();
  const { palette } = useTheme();

  return (
    <Box className={classes.cardContentContainer} px={3} py={5}>
      <Box mb={4}>
        {
          image
            ? <img src={image} />
            : <Icon className={classes.highlightIcon}>view_carousel</Icon>
        }
      </Box>

      <Box mb={2}>
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
  );
};
