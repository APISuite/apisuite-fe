import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useConfig, useTheme, useTranslation, Box, Grid, Icon, Typography } from "@apisuite/fe-base";
import { Logo } from "components/Logo";
import Notice from "components/Notice";

import useStyles from "./styles";

export const SignUpConfirmation: React.FC = () => {
  const classes = useStyles();
  const [t] = useTranslation();
  const history = useHistory();
  const { navigation, ownerInfo, portalName } = useConfig();
  const { breakpoints, palette, zIndex } = useTheme();
  const { name } = useParams<{ name: string }>();

  // FIXME subtitleTextPartOne Two and Three should use interpolation
  return (
    <Grid
      component={Box}
      container
      direction="row"
      minHeight="100%"
    >
      <Box
        display="flex"
        flexWrap="nowrap"
        position="absolute"
        width="100%"
        p={6}
        zIndex={zIndex.appBar}
      >
        <Grid
          component={Box}
          container
          onClick={() => history.push("/")}
          className={classes.logo}
        >
          <Logo
            icon={navigation.title.iconFallbackName}
            src={ownerInfo.logo}
          />
          <Typography variant="h3">
            {portalName}
          </Typography>
        </Grid>

        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          color={palette.common.white}
          onClick={() => history.push("/")}
          className={classes.close}
        >
          <Box mr={1} clone>
            <Typography variant="body2" color="inherit">
              {t("signInOrUpView.closeButtonLabel")}
            </Typography>
          </Box>

          <Icon>close</Icon>
        </Box>
      </Box>

      <Grid
        alignSelf="center"
        component={Box}
        container
        direction="column"
        item
        py={20}
        px={6}
        maxWidth={breakpoints.values.sm}
        margin="auto"
      >
        <Grid item md>
          <Box pb={3}>
            <Typography variant="h1">
              {t("signUpConfirmation.titleText")}
              {name}!
            </Typography>
          </Box>

          <Box pb={5}>
            <Typography variant="body1" color="textSecondary">
              {t("signUpConfirmation.subtitleTextPartOne")}
              <b>
                {t("signUpConfirmation.subtitleTextPartTwo")}
              </b>
              {t("signUpConfirmation.subtitleTextPartThree")}
            </Typography>
          </Box>
        </Grid>

        <Grid item md>
          <Notice noticeText={
            <Typography
              variant="body2"
              style={{ color: palette.info.contrastText }}
            >
              {t("signUpConfirmation.infoBoxText")}
            </Typography>
          }/>
        </Grid>
      </Grid>
      <Grid item md className={classes.imageSideContentContainer} />
    </Grid>
  );
};

export default SignUpConfirmation;
