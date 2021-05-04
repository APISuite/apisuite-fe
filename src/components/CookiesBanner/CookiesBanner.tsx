import React from "react";
import { useTranslation } from "@apisuite/fe-base";
import CookieConsent from "react-cookie-consent";

import useStyles from "./styles";

const CookiesBanner: React.FC = () => {
  /*
  Two notes about this 'cookies consent' banner:

  1) You may check up on (and delete) the generated cookie through the browser's
  Developer Tools (e.g., on Chrome, it's in the 'Application' tab, under 'Cookies');

  2) This 'cookies consent' banner will be hidden once accepted. To debug it (e.g., check up
  on style changes), you can simply add the 'debug' property to 'CookieConsent'.
  */
  const classes = useStyles();

  const [t] = useTranslation();

  return (
    <CookieConsent
      buttonClasses={classes.cookiesConsentButton}
      buttonText={t("cookiesConsentBanner.buttonLabel")}
      containerClasses={classes.cookiesConsentBannerContainer}
      cookieName='apiSuiteConsentCookie'
      location='bottom'
      overlay
    >
      <h2 className={classes.cookiesConsentHeader}>
        {t("cookiesConsentBanner.intro")}
      </h2>

      <p className={classes.cookiesConsentParagraph}>
        {t("cookiesConsentBanner.paragraphOne")}
      </p>

      <p className={classes.cookiesConsentParagraph}>
        <>{t("cookiesConsentBanner.paragraphTwo.partOne")} </>
        <a
          href='https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/761004061/Legal'
          rel='noopener noreferrer'
          target='_blank'
        >
          {t("cookiesConsentBanner.paragraphTwo.partTwo")}
        </a>
        <> {t("cookiesConsentBanner.paragraphTwo.partThree")}</>
      </p>

      <p className={classes.cookiesConsentParagraph}>
        {t("cookiesConsentBanner.paragraphThree")}
      </p>
    </CookieConsent>
  );
};

export default CookiesBanner;
