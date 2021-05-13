import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  /* 1. Modal */

  modalContentsContainer: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: `${theme.shape.borderRadius}px`,
    boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.3)",
    height: "100%",
    /* The 'outline' property is necessary to remove
    an annoying orange border that Material UI adds
    to modals by default. Do NOT remove. */
    outline: "none",
    /* The 'overflow' property is necessary to allow
    for scrolling on Material UI modals. Do NOT remove. */
    overflow: "scroll",
    padding: "25px 80px",
    width: "100%",
  },

  /* 1.1 Modal's header */

  closeModalButtonContainer: {
    alignItems: "center",
    cursor: "pointer",
    display: "flex",

    "& > p": {
      color: theme.palette.label,
      fontSize: "14px",
      fontWeight: 300,
      marginRight: "15px",
      textDecoration: "underline",
    },

    "& > svg": {
      color: theme.palette.action.active,
      height: "25px",
      width: "25px",
    },
  },

  iconLogo: {
    color: theme.palette.primary.main,
    height: "auto",
    marginRight: "10px",
    width: "60px",
  },

  imageLogo: {
    height: "auto",
    marginRight: "10px",
    padding: "5px",
    width: "60px",
  },

  logoAndNameContainer: {
    alignItems: "center",
    display: "flex",
  },

  modalHeaderContainer: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    margin: "0 auto",
    maxWidth: "900px",
    width: "100%",
  },

  portalLogo: {
    color: theme.palette.primary.main,
    height: "auto",
    /* This property makes it so that the logo is
    left-aligned with the remaining content.
    Do NOT remove. */
    marginLeft: "-7px",
    marginRight: "7px",
    width: "55px",
  },

  portalName: {
    color: theme.palette.secondary.main,
    fontSize: "24px",
    fontWeight: 500,
  },

  /* 1.2 Modal's body */

  header: {
    color: theme.palette.secondary.main,
    fontSize: "22px",
    fontWeight: 400,
    margin: "20px 0px 0px 0px",
  },

  modalBodyContainer: {
    display: "block",
    margin: "0 auto",
    maxWidth: "900px",
    width: "100%",
  },

  sectionSeparator: {
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: theme.shape.borderRadius,
    margin: "25px 0px",
    width: "100%",
  },

  /* 1.2.1 'Steps' section */

  stepsContainer: {
    color: theme.palette.action.active,
    fontSize: "20px",
    fontWeight: 200,
    lineHeight: "30px",
    margin: "25px 0px 0px 0px",
    paddingLeft: "19.25px",

    "& li": {
      paddingLeft: "7.5px",
    },
  },

  /* 1.2.2 'Client applications' section */

  clientAppNotificationContainer: {
    maxWidth: "400px",
    width: "100%",

    "& > :first-child": {
      color: theme.palette.text.primary,
      fontSize: "14px",
      fontWeight: 400,
      marginBottom: "25px",
    },
  },

  clientAppSelectorContainer: {
    marginRight: "40px",
    maxWidth: "420px",
    width: "100%",

    "& > :first-child": {
      color: theme.palette.secondary.main,
      fontSize: "16px",
      fontWeight: 500,
      marginBottom: "25px",
    },

    "& > :last-child": {
      color: theme.palette.action.active,
      border: `1px solid ${theme.palette.grey[400]}`,
      borderRadius: theme.shape.borderRadius,
      height: "40px",
      maxWidth: "420px",
      width: "100%",

      /* Overriding Material UI's styles for the 'Select' component */

      "& > .MuiSelect-select.MuiSelect-select": {
        alignSelf: "flex-end",
        padding: "10px 50px 10px 10px",
      },

      "& > .MuiSelect-icon": {
        color: theme.palette.action.active,
        marginRight: "15px",
      },
    },
  },

  clientAppsContainer: {
    display: "flex",
  },

  infoBox: {
    alignItems: "center",
    backgroundColor: theme.palette.info.light,
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    height: "100%",
    marginBottom: "25px",
    maxHeight: "65px",
    textAlign: "left",
  },

  infoBoxIcon: {
    fill: "#46B5EF",
    transform: "translate(7px, -7px)",
  },

  infoBoxText: {
    color: "#035E86",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "18px",
    margin: "0px 10px 0px 15px",
  },

  warningBox: {
    alignItems: "center",
    backgroundColor: "#FFDCB9",
    borderRadius: `${theme.shape.borderRadius}px`,
    display: "flex",
    height: "100%",
    marginBottom: "25px",
    maxHeight: "65px",
    textAlign: "left",
  },

  warningBoxIcon: {
    fill: theme.palette.warning.main,
    transform: "translate(7px, -7px)",
  },

  warningBoxText: {
    color: "#80460B",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "18px",
    margin: "0px 10px 0px 15px",
  },

  /* 1.2.3 'API product subscriptions' section */

  alternativeAPIProductDetailsContainer: {
    alignItems: "center",
    backgroundColor: "none",
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    display: "flex",
    height: "40px",
    justifyContent: "space-between",
    padding: "10px 16.75px 10px 40px",
    width: "100%",
  },

  apiProductName: {
    color: theme.palette.action.active,
    fontSize: "16px",
    fontWeight: 500,
  },

  apiProductVersion: {
    color: theme.palette.text.primary,
    fontSize: "14px",
    fontWeight: 300,
    marginRight: "14.75px",
  },

  apiProductVersionAndSelectionContainer: {
    alignItems: "center",
    display: "flex",
  },

  apiProductsSubsContainer: {
    display: "block",
  },

  apiProductsSubsTable: {
    maxWidth: "900px",
  },

  noAPIProductsToShow: {
    alignItems: "center",
    display: "flex",
    height: "160px",
    justifyContent: "center",
    width: "100%",

    "& > :first-child": {
      color: theme.palette.text.primary,
      fontSize: "16px",
      fontWeight: 300,
    },
  },

  notSelectedAPIProduct: {
    color: theme.palette.text.primary,
  },

  regularAPIProductDetailsContainer: {
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    display: "flex",
    height: "40px",
    justifyContent: "space-between",
    padding: "10px 16.75px 10px 40px",
    width: "100%",
  },

  selectedAPIProduct: {
    color: theme.palette.primary.main,
  },

  tableBody: {
    backgroundColor: theme.palette.grey[50],
    border: `1px solid ${theme.palette.grey[300]}`,
    borderBottomLeftRadius: `${theme.shape.borderRadius}px`,
    borderBottomRightRadius: `${theme.shape.borderRadius}px`,
    borderTop: "none",
    width: "100%",
  },

  tableHeader: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.grey[300]}`,
    borderTopLeftRadius: `${theme.shape.borderRadius}px`,
    borderTopRightRadius: `${theme.shape.borderRadius}px`,
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 55px 10px 40px",
    width: "100%",

    "& > :first-child": {
      color: theme.palette.action.active,
      fontSize: "16px",
      fontWeight: 400,
    },

    "& > :last-child": {
      color: theme.palette.text.primary,
      fontSize: "16px",
      fontWeight: 300,
    },
  },

  titleAndSubtitleContainer: {
    display: "flex",

    "& > :first-child": {
      color: theme.palette.secondary.main,
      fontSize: "16px",
      fontWeight: 500,
      marginBottom: "25px",
      marginRight: "40px",
      maxWidth: "420px",
      width: "100%",
    },

    "& > :last-child": {
      color: theme.palette.text.primary,
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "18px",
      marginBottom: "25px",
      maxWidth: "400px",
      width: "100%",
    },
  },

  /* 1.2.4 'Buttons' section */

  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },

  disabledOtherButtons: {
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.label}`,
    borderRadius: `${theme.shape.borderRadius}px`,
    color: `${theme.palette.action.active} !important`,
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 500,
    marginLeft: "25px",
    opacity: 0.5,
    padding: "12px 21px",
    pointerEvents: "none",
    textDecoration: "none",

    "&:hover": {
      backgroundColor: theme.palette.background.default,
    },
  },

  disabledRequestAccessButton: {
    backgroundColor: theme.palette.secondary.main,
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: `${theme.shape.borderRadius}px`,
    color: `${theme.palette.background.default} !important`,
    fontSize: "16px",
    fontWeight: 500,
    opacity: 0.5,
    padding: "12px 21px",
    pointerEvents: "none",
    textDecoration: "none",

    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },

  disabledRevokeAccessButton: {
    backgroundColor: theme.palette.warning.main,
    border: `1px solid ${theme.palette.warning.main}`,
    borderRadius: `${theme.shape.borderRadius}px`,
    color: `${theme.palette.background.default} !important`,
    fontSize: "16px",
    fontWeight: 500,
    opacity: 0.5,
    padding: "12px 21px",
    pointerEvents: "none",
    textDecoration: "none",

    "&:hover": {
      backgroundColor: theme.palette.warning.main,
    },
  },

  enabledOtherButtons: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.label}`,
    borderRadius: `${theme.shape.borderRadius}px`,
    color: `${theme.palette.action.active} !important`,
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 500,
    marginLeft: "25px",
    padding: "12px 21px",
    textDecoration: "none",

    "&:hover": {
      backgroundColor: theme.palette.background.default,
    },
  },

  enabledRequestAccessButton: {
    backgroundColor: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: `${theme.shape.borderRadius}px`,
    color: `${theme.palette.background.default} !important`,
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 500,
    opacity: 1,
    padding: "12px 21px",
    textDecoration: "none",

    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },

  enabledRevokeAccessButton: {
    backgroundColor: theme.palette.warning.main,
    border: `1px solid ${theme.palette.warning.main}`,
    borderRadius: `${theme.shape.borderRadius}px`,
    color: `${theme.palette.background.default} !important`,
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 500,
    opacity: 1,
    padding: "12px 21px",
    textDecoration: "none",
  },

  leftSideButtonsContainer: {
    display: "flex",
    marginBottom: "50px",
    marginTop: "7.5px",
  },

  rightSideButtonsContainer: {
    display: "flex",
    marginBottom: "50px",
    marginTop: "7.5px",
  },
}));
