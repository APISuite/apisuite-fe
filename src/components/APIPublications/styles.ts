import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  apiContractSelector: {
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.action.active,
    height: 40,
    width: "100%",

    /* Overriding Material UI's styles for the 'Select' component */

    "& > .MuiSelect-select.MuiSelect-select": {
      alignSelf: "flex-end",
      padding: theme.spacing(1.25, 6.25, 1.25, 1.25),
    },

    "& > .MuiSelect-select:focus": {
      backgroundColor: "rgba(0, 0, 0, 0)",
    },

    "& > .MuiSelect-icon": {
      color: theme.palette.action.active,
      marginRight: "15px",
    },
  },

  contentContainer: {
    maxWidth: 915,
    width: "100%",
  },

  deprecatedChip: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.white,
  },

  prodChip: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },

  selectedTab: {
    borderBottom: "3px solid `blue`",
  },

  tabsInnerContainer: {
    "& > button": {
      borderRight: `1px solid ${theme.palette.grey[300]}`,
    },
  },

  tabsOuterContainer: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: "none !important",
    color: theme.palette.text.primary,
    marginTop: theme.spacing(4),
  },
}));
