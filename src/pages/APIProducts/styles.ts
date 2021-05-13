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

  allAPIProductsSection: {
    margin: "20px auto 0px auto",
    maxWidth: "900px",
    width: "100%",
  },

  apiCatalogContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  apiCatalogSectionContainer: {
    display: "block",
    margin: "40px auto -40px auto",
    maxWidth: "900px",
    width: "100%",
  },

  apiProductButtons: {
    display: "flex",
    height: "40px",
    marginBottom: "6px",
  },

  apiProductName: {
    color: theme.palette.background.default,
    fontSize: "22px",
    fontWeight: 400,
    marginRight: "12px",
  },

  apiProductNameAndVersion: {
    alignItems: "center",
    display: "flex",
    marginBottom: "12px",
    marginTop: "-5px",
  },

  apiProductOfflineStatus: {
    color: theme.palette.background.default,
    fontSize: "14px",
    marginRight: "12px",
  },

  apiProductOnlineStatus: {
    color: theme.palette.primary.main,
    fontSize: "14px",
    marginRight: "12px",
  },

  apiProductStatusAndAccessType: {
    display: "flex",

    // Access type
    "& > :last-child": {
      color: theme.palette.primary.main,
      fontSize: "14px",
      fontWeight: 300,
      textAlign: "left",
    },
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

  latestAPIProductDetails: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "560px",
    width: "100%",
  },

  latestAPIProductImage: {
    /* The 'box-shadow' property was not generating the
    intended shadow, so 'filter' was used instead. */
    filter: "drop-shadow(0px 5px 2.5px rgba(0, 0, 0, 0.25))",
    height: "185px",
    marginRight: "40px",
    width: "320px",
  },

  latestAPIProductTitle: {
    color: theme.palette.background.default,
    fontSize: "16px",
    fontWeight: 500,
  },

  latestAPIProductUpdateContainer: {
    display: "flex",
    padding: "180px 60px 0px 60px",
  },

  latestAPIProductUpdateSection: {
    // First color is a fallback one - do not remove!
    background: theme.palette.gradient.dark,
    borderBottom: "4px solid rgba(20, 40, 60, 0.1)",
    height: "335px",
    marginBottom: "-280px",
    transform: "translateY(-300px)",
    width: "100%",
  },

  productionAccess: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: `${theme.shape.borderRadius}px`,
    padding: "4px 8px",
  },

  retrievingAPIProductMessageContainer: {
    textAlign: "center",

    "& > :first-child": {
      color: theme.palette.secondary.main,
      fontSize: "16px",
      fontWeight: 300,
    },
  },

  sandboxAccess: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: `${theme.shape.borderRadius}px`,
    padding: "4px 8px",
  },

  subscribeButton: {
    backgroundColor: theme.palette.background.default,
    borderRadius: `${theme.shape.borderRadius}px`,
    color: `${theme.palette.secondary} !important`,
    fontSize: "16px",
    fontWeight: 500,
    padding: "12px 20px",
    textDecoration: "none",

    "&:hover": {
      backgroundColor: theme.palette.background.default,
    },
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

  viewDetailsButton: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    color: `${theme.palette.primary.contrastText} !important`,
    fontSize: "16px",
    fontWeight: 500,
    marginRight: 12,
    padding: "12px 20px",
    textDecoration: "none",

    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));
