import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { TextField, TextFieldProps, useTranslation } from '@apisuite/fe-base'

import FormCard from 'components/FormCard'

import useStyles from './styles'
import { OrganisationDetailsProps } from './types'
import { previousStepAction, submitOrganisationDetailsActions } from './ducks'

export const OrganisationDetailsForm: React.FC<OrganisationDetailsProps> = ({ register }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [t] = useTranslation()

  // Form changes logic
  const [state, setState] = useState({
    name: '',
    website: '',
  })

  const handleInputChanges: TextFieldProps['onChange'] = ({ target }) => {
    setState((s) => ({
      ...s,
      [target.name]: target.value,
    }))
  }

  /* Handles a "go back to the sign-up's 'Organisation details' section" situation. */
  useEffect(() => {
    if (register.back && register.previousData.org) {
      setState({
        name: register.previousData?.org?.name,
        website: register.previousData?.org?.website,
      })
    }
  }, [register.back, register.previousData.org, t])

  return (
    <div className={classes.signUpContainer}>
      <FormCard
        backLabel={t('signUpForm.previousStepButtonLabel')}
        buttonDisabled={false}
        buttonLabel={t('signUpForm.nextStepButtonLabel')}
        handleBackClick={(event) => {
          event.preventDefault()

          dispatch(previousStepAction())
        }}
        handleSubmit={() => {
          dispatch(submitOrganisationDetailsActions.request(state))
        }}
        loading={register.isRequesting}
        showBack
      >
        <div className={classes.inputFieldContainer}>
          <TextField
            id='orgNameField'
            variant='outlined'
            margin='dense'
            type='text'
            name='name'
            label={t('signUpForm.fieldLabels.orgName')}
            value={state.name}
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
            label={t('signUpForm.fieldLabels.orgWebsite')}
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
  )
}
