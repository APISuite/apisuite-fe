
import { makeStyles } from "@apisuite/fe-base";

const useStyles = makeStyles((theme) => ({
  backButton: {
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.label}`,
    color: `${theme.palette.action.active} !important`,
    fontSize: "16px",
    fontWeight: 500,
    padding: "7.5px 45px",
    width: "100%",

    "&:hover": {
      backgroundColor: theme.palette.background.default,
    },
  },

  backButtonContainer: {
    margin: "20px 0px",
  },

  disabledNextButton: {
    backgroundColor: `${theme.palette.label} !important`,
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
  loading: {
    position: "relative",
    top: 4,
    color: "white",
    opacity: 0.5,
  },

  enabledNextButton: {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.primary.contrastText} !important`,
    fontSize: "16px",
    fontWeight: 500,
    padding: "7.5px 45px",
    width: "100%",

    "&:hover": {
      backgroundColor: theme.palette.secondary,
    },
  },

  errorAlert: {
    backgroundColor: theme.palette.error.main,
    borderRadius: `${theme.shape.borderRadius}px`,
    color: theme.palette.background.default,
    minHeight: "50px",
    padding: "12px 25px",
  },

  errorPlaceholder: {
    marginTop: "30px",
    minHeight: "50px",
  },

  formCard: {
    display: "block",
  },

  formTitle: {
    color: theme.palette.primary.contrastText,
    fontSize: "26px",
    fontWeight: 300,
  },

  rejectBtnContainer: {
    margin: "20px 0px",
  },
  rejectButton: {
    backgroundColor: `${theme.palette.grey["50"]} !important`,
    color: `${theme.palette.grey["700"]} !important`,
  },
}));

export default useStyles;
