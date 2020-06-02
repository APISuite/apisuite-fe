import * as React from 'react'
import {
  RegisterFormProps,
  PersonalDetails,
  OrganisationDetails,
  SecurityStep,
} from './types'
import { useTranslation } from 'react-i18next'
import { Redirect } from 'react-router-dom'
import StepsProgress from 'components/StepsProgress'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
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

const PersonalDetailsForm: React.FC<{
  handleSubmit: (personalDetails: PersonalDetails) => void,
  register: any,
}> = ({ handleSubmit, register }) => {
  const classes = useStyles()
  const [t] = useTranslation()

  const [isFormValid, setFormValid] = React.useState(false)
  const [errors, setErrors] = React.useState()
  const [input, setInput] = React.useState({
    email: '',
    name: '',
  })

  const handleInputs = (e: FormFieldEvent, err: any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    const eventTarget = e.target
    setErrors((old: string[]) => parseErrors(eventTarget, err, old || []))
  }

  React.useEffect(() => {
    setFormValid(errors && errors.length === 0)
  }, [errors])

  return (
    <div className={classes.registerContainer}>
      <FormCard
        buttonLabel='Next'
        buttonDisabled={!isFormValid}
        handleSubmit={() => handleSubmit(input)}
        loading={register.isRequesting}
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
            errorPlacing='bottom'
            InputProps={{
              classes: { input: classes.textField },
            }}
            rules={[
              { rule: isValidEmail(input.email), message: t('registerForm.warnings.email') },
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
}> = ({ handleSubmit, register }) => {
  const classes = useStyles()
  const [t] = useTranslation()

  const [isFormValid, setFormValid] = React.useState(false)
  const [errors, setErrors] = React.useState()
  const [input, setInput] = React.useState({
    name: '',
    website: '',
    vat: '',
  })

  const handleInputs = (e: FormFieldEvent, err: any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    const eventTarget = e.target
    setErrors((old: string[]) => parseErrors(eventTarget, err, old || []))
  }

  React.useEffect(() => {
    setFormValid(errors && errors.length === 0)
  }, [errors])

  return (
    <div className={classes.registerContainer}>
      <FormCard
        buttonLabel='Next'
        buttonDisabled={!isFormValid}
        handleSubmit={() => handleSubmit(input)}
        loading={register.isRequesting}
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
              { rule: isValidURL(input.website), message: t('registerForm.warnings.website') },
            ]}
          />
        </div>
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
      </FormCard>
    </div>
  )
}

const SecurityStepForm: React.FC<{
  handleSubmit: (securityStep: SecurityStep) => void,
  register: any,
}> = ({ handleSubmit, register }) => {
  const classes = useStyles()
  const [t] = useTranslation()

  const [isFormValid, setFormValid] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [errors, setErrors] = React.useState()
  const [input, setInput] = React.useState({
    password: '',
  })

  const handleInputs = (e: FormFieldEvent, err: any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    const eventTarget = e.target
    setErrors((old: string[]) => parseErrors(eventTarget, err, old || []))
  }

  React.useEffect(() => {
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
        handleSubmit={() => handleSubmit(input)}
        loading={register.isRequesting}
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
}) => {
  const step = register.step
  const [t] = useTranslation()
  steps = {
    ...steps,
    1: t('registerForm.steps.personalDetails'),
    2: t('registerForm.steps.organisationDetails'),
    3: t('registerForm.steps.securityStep'),
  }

  const formStep = (step: keyof typeof steps) => {
    switch (step) {
      case 1:
        return <PersonalDetailsForm register={register} handleSubmit={submitPersonalDetails} />
      case 2:
        return <OrganisationDetailsForm register={register} handleSubmit={submitOrganisationDetails} />
      case 3:
        return <SecurityStepForm register={register} handleSubmit={submitSecurityStep} />
      case 4:
        return <Redirect to='/confirmation' />
    }
  }

  return (
    <>
      <StepsProgress steps={steps} currentStep={step} />
      {formStep(step)}
    </>
  )
}

export default RegisterForm
