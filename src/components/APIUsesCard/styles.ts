import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  cardContentContainer: {
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    boxShadow: "none",
  },

  useCaseIcon: {
    color: theme.palette.info.main,
    fontSize: 60,
  },

  useCaseImage: {
    borderRadius: "50%",
    height: "100%",
    margin: "auto",
    width: 60,
  },
}));
