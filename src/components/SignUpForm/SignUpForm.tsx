import React, { useCallback, useState } from "react";
// import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import update from "immutability-helper";
import { Box, Button, CircularProgress, IconButton, InputAdornment, TextField, TextFieldProps, Trans, Typography, useTheme, useTranslation } from "@apisuite/fe-base";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { notEmpty, isValidEmail, isValidPass } from "util/forms";

// FIXME: dead code
// import StepsProgress from "components/StepsProgress";
// import { signUpFormSelector } from "./selector";
// import { submitSignUpCredentials } from "store/auth/actions/submitSignUpCredentials";
// import { submitSignUpOrganisation } from "store/auth/actions/submitSignUpOrganisation";
import { submitSignUpDetails } from "store/auth/actions/submitSignUpDetails";

import Link from "components/Link";
import { signUpFormSelector } from "./selector";

export const SignUpForm: React.FC = () => {
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const { palette } = useTheme();
  const { isSignUpWorking } = useSelector(signUpFormSelector);

  // Form changes logic
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState({
    data: {
      name: "",
      organization: "",
      email: "",
      password: "",
    },
    errors: {
      email: "",
      name: "",
      password: "",
    },
  });

  const handleInputChanges: TextFieldProps["onChange"] = useCallback(({ target }) => {
    setState((s) => {
      switch (target.name) {
        case "name": {
          return update(s, {
            data: { name: { $set: target.value } },
            errors: { name: { $set: notEmpty(target.value) ? "" : t("signUpForm.warnings.profileName") } },
          });
        }

        case "organization": {
          return update(s, {
            data: { organization: { $set: target.value } },
          });
        }

        case "email": {
          return update(s, {
            data: { email: { $set: target.value } },
            errors: {
              email: {
                $set: isValidEmail(target.value) ? "" : t("signUpForm.warnings.email"),
                // TODO: remove translation
                // ? t('signUpForm.warnings.emailInUse')
              },
            },
          });
        }

        case "password": {
          return update(s, {
            data: { password: { $set: target.value } },
            errors: {
              password: { $set: isValidPass(target.value) ? "" : t("signUpForm.warnings.password") },
            },
          });
        }

        default:
          return s;
      }
    });
  }, [t]);

  const handleSubmit = useCallback(() => {
    // only dispatch the action if the errors are not empty
    if (!Object.entries(state.errors).some((v) => v[1].length)) {
      dispatch(submitSignUpDetails({
        user: {
          name: state.data.name,
          email: state.data.email,
          password: state.data.password,
        },
        organization: state.data.organization,
      }));
    }
  }, [dispatch, state.data, state.errors]);

  // FIXME: dead code
  // const steps = {
  //   1: t("signUpForm.steps.profileDetails"),
  //   2: t("signUpForm.steps.organisationDetails"),
  //   3: t("signUpForm.steps.securityDetails"),
  // };

  // const signUpFormStep = (fromStep: number) => {
  //   switch (fromStep) {
  //     case 1:
  //       return (
  //         <ProfileDetailsForm
  //           key='profileDetailsForm'
  //           next={nextStep}
  //           back={prevStep}
  //           error={submittedStep.current === 1 && signUpError ? signUpError : ""}
  //         />
  //       );

  //     case 2:
  //       return (
  //         <OrganisationDetailsForm
  //           key='organisationDetailsForm'
  //           next={nextStep}
  //           back={prevStep}
  //           error={submittedStep.current === 2 && signUpError ? signUpError : ""}
  //         />
  //       );

  //     case 3:
  //       return (
  //         <SecurityDetailsForm
  //           key='securityDetailsForm'
  //           next={nextStep}
  //           back={prevStep}
  //           error={submittedStep.current === 3 && signUpError ? signUpError : ""}
  //         />
  //       );

  //     default: {
  //       return (
  //         <Redirect
  //           key='redirectToAccountConfirmation'
  //           to={`/confirmation/${confirmationName.current}`}
  //         />
  //       );
  //     }
  //   }
  // };

  return (
    <Box>
      <Box mt={3}>
        <TextField
          id='profileNameField'
          type='text'
          variant='outlined'
          margin='dense'
          name='name'
          label={t("signUpForm.fieldLabels.profileName")}
          value={state.data.name}
          autoFocus
          fullWidth
          error={!!state.errors.name}
          helperText={state.errors.name}
          onChange={handleInputChanges}
        />
      </Box>

      <Box mt={2}>
        <TextField
          id='orgNameField'
          variant='outlined'
          margin='dense'
          type='text'
          name='name'
          label={t("signUpForm.fieldLabels.orgName")}
          value={state.data.organization}
          fullWidth
          onChange={handleInputChanges}
        />
      </Box>

      <Box mt={2}>
        <TextField
          id='emailField'
          type='email'
          variant='outlined'
          margin='dense'
          label={t("signUpForm.fieldLabels.profileEmail")}
          name='email'
          value={state.data.email}
          placeholder=''
          fullWidth
          error={!!state.errors.email}
          helperText={state.errors.email}
          onChange={handleInputChanges}
        />
      </Box>

      <Box mt={2}>
        <TextField
          id='passwordField'
          type={showPassword ? "text" : "password"}
          variant='outlined'
          margin='dense'
          label={t("signUpForm.fieldLabels.password")}
          name='password'
          value={state.data.password}
          fullWidth
          error={!!state.errors.password.length}
          helperText={state.errors.password}
          InputProps={{
            endAdornment:
              <InputAdornment position='end'>
                <IconButton
                  aria-label={t("signUpForm.togglePasswordVisibilityARIALabel")}
                  edge='end'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>,
          }}
          onChange={handleInputChanges}
        />
      </Box>

      <Box pt={5}>
        <Typography
          variant="caption"
          align="center"
          color="textSecondary"
        >
          <Trans i18nKey="reCaptcha.terms">
            {[
              <Link
                key="reCaptcha.privacy"
                to="https://policies.google.com/privacy"
                rel='noopener noreferrer'
                target='_blank'
                style={{ color: palette.info.main }}
              />,
              <Link
                key="reCaptcha.terms"
                to="https://policies.google.com/terms"
                rel='noopener noreferrer'
                target='_blank'
                style={{ color: palette.info.main }}
              />,
            ]}
          </Trans>
        </Typography>
      </Box>

      <Box mt={1.5}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          disableElevation
          fullWidth
          onClick={handleSubmit}
          disabled={isSignUpWorking || Object.entries(state.errors).some((v) => v[1].length)}
          endIcon={isSignUpWorking && <CircularProgress color="inherit" size={25} />}
        >
          {t("signInOrUpView.options.signUp")}
        </Button>
      </Box>

      <Box py={3} width="100%" display="flex" justifyContent="center">
        <Typography
          variant="caption"
          align="center"
          color="textSecondary"
        >
          <Trans i18nKey="signUpForm.privacyPolicyDisclaimer">
            {[
              <Link
                key="signUpForm.privacyPolicyDisclaimer"
                to="https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/760938500/Privacy+Policy"
                rel='noopener noreferrer'
                target='_blank'
                style={{ color: palette.info.main }}
              />,
            ]}
          </Trans>
        </Typography>
      </Box>
    </Box>
  );
};
