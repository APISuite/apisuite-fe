import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  activeFilter: {
    color: theme.palette.info.main,
    marginRight: 0,

    "& > :first-child": {
      color: theme.palette.info.main,
    },

    "& > :last-child": {
      fontSize: "14px",
      fontWeight: 500,
    },
  },

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

  docsAccessibleChip: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.text.primary,
    fontWeight: 300,
  },

  documentationLink: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: `${theme.shape.borderRadius}px`,
    color: `${theme.palette.primary.contrastText} !important`,
    cursor: "pointer",
    fontWeight: 500,
    padding: theme.spacing(1.5, 2.5),
    textDecoration: "none",
  },

  filtersContainer: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
  },

  inactiveFilter: {
    color: theme.palette.grey[400],
    marginRight: 0,

    "& > :last-child": {
      fontSize: "14px",
      fontWeight: 300,
    },
  },

  lastFilterButtonContainer: {
    borderBottomRightRadius: "4px",
    borderTopRightRadius: "4px",
  },

  latestAPIProductImage: {
    /* The 'box-shadow' property was not generating the
    intended shadow, so 'filter' was used instead. */
    filter: "drop-shadow(0px 5px 2.5px rgba(0, 0, 0, 0.25))",
    width: 325,
    height: "auto",
    marginRight: theme.spacing(3),
    position: "absolute",
  },

  latestAPIProductUpdateSection: {
    // First color is a fallback one - do not remove!
    background: theme.palette.gradient.dark,
    borderBottom: "4px solid rgba(20, 40, 60, 0.1)",
    height: 350,
    width: "100%",
    padding: theme.spacing(22.5, 7.5, 0, 7.5),
  },

  noAPIProductsIllustration: {
    height: "auto",
    width: 500,
  },

  notShowingFilters: {
    marginBottom: theme.spacing(5),
  },

  prodAccessibleChip: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
    fontWeight: 300,
  },

  showingFilters: {
    marginBottom: theme.spacing(3),
  },

  textFilter: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.label}`,
    borderRadius: `${theme.shape.borderRadius}px`,
    maxWidth: "670px",
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
