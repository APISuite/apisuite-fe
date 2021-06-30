import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  badge: {
    borderRadius: `${theme.shape.borderRadius}px`,
    fontSize: ".7em",
    lineHeight: "1em",
    padding: "5px",
    textAlign: "center",
    width: "40px",
  },
  live: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  centerVertical: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "50vh",
  },
}));
