import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@apisuite/fe-base'

import { CustomizableDialogProps } from './types'
import useStyles from './styles'

const CustomizableDialog: React.FC<CustomizableDialogProps> = ({
  // Props passed by the 'calling' component to be added below
  cancelButtonLabel,
  closeDialogCallback,
  confirmButtonCallback,
  confirmButtonLabel,
  open,
  openDialogCallback,
  providedDialogActions,
  providedDialogContent,
  providedText,
  providedTitle,

  // 'mapStateToProps' props (i.e., coming from the app's Redux 'store') to be added below (if any)
}) => {
  const classes = useStyles()

  const handleOpenDialog = () => {
    if (openDialogCallback) openDialogCallback()
  }

  const handleCloseDialog = () => {
    if (closeDialogCallback) closeDialogCallback()
  }

  const handleConfirmAction = () => {
    confirmButtonCallback()
  }

  return (
    <Dialog
      onClose={handleCloseDialog}
      onEnter={handleOpenDialog}
      open={open}
    >
      <DialogTitle className={classes.dialogTitleContainer}>
        {providedTitle}
      </DialogTitle>

      <DialogContent className={classes.dialogContentContainer}>
        <DialogContentText>
          {providedText}
        </DialogContentText>

        {providedDialogContent}
      </DialogContent>

      <DialogActions className={classes.dialogActionsContainer}>
        <Button
          className={classes.cancelButton}
          fullWidth
          onClick={handleCloseDialog}
        >
          {cancelButtonLabel || 'Cancel'}
        </Button>

        <div>
          <Button
            className={classes.confirmButton}
            fullWidth
            onClick={handleConfirmAction}
          >
            {confirmButtonLabel || 'Confirm'}
          </Button>

          {providedDialogActions}
        </div>
      </DialogActions>
    </Dialog>
  )
}

export default CustomizableDialog
