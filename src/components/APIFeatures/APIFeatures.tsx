import React from "react";
import { Box, Grid, Typography, useTheme, useTranslation } from "@apisuite/fe-base";

import { APIFeatureCard } from "components/APIFeatureCard";
import { APIFeaturesProps } from "./types";
import useStyles from "./styles";

export const APIFeatures: React.FC<APIFeaturesProps> = ({
  apiFeaturesContent,
}) => {
  const classes = useStyles();
  const { palette } = useTheme();

  const [t] = useTranslation();

  const apiFeatureCards = apiFeaturesContent.map((content, index) => {
    return (
      <APIFeatureCard
        description={content.description}
        key={`card${index}`}
        title={content.title}
      />
    );
  });

  if (!apiFeatureCards.length) return null;

  return (
    <Box className={classes.contentContainer} mx='auto' my={0} pb={9.25}>
      <Box mb={3}>
        <Typography display="block" style={{ color: palette.text.primary }} variant="h4">
          {t("apiProductDetails.apiFeaturesTitle")}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {apiFeatureCards}
      </Grid>
    </Box>
  );
};
