import React from "react";
import { Box, Card, CardContent, Grid, Icon, Typography, useTheme } from "@apisuite/fe-base";

import { APIFeatureCardProps } from "./types";
import useStyles from "./styles";

export const APIFeatureCard: React.FC<APIFeatureCardProps> = ({
  title,
  description,
  image,
}) => {
  const classes = useStyles();
  const { palette, spacing, shape } = useTheme();

  return (
    <Grid item md={4}>
      <Card style={{
        backgroundColor: palette.background.paper,
        borderRadius: shape.borderRadius,
        boxShadow: "none",
        padding: spacing(3),
      }}>
        <CardContent>
          <Box mb={2} className={classes.apiFeatureIcon}>
            {
              image
                ? <img src={image} />
                : <Icon>view_carousel</Icon>
            }
          </Box>

          <Box mb={1}>
            <Typography display="block" style={{ color: palette.primary.main, fontWeight: 700 }} variant="body1">
              {title}
            </Typography>
          </Box>

          <Box>
            <Typography display="block" style={{ color: palette.text.secondary }} variant="body2">
              {description}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
