import { makeStyles } from "@apisuite/fe-base";

const useStyles = makeStyles((theme) => ({
  centerContent: {
    alignItems: "center",
    color: "red",
    display: "flex",
    fontWeight: 500,
    height: "200px",
    justifyContent: "center",
  },

  inputField: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: `${theme.shape.borderRadius}px`,
    color: theme.palette.text.primary,
  },

  inputFieldContainer: {
    marginBottom: "25px",
    marginTop: "25px",
  },

  loading: {
    color: theme.palette.primary.main,
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

  signUpContainer: {
    width: "100%",
  },
}));

export default useStyles;
