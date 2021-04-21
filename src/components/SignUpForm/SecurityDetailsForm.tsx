import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation, IconButton, InputAdornment, TextFieldProps, TextField } from '@apisuite/fe-base'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import FormCard from 'components/FormCard'
import { isValidPass } from 'util/forms'

import useStyles from './styles'
import { SecurityDetailsProps } from './types'
import { previousStepAction, submitSecurityDetailsActions } from './ducks'

export const SecurityDetailsForm: React.FC<SecurityDetailsProps> = ({
  register,
  token,
}) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [t] = useTranslation()

  // Form changes logic
  const [formInputs, setFormInputs] = useState({
    password: '',
    error: '',
  })

  const handleInputChanges: TextFieldProps['onChange'] = ({ target }) => {
    setFormInputs({
      password: target.value,
      error: isValidPass(target.value) ? '' : t('signUpForm.warnings.password'),
    })
  }

  // 'Show password' logic
  const [showPassword, setShowPassword] = React.useState(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className={classes.signUpContainer}>
      <FormCard
        backLabel={t('signUpForm.previousStepButtonLabel')}
        buttonDisabled={!formInputs.password.length || !!formInputs.error.length}
        buttonLabel={t('signUpForm.lastStepButtonLabel')}
        handleBackClick={(event) => {
          event.preventDefault()

          dispatch(previousStepAction())
        }}
        handleSubmit={() => {
          if (formInputs.password.length && !formInputs.error.length) {
            dispatch(submitSecurityDetailsActions.request({ password: formInputs.password, token }))
          }
        }}
        loading={register.isRequesting}
        showBack
      >
        <div className={classes.inputFieldContainer}>
          <div>
            <TextField
              id='passwordField'
              type={showPassword ? 'text' : 'password'}
              variant='outlined'
              margin='dense'
              label={t('signUpForm.fieldLabels.password')}
              name='password'
              value={formInputs.password}
              fullWidth
              error={!!formInputs.error.length}
              helperText={formInputs.error}
              InputProps={{
                classes: { input: classes.inputField },
                endAdornment:
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label={t('signUpForm.togglePasswordVisibilityARIALabel')}
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
  )
}
