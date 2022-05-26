import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "row",
    minHeight: "100%",
    padding: "0 !important",
  },

  navContainer: {
    borderRight: `1px solid ${theme.palette.background.paper}`,
    minWidth: 260,
    padding: theme.spacing(4, 0),
  },

  contentContainer: {
    margin: theme.spacing(0, "auto"),
    minWidth: "calc(100% - 260px)",
    padding: theme.spacing(4, 8),
  },
}));
