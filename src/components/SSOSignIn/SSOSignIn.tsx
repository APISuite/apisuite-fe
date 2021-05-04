import React from "react";
import qs from "qs";
import { useTranslation } from "@apisuite/fe-base";

import { LOCAL_STORAGE_KEYS } from "constants/global";
import useStyles from "./styles";
import { SSOSignInProps } from "./types";

const SSOSignIn: React.FC<SSOSignInProps> = ({
  ssoTokenExchange,
}) => {
  const classes = useStyles();

  const [t] = useTranslation();

  React.useEffect(() => {
    // URL parameters
    const allURLParameters = qs.parse(window.location.search.slice(1));
    const stateParameter = allURLParameters.state;

    // Local storage's tidbits of information
    const stateCodeInLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEYS.SSO_STATE_STORAGE);
    const providerInLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEYS.SSO_PROVIDER_STATE_STORAGE);

    if (stateParameter === stateCodeInLocalStorage && providerInLocalStorage) {
      ssoTokenExchange({ code: allURLParameters.code as string, provider: providerInLocalStorage });
    }
  }, [ssoTokenExchange]);

  return (
    <p className={classes.pleaseHoldMessage}>
      {t("signInForm.ssoSignInPleaseHoldMessage")}
    </p>
  );
};

export default SSOSignIn;
