import * as React from 'react'
import { LoginFormProps } from './types'
import FormCard from 'components/FormCard'
import FormField, { parseErrors, isValidEmail } from 'components/FormField'
import useStyles from './styles'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputAdornment from '@material-ui/core/InputAdornment'
import { useTranslation } from 'react-i18next'
import { FormFieldEvent } from 'components/FormField/types'

const LoginForm: React.FC<LoginFormProps> = ({
  auth,
  login,
  history,
}) => {
  const classes = useStyles()
  const [t] = useTranslation()

  const [showPassword, setShowPassword] = React.useState(false)
  const [isFormValid, setFormValid] = React.useState(false)
  const [errors, setErrors] = React.useState()
  const [input, setInput] = React.useState({
    email: '',
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

  function handleClickShowPassword () {
    setShowPassword(!showPassword)
  }

  function handleSubmit (e: React.FormEvent<HTMLFormElement> | KeyboardEvent) {
    e.preventDefault()
    login({ email: input.email, password: input.password })
  }

  React.useEffect(() => {
    setFormValid(errors && errors.length === 0)
  }, [errors])

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
    <div className={classes.loginContainer}>
      <FormCard
        buttonLabel={t('loginForm.button')}
        buttonDisabled={!isFormValid}
        loading={auth.isAuthorizing}
        error={auth.error}
        handleSubmit={handleSubmit}
      >
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
            autoFocus
            fullWidth
            errorPlacing='bottom'
            InputProps={{
              classes: { input: classes.emailTextfield },
            }}
            rules={[
              { rule: isValidEmail(input.email), message: t('loginForm.warnings.email') },
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
              onChange={handleInputs}
              fullWidth
              errorPlacing='bottom'
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
              rules={[
                { rule: input.password.length > 0, message: t('loginForm.warnings.password') },
              ]}
            />
          </div>
        </div>
      </FormCard>
      <a
        className={classes.forgotPassword}
        onClick={() => history.push('/forgot')}
      >
        Forgot password?
      </a>
    </div>
  )
}

export default LoginForm
