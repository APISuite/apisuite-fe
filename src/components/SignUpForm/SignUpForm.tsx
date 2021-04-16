import React from 'react'
import { Redirect } from 'react-router-dom'
import qs from 'qs'
import { useTranslation, IconButton, InputAdornment } from '@apisuite/fe-base'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import FormCard from 'components/FormCard'
import FormField, { isRequired, isValidEmail, isValidPass, isValidURL, parseErrors } from 'components/FormField'
import { FormFieldEvent } from 'components/FormField/types'
import StepsProgress from 'components/StepsProgress'

import LoadingView from './LoadingView'

import useStyles from './styles'
import { OrganisationDetailsProps, ProfileDetailsProps, SecurityDetailsProps, SignUpFormProps } from './types'

const ProfileDetailsForm: React.FC<ProfileDetailsProps> = ({
  handleSubmit,
  preFilledEmail,
  register,
  token,
}) => {
  const classes = useStyles()

  const [t] = useTranslation()

  // Form validity logic
  const [isFormValid, setFormValid] = React.useState(false)
  const [errors, setErrors] = React.useState()

  // Form changes logic
  const [hasEmail, setEmail] = React.useState(!!preFilledEmail)
  const [formInputs, setFormInputs] = React.useState({
    email: preFilledEmail || '',
    name: '',
    token,
  })

  const handleInputChanges = (event: FormFieldEvent, error: any) => {
    setFormInputs({
      ...formInputs,
      [event.target.name]: event.target.value,
    })

    const eventTarget = event.target

    // @ts-ignore
    setErrors((old: string[]) => parseErrors(eventTarget, error, old || []))
  }

  /* Handles a "go back to the sign-up's 'Personal details' section" situation. */
  React.useEffect(() => {
    if (register.back && formInputs.email === '') {
      setFormInputs({
        ...formInputs,
        email: register.previousData?.personal?.email,
        name: register.previousData?.personal?.name,
      })
    }
  })

  /* Handles a "you've been invited to join API Suite" situation. */
  React.useEffect(() => {
    if (register.invitation && register.invitation.email && !formInputs.email && !hasEmail) {
      setEmail(true)

      setFormInputs({
        ...formInputs,
        email: register.invitation.email,
      })
    }

    // @ts-ignore
    setFormValid(errors && errors.length === 0)
  }, [errors, formInputs, hasEmail, register])

  return (
    <div className={classes.signUpContainer}>
      <FormCard
        buttonDisabled={
          !isFormValid || (register.error === '409' && formInputs.email === register.submittedEmail)
        }
        buttonLabel={t('signUpForm.nextStepButtonLabel')}
        handleSubmit={
          () => isFormValid
            ? handleSubmit(formInputs)
            : () => { /* Do nothing */ }
        }
        loading={register.isRequesting}
        showBack={false}
      >
        <div className={classes.inputFieldContainer}>
          <FormField
            autoFocus
            errorPlacing='bottom'
            fullWidth
            id='profileNameField'
            InputProps={{
              classes: { input: classes.inputField },
            }}
            label={t('signUpForm.fieldLabels.profileName')}
            name='name'
            onChange={handleInputChanges}
            rules={[
              {
                rule: isRequired(formInputs.name),
                message: t('signUpForm.warnings.profileName'),
              },
            ]}
            type='text'
            value={formInputs.name}
            variant='outlined'
          />
        </div>

        <div className={classes.inputFieldContainer}>
          <FormField
            disabled={hasEmail}
            errorPlacing='bottom'
            fullWidth
            id='emailField'
            InputProps={{
              classes: { input: classes.inputField },
            }}
            label={t('signUpForm.fieldLabels.profileEmail')}
            name='email'
            onChange={handleInputChanges}
            placeholder=''
            rules={[
              {
                rule: isValidEmail(formInputs.email),
                message: t('signUpForm.warnings.email'),
              },

              /* If the most recently submitted E-mail caused an error (meaning that it's already in use),
              and every time our 'E-mail' field's current value is the same as the one that was submitted
              (and caused an error), we return 'true' so as to make our error message appear. */
              {
                rule: !(register.error === '409' && formInputs.email === register.submittedEmail),
                message: t('signUpForm.warnings.emailInUse'),
              },
            ]}
            type='email'
            value={formInputs.email}
            variant='outlined'
          />
        </div>
      </FormCard>
    </div>
  )
}

const OrganisationDetailsForm: React.FC<OrganisationDetailsProps> = ({
  handleSubmit,
  previousStep,
  register,
}) => {
  const classes = useStyles()

  const [t] = useTranslation()

  // Form validity logic
  const [isFormValid, setFormValid] = React.useState(true)
  const [errors, setErrors] = React.useState()

  // Form changes logic
  const [formInputs, setFormInputs] = React.useState({
    name: '',
    website: '',
  })
  const [formInputsHaveBeenManipulated, setFormInputsHaveBeenManipulated] = React.useState(false)

  const handleInputChanges = (event: FormFieldEvent, error: any) => {
    setFormInputs({
      ...formInputs,
      [event.target.name]: event.target.value,
    })

    setFormInputsHaveBeenManipulated(true)

    const eventTarget = event.target

    // @ts-ignore
    setErrors((old: string[]) => parseErrors(eventTarget, error, old || []))
  }

  /* Handles a "go back to the sign-up's 'Organisation details' section" situation. */
  React.useEffect(() => {
    if (
      register.back &&
      register.previousData.org &&
      !formInputsHaveBeenManipulated &&
      (formInputs.name === '' || formInputs.website === '')
    ) {
      setFormInputs({
        ...formInputs,
        name: register.previousData?.org?.name,
        website: register.previousData?.org?.website,
      })
    }

    // @ts-ignore
    setFormValid(errors && errors.length === 0)
  }, [errors, formInputs, formInputsHaveBeenManipulated, register])

  return (
    <div className={classes.signUpContainer}>
      <FormCard
        backLabel={t('signUpForm.previousStepButtonLabel')}
        buttonDisabled={
          (formInputs.name === '' && formInputs.website !== '')
            ? true
            : (
              formInputs.name !== '' && formInputs.website !== ''
                ? !isFormValid
                : false
            )
        }
        buttonLabel={t('signUpForm.nextStepButtonLabel')}
        handleBackClick={(event) => {
          event.preventDefault()

          previousStep()
        }}
        handleSubmit={
          () => isFormValid
            ? handleSubmit(formInputs)
            : () => { /* Do nothing */ }
        }
        loading={register.isRequesting}
        showBack
      >
        <div className={classes.inputFieldContainer}>
          <FormField
            autoFocus
            errorPlacing='bottom'
            fullWidth
            id='orgNameField'
            InputProps={{
              classes: { input: classes.inputField },
            }}
            label={t('signUpForm.fieldLabels.orgName')}
            name='name'
            onChange={handleInputChanges}
            rules={[
              /* TODO: Change this rule to 'formInputs.website.length === 0 || isValidURL(formInputs.website)'
              once the sign up process' BE is capable of having its organisation details as optional. */
              {
                rule: !(formInputs.name === '' && formInputs.website !== ''),
                message: t('signUpForm.warnings.invalidWebsite'),
              },
            ]}
            type='text'
            value={formInputs.name}
            variant='outlined'
          />
        </div>

        <div className={classes.inputFieldContainer}>
          <FormField
            errorPlacing='bottom'
            fullWidth
            id='websiteField'
            InputProps={{
              classes: { input: classes.inputField },
            }}
            label={t('signUpForm.fieldLabels.orgWebsite')}
            name='website'
            onChange={handleInputChanges}
            placeholder=''
            rules={[
              {
                rule: formInputs.website === '' || isValidURL(formInputs.website),
                message: t('signUpForm.warnings.invalidWebsite'),
              },
            ]}
            type='text'
            value={formInputs.website}
            variant='outlined'
          />
        </div>
      </FormCard>
    </div>
  )
}

const SecurityDetailsForm: React.FC<SecurityDetailsProps> = ({
  handleSubmit,
  previousStep,
  register,
  token,
}) => {
  const classes = useStyles()

  const [t] = useTranslation()

  // Form validity logic
  const [isFormValid, setFormValid] = React.useState(false)
  const [errors, setErrors] = React.useState()

  React.useEffect(() => {
    // @ts-ignore
    setFormValid(errors && errors.length === 0)
  }, [errors])

  // Form changes logic
  const [formInputs, setFormInputs] = React.useState({
    password: '',
    token,
  })

  const handleInputChanges = (event: FormFieldEvent, error: any) => {
    setFormInputs({
      ...formInputs,
      [event.target.name]: event.target.value,
    })

    const eventTarget = event.target

    // @ts-ignore
    setErrors((old: string[]) => parseErrors(eventTarget, error, old || []))
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
        buttonDisabled={!isFormValid}
        buttonLabel={t('signUpForm.lastStepButtonLabel')}
        handleBackClick={(event) => {
          event.preventDefault()

          previousStep()
        }}
        handleSubmit={
          () => isFormValid
            ? handleSubmit(formInputs)
            : () => { /* Do nothing */ }
        }
        loading={register.isRequesting}
        showBack
      >
        <div className={classes.inputFieldContainer}>
          <div>
            <FormField
              errorPlacing='bottom'
              fullWidth
              id='passwordField'
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
              label={t('signUpForm.fieldLabels.password')}
              name='password'
              onChange={handleInputChanges}
              rules={[
                {
                  rule: isValidPass(formInputs.password),
                  message: t('signUpForm.warnings.password'),
                },
              ]}
              type={showPassword ? 'text' : 'password'}
              value={formInputs.password}
              variant='outlined'
            />
          </div>
        </div>
      </FormCard>
    </div>
  )
}

export let steps = {
  1: 'Step 1',
  2: 'Step 2',
  3: 'Step 3',
  4: 'Success',
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  preFilledEmail,
  previousStep,
  register,
  submitOrganisationDetails,
  submitProfileDetails,
  submitSecurityDetails,
  validateToken,
}) => {
  const classes = useStyles()

  const [t] = useTranslation()

  // Invitation logic

  // Retrieves the invitation token from the URL
  const invitationToken = qs.parse(window.location.search.slice(1)).token || undefined

  const { invitation, invitationError } = register

  React.useEffect(() => {
    if (invitationToken && !invitation.email && invitationError === undefined) {
      validateToken(invitationToken)
    }
  }, [invitation, invitationError, invitationToken])

  // Steps logic

  const step = register.step

  steps = {
    ...steps,
    1: t('signUpForm.steps.profileDetails'),
    2: t('signUpForm.steps.organisationDetails'),
    3: t('signUpForm.steps.securityDetails'),
  }

  if (invitationToken) {
    // @ts-ignore
    delete steps[2]
  }

  const signUpFormStep = (step: keyof typeof steps) => {
    switch (step) {
      case 1:
        return (
          <ProfileDetailsForm
            handleSubmit={submitProfileDetails}
            key='profileDetailsForm'
            preFilledEmail={preFilledEmail}
            register={register}
            token={invitationToken}
          />
        )

      case 2:
        return (
          <OrganisationDetailsForm
            handleSubmit={submitOrganisationDetails}
            key='organisationDetailsForm'
            previousStep={previousStep}
            register={register}
          />
        )

      case 3:
        return (
          <SecurityDetailsForm
            handleSubmit={submitSecurityDetails}
            key='securityDetailsForm'
            previousStep={previousStep}
            register={register}
            token={invitationToken}
          />
        )

      case 4:
        return (
          <Redirect
            key='redirectToAccountConfirmation'
            to='/confirmation'
          />
        )
    }
  }

  // 'Sign up' form's views logic

  const signUpFormView = (
    <>
      <StepsProgress
        currentStep={step}
        steps={steps}
      />

      {signUpFormStep(step)}

      <div className={classes.privacyPolicyDisclaimerContainer}>
        <p className={classes.privacyPolicyDisclaimerText}>
          {t('signUpForm.privacyPolicyDisclaimerPartOne')}
        </p>

        <a
          className={classes.privacyPolicyDisclaimerLink}
          href='https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/760938500/Privacy+Policy'
          rel='noopener noreferrer'
          target='_blank'
        >
          {t('signUpForm.privacyPolicyDisclaimerPartTwo')}
        </a>

        <p className={classes.privacyPolicyDisclaimerText}>.</p>
      </div>
    </>
  )

  return (
    <>
      {
        invitationToken
          ? (
            <>
              {
                invitation.email
                  ? (
                    signUpFormView
                  )
                  : (
                    <LoadingView
                      errorMessage={t('signUpForm.warnings.invalidInvitation')}
                      isError={!!invitationError}
                      isLoading={!invitation.email && !invitationError}
                    />
                  )
              }
            </>
          )
          : (
            signUpFormView
          )
      }
    </>
  )
}

export default SignUpForm
