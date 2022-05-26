import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  tabRoot: {
    borderBottom: `1px solid ${theme.palette.background.paper}`,
    color: theme.palette.text.primary,
    fontWeight: 300,
    minWidth: "unset",
    opacity: 1,
    padding: theme.spacing(1),
    textTransform: "none",

    "&.Mui-selected": {
      fontWeight: "bold",
    },

    "&.MuiTab-wrapper": {
      flexDirection: "row",
      justifyContent: "flex-end",
      paddingRight: theme.spacing(1),
    },
  },

  indicator: {
    backgroundColor: theme.palette.primary.main,
    width: 3,
  },
}));
