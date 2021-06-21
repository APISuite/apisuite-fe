import React from "react";
import qs from "qs";
import { useHistory, useParams } from "react-router-dom";
import { Box, Button, Grid, Icon, Tabs, Tab, Typography, useConfig, useTheme, useTranslation, Trans } from "@apisuite/fe-base";
import AmpStoriesRoundedIcon from "@material-ui/icons/AmpStoriesRounded";

import { InvitationForm } from "components/InvitationForm";
import { SignInForm } from "components/SignInForm";
import { SignUpForm } from "components/SignUpForm";
import Link from "components/Link";
import { getSSOLoginURL } from "util/getSSOLoginURL";
import { linker } from "util/linker";

import useStyles from "./styles";
import { View } from "./types";
import { useSelector } from "react-redux";
import { signInOrUpSelector } from "./selector";

export const SignInOrUp: React.FC = () => {
  const classes = useStyles();
  const { palette, zIndex, breakpoints, spacing } = useTheme();
  const history = useHistory();
  const [t] = useTranslation();
  const { auth } = useSelector(signInOrUpSelector);
  const { ownerInfo, portalName, providerSignupURL, sso } = useConfig();

  const { view: viewParameter } = useParams<{ view: string }>();

  const checkView = (): View => {
    if (viewParameter === "signup") return "signup";
    if (viewParameter === "invitation") return "invitation";
    return "signin";
  };

  const [view, setView] = React.useState<View>(checkView());

  const changeView = (viewToDisplay: View) => {
    history.push(`/auth/${viewToDisplay}`);

    setView(viewToDisplay);
  };

  const invitationHasNoError = () => {
    const invitationToken = qs.parse(window.location.search.slice(1)).token as string || undefined;
    const code = qs.parse(window.location.search.slice(1)).code as string || undefined;

    if (view === "invitation" && ((!invitationToken && !code && !auth.error) || auth.error)) {
      return false;
    }
    return true;
  };

  const getMenuTranslation = () => {
    if (sso?.length && !auth.authToken) {
      // sso sign in to accept
      return t("login.invitationSignInBtn");
    }
    if (auth.invitation.isUser && !auth.authToken) {
      // sign in to accept
      return t("login.invitationSignInBtn");
    }
    if (!auth.invitation.isUser && !auth.authToken) {
      // sign up to accept
      return t("login.invitationSignUpBtn");
    }
    // accept
    return t("login.invitationBtn");
  };

  const shouldRenderNotAvailableView = () => {
    return (view === "signin" || view === "signup") && !!sso.length;
  };

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
        >
          {ownerInfo.logo ? (
            <img
              className={classes.imageLogo}
              src={ownerInfo.logo}
            />
          ) : (
            <AmpStoriesRoundedIcon
              className={classes.iconLogo}
            />
          )}

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
        component={Box}
        container
        direction="column"
        pt={20}
        px={6}
        maxWidth={breakpoints.values.sm}
        margin="auto"
      >
        <Grid item xs>
          <Typography variant="h1">
            {invitationHasNoError() ? t("signInOrUpView.welcomeTitle") : t("signInOrUpView.invalid")}
          </Typography>

          <Typography variant="h5" color="textSecondary">
            {invitationHasNoError() && t(
              view === "invitation" ? "signInOrUpView.welcomeSubtitleInvitation" : "signInOrUpView.welcomeSubtitle",
              { org: auth.invitation?.organization || "" }
            )}
          </Typography>
        </Grid>

        <Grid item xs>
          {!sso.length && (
            <Box pt={6}>
              {/* TODO: this tabs should be refactored to have a better reasoning
                        about which tabs should be available */}
              <Tabs
                value={view}
                variant="fullWidth"
                textColor="primary"
                indicatorColor="primary"
                style={{ borderBottom: `1px solid ${palette.divider}` }}
                onChange={(_, value) => changeView(value)}
              >
                {view !== "invitation" && (
                // This is weird, but we only have one tab on this case
                  <Tab
                    value="signin"
                    label={t("signInOrUpView.options.signIn")}
                  />
                )}

                {view !== "invitation" && (
                // This is weird, but we only have one tab on this case
                  <Tab
                    value="signup"
                    label={t("signInOrUpView.options.signUp")}
                  />
                )}

                {view === "invitation" && (
                // This is weird, but we only have one tab on this case
                  <Tab
                    value="invitation"
                    label={getMenuTranslation()}
                  />
                )}
              </Tabs>
            </Box>
          )}

          {shouldRenderNotAvailableView() && (
            <Box pt={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={!providerSignupURL}
                href={view === "signin" ? getSSOLoginURL(sso) : linker(providerSignupURL)}>
                {t(view === "signin" ? "signInOrUpView.options.signIn" : "signInOrUpView.options.signUp")}
              </Button>
            </Box>
          )}

          {!shouldRenderNotAvailableView() && (
            <>
              {view === "signin" && <SignInForm />}
              {view === "signup" && <SignUpForm />}
            </>
          )}

          {view === "invitation" && <InvitationForm />}

          {(view === "invitation" && !auth.authToken && !!sso?.length && invitationHasNoError()) && (
            <Box
              maxWidth={550}
              margin={`${spacing(2)} auto`}
            >
              <Trans i18nKey="signInOrUpView.ssoFooterSignUp" values={{ provider: sso[0] }}>
                {[
                  <Link key="signInOrUpView.ssoFooterSignUp" to={linker(providerSignupURL)} />,
                ]}
              </Trans>
            </Box>
          )}
        </Grid>
      </Grid>

      <Grid item xs className={classes.imageSideContentContainer} />
    </Grid>
  );
};
