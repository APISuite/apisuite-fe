import * as React from 'react'
import useStyles from './styles'
import Button from 'components/Button'
import FormField, { isValidEmail } from 'components/FormField'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from '@apisuite/fe-base'
import { InformDialogProps } from './types'

const InformDialog: React.FC<InformDialogProps> = (
  { open, inform, requesting, closeInform },
) => {
  const classes = useStyles()
  const showLoading = requesting
  const [email, setEmail] = React.useState('')
  const [isValid, setIsValid] = React.useState(true)
  const [pass, setPass] = React.useState(false)
  const textTarget = 'Whoah! We\'re not quite there yet but we promise to let you know the minute we launch the full product version!'
  const titleTarget = 'Keep me posted'
  const idleTime = 1000

  React.useEffect(() => {
    if (open) {
      setEmail('')
      setIsValid(true)
      setPass(false)
    }
  }, [open])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    setPass(true)
    if (isValidEmail(event.target.value)) setIsValid(true)
  }

  React.useEffect(() => {
    const timer = setInterval((newEmail: any) => {
      if (pass) setIsValid(isValidEmail(newEmail))
    }, idleTime, email)
    return () => {
      clearInterval(timer)
    }
  }, [email, pass])

  function handleConfirm () {
    inform({
      email: email,
      target: 'portal',
    })
  }

  function handleClose () {
    closeInform()
  }

  function preventDefault (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <Dialog data-testid='inform-dialog' open={open}>
      <DialogTitle>{titleTarget}</DialogTitle>
      <DialogContent>
        <DialogContentText data-testid='inform-dialog-text'>
          {textTarget}
        </DialogContentText>

        <form noValidate autoComplete='off' onSubmit={preventDefault}>
          <FormField
            data-testid='inform-dialog-email'
            label='Email Address'
            value={email}
            error={!isValid}
            helperText={!isValid && 'Please enter a valid email address.'}
            onChange={handleChange}
            margin='dense'
            type='email'
            variant='outlined'
            fullWidth
            autoFocus
          />
        </form>
      </DialogContent>

      <DialogActions>
        <Button
          label='Cancel'
          onClick={handleClose}
          fullWidth
          loading={showLoading}
          disabled={showLoading}
          background='transparent'
          color='primary'
        />

        <div className={classes.confirmWrapper}>
          <Button
            data-testid='inform-dialog-submit'
            label='Submit'
            onClick={handleConfirm}
            fullWidth
            disabled={!isValidEmail(email) || showLoading}
          />

          {showLoading && <CircularProgress size={24} className={classes.progress} />}
        </div>
      </DialogActions>
    </Dialog>
  )
}

export default InformDialog
