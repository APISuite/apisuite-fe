import React from "react";
import {
  useTheme, useTranslation, Button, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, Typography,
} from "@apisuite/fe-base";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";
import clsx from "clsx";

import { CustomizableDialogProps } from "./types";
import useStyles from "./styles";

const CustomizableDialog: React.FC<CustomizableDialogProps> = ({
  // Props passed by the 'calling' component to be added below
  cancelButtonLabel,
  cancelButtonProps,
  cancelButtonStyle,
  closeDialogCallback,
  confirmButtonCallback,
  confirmButtonLabel,
  confirmButtonProps,
  confirmButtonStyle,
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

  const { palette } = useTheme();

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
        <DialogContentText>
          <Typography variant="body1" style={{ color: palette.text.primary }}>{providedText}</Typography>
        </DialogContentText>

        <DialogContentText>
          <Typography variant="subtitle2">{providedSubText}</Typography>
        </DialogContentText>

        <Typography variant="body2">{providedDialogContent}</Typography>
      </DialogContent>

      <DialogActions className={classes.dialogActionsContainer}>
        <Button
          className={clsx(classes.cancelButton, cancelButtonStyle)}
          {...cancelButtonProps}
          onClick={handleCloseDialog}
        >
          {cancelButtonLabel || t("customizableDialog.cancelButtonLabel")}
        </Button>

        <div>
          <Button
            className={clsx(classes.confirmButton, confirmButtonStyle)}
            {...confirmButtonProps}
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
