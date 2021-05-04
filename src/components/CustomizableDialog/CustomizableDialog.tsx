import React from "react";
import { useTranslation, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@apisuite/fe-base";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";

import { CustomizableDialogProps } from "./types";
import useStyles from "./styles";

const CustomizableDialog: React.FC<CustomizableDialogProps> = ({
  // Props passed by the 'calling' component to be added below
  cancelButtonLabel,
  closeDialogCallback,
  confirmButtonCallback,
  confirmButtonLabel,
  open,
  openDialogCallback,
  optionalTitleIcon,
  providedDialogActions,
  providedDialogContent,
  providedSubText,
  providedText,
  providedTitle,

  // 'mapStateToProps' props (i.e., coming from the app's Redux 'store') to be added below (if any)
}) => {
  const classes = useStyles();

  const [t] = useTranslation();

  const handleOpenDialog = () => {
    if (openDialogCallback) openDialogCallback();
  };

  const handleCloseDialog = () => {
    if (closeDialogCallback) closeDialogCallback();
  };

  const handleConfirmAction = () => {
    confirmButtonCallback();
  };

  return (
    <Dialog
      onClose={handleCloseDialog}
      onEnter={handleOpenDialog}
      open={open}
    >
      <div className={classes.dialogTitleContainer}>
        {
          optionalTitleIcon === "info" &&
          <InfoRoundedIcon className={classes.dialogTitleInfoIcon} />
        }

        {
          optionalTitleIcon === "warning" &&
          <WarningRoundedIcon className={classes.dialogTitleWarningIcon} />
        }

        <DialogTitle>
          {providedTitle}
        </DialogTitle>
      </div>

      <DialogContent className={classes.dialogContentContainer}>
        <DialogContentText className={classes.dialogText}>
          {providedText}
        </DialogContentText>

        <DialogContentText className={classes.dialogSubText}>
          {providedSubText}
        </DialogContentText>

        {providedDialogContent}
      </DialogContent>

      <DialogActions className={classes.dialogActionsContainer}>
        <Button
          className={classes.cancelButton}
          fullWidth
          onClick={handleCloseDialog}
        >
          {cancelButtonLabel || t("customizableDialog.cancelButtonLabel")}
        </Button>

        <div>
          <Button
            className={classes.confirmButton}
            fullWidth
            onClick={handleConfirmAction}
          >
            {confirmButtonLabel || t("customizableDialog.confirmButtonLabel")}
          </Button>

          {providedDialogActions}
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default CustomizableDialog;
