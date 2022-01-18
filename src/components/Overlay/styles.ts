import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  overlay: {
    display: "flex",
    backgroundColor: theme.palette.background.paper,
    height: "100%",
    width: "100%",
    flexDirection: "column",
  },

  nav: {
    top: "0",
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    justifyContent: "flex-end",
    position: "fixed",
    width: "inherit",
    flexDirection: "row",

    "&.transparent": {
      backgroundColor: "transparent !important",
    },

    "&.spaced": {
      justifyContent: "space-between !important",
    },
  },

  logoContainer: {
    color: theme.palette.grey[900],
    height: "auto",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    fontWeight: 600,
    padding: theme.spacing(1.25, 0, 1.25, 3.75),
  },

  clickable: {
    color: theme.palette.text.secondary,
    display: "flex",
    cursor: "pointer",
    alignSelf: "center",
    padding: theme.spacing(1.5, 2.5),

    "&:hover": {
      textDecoration: "underline",
    },
  },

  close: {
    marginRight: theme.spacing(1),
    alignSelf: "center",
  },

  container: {
    height: "100vh",
    marginTop: theme.spacing(10),
    overflowY: "auto",
    padding: theme.spacing(2, 11),
  },
}));
