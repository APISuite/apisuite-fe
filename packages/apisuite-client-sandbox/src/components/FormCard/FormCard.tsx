import * as React from 'react'
import { FormCardProps } from './types'
import useStyles from './styles'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'

const iconStyle = {
  height: '42px',
  width: '42px',
}

const FormCard: React.FC<FormCardProps> = ({
  title,
  buttonLabel,
  closeRoute,
  buttonDisabled,
  handleSubmit,
  formMsg,
  success,
  children,
}) => {
  const classes = useStyles()

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
      return ''
    }
  }

  return (
    <div className={classes.formCard}>
      <a href={closeRoute}>
        <CloseIcon
          className={classes.closeIcon}
          style={iconStyle}
        />
      </a>
      <h2 className={classes.formTitle}>{title}</h2>
      <form onSubmit={handleSubmit}>
        {children}
        <Button
          type='submit'
          variant='outlined'
          disabled={buttonDisabled}
          className={classes.submitBtn}
        >
          {buttonLabel}
        </Button>
      </form>
      {registerMsg()}
    </div>
  )
}

export default FormCard
