import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { TextField, TextFieldProps, useTranslation } from '@apisuite/fe-base'
import update from 'immutability-helper'

import FormCard from 'components/FormCard'
import { notEmpty, isValidEmail } from 'util/forms'

import useStyles from './styles'
import { ProfileDetailsProps } from './types'
import { submitProfileDetailsActions } from './ducks'

export const ProfileDetailsForm: React.FC<ProfileDetailsProps> = ({
  preFilledEmail,
  token,
}) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [t] = useTranslation()

  // Form changes logic
  const [state, setState] = useState({
    data: {
      email: preFilledEmail || '',
      name: '',
    },
    errors: {
      email: '',
      name: '',
    },
  })

  const handleInputChanges: TextFieldProps['onChange'] = ({ target }) => {
    setState((s) => {
      switch (target.name) {
        case 'name': {
          return update(s, {
            data: { name: { $set: target.value } },
            errors: { name: { $set: notEmpty(target.value) ? '' : t('signUpForm.warnings.profileName') } },
          })
        }

        case 'email': {
          return update(s, {
            data: { email: { $set: target.value } },
            errors: {
              email: {
                $set: register.error === '409' && target.value === register.submittedEmail
                  ? t('signUpForm.warnings.emailInUse')
                  : isValidEmail(target.value) ? '' : t('signUpForm.warnings.email'),
              },
            },
          })
        }

        default:
          return s
      }
    })
  }

  /* Handles a "go back to the sign-up's 'Personal details' section" situation. */
  useEffect(() => {
    if (register.back) {
      const email = register.invitation?.email ?? register.previousData?.personal?.email
      const name = register.previousData?.personal?.name

      setState((s) => ({
        ...s,
        data: { name, email },
        errors: {
          name: notEmpty(name) ? '' : t('signUpForm.warnings.profileName'),
          email: register.error === '409' && email === register.submittedEmail
            ? t('signUpForm.warnings.emailInUse') : isValidEmail(email) ? '' : t('signUpForm.warnings.email'),
        },
      }))
    }
  }, [t, register.back, register.previousData, register.invitation.email, register.submittedEmail, register.error])

  function formIsValid () {
    const { data, errors } = state
    return data.name.length && data.email.length && !Object.values(errors).some(Boolean)
  }

  return (
    <div className={classes.signUpContainer}>
      <FormCard
        buttonDisabled={
          !formIsValid() || (register.error === '409' && state.data.email === register.submittedEmail)
        }
        buttonLabel={t('signUpForm.nextStepButtonLabel')}
        handleSubmit={() => {
          if (formIsValid()) {
            dispatch(submitProfileDetailsActions.request({ ...state.data, token }))
          }
        }}
        loading={register.isRequesting}
        showBack={false}
      >
        <div className={classes.inputFieldContainer}>
          <TextField
            id='profileNameField'
            type='text'
            variant='outlined'
            margin='dense'
            name='name'
            label={t('signUpForm.fieldLabels.profileName')}
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
            label={t('signUpForm.fieldLabels.profileEmail')}
            name='email'
            value={state.data.email}
            placeholder=''
            fullWidth
            disabled={!!register.invitation?.email?.length}
            error={!!state.errors.email}
            helperText={state.errors.email}
            InputProps={{ classes: { input: classes.inputField } }}
            onChange={handleInputChanges}
          />
        </div>
      </FormCard>
    </div>
  )
}
