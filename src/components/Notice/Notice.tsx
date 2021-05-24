import React from "react";

import InfoRoundedIcon from "@material-ui/icons/InfoRounded";

import useStyles from "./styles";

import { NoticeProps } from "./types";

const Notice: React.FC<NoticeProps> = ({
  noticeIcon,
  noticeText,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.noticeContentsContainer}>
      <div className={classes.noticeIcon}>
        {noticeIcon || <InfoRoundedIcon />}
      </div>

      {noticeText}
    </div>
  );
};

export default Notice;
