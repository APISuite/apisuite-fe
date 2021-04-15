import * as React from 'react'
import { FormCardProps } from './types'
import useStyles from './styles'
import Button from 'components/Button'
import { CircularProgress } from '@apisuite/fe-base'

const FormCard: React.FC<FormCardProps> = ({
  title,
  buttonLabel,
  buttonDisabled,
  handleSubmit,
  loading,
  error,
  children,
  showBack = false,
  backLabel,
  backDisabled,
  handleBackClick,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.formCard}>
      <h2 className={classes.formTitle}>{title}</h2>
      <form onSubmit={handleSubmit}>
        {children}
        {
          showBack &&
          <div className={classes.backBtn}>
            <Button
              label={backLabel}
              onClick={handleBackClick}
              fullWidth
              type='button'
              disabled={backDisabled}
            />
          </div>
        }
        <Button
          label={loading ? <CircularProgress size={20} className={classes.loading} /> : buttonLabel}
          onClick={handleSubmit}
          fullWidth
          loading={loading}
          disabled={buttonDisabled}
        />
      </form>
      {error &&
        <div className={classes.errorPlaceholder}>
          <div className={classes.errorAlert}>{typeof error === 'string' ? error : error.message}</div>
        </div>}
    </div>
  )
}

export default FormCard
