import React from "react";

import clsx from "clsx";

import InfoRoundedIcon from "@material-ui/icons/InfoRounded";

import useStyles from "./styles";

import { NoticeProps } from "./types";

const Notice: React.FC<NoticeProps> = ({
  type="info",
  noticeIcon,
  noticeIconStyle,
  noticeText,
}) => {
  const classes = useStyles();

  return (
    <div className={clsx(
      classes.noticeContentsContainer,
      type === "info" && classes.noticeBackgoundInfo,
      type === "error" && classes.noticeBackgoundError,
      type === "warning" && classes.noticeBackgoundWarning,
    )}>
      <div className={clsx(
        classes.noticeIcon,
        type === "info" && classes.noticeIconInfo,
        type === "error" && classes.noticeIconError,
        type === "warning" && classes.noticeIconWarning,
        noticeIconStyle && noticeIconStyle,
      )}>
        {noticeIcon || <InfoRoundedIcon />}
      </div>

      {noticeText}
    </div>
  );
};

export default Notice;
