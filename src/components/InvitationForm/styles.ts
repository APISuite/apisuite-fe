import { makeStyles } from "@apisuite/fe-base";

const useStyles = makeStyles((theme) => ({
  registerContainer: {
    width: "100%",
    height: "100%",
  },
  fieldContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  rejectButton: {
    backgroundColor: "white",
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.grey[800],
    fontSize: "16px",
    fontWeight: 500,
  },
  textField: {
    backgroundColor: "white",
    borderRadius: theme.shape.borderRadius,
    fontSize: "16px",
    fontWeight: 500,
    "& div > input": {
      color: theme.palette.text.primary + " !important",
    },
  },
  centerContent: {
    alignItems: "center",
    color: theme.palette.grey[400],
    display: "flex",
    flexDirection: "column",
    fontWeight: 300,
    height: 200,
    justifyContent: "space-evenly",
  },
  loading: {
    color: theme.palette.secondary.main,
  },
  ssoSignIcon: {
    fontSize: "25px",
    left: "20px",
    position: "absolute",
    top: "11.5px",
  },
  privacyPolicyDisclaimerContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "25px",
  },
  privacyPolicyDisclaimerLink: {
    color: `${theme.palette.action.active} !important`,
    fontSize: "12px",
    fontWeight: 400,
  },
  privacyPolicyDisclaimerText: {
    color: theme.palette.text.primary,
    fontSize: "12px",
    fontWeight: 300,
    marginRight: "3.5px",
  },
  forgotPasswordLink: {
    color: `${theme.palette.grey[400]} !important`,
    cursor: "pointer",
    display: "flex",
    fontSize: "14px",
    fontWeight: 400,
    justifyContent: "center",
    marginTop: "25px",
    textDecoration: "underline",

    "&:hover": {
      color: `${theme.palette.grey[400]} !important`,
    },
  },
}));

export default useStyles;
