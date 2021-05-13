import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 999,
    backgroundColor: theme.palette.secondary.main,

    "&.expand": {
      backgroundColor: "transparent",
    },

    "& header": {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      margin: "0 50px",
      color: theme.palette.secondary.contrastText,

      "&.expand": {
        borderBottom: `1px solid ${theme.palette.divider}`,
        paddingTop: 25,
      },
    },

    "& nav": {
      backgroundColor: theme.palette.grey[100],
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      padding: "0 50px",

      "&.expand": {
        backgroundColor: "transparent",
      },
    },
  },
  tabIndicator: {
    backgroundColor: theme.palette.primary.main,
    height: 3,
    top: 0,
    transition: "none !important",
  },
  positionBottomTabIndicator: {
    backgroundColor: theme.palette.primary.main,
    height: 3,
    top: 0,
    transition: "none !important",
  },
  positionBottomTabs: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: "0 50px",
    color: theme.palette.secondary.contrastText,
    transform: "translateY(-2px)",
  },
  space: {
    flex: 1,
  },
  logo: {
    width: 60,
    height: "auto",
    marginRight: 10,
  },
  // FIXME: this logic will probably not work with all images
  logoImage: {
    height: 60,
    width: "auto",
    marginRight: 10,
  },
  logoLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  tab: {
    color: theme.palette.secondary.contrastText,
    fontSize: "18px",
    fontWeight: 300,
    minWidth: "unset",
    opacity: 1,
    padding: "40px 16px",
    "&.contract": {
      padding: 16,
    },
  },
  activeTab: {
    "& > span": {
      fontWeight: 600,
    },
  },
  subTab: {
    color: theme.palette.text.primary,
    fontSize: "16px",
    fontWeight: 300,
    minWidth: "unset",
    opacity: 1,
    padding: 16,
    "&.expand": {
      color: theme.palette.secondary.contrastText,
    },
  },
  subTabIndicator: {
    backgroundColor: theme.palette.secondary.main,
    height: 3,
    bottom: 0,
    transition: "none !important",
  },
  subTabAlternativeIndicator: {
    backgroundColor: theme.palette.primary.light,
    height: 3,
    bottom: 3,
    transition: "none !important",
  },
  profileLink: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: "18px",
    fontWeight: 300,
    textDecoration: "none",
  },
  userAvatar: {
    background: theme.palette.gradient.light,
    border: `2px solid ${theme.palette.primary.contrastText}`,
    fontSize: "20px",
    fontWeight: 300,
    height: "33px",
    width: "33px",
    marginLeft: 20,

    "&:hover": {
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
  goBackButton: {
    alignItems: "center",
    cursor: "pointer",
    display: "flex",
    color: theme.palette.label,

    "& > span": {
      fontSize: "16px",
      fontWeight: 500,
    },

    "& > svg": {
      marginRight: "8px",
    },
  },
  notification: {
    position: "relative",
    width: 32,
    height: 32,
    paddingTop: 1.5,
    borderRadius: "50%",
    backgroundColor: theme.palette.background.default,
    color: theme.palette.secondary.main,
    cursor: "pointer",
    textAlign: "center",
    alignSelf: "center",

    "&:not(.expand)": {
      backgroundColor: "transparent",
      color: theme.palette.text.hint,
    },

    "& span": {
      position: "absolute",
      top: "-35%",
      right: "-52%",
      width: 24,
      height: 24,
      textAlign: "center",
      borderRadius: theme.shape.borderRadius,
      pointerEvents: "none",
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,

      "&.expand": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      },
    },
  },
}));
