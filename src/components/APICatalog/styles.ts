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

  markdownContainer: {
    "& > div > div > div > *": {
      // These margin values make it so that only the first markdown element is shown in the card
      margin: theme.spacing(1.5, 0, 10, 0),
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },

    // To handle warning, info, and tip boxes
    "& > div > div > div > div > .content": {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",

      "& > p": {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    },
  },

  prodChip: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));
