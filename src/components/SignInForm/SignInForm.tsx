import React, { useCallback } from 'react'
import { useTranslation, IconButton, InputAdornment } from '@apisuite/fe-base'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import FormCard from 'components/FormCard'
import FormField, { isValidEmail, parseErrors } from 'components/FormField'
import { FormFieldEvent } from 'components/FormField/types'
import SSOForm from 'components/SSOForm'

import { SignInFormProps } from './types'
import useStyles from './styles'

const SignInForm: React.FC<SignInFormProps> = ({
  auth,
  getProviders,
  history,
  login,
}) => {
  const classes = useStyles()

  const [t] = useTranslation()

  /* SSO sign in */

  React.useEffect(() => {
    if (auth.providers === null) {
      getProviders()
    }
  }, [])

  /* Regular sign in */

  // Form validity logic
  const [isFormValid, setFormValid] = React.useState(false)
  const [errors, setErrors] = React.useState()

  React.useEffect(() => {
    // @ts-ignore
    setFormValid(errors && errors.length === 0)
  }, [errors])

  // Form changes logic
  const [formInputs, setFormInputs] = React.useState({
    email: '',
    password: '',
  })
  const [formInputsHaveChanged, setFormInputsHaveChanged] = React.useState(false)

  const handleInputChanges = (event: FormFieldEvent, error: any) => {
    setFormInputs({
      ...formInputs,
      [event.target.name]: event.target.value,
    })

    setFormInputsHaveChanged(true)

    const eventTarget = event.target

    // @ts-ignore
    setErrors((old: string[]) => parseErrors(eventTarget, error, old || []))
  }

  const handleFormSubmission = useCallback((event: React.FormEvent<HTMLFormElement> | KeyboardEvent) => {
    event.preventDefault()

    login({ email: formInputs.email, password: formInputs.password })

    setFormInputsHaveChanged(false)
  }, [formInputs.email, formInputs.password, login])

  // 'Show password' logic
  const [showPassword, setShowPassword] = React.useState(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  // Logic for 'Press ENTER to submit form'
  const submitEnter = useCallback((event: KeyboardEvent) => {
    const { key } = event
    const inputElement = document.getElementById('passwordField')

    if (key === 'Enter' && document.activeElement === inputElement && isFormValid) {
      handleFormSubmission(event)
    }
  }, [isFormValid, handleFormSubmission])

  React.useEffect(() => {
    window.addEventListener('keydown', submitEnter)

    return () => {
      window.removeEventListener('keydown', submitEnter)
    }
  }, [submitEnter])

  return (
    <div className={classes.signInContainer}>
      {
        auth.providers && auth.providers.length !== 0 &&
        <>
          <SSOForm />

          <div className={classes.separatorContainer}>
            <div className={classes.separatorLine} />

            <div className={classes.separatorText}>
              <p>{t('signInForm.separatorLabel')}</p>
            </div>

            <div className={classes.separatorLine} />
          </div>
        </>
      }

      <FormCard
        buttonDisabled={!isFormValid}
        buttonLabel={t('signInForm.regularSignInButtonLabel')}
        customDisabledConfirmButtonStyles={classes.disabledConfirmButton}
        customEnabledConfirmButtonStyles={classes.enabledConfirmButton}
        /* We pass an error message to the 'FormCard' component if an authentication error is detected,
        and as long as a) the previously submitted inputs are not changed, and b) the 'E-mail' or
        'Password' input fields are not empty. */
        error={
          auth.error &&
            !formInputsHaveChanged &&
            (formInputs.email !== '' || formInputs.password !== '')
            ? auth.error
            : undefined
        }
        handleSubmit={handleFormSubmission}
        loading={auth.isAuthorizing}
      >
        <div className={classes.inputFieldContainer}>
          <FormField
            autoFocus
            errorPlacing='bottom'
            fullWidth
            id='emailField'
            InputProps={{
              classes: { input: classes.inputField },
            }}
            label={t('signInForm.fieldLabels.email')}
            name='email'
            onChange={handleInputChanges}
            placeholder=''
            rules={[
              { rule: isValidEmail(formInputs.email), message: t('signInForm.warnings.email') },
            ]}
            type='email'
            value={formInputs.email}
            variant='outlined'
          />
        </div>

        <div className={classes.inputFieldContainer}>
          <FormField
            errorPlacing='bottom'
            fullWidth
            id='passwordField'
            InputProps={{
              classes: { input: classes.inputField },
              endAdornment:
                <InputAdornment position='end'>
                  <IconButton
                    aria-label={t('signInForm.togglePasswordVisibilityARIALabel')}
                    edge='end'
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>,
            }}
            label={t('signInForm.fieldLabels.password')}
            name='password'
            onChange={handleInputChanges}
            rules={[
              { rule: formInputs.password.length > 0, message: t('signInForm.warnings.password') },
            ]}
            type={showPassword ? 'text' : 'password'}
            value={formInputs.password}
            variant='outlined'
          />
        </div>
      </FormCard>

      <a
        className={classes.forgotPasswordLink}
        onClick={() => history.push('/forgot')}
      >
        {t('signInForm.forgotPasswordLinkLabel')}
      </a>
    </div>
  )
}

export default SignInForm
