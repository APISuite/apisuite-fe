import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  backgroundBanner: {
    marginTop: 175,
    width: "100%",
    zIndex: -1,
  },

  bannerContentContainer: {
    margin: theme.spacing(0, "auto"),
    maxWidth: 915,
    padding: theme.spacing(5, 0),
    width: "100%",
  },

  docsAccessibleAPIProductBanner: {
    backgroundColor: theme.palette.grey[100],
  },

  docsChip: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.common.white,
  },

  prodAccessibleAPIProductBanner: {
    backgroundColor: theme.palette.primary.light,
  },

  prodChip: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));
