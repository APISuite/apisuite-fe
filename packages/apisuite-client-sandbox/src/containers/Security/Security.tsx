import * as React from 'react'

import { useTranslation } from 'react-i18next'

import Button from 'components/Button'
import { isValidPass } from 'components/FormField/index'

import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'

import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded'
import VisibilityOffRoundedIcon from '@material-ui/icons/VisibilityOffRounded'

import useStyles from './styles'

import { SecurityProps } from './types'

import { config } from 'constants/global'

const Security: React.FC<SecurityProps> = ({
  updatePasswordRequest,
}) => {
  const classes = useStyles()

  const [t] = useTranslation()

  const [providedPasswords, setProvidedPasswords] = React.useState(['', ''])

  const [showPassword, setShowPassword] = React.useState([false, false])

  const handleShowPassword = (event: any, passwordFieldNumber: number) => {
    event.preventDefault()

    const newShowPasswordsArray = [...showPassword]
    newShowPasswordsArray[passwordFieldNumber] = !newShowPasswordsArray[passwordFieldNumber]

    setShowPassword(newShowPasswordsArray)
  }

  const handlePasswordChanges = (
    changeEvent: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    indexOfChangedPasswordField: number,
  ) => {
    changeEvent.preventDefault()

    const newPasswords = [...providedPasswords]
    newPasswords[indexOfChangedPasswordField] = changeEvent.target.value

    setProvidedPasswords(newPasswords)
  }

  const handlePasswordChangeRequest = () => {
    updatePasswordRequest(providedPasswords[0], providedPasswords[1])

    setProvidedPasswords(['', ''])
  }

  return (
    <main className='page-container'>
      <section className={classes.updatePasswordContainer}>
        <p className={classes.securityTitle}>
          {t('profileTab.securitySubTab.securityTitle', { config })}
        </p>

        <p className={classes.updatePasswordTitle}>
          {t('profileTab.securitySubTab.updatePasswordTitle', { config })}
        </p>

        <TextField
          className={classes.inputFields}
          error={
            providedPasswords[0].length === 0
              ? false
              : (
                !isValidPass(providedPasswords[0])
              )
          }
          fullWidth
          helperText={
            providedPasswords[0].length === 0
              ? ''
              : (
                isValidPass(providedPasswords[0])
                  ? ''
                  : t('profileTab.securitySubTab.notValidPasswordErrorMessage', { config })
              )
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={(event) => handleShowPassword(event, 0)}
                >
                  {
                    showPassword[0]
                      ? <VisibilityRoundedIcon />
                      : <VisibilityOffRoundedIcon />
                  }
                </IconButton>
              </InputAdornment>
            ),
          }}
          label={t('profileTab.securitySubTab.currentPasswordFieldLabel', { config })}
          margin='dense'
          name='currentPassword'
          onChange={(changeEvent) => handlePasswordChanges(changeEvent, 0)}
          type={showPassword[0] ? 'text' : 'password'}
          value={providedPasswords[0]}
          variant='outlined'
        />

        <TextField
          className={classes.inputFields}
          error={
            providedPasswords[1].length === 0
              ? false
              : (
                providedPasswords[0] === providedPasswords[1]
                  ? true
                  : (
                    !isValidPass(providedPasswords[1])
                  )
              )
          }
          fullWidth
          helperText={
            providedPasswords[1].length === 0
              ? ''
              : (
                providedPasswords[0] === providedPasswords[1]
                  ? t('profileTab.securitySubTab.samePasswordErrorMessage', { config })
                  : (
                    isValidPass(providedPasswords[1])
                      ? ''
                      : t('profileTab.securitySubTab.tooWeakPasswordErrorMessage', { config })
                  )
              )
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={(event) => handleShowPassword(event, 1)}
                >
                  {
                    showPassword[1]
                      ? <VisibilityRoundedIcon />
                      : <VisibilityOffRoundedIcon />
                  }
                </IconButton>
              </InputAdornment>
            ),
          }}
          label={t('profileTab.securitySubTab.newPasswordFieldLabel', { config })}
          margin='dense'
          name='newPassword'
          onChange={(changeEvent) => handlePasswordChanges(changeEvent, 1)}
          type={showPassword[1] ? 'text' : 'password'}
          value={providedPasswords[1]}
          variant='outlined'
        />

        <div className={classes.actionsContainer}>
          <Button
            customButtonClassName={
              (providedPasswords[0] !== providedPasswords[1]) &&
                (providedPasswords[0].length && providedPasswords[1].length) &&
                (isValidPass(providedPasswords[0]) && isValidPass(providedPasswords[1]))
                ? classes.enabledUpdatePasswordButton
                : classes.disabledUpdatePasswordButton
            }
            href='#'
            label={t('profileTab.securitySubTab.updatePasswordButtonLabel', { config })}
            onClick={handlePasswordChangeRequest}
          />
        </div>

        <hr className={classes.sectionSeparator} />

        <p className={classes.userActivityTitle}>
          {t('profileTab.securitySubTab.userActivityTitle', { config })}
        </p>
      </section>
    </main>
  )
}

export default Security
