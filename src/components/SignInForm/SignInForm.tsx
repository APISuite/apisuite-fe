import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import update from "immutability-helper";
import { useTranslation, TextField, IconButton, InputAdornment, TextFieldProps, Typography, Box, useTheme } from "@apisuite/fe-base";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import FormCard from "components/FormCard";
import { isValidEmail } from "util/forms";
import SSOForm from "components/SSOForm";

import useStyles from "./styles";
import { signInFormSelector } from "./selector";
import { ssoProviders } from "store/auth/actions/ssoProviders";
import { login } from "store/auth/actions/login";
import { testIds } from "testIds";
import Link from "components/Link";

export const SignInForm: React.FC = () => {
  const dispatch = useDispatch();
  const auth = useSelector(signInFormSelector);
  const classes = useStyles();
  const { palette } = useTheme();
  const { t } = useTranslation();

  /* SSO sign in */

  useEffect(() => {
    if (auth.providers === null) {
      dispatch(ssoProviders({}));
    }
  }, [auth.providers, dispatch]);

  /* Regular sign in */

  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
  });
  const [formInputsHaveChanged, setFormInputsHaveChanged] = useState(false);

  const handleInputChanges: TextFieldProps["onChange"] = ({ target }) => {
    setFormInputs((s) => {
      switch (target.name) {
        case "email": {
          return update(s, {
            email: { $set: target.value },
            errors: { email: { $set: isValidEmail(target.value) ? "" : t("signInForm.warnings.email") } },
          });
        }

        case "password": {
          return update(s, {
            password: { $set: target.value },
            errors: { password: { $set: target.value.length > 0 ? "" : t("signInForm.warnings.password") } },
          });
        }

        default:
          return s;
      }
    });
  };

  const handleFormSubmission = useCallback((event: React.FormEvent<HTMLFormElement> | KeyboardEvent) => {
    event.preventDefault();

    dispatch(login({ email: formInputs.email, password: formInputs.password }));

    setFormInputsHaveChanged(false);
  }, [formInputs.email, formInputs.password, dispatch]);

  // 'Show password' logic
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Logic for 'Press ENTER to submit form'
  const submitEnter = useCallback((event: KeyboardEvent) => {
    const { key } = event;
    const inputElement = document.getElementById("passwordField");
    const haveErrors = Object.values(formInputs.errors).some(Boolean);

    if (key === "Enter" && document.activeElement === inputElement && haveErrors) {
      handleFormSubmission(event);
    }
  }, [formInputs.errors, handleFormSubmission]);

  useEffect(() => {
    window.addEventListener("keydown", submitEnter);

    return () => {
      window.removeEventListener("keydown", submitEnter);
    };
  }, [submitEnter]);

  return (
    <div className={classes.signInContainer}>
      {
        auth.providers && auth.providers.length !== 0 &&
        <>
          <SSOForm />

          <div className={classes.separatorContainer}>
            <div className={classes.separatorLine} />

            <div className={classes.separatorText}>
              <Typography variant="body2">{t("signInForm.separatorLabel")}</Typography>
            </div>

            <div className={classes.separatorLine} />
          </div>
        </>
      }

      <FormCard
        buttonDisabled={Object.values(formInputs.errors).some(Boolean)}
        buttonLabel={t("signInForm.regularSignInButtonLabel")}
        customDisabledConfirmButtonStyles={classes.disabledConfirmButton}
        customEnabledConfirmButtonStyles={classes.enabledConfirmButton}
        /* We pass an error message to the 'FormCard' component if an authentication error is detected,
        and as long as a) the previously submitted inputs are not changed, and b) the 'E-mail' or
        'Password' input fields are not empty. */
        error={
          auth.error &&
            !formInputsHaveChanged &&
            (formInputs.email !== "" || formInputs.password !== "")
            ? auth.error
            : undefined
        }
        handleSubmit={handleFormSubmission}
        loading={auth.isAuthorizing}
      >
        <div className={classes.inputFieldContainer}>
          <TextField
            data-test-id={testIds.signInEmail}
            id='emailField'
            variant='outlined'
            margin='dense'
            type='email'
            name='email'
            label={t("signInForm.fieldLabels.email")}
            placeholder=''
            value={formInputs.email}
            error={!!formInputs.errors.email.length}
            helperText={formInputs.errors.email}
            autoFocus
            fullWidth
            InputProps={{ classes: { input: classes.inputField } }}
            onChange={handleInputChanges}
          />
        </div>

        <div className={classes.inputFieldContainer}>
          <TextField
            data-test-id={testIds.signInPwd}
            id='passwordField'
            variant='outlined'
            margin='dense'
            type={showPassword ? "text" : "password"}
            name='password'
            label={t("signInForm.fieldLabels.password")}
            value={formInputs.password}
            error={!!formInputs.errors.password.length}
            helperText={formInputs.errors.password}
            fullWidth
            InputProps={{
              classes: { input: classes.inputField },
              endAdornment:
                <InputAdornment position='end'>
                  <IconButton
                    aria-label={t("signInForm.togglePasswordVisibilityARIALabel")}
                    edge='end'
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>,
            }}
            onChange={handleInputChanges}
          />
        </div>
      </FormCard>

      <Box
        py={3}
        display="flex"
        justifyContent="center"
        color={palette.text.secondary}
      >
        <Typography
          component={Link}
          variant="body2"
          to="/forgot"
        >
          {t("signInForm.forgotPasswordLinkLabel")}
        </Typography>
      </Box>
    </div>
  );
};
