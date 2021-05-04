import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useConfig, useTranslation, Link } from "@apisuite/fe-base";
import AmpStoriesRoundedIcon from "@material-ui/icons/AmpStoriesRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

import { InvitationForm } from "components/InvitationForm";
import { SignInForm } from "components/SignInForm";
import { SignUpForm } from "components/SignUpForm";
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
  const { ownerInfo, portalName, sso, providerSignupURL } = useConfig();

  const { view: viewParameter } = useParams<{ view: string }>();

  const checkView = (): View => {
    if (viewParameter === "signup") return "signup";
    if (viewParameter === "invitation") return "invitation";
    return "signin";
  };

  const [view, setView] = React.useState<View>(checkView());

  const changeView = (viewToDisplay: View) => {
    history.push(viewToDisplay);

    setView(viewToDisplay);
  };

  const renderRegisterInvitationOption = () => {
    if (auth.authToken) {
      return <option className={view === "invitation" ? classes.selectedOption : classes.notSelectedOption} onClick={() => changeView("invitation")}>{t("login.invitationBtn")}</option>;
    }
    return <option className={view === "invitation" ? classes.selectedOption : classes.notSelectedOption} onClick={() => changeView("invitation")}>{t("login.invitationSignInBtn")}</option>;
  };

  const renderSignUpFooter = (signUpURL: string) => {
    return (
      <div className={classes.invitationFooter}>
        {t("signInOrUpView.ssoFooterSignUp", { provider: sso[0] })} <Link href={linker(signUpURL)}>{t("signInOrUpView.ssoFooterSignUpLink")}</Link>
      </div>
    );
  };

  const shouldRenderNotAvailableView = () => {
    return (view === "signin" || view === "signup") && sso?.length;
  };

  const renderNotAvailableView = () => {
    return (
      <div className={classes.notAvailableView}>
        <h1 className={classes.formSideTitle}>
          {t("signInOrUpView.welcomeTitle")}
        </h1>
        <p className={classes.formSideSubtitle}>
          {t("signInOrUpView.notAvailableView")}
        </p>
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
                {t("signInOrUpView.welcomeTitle")}
              </h1>
              <p className={classes.formSideSubtitle}>
                {t(view === "invitation" ? "signInOrUpView.welcomeSubtitleInvitation" : "signInOrUpView.welcomeSubtitle", { org: auth.invitation?.organization || "Unknown" })}
              </p>

              <div>
                <div className={classes.selector}>
                  {view === "invitation" ? renderRegisterInvitationOption() : null}
                  {
                    view !== "invitation" &&
                    <>
                      <option
                        className={
                          view === "signin"
                            ? classes.selectedOption
                            : classes.notSelectedOption
                        }
                        onClick={() => changeView("signin")}
                      >
                        {t("signInOrUpView.options.signIn")}
                      </option>

                      <option
                        className={
                          view === "signup"
                            ? classes.selectedOption
                            : classes.notSelectedOption
                        }
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
                  {(view === "invitation" && !auth.authToken) && renderSignUpFooter(providerSignupURL)}
                </div>
              </div>
            </>}
        </div>

        <div className={classes.imageSideContentContainer} />
      </section>
    </main>
  );
};
