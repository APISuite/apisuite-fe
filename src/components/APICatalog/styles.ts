import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  card: {
    height: 200,
  },

  colorsOfAPIDocumentation: {
    backgroundColor: theme.palette.action.active,
    color: theme.palette.background.default,
  },

  colorsOfProductionAPI: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.default,
  },
}));
