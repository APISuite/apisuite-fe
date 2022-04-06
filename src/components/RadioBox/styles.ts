import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  enabled: {
    cursor: "pointer",
  },
  radioBox: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    flexDirection: "column",
    maxWidth: "300px",
    padding: theme.spacing(1),
  },
}));
