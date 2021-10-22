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

  docsChip: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.common.white,
  },

  prodChip: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));
