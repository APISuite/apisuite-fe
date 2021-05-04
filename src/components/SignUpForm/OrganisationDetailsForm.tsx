import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TextField, TextFieldProps, useTranslation } from "@apisuite/fe-base";

import FormCard from "components/FormCard";

import useStyles from "./styles";
import { GenericSignUpFormProps } from "./types";
import { signUpFormSelector } from "./selector";

export const OrganisationDetailsForm: React.FC<GenericSignUpFormProps> = ({ next, back, error }) => {
  const classes = useStyles();
  const [t] = useTranslation();
  // TODO: make a selector just for this component or authError changes that is passed by parent as well
  // might make this component re-render twice
  const { isSignUpWorking } = useSelector(signUpFormSelector);

  // Form changes logic
  const [state, setState] = useState({
    name: "",
    website: "",
    error: "",
  });

  // sync organisation errors from parent
  useEffect(() => {
    setState((s) => ({ ...s, error }));
  }, [error]);

  const handleInputChanges: TextFieldProps["onChange"] = ({ target }) => {
    setState((s) => ({
      ...s,
      [target.name]: target.value,
    }));
  };

  return (
    <div className={classes.signUpContainer}>
      <FormCard
        backLabel={t("signUpForm.previousStepButtonLabel")}
        buttonDisabled={false}
        buttonLabel={t("signUpForm.nextStepButtonLabel")}
        handleBackClick={(event) => {
          event.preventDefault();
          back();
        }}
        handleSubmit={() => next(state.name, state.website)}
        loading={isSignUpWorking}
        showBack
      >
        <div className={classes.inputFieldContainer}>
          <TextField
            id='orgNameField'
            variant='outlined'
            margin='dense'
            type='text'
            name='name'
            label={t("signUpForm.fieldLabels.orgName")}
            value={state.name}
            error={!!state.error}
            helperText={state.error}
            autoFocus
            fullWidth
            InputProps={{ classes: { input: classes.inputField } }}
            onChange={handleInputChanges}
          />
        </div>

        <div className={classes.inputFieldContainer}>
          <TextField
            id='websiteField'
            variant='outlined'
            margin='dense'
            type='text'
            label={t("signUpForm.fieldLabels.orgWebsite")}
            name='website'
            value={state.website}
            placeholder=''
            fullWidth
            InputProps={{ classes: { input: classes.inputField } }}
            onChange={handleInputChanges}
          />
        </div>
      </FormCard>
    </div>
  );
};
