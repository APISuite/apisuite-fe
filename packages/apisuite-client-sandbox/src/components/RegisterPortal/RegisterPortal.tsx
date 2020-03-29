
import * as React from 'react'
import { RegisterPortalProps } from './types'
import FormCard from 'components/FormCard'
import FormField, { parseErrors, isValidEmail, isValidPass } from 'components/FormField'
import useStyles from './styles'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputAdornment from '@material-ui/core/InputAdornment'
import { useTranslation } from 'react-i18next'
import { FormFieldEvent } from 'components/FormField/types'

const RegisterPortal: React.FC<RegisterPortalProps> = ({ register, registerUser, defaultEmail }) => {
  const classes = useStyles()
  const [t] = useTranslation()

  const [showPassword, setShowPassword] = React.useState(false)
  const [isFormValid, setFormValid] = React.useState(false)
  const [errors, setErrors] = React.useState()
  const [input, setInput] = React.useState({
    name: '',
    email: defaultEmail || '',
    password: '',
  })

  const registerButtonLabel = 'CREATE ACCOUNT'

  const handleInputs = (e: FormFieldEvent, err: any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    const eventTarget = e.target
    setErrors((old: string[]) => parseErrors(eventTarget, err, old || []))
  }

  function handleClickShowPassword () {
    setShowPassword(!showPassword)
  }

  React.useEffect(() => {
    setFormValid(errors && errors.length === 0)
  }, [errors])

  function handleSubmit (e: React.FormEvent<HTMLFormElement> | KeyboardEvent) {
    e.preventDefault()
    registerUser({
      name: input.name,
      email: input.email,
      password: input.password,
    })
  }

  const submitEnter = (event: KeyboardEvent) => {
    const { key } = event
    const inputEl = document.getElementById('pass-field')

    if (key === 'Enter' && document.activeElement === inputEl && isFormValid) {
      handleSubmit(event)
    }
  }

  React.useEffect(() => {
    window.addEventListener('keydown', submitEnter)

    return () => {
      window.removeEventListener('keydown', submitEnter)
    }
  }, [submitEnter])

  return (
    <div className={classes.registerContainer}>
      <div>
        <FormCard
          buttonLabel={registerButtonLabel}
          buttonDisabled={!isFormValid}
          loading={register.isRegistering}
          error={register.error}
          handleSubmit={handleSubmit}
        >
          <div className={classes.fieldContainer}>
            <FormField
              id='name-field'
              label='Your name'
              variant='outlined'
              type='text'
              name='name'
              value={input.name}
              onChange={handleInputs}
              autoFocus
              fullWidth
              errorPlacing='bottom'
              InputProps={{
                classes: { input: classes.emailTextfield },
              }}
              rules={[
                { rule: input.name.length > 0, message: t('registerPortal.warnings.name') },
              ]}
            />
          </div>
          <div className={classes.fieldContainer}>
            <FormField
              id='email-field'
              label='E-mail'
              variant='outlined'
              type='email'
              name='email'
              value={input.email}
              onChange={handleInputs}
              fullWidth
              errorPlacing='bottom'
              InputProps={{
                classes: { input: classes.emailTextfield },
              }}
              rules={[
                { rule: isValidEmail(input.email), message: t('registerPortal.warnings.email') },
              ]}
            />
          </div>
          <div className={classes.fieldContainer}>
            <div className={classes.passPhraseContainer}>
              <FormField
                id='pass-field'
                label='Password'
                variant='outlined'
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={input.password}
                fullWidth
                errorPlacing='bottom'
                onChange={handleInputs}
                rules={[
                  { rule: isValidPass(input.password), message: t('registerPortal.warnings.password') },
                ]}
                InputProps={{
                  classes: { input: classes.passPhrasefield },
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
              />
            </div>

          </div>
        </FormCard>
      </div>
    </div>
  )
}

export default RegisterPortal
