import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  modal: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  dialog: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    flexDirection: "column",
    maxWidth: "450px",
    padding: theme.spacing(2),
  },
  infoIcon:{
    color: theme.palette.info.main,
  },

  errorIcon:{
    color: theme.palette.error.main,
  },

  warningIcon:{
    color: theme.palette.warning.main,
  },
}));
