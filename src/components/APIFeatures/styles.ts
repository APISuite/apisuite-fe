import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  contentContainer: {
    maxWidth: 915,
    width: "100%",
  },

  apiFeatureIcon: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "50%",
    height: 60,
    marginBottom: theme.spacing(2),
    textAlign: "center",
    width: 60,

    "& > svg": {
      color: theme.palette.common.white,
      fontSize: 36,
      transform: "translateY(12px)",
    },
  },
}));
