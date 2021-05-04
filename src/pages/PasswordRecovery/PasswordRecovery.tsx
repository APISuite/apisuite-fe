import React, { useEffect, useState } from "react";
import { useConfig, useTranslation, IconButton, InputAdornment, TextField, TextFieldProps } from "@apisuite/fe-base";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import AmpStoriesRoundedIcon from "@material-ui/icons/AmpStoriesRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { DEFAULT_NON_INSTANCE_OWNER_SUPPORT_URL } from "constants/global";
import FormCard from "components/FormCard";
import { isValidEmail, isValidPass } from "util/forms";
import keyIllustration from "assets/keyIllustration.svg";

import { passwordRecoverySelector } from "./selector";
import useStyles from "./styles";
import { recoverPassword } from "store/auth/actions/recoverPassword";
import { forgotPassword } from "store/auth/actions/forgotPassword";

export const PasswordRecovery: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { ownerInfo, portalName, supportURL } = useConfig();
  const history = useHistory();
  const location = useLocation<any>();
  const [t] = useTranslation();
  const auth = useSelector(passwordRecoverySelector);
  const stage = location.state?.stage ?? "forgot";

  const [state, setState] = useState({
    userInput: "",
    error: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [userHasSubmitted, setUserHasSubmitted] = useState(false);
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);

  const handleUserInput: TextFieldProps["onChange"] = ({ target }) => {
    setState((s) => {
      switch (target.name) {
        case "email": {
          return {
            userInput: target.value,
            error: isValidEmail(target.value) ? "" : t("passwordRecovery.warnings.email"),
          };
        }

        case "password": {
          return {
            userInput: target.value,
            error: isValidPass(target.value) ? "" : t("passwordRecovery.warnings.password"),
          };
        }

        default:
          return s;
      }
    });
  };

  const handleShowPassword = (event: any) => {
    event.preventDefault();

    const newShowPasswordValue = !showPassword;

    setShowPassword(newShowPasswordValue);
  };

  function handleSubmission (event: React.FormEvent<HTMLFormElement> | KeyboardEvent) {
    event.preventDefault();

    setUserHasSubmitted(true);

    if (stage === "recover") {
      dispatch(recoverPassword({ token: location.state.token, password: state.userInput }));
    } else {
      dispatch(forgotPassword({ email: state.userInput }));
    }
  }

  useEffect(() => {
    if (userHasSubmitted && !auth.isRecoveringPassword) {
      setEmailHasBeenSent(true);
    }
  }, [auth.isRecoveringPassword, userHasSubmitted]);

  return (
    <main className={classes.mainContainer}>
      <header className={classes.headerContainer}>
        <div
          className={classes.logoAndNameContainer}
          onClick={() => history.push("/auth/signin")}
        >
          {
            ownerInfo.logo ? (
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
          onClick={() => history.push("/auth/signin")}
        >
          <p>
            {t("passwordRecovery.closeButtonLabel")}
          </p>
          <CloseRoundedIcon />
        </div>
      </header>

      <section className={classes.pageContentContainer}>
        <div className={classes.formSideContentContainer}>
          {
            !emailHasBeenSent
              ? (
                <>
                  <h1 className={classes.formSideTitle}>
                    {
                      stage === "forgot"
                        ? t("passwordRecovery.forgotPasswordTitle")
                        : t("passwordRecovery.recoverPasswordTitle")
                    }
                  </h1>

                  <p className={classes.formSideSubtitle}>
                    {
                      stage === "forgot"
                        ? t("passwordRecovery.forgotPasswordSubtitle")
                        : t("passwordRecovery.recoverPasswordSubtitle")
                    }
                  </p>

                  <div className={classes.form}>
                    <FormCard
                      buttonDisabled={!!state.error.length}
                      buttonLabel={
                        stage === "forgot"
                          ? t("passwordRecovery.formButtonLabel.forgot")
                          : t("passwordRecovery.formButtonLabel.recover")
                      }
                      handleSubmit={handleSubmission}
                      loading={auth.isRecoveringPassword}
                    >
                      <div className={classes.inputFieldContainer}>
                        {
                          stage === "forgot"
                            ? (
                              <TextField
                                id='emailField'
                                variant='outlined'
                                margin='dense'
                                label={t("passwordRecovery.emailLabel")}
                                type='email'
                                name='email'
                                value={state.userInput}
                                placeholder=''
                                error={!!state.error.length}
                                helperText={state.error}
                                autoFocus
                                fullWidth
                                InputProps={{ classes: { input: classes.inputField } }}
                                onChange={handleUserInput}
                              />
                            )
                            : (
                              <TextField
                                id='passwordField'
                                label={t("passwordRecovery.newPasswordLabel")}
                                variant='outlined'
                                margin='dense'
                                name='password'
                                type={showPassword ? "text" : "password"}
                                value={state.userInput}
                                error={!!state.error.length}
                                helperText={state.error}
                                autoFocus
                                fullWidth
                                InputProps={{
                                  classes: { input: classes.inputField },
                                  endAdornment:
                                    <InputAdornment position='end'>
                                      <IconButton
                                        aria-label={t("passwordRecovery.togglePasswordVisibilityARIALabel")}
                                        edge='end'
                                        onClick={(event) => handleShowPassword(event)}
                                      >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                      </IconButton>
                                    </InputAdornment>,
                                }}
                                onChange={handleUserInput}
                              />
                            )
                        }
                      </div>
                    </FormCard>
                  </div>
                </>
              )
              : (
                <>
                  <h1 className={classes.formSideTitle}>
                    {t("passwordRecovery.recoveryEmailHasBeenSentPartOne")}
                  </h1>

                  <p className={classes.formSideSubtitle}>
                    <>{t("passwordRecovery.recoveryEmailHasBeenSentPartTwo")} </>
                    <span className={classes.boldText}>{portalName} </span>
                    <>{t("passwordRecovery.recoveryEmailHasBeenSentPartThree")} </>
                    <span className={classes.boldText}>{state.userInput}</span>
                    <>{t("passwordRecovery.recoveryEmailHasBeenSentPartFour")}</>
                  </p>

                  <div className={classes.infoBox}>
                    <InfoRoundedIcon className={classes.infoBoxIcon} />

                    <div>
                      <p className={classes.infoBoxText}>
                        <>{t("passwordRecovery.infoBoxTextPartOne")} </>
                        <a
                          href={supportURL || DEFAULT_NON_INSTANCE_OWNER_SUPPORT_URL}
                          rel='noopener noreferrer'
                          target='_blank'
                        >
                          {t("passwordRecovery.infoBoxTextPartTwo")}
                        </a>
                        <>.</>
                      </p>
                    </div>
                  </div>
                </>
              )
          }
        </div>

        <div className={classes.imageSideContentContainer}>
          <img
            className={classes.image}
            src={keyIllustration}
          />
        </div>
      </section>
    </main>
  );
};
