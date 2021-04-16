import React from 'react'
import { History, Location } from 'history'
import { useTranslation, IconButton, InputAdornment } from '@apisuite/fe-base'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import FormCard from 'components/FormCard'
import FormField, { isValidEmail, isValidPass, parseErrors } from 'components/FormField'

import useStyles from './styles'
import { FormFieldEvent } from 'components/FormField/types'

const ForgotPasswordPage: React.FC<{
  auth: any,
  forgotPassword: (emailInformation: { email: string }) => void,
  history: History<any>,
  location: Location<{
    stage: 'recover' | 'forgot',
    token: string,
  }>,
  recoverPassword: (payload: { token: string; password: string }, history: History<any>) => void,
}> = ({
  auth,
  forgotPassword,
  history,
  location,
  recoverPassword,
}) => {
  const classes = useStyles()

  const [t] = useTranslation()

  let stage = 'forgot'

  if (location.state) stage = location.state.stage

  const [sent, setSent] = React.useState(false)
  const [submited, setSubmited] = React.useState(false)

  const [isFormValid, setFormValid] = React.useState(false)
  const [errors, setErrors] = React.useState()

  const [input, setInput] = React.useState('')
  const [showPassword, toggle] = React.useReducer(v => !v, false)

  React.useEffect(() => {
    // @ts-ignore
    setFormValid(errors && errors.length === 0)
  }, [errors])

  React.useEffect(() => {
    if (submited && !auth.isRecoveringPassword) {
      setSent(true)
    }
  }, [auth.isRecoveringPassword])

  const handleInputs = (e: FormFieldEvent, err: any) => {
    setInput(e.target.value)

    const eventTarget = e.target

    // @ts-ignore
    setErrors((old: string[]) => parseErrors(eventTarget, err, old || []))
  }

  function handleSubmit (e: React.FormEvent<HTMLFormElement> | KeyboardEvent) {
    e.preventDefault()

    setSubmited(true)

    if (stage === 'recover') {
      recoverPassword({ token: location.state.token, password: input }, history)
    } else {
      forgotPassword({ email: input })
    }
  }

  return (
    <main className={classes.main}>
      <section className={classes.messageSide}>
        {!sent &&
            <section className={classes.messageContainer}>
              <h1 className={classes.messageTitle}>
                {stage === 'recover' ? t('forgotPassword.messageTitleRecover') : t('forgotPassword.messageTitle')}
              </h1>

              <p className={classes.message}>
                {stage === 'recover' ? t('forgotPassword.messageRecover') : t('forgotPassword.message')}
              </p>

              <div className={classes.forgotPasswordContainer}>
                <FormCard
                  buttonDisabled={!isFormValid}
                  buttonLabel={(location.state && location.state.stage === 'recover') ? t('actions.save') : t('actions.send')}
                  handleSubmit={handleSubmit}
                  loading={auth.isRecoveringPassword}
                >
                  <div className={classes.fieldContainer}>
                    {stage === 'recover'
                      ? (
                        <FormField
                          autoFocus
                          errorPlacing='bottom'
                          fullWidth
                          id='password-field'
                          InputProps={{
                            classes: { input: classes.textField },
                            endAdornment:
                              <InputAdornment position='end'>
                                <IconButton
                                  aria-label='toggle password visibility'
                                  edge='end'
                                  onClick={toggle}
                                >
                                  {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>,
                          }}
                          label='Password'
                          name='password'
                          onChange={handleInputs}
                          placeholder=''
                          rules={[
                            { rule: isValidPass(input), message: t('signUpForm.warnings.password') },
                          ]}
                          type={showPassword ? 'text' : 'password'}
                          value={input}
                          variant='outlined'
                        />
                      )
                      : (
                        <FormField
                          autoFocus
                          errorPlacing='bottom'
                          fullWidth
                          id='email-field'
                          InputProps={{
                            classes: { input: classes.textField },
                          }}
                          label='E-mail'
                          name='email'
                          onChange={handleInputs}
                          placeholder=''
                          rules={[
                            { rule: isValidEmail(input), message: t('signUpForm.warnings.email') },
                          ]}
                          type='email'
                          value={input}
                          variant='outlined'
                        />
                      )}
                  </div>
                </FormCard>
              </div>
            </section>}

        {
          sent &&
            <section className={classes.messageContainer}>
              <h1 className={classes.messageTitle}>{t('forgotPassword.sent.messageTitle')}</h1>

              <p className={classes.message}>{t('forgotPassword.sent.message')}</p>
            </section>
        }
      </section>

      <aside className={classes.imageSide} />
    </main>
  )
}

export default ForgotPasswordPage
