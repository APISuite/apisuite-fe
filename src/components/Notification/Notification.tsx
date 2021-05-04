import React from "react";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import { Snackbar } from "@apisuite/fe-base";
import { NotificationProps } from "./types";
import useStyles from "./styles";
import clsx from "clsx";

const Notification: React.FC<NotificationProps> = ({
  open,
  type,
  msg,
  notificationNumber,
  timer,
  closeNotification,
}) => {
  const classes = useStyles();

  const typeIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircleOutlineOutlinedIcon fontSize='inherit' />;
      case "error":
        return <CancelOutlinedIcon fontSize='inherit' />;
      default:
        return null;
    }
  };

  const handleClose = () => {
    closeNotification(notificationNumber);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={timer}
      onClose={handleClose}
      className={classes.snackbar}
    >
      <div
        className={clsx(
          classes.content,
          type === "success" && classes.success,
          type === "error" && classes.error)}
      >
        <div className={classes.icon}>
          {typeIcon()}
        </div>
        <div
          className={clsx(
            classes.text,
            type === "success" && classes.success,
            type === "error" && classes.error)}
        >
          {msg}
        </div>
      </div>
    </Snackbar>
  );
};

export default Notification;
