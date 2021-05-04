import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TextField, TextFieldProps, useTranslation } from "@apisuite/fe-base";
import update from "immutability-helper";

import FormCard from "components/FormCard";
import { notEmpty, isValidEmail } from "util/forms";

import { signUpFormSelector } from "./selector";
import useStyles from "./styles";
import { GenericSignUpFormProps } from "./types";

export const ProfileDetailsForm: React.FC<GenericSignUpFormProps> = ({ next, error }) => {
  const classes = useStyles();
  const [t] = useTranslation();
  // TODO: make a selector just for this component or authError changes that is passed by parent as well
  // might make this component re-render twice
  const { isSignUpWorking } = useSelector(signUpFormSelector);

  // Form changes logic
  const [state, setState] = useState({
    data: {
      email: "",
      name: "",
    },
    errors: {
      email: "",
      name: "",
    },
  });

  // sync email errors from parent
  useEffect(() => {
    setState((s) => ({ ...s, errors: { ...s.errors, email: error } }));
  }, [error]);

  const handleInputChanges: TextFieldProps["onChange"] = ({ target }) => {
    setState((s) => {
      switch (target.name) {
        case "name": {
          return update(s, {
            data: { name: { $set: target.value } },
            errors: { name: { $set: notEmpty(target.value) ? "" : t("signUpForm.warnings.profileName") } },
          });
        }

        case "email": {
          return update(s, {
            data: { email: { $set: target.value } },
            errors: {
              email: {
                $set: isValidEmail(target.value) ? "" : t("signUpForm.warnings.email"),
                // TODO: move to parent
                // ? t('signUpForm.warnings.emailInUse')
              },
            },
          });
        }

        default:
          return s;
      }
    });
  };

  function formIsValid () {
    const { data, errors } = state;
    return data.name.length && data.email.length && !Object.values(errors).some(Boolean);
  }

  return (
    <div className={classes.signUpContainer}>
      <FormCard
        buttonDisabled={!formIsValid()}
        buttonLabel={t("signUpForm.nextStepButtonLabel")}
        handleSubmit={() => formIsValid() && next(state.data.name, state.data.email)}
        loading={isSignUpWorking}
      >
        <div className={classes.inputFieldContainer}>
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
            InputProps={{ classes: { input: classes.inputField } }}
            onChange={handleInputChanges}
          />
        </div>

        <div className={classes.inputFieldContainer}>
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
            InputProps={{ classes: { input: classes.inputField } }}
            onChange={handleInputChanges}
          />
        </div>
      </FormCard>
    </div>
  );
};
