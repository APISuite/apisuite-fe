import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, Icon, Typography, useTheme,
} from "@apisuite/fe-base";
import { RouterPromptProps } from "./types";
import useStyles from "./styles";

export const RouterPrompt: React.FC<RouterPromptProps> = ({
  bodyText,
  cancelText,
  okText,
  subtitle,
  title,
  type,
  when,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { palette } = useTheme();

  const [showPrompt, setShowPrompt] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (when) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = null;
    }
  }, [when]);

  useEffect(() => {
    if (when) {
      history.block((prompt) => {
        setCurrentPath(prompt.pathname);
        setShowPrompt(true);
        return false;
      });
    } else {
      history.block(() => {
        // do nothing
      });
    }

    return () => {
      history.block(() => {
        // do nothing
      });
    };
  }, [history, when]);

  const handleOK = useCallback(async () => {
    window.onbeforeunload = null;
    history.block(() => {
      // do nothing
    });
    history.push(currentPath);
  }, [currentPath, history]);

  const handleCancel = useCallback(async () => {
    setShowPrompt(false);
  }, []);

  const getIcon = (iconType: RouterPromptProps["type"]) => {
    const classn = `${iconType}Icon` as "infoIcon" | "errorIcon" | "warningIcon";
    return <Icon className={classes[classn]}>{iconType}</Icon>;
  };

  return showPrompt ? (
    <Dialog
      open={showPrompt}
      onClose={handleCancel}
      aria-labelledby="prompt-dialog-title"
    >
      <DialogTitle id="prompt-dialog-title" style={{ backgroundColor: palette.grey[100] }}>
        <Box alignItems={"start"} display={"flex"} flexDirection={"row"} justifyContent={"start"}>
          <Box clone mr={2}>
            {getIcon(type)}
          </Box>
          <Typography variant="h6">{title}</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Box clone py={2}>
            <Typography variant="body1">{subtitle}</Typography>
          </Box>
          <Box clone pb={2}>
            <Typography variant="body2">{bodyText}</Typography>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Box clone m={1}>
          <Button autoFocus color="primary" onClick={handleCancel} variant="contained">
            {cancelText}
          </Button>
        </Box>
        <Box clone m={1}>
          <Button autoFocus onClick={handleOK} variant="outlined">
            {okText}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  ) : null;
};
