import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  cardContentContainer: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.3)",
    height: 320,
    textAlign: "center",
    width: 365,
  },

  highlightIcon: {
    color: theme.palette.info.main,
    fontSize: 60,
  },
}));
