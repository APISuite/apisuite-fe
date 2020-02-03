
import * as React from 'react'
import { RegisterPortalProps } from './types'
import FormCard from 'components/FormCard'
import TextField from '@material-ui/core/TextField'
import useStyles from './styles'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Shuffle from '@material-ui/icons/Shuffle'
import generator from 'generate-password'
import { useTranslation } from 'react-i18next'

const RegisterPortal: React.FC<RegisterPortalProps> = ({ registerUser, errorMsg, success }) => {
  const classes = useStyles()
  const [t] = useTranslation()

  const [showPassword, setShowPassword] = React.useState(false)
  const [emailError, setEmailError] = React.useState(false)
  const [passError, setPassError] = React.useState(false)
  const [nameError, setNameError] = React.useState(false)
  const [focusedField, setFocusedField] = React.useState('name-field')
  const [filledName, setFilledName] = React.useState(false)
  const [filledEmail, setFilledEmail] = React.useState(false)
  const [filledPass, setFilledPass] = React.useState(false)
  const [buttonDisabled, setButtonDisabled] = React.useState(true)
  const [formMsg, setFormMsg] = React.useState('')
  const [input, setInput] = React.useState({
    name: '',
    email: '',
    password: '',
  })

  const nameFieldId = 'name-field'
  const emailFieldId = 'email-field'
  const passFieldId = 'pass-field'
  const registerTitle = 'Registration'
  const registerButtonLabel = 'Confirm'
  const closeRoute = '/'
  const passMinLength = 12

  function isValidName (name: string) {
    return (name.length > 0)
  }

  function isValidEmail (email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  function isValidPass (pass: string) {
    const uppercase = /[A-Z]/
    const lowercase = /[a-z]/
    const symbol = /[\W]{1,}/
    const passLength = (pass.length >= passMinLength)
    return (uppercase.test(pass) && lowercase.test(pass) && symbol.test(pass) && passLength)
  }

  function isFormValid (name: string, email: string, pass: string) {
    setButtonDisabled(!(filledName && filledEmail && filledPass && isValidName(name) &&
     isValidEmail(email) && isValidPass(pass)))
  }

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    if (e.target.name === 'name') {
      if (nameError) {
        setNameError(!isValidName(e.target.value))
      }
      isFormValid(e.target.value, input.email, input.password)
    }
    if (e.target.name === 'email') {
      if (emailError) {
        setEmailError(!isValidEmail(e.target.value))
      }
      isFormValid(input.name, e.target.value, input.password)
    }
    if (e.target.name === 'password') {
      if (passError) {
        setPassError(!isValidPass(e.target.value))
      }
      isFormValid(input.name, input.email, e.target.value)
    }
  }

  function handleClickShowPassword () {
    setShowPassword(!showPassword)
  }

  function handleInputFocus (e: React.ChangeEvent<HTMLInputElement |
  HTMLTextAreaElement> | React.FocusEvent<HTMLDivElement>) {
    setFocusedField(e.target.id)
  }

  function generatePass () {
    const pass = generator.generate({
      length: 20,
      numbers: true,
      uppercase: true,
      symbols: true,
    })
    setInput({
      ...input,
      password: pass,
    })
    isFormValid(input.name, input.email, pass)
    setPassError(!isValidPass(pass))
  }

  React.useEffect(() => {
    if (focusedField === nameFieldId) {
      setFilledName(true)
      if (filledEmail) {
        setEmailError(!isValidEmail(input.email))
      }
      if (filledPass) {
        setPassError(!isValidPass(input.password))
      }
    } else if (focusedField === emailFieldId) {
      setFilledEmail(true)
      if (filledPass) {
        setPassError(!isValidPass(input.password))
      }
      if (filledName) {
        setNameError(!isValidName(input.name))
      }
    } else if (focusedField === passFieldId) {
      setFilledPass(true)
      if (filledEmail) {
        setEmailError(!isValidEmail(input.email))
      }
      if (filledName) {
        setNameError(!isValidName(input.name))
      }
    }
  }, [focusedField])

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    registerUser({
      name: input.name,
      email: input.email,
      password: input.password,
    })
  }

  React.useEffect(() => {
    if (errorMsg !== '') {
      setFormMsg(errorMsg)
    } else if (success) {
      setFormMsg(t('registerPortal.messages.success'))
    }
  }, [errorMsg, success])

  function registerMsg () {
    if ((formMsg !== '' && success) ||
    (formMsg === 'User already registered, click here to be redirect to log in' && !success)) {
      return (
        <div className={classes.msgSuccess}>
          <a href='/login'>
            {formMsg}
          </a>
        </div>
      )
    } else if (formMsg !== '') {
      return (
        <div className={classes.msgError}>
          {formMsg}
        </div>
      )
    } else {
      return undefined
    }
  }

  return (
    <div className={classes.registerContainer}>
      <div className={classes.content}>
        <FormCard
          title={registerTitle}
          buttonLabel={registerButtonLabel}
          buttonDisabled={buttonDisabled}
          closeRoute={closeRoute}
          handleSubmit={handleSubmit}
          formMsg={registerMsg()}
        >
          <div className={classes.fieldContainer}>
            <h5 className={classes.fieldTitle}>GDPR protected</h5>
            <TextField
              id={nameFieldId}
              placeholder='Your name'
              variant='outlined'
              margin='none'
              type='text'
              name='name'
              value={input.name}
              onChange={handleInputs}
              autoFocus
              onFocus={handleInputFocus}
              error={nameError}
              fullWidth
              InputProps={{
                classes: { input: classes.emailTextfield },
              }}
            />
            {nameError && <div className={classes.alert}>{t('registerPortal.warnings.name')}</div>}
          </div>
          <div className={classes.fieldContainer}>
            <h5 className={classes.fieldTitle}>E-mail address</h5>
            <TextField
              id={emailFieldId}
              placeholder='example@cloudoki.com'
              variant='outlined'
              margin='none'
              type='email'
              name='email'
              value={input.email}
              onChange={handleInputs}
              onFocus={handleInputFocus}
              error={emailError}
              fullWidth
              InputProps={{
                classes: { input: classes.emailTextfield },
              }}
            />
            {emailError && <div className={classes.alert}>{t('registerPortal.warnings.email')}</div>}
          </div>
          <div className={classes.fieldContainer}>
            <h5 className={classes.fieldTitle}>Pass Phrase</h5>
            <div className={classes.passPhraseContainer}>
              <TextField
                id={passFieldId}
                variant='outlined'
                margin='none'
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={input.password}
                fullWidth
                onChange={handleInputs}
                onFocus={handleInputFocus}
                error={passError}
                InputProps={{
                  classes: { input: classes.passPhrasefield },
                }}
              />
              <div className={classes.btnsContainer}>
                <IconButton
                  onClick={handleClickShowPassword}
                >
                  {showPassword
                    ? <VisibilityOff id='toggle-visibility' className={classes.visibilityIcon} />
                    : <Visibility id='toggle-visibility' className={classes.visibilityIcon} />}
                </IconButton>
                <IconButton
                  onClick={generatePass}
                >
                  <Shuffle id='shuffle-button' className={classes.shuffleIcon} />
                </IconButton>
              </div>
            </div>
            {passError &&
              <div className={classes.bigAlert}>{t('registerPortal.warnings.password')}</div>}
          </div>
        </FormCard>
      </div>
    </div>
  )
}

export default RegisterPortal
