import { makeStyles } from "@apisuite/fe-base";

const useStyles = makeStyles((theme) => ({
  disabledConfirmButton: {
    backgroundColor: theme.palette.label,
    color: `${theme.palette.primary.contrastText} !important`,
    fontSize: "16px",
    fontWeight: 500,
    padding: "7.5px 45px",
    pointerEvents: "none",
    width: "100%",

    "&:hover": {
      backgroundColor: theme.palette.label,
    },
  },

  enabledConfirmButton: {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.primary.contrastText} !important`,
    fontSize: "16px",
    fontWeight: 500,
    padding: "7.5px 45px",
    width: "100%",

    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },

  inputField: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: `${theme.shape.borderRadius}px`,
    color: theme.palette.text.primary,
  },

  inputFieldContainer: {
    marginTop: "25px",
  },

  signInContainer: {
    width: "100%",
  },

  separatorContainer: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    margin: "30px 0px 30px 0px",
  },

  separatorLine: {
    backgroundColor: theme.palette.grey[200],
    borderRadius: `${theme.shape.borderRadius}px`,
    height: "1px",
    width: "100%",
  },

  separatorText: {
    color: theme.palette.divider,
    padding: "0px 10px",
  },
}));

export default useStyles;
