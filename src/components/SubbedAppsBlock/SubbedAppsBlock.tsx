import React from "react";
import { Avatar, Box, Grid, Typography, useTheme, useTranslation } from "@apisuite/fe-base";

import Link from "components/Link";
import { AppData } from "store/applications/types";
import { CurrentAPIDetails } from "pages/APIProductDetails/types";
import { SubbedAppsBlockProps } from "./types";
import useStyles from "./styles";

export const SubbedAppsBlock: React.FC<SubbedAppsBlockProps> = ({
  currentAPIDetails,
}) => {
  const classes = useStyles();
  const { palette } = useTheme();

  const [t] = useTranslation();

  const generateSubbedAppBubbles = (apiDetails: CurrentAPIDetails) => {
    return apiDetails.appsSubbed.map((app: AppData, index: number) => {
      return (
        <Link
          className={classes.appBubbles}
          key={`appBubble${index}`}
          to={{
            pathname: "/dashboard/subscriptions",
            state: {
              redirected: true,
              appID: app.id,
              apiID: apiDetails.id,
              apiVersionID: apiDetails.version?.id,
            },
          }}
        >
          <Avatar>
            {app.name[0].toUpperCase()}{app.name[1]}
          </Avatar>
        </Link>
      );
    });
  };

  const hasSubbedApps = (apiDetails: CurrentAPIDetails) => {
    if (!apiDetails.appsSubbed.length) {
      return (
        <Typography display="block" style={{ color: palette.text.primary }} variant="body1">
          {t("apiProductDetails.noAppsSubbedText")}
        </Typography>
      );
    }
    
    return (
      <Box mt={1.25} className={classes.subbedAppBubblesContainer}>
        {generateSubbedAppBubbles(apiDetails)}
      </Box>
    );
  };

  return (
    <Box className={classes.contentContainer} mx='auto'>
      <Grid container>
        <Grid item md={9}>
          <Box mt={3}>
            <Typography display="block" style={{ color: palette.text.primary, fontWeight: 300 }} variant="caption">
              {t("apiProductDetails.appsSubbedTitle")}
            </Typography>

            {hasSubbedApps(currentAPIDetails)}
          </Box>
        </Grid>

        <Grid item md={3}>
          <Box mt={7} style={{ textAlign: "right" }}>
            <Link
              className={classes.linkToSubsModal}
              to="/dashboard/subscriptions"
            >
              <Typography style={{ color: palette.common.white, display: "inline", fontWeight: 700 }}>
                {t("apiProductDetails.subscribeButtonLabel")}
              </Typography>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
