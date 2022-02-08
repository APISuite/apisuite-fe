import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import update from "immutability-helper";
import { Box, Button, CircularProgress, IconButton, InputAdornment, TextField, TextFieldProps, Trans, Typography, useTheme, useTranslation } from "@apisuite/fe-base";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { notEmpty, isValidEmail, isValidPass } from "util/forms";
import { submitSignUpDetails } from "store/auth/actions/submitSignUpDetails";
import Link from "components/Link";
import { signUpFormSelector } from "./selector";
import { ReCaptchaPrivacyCopy } from "components/ReCaptchaPrivacyCopy";

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
    if (!Object.values(state.errors).some(Boolean)) {
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
          name='organization'
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
          helperText={t("signUpForm.warnings.password")}
          InputProps={{
            endAdornment:
              <InputAdornment position='end'>
                <IconButton
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
        <ReCaptchaPrivacyCopy />
      </Box>

      <Box mt={1.5}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          disableElevation
          fullWidth
          onClick={handleSubmit}
          disabled={isSignUpWorking || Object.values(state.errors).some(Boolean)}
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
