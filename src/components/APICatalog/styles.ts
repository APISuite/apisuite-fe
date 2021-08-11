import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  card: {
    height: 184,
  },

  colorsOfAPIDocumentation: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.background.default,
  },

  colorsOfProductionAPI: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.default,
  },

  contractlessAPIProduct: {
    pointerEvents: "none",
  },
}));
