import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  appBubbles: {
    textDecoration: "none",

    "& > div": {
      backgroundColor: theme.palette.secondary.light,
      fontSize: 16,
      fontWeight: 300,
      margin: theme.spacing(0, 1.25, 1.25, 0),
    },
  },

  contentContainer: {
    maxWidth: 915,
    width: "100%",
  },

  subbedAppBubblesContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: 620,
    width: "100%",
  },

  linkToSubsModal: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    fontSize: 16,
    padding: theme.spacing(1.25, 2),
    textDecoration: "none",
  },
}));
