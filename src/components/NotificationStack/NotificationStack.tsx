import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeNotification } from "store/notificationStack/actions/notification";
import Notification from "components/Notification";

import { notificationStackSelector } from "./selector";
import useStyles from "./styles";

export const NotificationStack: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { notifications } = useSelector(notificationStackSelector);

  return (
    <div className={classes.stack}>
      {notifications.map((notification, indx) => (
        <Notification
          {...notification}
          key={indx}
          closeNotification={(notificationNumber) => dispatch(closeNotification({ notificationNumber }))}
        />
      ))}
    </div>
  );
};
