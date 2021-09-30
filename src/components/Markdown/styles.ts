import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  item: {
    fontWeight: theme.typography.fontWeightLight,
  },
  menuItem: {
    alignItems: "center",
    color: theme.palette.text.secondary,
    display: "flex",
    cursor: "pointer",
    margin: theme.spacing(2, 0),
  },
  selected: {
    border: "solid",
    borderColor: theme.palette.info.main,
    borderLeftWidth: 0,
    borderRightWidth: 3,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightBold,
    paddingRight: theme.spacing(2),
  },
  sideMenuContainer: {
    marginRight: 20,
    marginTop: 50,
    paddingRight: theme.spacing(2),
    position: "sticky",
    top: 180,
  },
}));
