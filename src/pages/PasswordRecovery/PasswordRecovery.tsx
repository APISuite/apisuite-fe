import React, { useEffect, useState } from "react";
import {
  useConfig, useTheme, useTranslation, Box, Grid, Icon, IconButton,
  InputAdornment, TextField, TextFieldProps, Trans, Typography,
} from "@apisuite/fe-base";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { DEFAULT_NON_INSTANCE_OWNER_SUPPORT_URL } from "constants/global";
import FormCard from "components/FormCard";
import Link from "components/Link";
import { Logo } from "components/Logo";
import Notice from "components/Notice";
import { recoverPassword } from "store/auth/actions/recoverPassword";
import { forgotPassword } from "store/auth/actions/forgotPassword";
import { isValidEmail, isValidPass } from "util/forms";
import keyIllustration from "assets/keyIllustration.svg";

import { passwordRecoverySelector } from "./selector";
import useStyles from "./styles";

export const PasswordRecovery: React.FC = () => {
  const SIGN_IN = "/auth/signin";
  const classes = useStyles();
  const dispatch = useDispatch();
  const { ownerInfo, navigation, portalName, supportURL } = useConfig();
  const { palette } = useTheme();
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
      history.push(SIGN_IN);
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
          onClick={() => history.push(SIGN_IN)}
        >
          <Box fontSize="60px">
            <Logo
              src={ownerInfo.logo}
              icon={navigation.title.iconFallbackName}
            />
          </Box>

          <Typography className={classes.portalName} variant="h3">
            {portalName}
          </Typography>
        </div>

        <div
          className={classes.closeButtonContainer}
          onClick={() => history.push("/auth/signin")}
        >
          <Box>
            <Typography variant="caption" gutterBottom>
              {t("passwordRecovery.closeButtonLabel")}
            </Typography>
          </Box>
          <Icon>close</Icon>
        </div>
      </header>

      <section className={classes.pageContentContainer}>
        <div className={classes.formSideContentContainer}>
          {
            !emailHasBeenSent
              ? (
                <Grid container>
                  <Grid item md={10}>
                    <Box clone mb={5}>
                      <Typography variant="h1">
                        {
                          stage === "forgot"
                            ? t("passwordRecovery.forgotPasswordTitle")
                            : t("passwordRecovery.recoverPasswordTitle")
                        }
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item md />

                  <Grid item md={10}>
                    <Box mb={2}>
                      <Typography variant="body1">
                        {
                          stage === "forgot"
                            ? t("passwordRecovery.forgotPasswordSubtitle")
                            : t("passwordRecovery.recoverPasswordSubtitle")
                        }
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item md />

                  <Grid item md={10}>
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
                      <Box mb={4}>
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
                      </Box>
                    </FormCard>
                  </Grid>
                </Grid>
              )
              : (
                <Grid container spacing={3}>
                  <Grid item md={10}>
                    <Box clone mb={5}>
                      <Typography variant="h1">
                        {t("passwordRecovery.recoveryEmailHasBeenSentPartOne")}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item md />

                  <Grid item md={10}>
                    <Box clone mb={2}>
                      <Typography variant="body1">
                        <>{t("passwordRecovery.recoveryEmailHasBeenSentPartTwo")} </>
                        <span className={classes.boldText}>{portalName} </span>
                        <>{t("passwordRecovery.recoveryEmailHasBeenSentPartThree")} </>
                        <span className={classes.boldText}>{state.userInput}</span>
                        <>{t("passwordRecovery.recoveryEmailHasBeenSentPartFour")}</>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item md />

                  <Grid item md={10}>
                    <Notice
                      noticeIcon={<Icon>info</Icon>}
                      noticeText={
                        <Typography variant="body2" display="block" style={{ color: palette.info.dark }}>
                          <Trans i18nKey="passwordRecovery.infoBoxText">
                            {[
                              <Link
                                key="passwordRecovery.infoBoxText"
                                to={supportURL || DEFAULT_NON_INSTANCE_OWNER_SUPPORT_URL}
                                rel='noopener noreferrer'
                                target='_blank'
                              />,
                            ]}
                          </Trans>
                        </Typography>
                      }
                      type="info"
                    />
                  </Grid>
                  <Grid item md />
                </Grid>
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
