import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  menuItem: {
    ...theme.typography.body1,
    alignItems: "center",
    color: theme.palette.text.secondary,
    display: "flex",
    cursor: "pointer",
    fontWeight: theme.typography.fontWeightLight,
    margin: theme.spacing(2, 0),
    paddingRight: theme.spacing(1),
  },
  selected: {
    border: "solid",
    borderColor: theme.palette.primary.main,
    borderLeftWidth: 0,
    borderRightWidth: 3,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightBold,
  },
  sideMenuContainer: {
    marginRight: 20,
    position: "sticky",
    top: 180,
  },
}));
