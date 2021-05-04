import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useConfig, useTranslation } from "@apisuite/fe-base";
import AmpStoriesRoundedIcon from "@material-ui/icons/AmpStoriesRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";

import useStyles from "./styles";

export const SignUpConfirmation: React.FC = () => {
  const classes = useStyles();
  const [t] = useTranslation();
  const history = useHistory();
  const { ownerInfo, portalName } = useConfig();
  const { name } = useParams<{ name: string }>();

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
        <div className={classes.signUpCompleteSideContentContainer}>
          <h1 className={classes.signUpCompleteSideTitle}>
            {t("signUpConfirmation.titleText")}
            {name}!
          </h1>

          <p className={classes.signUpCompleteSideSubtitle}>
            <>{t("signUpConfirmation.subtitleTextPartOne")}</>
            <span className={classes.signUpCompleteSideSubtitleBoldPart}>
              {t("signUpConfirmation.subtitleTextPartTwo")}
            </span>
            <>{t("signUpConfirmation.subtitleTextPartThree")}</>
          </p>

          <div className={classes.infoBox}>
            <InfoRoundedIcon className={classes.infoBoxIcon} />

            <div>
              <p className={classes.infoBoxText}>
                {t("signUpConfirmation.infoBoxText")}
              </p>
            </div>
          </div>
        </div>

        <div className={classes.imageSideContentContainer} />
      </section>
    </main>
  );
};

export default SignUpConfirmation;
