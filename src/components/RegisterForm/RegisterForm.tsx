import React from 'react'
import qs from 'qs'
import {
  RegisterFormProps,
  PersonalDetails,
  OrganisationDetails,
  SecurityStep,
} from './types'
import { useTranslation, IconButton, InputAdornment } from '@apisuite/fe-base'
import { Redirect } from 'react-router-dom'
import StepsProgress from 'components/StepsProgress'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import FormCard from 'components/FormCard'
import FormField, {
  parseErrors,
  isValidEmail,
  isRequired,
  isValidPass,
  isValidURL,
} from 'components/FormField'
import { FormFieldEvent } from 'components/FormField/types'
import useStyles from './styles'
import LoadingView from './loading'

const PersonalDetailsForm: React.FC<{
  handleSubmit: (personalDetails: PersonalDetails) => void,
  register: any,
  token: string | undefined,
}> = ({ handleSubmit, register, token }) => {
  const classes = useStyles()
  const [t] = useTranslation()

  const [isFormValid, setFormValid] = React.useState(false)
  const [errors, setErrors] = React.useState()
  const [hasEmail, setEmail] = React.useState(false)
  const [input, setInput] = React.useState({
    email: '',
    name: '',
    token,
  })

  const handleInputs = (e: FormFieldEvent, err: any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })

    const eventTarget = e.target

    // @ts-ignore
    setErrors((old: string[]) => parseErrors(eventTarget, err, old || []))
  }

  React.useEffect(() => {
    if (register.invitation && register.invitation.email && !input.email && !hasEmail) {
      setEmail(true)
      setInput({
        ...input,
        email: register.invitation.email,
      })
    }
    // @ts-ignore
    setFormValid(errors && errors.length === 0)
  }, [errors, hasEmail, input, register])

  React.useEffect(() => {
    if (register.back && input.email === '') {
      setInput({
        ...input,
        name: register.previousData?.personal?.name,
        email: register.previousData?.personal?.email,
      })
    }
  })

  return (
    <div className={classes.registerContainer}>
      <FormCard
        buttonLabel='Next'
        buttonDisabled={!isFormValid || (register.error === '409' && input.email === register.submittedEmail)}
        handleSubmit={() => isFormValid ? handleSubmit(input) : () => {
          // do nothing
        }}
        loading={register.isRequesting}
        showBack={false}
      >
        <div className={classes.fieldContainer}>
          <FormField
            id='name-field'
            label='Name'
            variant='outlined'
            type='text'
            name='name'
            value={input.name}
            onChange={handleInputs}
            autoFocus
            fullWidth
            errorPlacing='bottom'
            InputProps={{
              classes: { input: classes.textField },
            }}
            rules={[
              { rule: isRequired(input.name), message: t('registerForm.warnings.name') },
            ]}
          />
        </div>
        <div className={classes.fieldContainer}>
          <FormField
            id='email-field'
            label='E-mail'
            variant='outlined'
            type='email'
            placeholder=''
            name='email'
            value={input.email}
            onChange={handleInputs}
            fullWidth
            disabled={hasEmail}
            errorPlacing='bottom'
            InputProps={{
              classes: { input: classes.textField },
            }}
            rules={[
              { rule: isValidEmail(input.email), message: t('registerForm.warnings.email') },

              /* If the most recently submitted E-mail caused an error (meaning that it's already in use),
              and every time our 'E-mail' field's current value is the same as the one that was submitted
              (and caused an error), we return 'true' so as to make our error message appear. */
              { rule: !(register.error === '409' && input.email === register.submittedEmail), message: t('registerForm.warnings.emailInUse') },
            ]}
          />
        </div>
      </FormCard>
    </div>
  )
}

const OrganisationDetailsForm: React.FC<{
  handleSubmit: (organisationDetails: OrganisationDetails) => void,
  register: any,
  previousStep: () => void,
}> = ({ handleSubmit, register, previousStep }) => {
  const classes = useStyles()
  const [t] = useTranslation()

  const [isFormValid, setFormValid] = React.useState(false)
  const [errors, setErrors] = React.useState()
  const [input, setInput] = React.useState({
    name: '',
    website: '',
    // vat: '',
  })

  React.useEffect(() => {
    if (register.back && input.name === '') {
      setInput({
        ...input,
        name: register.previousData?.org?.name,
        website: register.previousData?.org?.website,
      })
    }
  })

  const handleInputs = (e: FormFieldEvent, err: any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    const eventTarget = e.target
    // @ts-ignore
    setErrors((old: string[]) => parseErrors(eventTarget, err, old || []))
  }

  React.useEffect(() => {
    // @ts-ignore
    setFormValid(errors && errors.length === 0)
  }, [errors])

  return (
    <div className={classes.registerContainer}>
      <FormCard
        buttonLabel='Next'
        buttonDisabled={!isFormValid}
        handleSubmit={() => isFormValid ? handleSubmit(input) : () => {
          // do nothing
        }}
        loading={register.isRequesting}
        showBack
        backLabel='Back'
        backDisabled={false}
        handleBackClick={(e) => {
          e.preventDefault()
          previousStep()
        }}
      >
        <div className={classes.fieldContainer}>
          <FormField
            id='name-field'
            label='Organisation Name'
            variant='outlined'
            type='text'
            name='name'
            value={input.name}
            onChange={handleInputs}
            autoFocus
            fullWidth
            errorPlacing='bottom'
            InputProps={{
              classes: { input: classes.textField },
            }}
            rules={[
              { rule: isRequired(input.name), message: t('registerForm.warnings.organisationName') },
            ]}
          />
        </div>
        <div className={classes.fieldContainer}>
          <FormField
            id='website-field'
            label='Website'
            variant='outlined'
            type='text'
            placeholder=''
            name='website'
            value={input.website}
            onChange={handleInputs}
            fullWidth
            errorPlacing='bottom'
            InputProps={{
              classes: { input: classes.textField },
            }}
            rules={[
              {
                rule: isValidURL(input.website),
                message: t('registerForm.warnings.invalidWebsite'),
              },
            ]}
          />
        </div>
        {/* VAT is not needed currently -- commented out of page
<div className={classes.fieldContainer}>
<FormField
id='vat-field'
label='VAT'
variant='outlined'
type='text'
placeholder=''
name='vat'
value={input.vat}
onChange={handleInputs}
fullWidth
errorPlacing='bottom'
InputProps={{
classes: { input: classes.textField },
}}
rules={[
{ rule: isRequired(input.vat), message: t('registerForm.warnings.vat') },
]}
/>
</div>
*/}
      </FormCard>
    </div>
  )
}

const SecurityStepForm: React.FC<{
  handleSubmit: (securityStep: SecurityStep) => void,
  register: any,
  token: string | undefined,
  previousStep: () => void,
}> = ({ handleSubmit, register, token, previousStep }) => {
  const classes = useStyles()
  const [t] = useTranslation()

  const [isFormValid, setFormValid] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [errors, setErrors] = React.useState()
  const [input, setInput] = React.useState({
    password: '',
    token,
  })

  const handleInputs = (e: FormFieldEvent, err: any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    const eventTarget = e.target
    // @ts-ignore
    setErrors((old: string[]) => parseErrors(eventTarget, err, old || []))
  }

  React.useEffect(() => {
    // @ts-ignore
    setFormValid(errors && errors.length === 0)
  }, [errors])

  function handleClickShowPassword () {
    setShowPassword(!showPassword)
  }

  return (
    <div className={classes.registerContainer}>
      <FormCard
        buttonLabel='Finish'
        buttonDisabled={!isFormValid}
        handleSubmit={() => isFormValid ? handleSubmit(input) : () => {
          // do nothing
        }}
        loading={register.isRequesting}
        showBack
        backLabel='Back'
        backDisabled={false}
        handleBackClick={(e) => {
          e.preventDefault()
          previousStep()
        }}
      >
        <div className={classes.fieldContainer}>
          <div>
            <FormField
              id='pass-field'
              label='Password'
              variant='outlined'
              type={showPassword ? 'text' : 'password'}
              name='password'
              value={input.password}
              onChange={handleInputs}
              fullWidth
              errorPlacing='bottom'
              InputProps={{
                classes: { input: classes.textField },
                endAdornment:
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      edge='end'
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>,
              }}
              rules={[
                { rule: isValidPass(input.password), message: t('registerForm.warnings.password') },
              ]}
            />
          </div>
        </div>
      </FormCard>
    </div>
  )
}

export let steps = {
  1: 'STEP 1',
  2: 'STEP 2',
  3: 'STEP 3',
  4: 'Success',
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  register,
  submitPersonalDetails,
  submitOrganisationDetails,
  submitSecurityStep,
  validateToken,
  previousStep,
}) => {
  // get token from url
  const invitationToken = qs.parse(window.location.search.slice(1)).token || undefined
  const { invitation, invitationError } = register

  React.useEffect(() => {
    if (invitationToken && !invitation.email && invitationError === undefined) {
      validateToken(invitationToken)
    }
  }, [invitationToken, invitation, invitationError])

  const step = register.step
  const [t] = useTranslation()
  steps = {
    ...steps,
    1: t('registerForm.steps.personalDetails'),
    2: t('registerForm.steps.organisationDetails'),
    3: t('registerForm.steps.securityStep'),
  }
  if (invitationToken) {
    // @ts-ignore
    delete steps[2]
  }

  const formStep = (step: keyof typeof steps) => {
    switch (step) {
      case 1:
        return <PersonalDetailsForm key='personal-details-1' register={register} token={invitationToken} handleSubmit={submitPersonalDetails} />
      case 2:
        return <OrganisationDetailsForm key='organisation-details-2' register={register} previousStep={previousStep} handleSubmit={submitOrganisationDetails} />
      case 3:
        return <SecurityStepForm key='security-details-3' register={register} token={invitationToken} previousStep={previousStep} handleSubmit={submitSecurityStep} />
      case 4:
        return <Redirect key='redirect-4' to='/confirmation' />
    }
  }

  const formView = (
    <>
      <StepsProgress steps={steps} currentStep={step} />
      {formStep(step)}
    </>
  )

  return (
    <>
      {
        invitationToken &&
        <>
          {
            !invitation.email &&
            <LoadingView
              isLoading={!invitation.email && !invitationError}
              isError={!!invitationError}
              errorMessage='This invitation is invalid or expired.'
            />
          }
          {invitation.email && formView}
        </>
      }
      {!invitationToken && formView}
    </>
  )
}

export default RegisterForm
