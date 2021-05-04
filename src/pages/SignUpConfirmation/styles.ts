import { makeStyles } from "@apisuite/fe-base";
import celebration from "assets/celebration.svg";

const useStyles = makeStyles((theme) => ({
  closeButtonContainer: {
    alignItems: "center",
    cursor: "pointer",
    display: "flex",

    "& > p": {
      color: theme.palette.primary.contrastText,
      fontSize: "14px",
      fontWeight: 300,
      marginRight: "15px",
      textDecoration: "underline",
    },

    "& > svg": {
      color: theme.palette.background.default,
      height: "25px",
      width: "25px",
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
    backgroundImage: "url(" + celebration + ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 8.5% 100%)",
    width: "45%",

    "@media (min-width: 1100px)": {
      width: "50%",
    },

    "@media (min-width: 1280px)": {
      width: "55%",
    },
  },

  infoBox: {
    alignItems: "center",
    backgroundColor: theme.palette.info.light,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    display: "flex",
    padding: "12px 35px 12px 10px",
    textAlign: "left",
  },

  infoBoxIcon: {
    fill: "#46B5EF",
    transform: "translate(-2.5px, -12.5px)",

    "@media (min-width: 1600px)": {
      transform: "translate(-2.5px, -1.5px)",
    },
  },

  infoBoxText: {
    color: "#035E86",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "18px",
    margin: "0px 0px 5px 2.5px",
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
    display: "flex",
    height: "120vh",
    minWidth: "1024px",
    width: "100%",
  },

  portalName: {
    color: theme.palette.secondary.main,
    fontSize: "24px",
    fontWeight: 500,
  },

  signUpCompleteSideContentContainer: {
    padding: "200px 80px",
    width: "55%",

    "@media (min-width: 1100px)": {
      width: "50%",
    },

    "@media (min-width: 1280px)": {
      width: "45%",
    },
  },

  signUpCompleteSideSubtitle: {
    color: theme.palette.text.primary,
    fontSize: "20px",
    fontWeight: 300,
    marginBottom: "40px",
  },

  signUpCompleteSideSubtitleBoldPart: {
    fontSize: "20px",
    fontWeight: 500,
  },

  signUpCompleteSideTitle: {
    color: theme.palette.secondary.main,
    fontSize: "42px",
    fontWeight: 700,
    marginBottom: "16px",
  },
}));

export default useStyles;
