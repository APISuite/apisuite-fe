
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

const RegisterPortal: React.FC<RegisterPortalProps> = ({ register, registerUser }) => {
  const classes = useStyles()
  const [t] = useTranslation()

  const [showPassword, setShowPassword] = React.useState(false)
  const [isFormValid, setFormValid] = React.useState(false)
  const [errors, setErrors] = React.useState()
  const [input, setInput] = React.useState({
    name: '',
    email: '',
    password: '',
  })

  const registerButtonLabel = 'CREATE ACCOUNT'

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, err: any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    setErrors(parseErrors(e.target, err, errors || []))
  }

  function handleClickShowPassword () {
    setShowPassword(!showPassword)
  }

  React.useEffect(() => {
    setFormValid(errors && errors.length === 0)
  }, [errors])

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    registerUser({
      name: input.name,
      email: input.email,
      password: input.password,
    })
  }

  return (
    <div className={classes.registerContainer}>
      <div className={classes.content}>
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
              margin='none'
              type='text'
              name='name'
              value={input.name}
              onChange={handleInputs}
              autoFocus
              fullWidth
              errorPlacing='right'
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
              margin='none'
              type='email'
              name='email'
              value={input.email}
              onChange={handleInputs}
              fullWidth
              errorPlacing='right'
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
                margin='none'
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={input.password}
                fullWidth
                errorPlacing='right'
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
