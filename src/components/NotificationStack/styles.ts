import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  stack: {
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    pointerEvents: "none",
    top: 42,
    width: "100%",
    zIndex: theme.zIndex.snackbar,
  },
}));
