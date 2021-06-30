import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  activeDocumentationAccessFilterButtonIcon: {
    color: theme.palette.action.active,
  },

  activeFilterButtonContainer: {
    alignItems: "center",
    backgroundColor: "#DCDFE3",
    border: `1px solid ${theme.palette.label}`,
    borderLeft: "none",
    cursor: "pointer",
    display: "flex",
    padding: "0px 6px",
  },

  activeProductionAccessFilterButtonIcon: {
    color: theme.palette.primary.main,
  },

  activeSandboxAccessFilterButtonIcon: {
    color: theme.palette.secondary.main,
  },

  apiCatalogContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  apiProductButtons: {
    display: "flex",
    height: "40px",
    marginBottom: "6px",
  },

  apiProductVersion: {
    color: theme.palette.background.default,
    fontSize: "14px",
    fontWeight: 400,
  },

  documentationAccess: {
    backgroundColor: theme.palette.action.active,
    borderRadius: `${theme.shape.borderRadius}px`,
    padding: "4px 8px",
  },

  filtersContainer: {
    display: "flex",
    justifyContent: "flex-end",
    paddingBottom: theme.spacing(4),
  },

  inactiveFilterButtonContainer: {
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.label}`,
    borderLeft: "none",
    cursor: "pointer",
    display: "flex",
    padding: "0px 6px",
  },

  inactiveFilterButtonIcon: {
    color: theme.palette.text.primary,
  },

  lastFilterButtonContainer: {
    borderBottomRightRadius: "4px",
    borderTopRightRadius: "4px",
  },

  latestAPIProductImage: {
    /* The 'box-shadow' property was not generating the
    intended shadow, so 'filter' was used instead. */
    filter: "drop-shadow(0px 5px 2.5px rgba(0, 0, 0, 0.25))",
    width: 380,
    height: "auto",
    marginRight: 40,
    position: "absolute",
  },

  latestAPIProductUpdateSection: {
    // First color is a fallback one - do not remove!
    background: theme.palette.gradient.dark,
    borderBottom: "4px solid rgba(20, 40, 60, 0.1)",
    width: "100%",
    padding: "160px 60px 0px 60px",
  },

  textFilter: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.label}`,
    borderBottomRightRadius: "0px",
    borderRadius: `${theme.shape.borderRadius}px`,
    borderTopRightRadius: "0px",
    maxWidth: "325px",
    padding: "2.5px 12px",
    width: "100%",

    "& > :first-child": {
      fontSize: "16px",
      fontWeight: 300,
    },

    "& > :last-child": {
      color: theme.palette.label,
    },
  },
}));
