import { makeStyles } from "@apisuite/fe-base";

const useStyles = makeStyles((theme) => ({
  boldText: {
    fontWeight: 400,
  },

  closeButtonContainer: {
    alignItems: "center",
    cursor: "pointer",
    display: "flex",

    "& > p": {
      color: theme.palette.secondary.main,
      fontSize: "14px",
      fontWeight: 300,
      marginRight: "15px",
      textDecoration: "underline",
    },

    "& > svg": {
      color: theme.palette.secondary.main,
      height: "25px",
      width: "25px",
    },
  },

  formSideContentContainer: {
    padding: "200px 80px",
    width: "65%",

    "@media (min-width: 1440px)": {
      padding: "200px 80px",
      width: "55%",
    },
  },

  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    minWidth: "1024px",
    padding: "15px 80px",
    position: "absolute",
    width: "100%",
    zIndex: 1,
  },

  iconLogo: {
    color: theme.palette.primary.main,
    height: "auto",
    marginRight: "10px",
    width: "60px",
  },

  imageLogo: {
    height: "auto",
    marginRight: "10px",
    padding: "5px",
    width: "60px",
  },

  imageSideContentContainer: {
    padding: "245px 0px",
    width: "35%",

    "@media (min-width: 768px)": {
      padding: "255px 0px",
    },

    "@media (min-width: 1440px)": {
      padding: "175px 0px",
      width: "45%",
    },
  },

  image: {
    maxWidth: "80%",

    "@media (min-width: 1440px)": {
      maxWidth: "500px",
    },
  },

  inputField: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.primary,
  },

  logoAndNameContainer: {
    alignItems: "center",
    cursor: "pointer",
    display: "flex",
  },

  mainContainer: {
    backgroundColor: `${theme.palette.background.default} !important`,
  },

  pageContentContainer: {
    backgroundColor: theme.palette.background.default,
    display: "flex",
    height: "100vh",
    minWidth: "1024px",
    width: "100%",
  },

  portalName: {
    color: theme.palette.secondary.main,
  },
}));

export default useStyles;
