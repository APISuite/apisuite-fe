import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Icon, Typography } from "@apisuite/fe-base";
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
    return <Icon className={classes[`${iconType}Icon`]}>{iconType}</Icon>;
  };

  return showPrompt ? (
    <Dialog
      open={showPrompt}
      onClose={handleCancel}
      aria-labelledby="prompt-dialog-title"
    >
      <DialogTitle id="prompt-dialog-title">
        <Box alignItems={"start"} display={"flex"} flexDirection={"row"} justifyContent={"start"}>
          <Box clone mr={2}>
            {getIcon(type)}
          </Box>
          <Typography variant="h6">{title}</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Box clone pb={2}>
            <Typography variant="body1">{subtitle}</Typography>
          </Box>
          <Box clone pb={2}>
            <Typography variant="body2">{bodyText}</Typography>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus color="primary" onClick={handleCancel} variant="contained">
          {cancelText}
        </Button>
        <Button autoFocus onClick={handleOK} variant="outlined">
          {okText}
        </Button>
      </DialogActions>
    </Dialog>
  ) : null;
};
