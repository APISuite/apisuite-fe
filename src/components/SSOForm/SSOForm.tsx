import React from "react";
import { useTranslation, Button } from "@apisuite/fe-base";
import VpnKeyRoundedIcon from "@material-ui/icons/VpnKeyRounded";

import { SSOFormProps } from "./types";

import useStyles from "./styles";

const SSOForm: React.FC<SSOFormProps> = ({
  auth,
  ssoLogin,
}) => {
  const classes = useStyles();

  const [t] = useTranslation();

  const handleSubmit = (provider: string) => {
    localStorage.setItem("attemptingSignInWithProvider", provider);

    ssoLogin({ provider });
  };

  return (
    <div className={classes.ssoFormContainer}>
      {
        auth.providers?.map((provider, index) => (
          <div key={provider} className={classes.ssoSignInWithButtonContainer}>
            <Button
              className={classes.ssoSignInWithButton}
              key={`${provider}${index}`}
              onClick={() => handleSubmit(provider)}
              startIcon={
                <VpnKeyRoundedIcon className={classes.ssoSignInWithIcon} />
              }
            >
              {t("signInForm.alternativeSignInButtonLabel", { provider })}
            </Button>
          </div>
        ))
      }
    </div>
  );
};

export default SSOForm;
