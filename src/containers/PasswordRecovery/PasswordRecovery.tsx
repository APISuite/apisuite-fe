import * as React from 'react'

import { useTranslation } from 'react-i18next'

import FormCard from 'components/FormCard'
import FormField, { isValidEmail, isValidPass, parseErrors } from 'components/FormField'

import { FormFieldEvent } from 'components/FormField/types'

import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'

import AmpStoriesRoundedIcon from '@material-ui/icons/AmpStoriesRounded'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import InfoRoundedIcon from '@material-ui/icons/InfoRounded'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import { PasswordRecoveryProps } from './types'

import useStyles from './styles'

import { config, DEFAULT_NON_INSTANCE_OWNER_SUPPORT_URL } from 'constants/global'

import keyIllustration from 'assets/keyIllustration.svg'

const PasswordRecovery: React.FC<PasswordRecoveryProps> = ({
  auth,
  forgotPassword,
  history,
  location,
  recoverPassword,
  settings,
}) => {
  const classes = useStyles()

  const [t] = useTranslation()

  let stage = 'forgot'

  if (location.state) stage = location.state.stage

  const [isFormValid, setFormValid] = React.useState(false)
  const [errors, setErrors] = React.useState()

  const [userInput, setUserInput] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)

  const [userHasSubmitted, setUserHasSubmitted] = React.useState(false)
  const [emailHasBeenSent, setEmailHasBeenSent] = React.useState(false)

  const handleUserInput = (event: FormFieldEvent, error: any) => {
    setUserInput(event.target.value)

    const eventTarget = event.target

    // @ts-ignore
    setErrors((old: string[]) => parseErrors(eventTarget, error, old || []))
  }

  const handleShowPassword = (event: any) => {
    event.preventDefault()

    const newShowPasswordValue = !showPassword

    setShowPassword(newShowPasswordValue)
  }

  function handleSubmission (event: React.FormEvent<HTMLFormElement> | KeyboardEvent) {
    event.preventDefault()

    setUserHasSubmitted(true)

    if (stage === 'recover') {
      recoverPassword({ token: location.state.token, password: userInput }, history)
    } else {
      forgotPassword({ email: userInput })
    }
  }

  React.useEffect(() => {
    // @ts-ignore
    setFormValid(errors && errors.length === 0)
  }, [errors])

  React.useEffect(() => {
    if (userHasSubmitted && !auth.isRecoveringPassword) {
      setEmailHasBeenSent(true)
    }
  }, [auth.isRecoveringPassword])

  return (
    <main className={classes.mainContainer}>
      <header className={classes.headerContainer}>
        <div
          className={classes.logoAndNameContainer}
          onClick={() => history.push('/auth/signin')}
        >
          {
            settings.logoURL
              ? (
                <img
                  className={classes.imageLogo}
                  src={settings.logoURL}
                />
              )
              : (
                <AmpStoriesRoundedIcon
                  className={classes.iconLogo}
                />
              )
          }

          <h3 className={classes.portalName}>
            {settings.portalName}
          </h3>
        </div>

        <div
          className={classes.closeButtonContainer}
          onClick={() => history.push('/auth/signin')}
        >
          <p>
            {t('passwordRecovery.closeButtonLabel', { config })}
          </p>
          <CloseRoundedIcon />
        </div>
      </header>

      <section className={classes.pageContentContainer}>
        <div className={classes.formSideContentContainer}>
          {
            !emailHasBeenSent
              ? (
                <>
                  <h1 className={classes.formSideTitle}>
                    {
                      stage === 'forgot'
                        ? t('passwordRecovery.forgotPasswordTitle', { config })
                        : t('passwordRecovery.recoverPasswordTitle', { config })
                    }
                  </h1>

                  <p className={classes.formSideSubtitle}>
                    {
                      stage === 'forgot'
                        ? t('passwordRecovery.forgotPasswordSubtitle', { config })
                        : t('passwordRecovery.recoverPasswordSubtitle', { config })
                    }
                  </p>

                  <div className={classes.form}>
                    <FormCard
                      buttonDisabled={!isFormValid}
                      buttonLabel={
                        stage === 'forgot'
                          ? t('passwordRecovery.formButtonLabel.forgot', { config })
                          : t('passwordRecovery.formButtonLabel.recover', { config })
                      }
                      handleSubmit={handleSubmission}
                      loading={auth.isRecoveringPassword}
                    >
                      <div className={classes.inputFieldContainer}>
                        {
                          stage === 'forgot'
                            ? (
                              <FormField
                                autoFocus
                                errorPlacing='bottom'
                                fullWidth
                                id='emailField'
                                InputProps={{
                                  classes: { input: classes.inputField },
                                }}
                                label={t('passwordRecovery.emailLabel', { config })}
                                name='email'
                                onChange={handleUserInput}
                                placeholder=''
                                rules={[
                                  {
                                    rule: isValidEmail(userInput),
                                    message: t('passwordRecovery.warnings.email'),
                                  },
                                ]}
                                type='email'
                                value={userInput}
                                variant='outlined'
                              />
                            )
                            : (
                              <FormField
                                autoFocus
                                errorPlacing='bottom'
                                fullWidth
                                id='passwordField'
                                InputProps={{
                                  classes: { input: classes.inputField },
                                  endAdornment:
                                    <InputAdornment position='end'>
                                      <IconButton
                                        aria-label={t('passwordRecovery.togglePasswordVisibilityARIALabel')}
                                        edge='end'
                                        onClick={(event) => handleShowPassword(event)}
                                      >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                      </IconButton>
                                    </InputAdornment>,
                                }}
                                label={t('passwordRecovery.newPasswordLabel', { config })}
                                name='password'
                                onChange={handleUserInput}
                                rules={[
                                  {
                                    rule: isValidPass(userInput),
                                    message: t('passwordRecovery.warnings.password', { config }),
                                  },
                                ]}
                                type={showPassword ? 'text' : 'password'}
                                value={userInput}
                                variant='outlined'
                              />
                            )
                        }
                      </div>
                    </FormCard>
                  </div>
                </>
              )
              : (
                <>
                  <h1 className={classes.formSideTitle}>
                    {t('passwordRecovery.recoveryEmailHasBeenSentPartOne', { config })}
                  </h1>

                  <p className={classes.formSideSubtitle}>
                    <>{t('passwordRecovery.recoveryEmailHasBeenSentPartTwo', { config })} </>
                    <span className={classes.boldText}>{settings.portalName} </span>
                    <>{t('passwordRecovery.recoveryEmailHasBeenSentPartThree', { config })} </>
                    <span className={classes.boldText}>{userInput}</span>
                    <>{t('passwordRecovery.recoveryEmailHasBeenSentPartFour', { config })}</>
                  </p>

                  <div className={classes.infoBox}>
                    <InfoRoundedIcon className={classes.infoBoxIcon} />

                    <div>
                      <p className={classes.infoBoxText}>
                        <>{t('passwordRecovery.infoBoxTextPartOne', { config })} </>
                        <a
                          href={settings.supportURL || DEFAULT_NON_INSTANCE_OWNER_SUPPORT_URL}
                          rel='noopener noreferrer'
                          target='_blank'
                        >
                          {t('passwordRecovery.infoBoxTextPartTwo', { config })}
                        </a>
                        <>.</>
                      </p>
                    </div>
                  </div>
                </>
              )
          }
        </div>

        <div className={classes.imageSideContentContainer}>
          <img
            className={classes.image}
            src={keyIllustration}
          />
        </div>
      </section>
    </main>
  )
}

export default PasswordRecovery
