import * as React from 'react'
import { useTranslation } from 'react-i18next'
import FormCard from 'components/FormCard'
import FormField, { parseErrors, isValidEmail } from 'components/FormField'
import { FormFieldEvent } from 'components/FormField/types'
import useStyles from './styles'

const ForgotPasswordPage: React.FC<{
  forgotPassword: (emailInformation: { email: string }) => void,
  auth: any,
}> = ({ forgotPassword, auth }) => {
  const classes = useStyles()
  const [t] = useTranslation()

  const [sent, setSent] = React.useState(false)
  const [submited, setSubmited] = React.useState(false)
  const [isFormValid, setFormValid] = React.useState(false)
  const [errors, setErrors] = React.useState()
  const [input, setInput] = React.useState({
    email: '',
  })

  React.useEffect(() => {
    setFormValid(errors && errors.length === 0)
  }, [errors])

  React.useEffect(() => {
    if (submited && !auth.isRecoveringPassword) {
      setSent(true)
    }
  }, [auth.isRecoveringPassword])

  const handleInputs = (e: FormFieldEvent, err: any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    const eventTarget = e.target

    setErrors((old: string[]) => parseErrors(eventTarget, err, old || []))
  }

  function handleSubmit (e: React.FormEvent<HTMLFormElement> | KeyboardEvent) {
    e.preventDefault()
    setSubmited(true)
    forgotPassword({ email: input.email })
  }

  return (
    <main className={classes.main}>
      <section className={classes.messageSide}>
        {!sent &&
          <section className={classes.messageContainer}>
            <h1 className={classes.messageTitle}>{t('forgotPassword.messageTitle')}</h1>
            <p className={classes.message}>{t('forgotPassword.message')}</p>

            <div className={classes.forgotPasswordContainer}>
              <FormCard
                buttonLabel='Send'
                buttonDisabled={!isFormValid}
                handleSubmit={handleSubmit}
                loading={auth.isRecoveringPassword}
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
                      classes: { input: classes.textField },
                    }}
                    rules={[
                      { rule: isValidEmail(input.email), message: t('registerForm.warnings.email') },
                    ]}
                  />
                </div>
              </FormCard>
            </div>
          </section>}

        {sent &&
          <section className={classes.messageContainer}>
            <h1 className={classes.messageTitle}>{t('forgotPassword.sent.messageTitle')}</h1>
            <p className={classes.message}>{t('forgotPassword.sent.message')}</p>
            {/* TODO: removed once implemented */}
            <p><em>This feature is currently under development</em></p>
          </section>}
      </section>

      <aside className={classes.imageSide} />
    </main>
  )
}

export default ForgotPasswordPage
