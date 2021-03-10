import * as React from 'react'

import { useTranslation } from 'react-i18next'

import Button from '@material-ui/core/Button'

import { FormCardProps } from './types'

import useStyles from './styles'

const FormCard: React.FC<FormCardProps> = ({
  backLabel,
  buttonDisabled,
  buttonLabel,
  children,
  customBackButtonStyles,
  customDisabledConfirmButtonStyles,
  customEnabledConfirmButtonStyles,
  error,
  handleBackClick,
  handleSubmit,
  loading,
  showBack = false,
  title,
}) => {
  const classes = useStyles()

  const [t] = useTranslation()

  return (
    <div className={classes.formCard}>
      <h2 className={classes.formTitle}>
        {title}
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Form fields, among other (optional) things */}
        {children}

        {/* @ts-ignore */}
        <Button
          className={
            buttonDisabled
              ? customDisabledConfirmButtonStyles || classes.disabledNextButton
              : customEnabledConfirmButtonStyles || classes.enabledNextButton
          }
          disabled={buttonDisabled}
          href='#'
          onClick={handleSubmit}
        >
          {
            loading
              ? t('formCard.holdMessage')
              : buttonLabel
          }
        </Button>

        {
          showBack &&
          <div className={classes.backButtonContainer}>
            {/* @ts-ignore */}
            <Button
              className={customBackButtonStyles || classes.backButton}
              href='#'
              onClick={handleBackClick}
            >
              {backLabel}
            </Button>
          </div>
        }
      </form>

      {
        error &&
        <div className={classes.errorPlaceholder}>
          <div className={classes.errorAlert}>
            {
              typeof error === 'string'
                ? error
                : error.message
            }
          </div>
        </div>
      }
    </div>
  )
}

export default FormCard
