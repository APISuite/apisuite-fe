import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  carouselSlideButtonStyling: {
    ...theme.typography.button,
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.contrastText,
    margin: "0px auto",
    padding: "17px 40px",
    textDecoration: "none",
    width: 200,
    transition: theme.transitions.create(["background-color", "color"], {
      duration: theme.transitions.duration.short,
    }),

    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },

  carouselSlideInnerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.text.primary,
  },

  carouselSlideOuterContainer: {
    alignItems: "center",
    display: "flex",
    height: "auto",
    justifyContent: "center",
  },

  carouselSlider: {
    alignItems: "center",
    display: "flex",
    height: "670px",
    justifyContent: "center",
    width: "100%",
    // Hides the slider's 'previous' and 'next' buttons
    "& > div > span": {
      display: "none",
    },

    // Makes the slider truly full-width (do NOT remove)
    "& .react-Slidy": {
      height: "550px",
      width: "100%",
    },
  },

  carouselSliderIconButtons: {
    display: "flex",
    justifyContent: "center",
    transform: "translateY(-20px)",

    "& > :first-child": {
      borderBottomLeftRadius: `${theme.shape.borderRadius}px`,
      borderTopLeftRadius: `${theme.shape.borderRadius}px`,
    },

    "& > :last-child": {
      borderBottomRightRadius: `${theme.shape.borderRadius}px`,
      borderTopRightRadius: `${theme.shape.borderRadius}px`,
    },
  },

  notSelectedCarouselSliderIconButton: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.grey[300]}`,
    color: "#6A7884",
    height: "40px",
    width: "40px",
  },

  selectedCarouselSliderIconButton: {
    backgroundColor: "#DCDFE3",
    border: `1px solid ${theme.palette.action.focus}`,
    color: theme.palette.action.focus,
    height: "40px",
    width: "40px",
  },

  sideBySideSlideContentsPlacement: {
    flexDirection: "row",
    minHeight: "550px",

    "& > :nth-child(1)": {
      padding: theme.spacing(10, 3, 0, 3),
    },

    "& > :nth-child(2)": {
      padding: theme.spacing(10, 3, 0, 3),
    },
  },

  topToBottomSlideContentsPlacement: {
    flexDirection: "column",
    minHeight: "550px",

    "& > :nth-child(1)": {
      padding: theme.spacing(10, 3, 0, 3),
    },
  },
}));
