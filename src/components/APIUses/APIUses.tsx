import React from "react";
import { Box, Grid, Typography, useTheme, useTranslation } from "@apisuite/fe-base";

import { APIUsesCard } from "components/APIUsesCard";
import { APIUsesProps } from "./types";
import useStyles from "./styles";

export const APIUses: React.FC<APIUsesProps> = ({
  apiUsesContent,
}) => {
  const classes = useStyles();
  const { palette } = useTheme();

  const [t] = useTranslation();

  const usesCards = apiUsesContent.map((content, index) => {
    return (
      <APIUsesCard
        description={content.description}
        key={`card${index}`}
        title={content.title}
      />
    );
  });

  if (!usesCards.length) return null;

  return (
    <Box className={classes.contentContainer} mx='auto' my={7.5}>
      <Box mb={3}>
        <Typography display="block" style={{ color: palette.text.primary }} variant="h4">
          {t("apiProductDetails.useThisAPITitle")}
        </Typography>
      </Box>

      <Grid container spacing={7}>
        {usesCards}
      </Grid>
    </Box>
  );
};
