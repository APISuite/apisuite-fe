import React from "react";
import qs from "qs";
import clsx from "clsx";
import { useHistory, useParams } from "react-router-dom";
import { Button, Link, useConfig, useTranslation } from "@apisuite/fe-base";
import AmpStoriesRoundedIcon from "@material-ui/icons/AmpStoriesRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

import { InvitationForm } from "components/InvitationForm";
import { SignInForm } from "components/SignInForm";
import { SignUpForm } from "components/SignUpForm";
import { getSSOLoginURL } from "util/getSSOLoginURL";
import { linker } from "util/linker";

import useStyles from "./styles";
import { View } from "./types";
import { useSelector } from "react-redux";
import { signInOrUpSelector } from "./selector";

export const SignInOrUp: React.FC = () => {
  const classes = useStyles();
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

  const renderRegisterInvitationOption = () => {
    return <>
      <option
        className={clsx({ [classes.selectedOption]: view === "invitation", [classes.notSelectedOption]: view !== "invitation" })}
        onClick={() => changeView("invitation")}>
        {getMenuTranslation()}
      </option>
    </>;
  };

  const renderSignUpFooter = (signUpURL: string) => {
    return (
      <div className={classes.invitationFooter}>
        {t("signInOrUpView.ssoFooterSignUp", { provider: sso[0] })} <Link href={linker(signUpURL)}>{t("signInOrUpView.ssoFooterSignUpLink")}</Link>
      </div>
    );
  };

  const shouldRenderNotAvailableView = () => {
    return (view === "signin" || view === "signup") && !!sso?.length;
  };

  const renderNotAvailableView = () => {
    return (
      <div className={classes.notAvailableView}>
        <h1 className={classes.formSideTitle}>
          {t("signInOrUpView.welcomeTitle")}
        </h1>
        <p className={classes.formSideSubtitle}>
          {t("signInOrUpView.welcomeSubtitle", { org: auth.invitation?.organization || "Unknown" })}
        </p>
        <div className={classes.form}>
          {
            view === "signin" &&
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className={classes.ssoButton}
              href={getSSOLoginURL(sso)}>
              {t("signInOrUpView.options.signIn")}
            </Button>
          }
          {
            view === "signup" &&
            <Button
              variant="contained"
              color="primary" fullWidth
              className={classes.ssoButton}
              href={linker(providerSignupURL)}>
              {t("signInOrUpView.options.signUp")}
            </Button>
          }
        </div>
      </div>
    );
  };

  return (
    <main className={classes.mainContainer}>
      <header className={classes.headerContainer}>
        <div
          className={classes.logoAndNameContainer}
          onClick={() => history.push("/")}
        >
          {
            ownerInfo.logo
              ? (
                <img
                  className={classes.imageLogo}
                  src={ownerInfo.logo}
                />
              )
              : (
                <AmpStoriesRoundedIcon
                  className={classes.iconLogo}
                />
              )
          }

          <h3 className={classes.portalName}>
            {portalName}
          </h3>
        </div>

        <div
          className={classes.closeButtonContainer}
          onClick={() => history.push("/")}
        >
          <p>
            {t("signInOrUpView.closeButtonLabel")}
          </p>
          <CloseRoundedIcon />
        </div>
      </header>

      <section className={classes.pageContentContainer}>
        <div className={classes.formSideContentContainer}>
          {shouldRenderNotAvailableView() && renderNotAvailableView()}
          {!shouldRenderNotAvailableView() &&
            <>
              <h1 className={classes.formSideTitle}>
                {invitationHasNoError() ? t("signInOrUpView.welcomeTitle") : t("signInOrUpView.invalid")}
              </h1>
              <p className={classes.formSideSubtitle}>
                {invitationHasNoError() && t(view === "invitation" ? "signInOrUpView.welcomeSubtitleInvitation" : "signInOrUpView.welcomeSubtitle", { org: auth.invitation?.organization || "Unknown" })}
              </p>

              <div>
                <div className={classes.selector}>
                  {view === "invitation" && invitationHasNoError() ? renderRegisterInvitationOption() : null}
                  {
                    view !== "invitation" &&
                    <>
                      <option
                        className={clsx({ [classes.selectedOption]: view === "signin", [classes.notSelectedOption]: view !== "signin" })}
                        onClick={() => changeView("signin")}
                      >
                        {t("signInOrUpView.options.signIn")}
                      </option>

                      <option
                        className={clsx({ [classes.selectedOption]: view === "signup", [classes.notSelectedOption]: view !== "signup" })}
                        onClick={() => changeView("signup")}
                      >
                        {t("signInOrUpView.options.signUp")}
                      </option>
                    </>
                  }
                </div>

                <div className={classes.form}>
                  {view === "signin" && <SignInForm />}
                  {view === "signup" && <SignUpForm />}
                  {view === "invitation" && <InvitationForm />}
                </div>
                <div className={classes.formFooter}>
                  {(view === "invitation" && !auth.authToken && !!sso?.length && invitationHasNoError()) && renderSignUpFooter(providerSignupURL)}
                </div>
              </div>
            </>}
        </div>

        <div className={classes.imageSideContentContainer} />
      </section>
    </main>
  );
};
