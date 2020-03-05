import * as React from 'react'
import { LoginPortalProps } from './types'
import FormCard from 'components/FormCard'
import FormField, { parseErrors, isValidEmail } from 'components/FormField'
import useStyles from './styles'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputAdornment from '@material-ui/core/InputAdornment'
import { useTranslation } from 'react-i18next'

const LoginPortal: React.FC<LoginPortalProps> = ({ auth, login }) => {
  const classes = useStyles()
  const [t] = useTranslation()

  const [showPassword, setShowPassword] = React.useState(false)
  const [isFormValid, setFormValid] = React.useState(false)
  const [errors, setErrors] = React.useState()
  const [input, setInput] = React.useState({
    email: '',
    password: '',
  })

  const handleInputs = (err: any) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    const eventTarget = e.target
    setErrors((old: any) => parseErrors(eventTarget, err, old || []))
  }

  function handleClickShowPassword () {
    setShowPassword(!showPassword)
  }

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    login({ email: input.email, password: input.password })
  }

  React.useEffect(() => {
    setFormValid(errors && errors.length === 0)
  }, [errors])

  return (
    <div className={classes.loginContainer}>
      <div className={classes.content}>
        <FormCard
          buttonLabel={t('loginPortal.button')}
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
              handleChange={handleInputs}
              autoFocus
              fullWidth
              errorPlacing='bottom'
              InputProps={{
                classes: { input: classes.emailTextfield },
              }}
              rules={[
                { rule: isValidEmail(input.email), message: t('loginPortal.warnings.email') },
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
                handleChange={handleInputs}
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
                  { rule: input.password.length > 0, message: t('loginPortal.warnings.password') },
                ]}
              />
            </div>
            <div className={classes.optionsContainer}>
              {/* <a className={classes.option} href='/'>Forgot your pass phrase?</a> */}
              {/* <a className={classes.option} href='/register'>Not registered yet? Sign up.</a> */}
            </div>
          </div>
        </FormCard>
      </div>
    </div>
  )
}

export default LoginPortal
