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

  carouselButton: {
    backgroundColor: theme.palette.secondary.main,
    border: "none",
    color: theme.palette.action.focus,
    height: "40px",
    marginRight: theme.spacing(1.5),
    width: "40px",
  },

  highlightIcon: {
    color: theme.palette.info.main,
    fontSize: 60,
  },

  highlightsBackgroundBanner: {
    backgroundColor: theme.palette.secondary.main,
    height: 500,
    width: "100%",

    // Carousel highlight cards
    "& > :first-child": {
      position: "relative",
      top: "40%",

      "@media (min-width: 1024px)": {
        padding: theme.spacing(0, 25),
      },

      "@media (min-width: 1232px)": {
        padding: theme.spacing(0, 37.5),
      },

      "@media (min-width: 1440px)": {
        padding: theme.spacing(0, 50),
      },

      "@media (min-width: 1648px)": {
        padding: theme.spacing(0, 62.5),
      },

      "@media (min-width: 1856px)": {
        padding: theme.spacing(0, 75),
      },

      "@media (min-width: 2064px)": {
        padding: theme.spacing(0, 90),
      },

      "@media (min-width: 2560px)": {
        padding: theme.spacing(0, 105),
      },
    },

    // Carousel highlight card picker
    "& > :last-child": {
      position: "relative",
      textAlign: "center",
      top: "60%",
    },
  },
}));
