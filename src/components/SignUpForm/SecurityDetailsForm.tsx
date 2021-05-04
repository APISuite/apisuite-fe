import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation, IconButton, InputAdornment, TextFieldProps, TextField } from "@apisuite/fe-base";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import FormCard from "components/FormCard";
import { isValidPass } from "util/forms";

import useStyles from "./styles";
import { GenericSignUpFormProps } from "./types";
import { signUpFormSelector } from "./selector";

export const SecurityDetailsForm: React.FC<GenericSignUpFormProps> = ({ back, next, error }) => {
  const classes = useStyles();
  const [t] = useTranslation();
  // TODO: make a selector just for this component or authError changes that is passed by parent as well
  // might make this component re-render twice
  const { isSignUpWorking } = useSelector(signUpFormSelector);
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState({
    password: "",
    error: "",
  });

  // sync security errors from parent
  useEffect(() => {
    setState((s) => ({ ...s, error }));
  }, [error]);

  const handleInputChanges: TextFieldProps["onChange"] = ({ target }) => {
    setState({
      password: target.value,
      error: isValidPass(target.value) ? "" : t("signUpForm.warnings.password"),
    });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={classes.signUpContainer}>
      <FormCard
        backLabel={t("signUpForm.previousStepButtonLabel")}
        buttonDisabled={!state.password.length || !!state.error.length}
        buttonLabel={t("signUpForm.lastStepButtonLabel")}
        handleBackClick={(event) => {
          event.preventDefault();
          back();
        }}
        handleSubmit={() => {
          if (state.password.length && !state.error.length) {
            next(state.password);
          }
        }}
        loading={isSignUpWorking}
        showBack
      >
        <div className={classes.inputFieldContainer}>
          <div>
            <TextField
              id='passwordField'
              type={showPassword ? "text" : "password"}
              variant='outlined'
              margin='dense'
              label={t("signUpForm.fieldLabels.password")}
              name='password'
              value={state.password}
              fullWidth
              error={!!state.error.length}
              helperText={state.error}
              InputProps={{
                classes: { input: classes.inputField },
                endAdornment:
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label={t("signUpForm.togglePasswordVisibilityARIALabel")}
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
        </div>
      </FormCard>
    </div>
  );
};
