import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  cardContentContainer: {
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    boxShadow: "none",
  },

  highlightIcon: {
    color: theme.palette.info.main,
    fontSize: 60,
  },
}));
