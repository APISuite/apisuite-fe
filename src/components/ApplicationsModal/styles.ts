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
      marginRight: "15px",
      textDecoration: "underline",
    },

    "& > svg": {
      color: theme.palette.action.active,
      height: "25px",
      width: "25px",
    },
  },

  editApplicationHeader: {
    color: theme.palette.secondary.main,
    fontSize: "22px",
    fontWeight: 400,
    margin: "20px 0px 0px 0px",
  },

  iconLogo: {
    color: theme.palette.primary.main,
    height: "auto",
    marginRight: "10px",
    width: "60px",
    fontSize: "inherit",
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
    width: "calc(100% - 24px)",
    [theme.breakpoints.up("md")]: {
      maxWidth: theme.breakpoints.values.md - 24,
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: theme.breakpoints.values.md - 24,
    },
    [theme.breakpoints.up("xl")]: {
      maxWidth: theme.breakpoints.values.md - 24,
    },
  },

  newApplicationHeader: {
    margin: "20px 0px 0px 0px",
  },

  portalName: {
    color: theme.palette.secondary.main,
  },

  /* 1.2 Modal's body */

  addCustomPropsButton: {
    // TODO: Button is temporarily disabled, hence the following 'background-color'.
    // Remove once 'custom properties' feature is fully complete.
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.hint,
    height: 42,
    padding: "6px 21px",
    textDecoration: "none",
  },

  addCustomPropsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },

  additionalInfoSubSectionTitle: {
    color: theme.palette.secondary.main,
    lineHeight: "20px",
    marginBottom: "37.5px",
  },

  alternativeSectionSeparator: {
    border: `1px solid ${theme.palette.grey["100"]}`,
    borderRadius: `${theme.shape.borderRadius}px`,
    margin: theme.spacing(5, 0),
    width: "100%",
  },

  appAvatarContainer: {
    position: "relative",
  },

  appAvatarSubSectionDescription: {
    color: theme.palette.text.primary,
    lineHeight: "17px",
    marginBottom: "25px",
  },

  appNameAndShortDescriptionSubSectionTitle: {
    color: theme.palette.secondary.main,
    lineHeight: "20px",
    marginBottom: "40px",
  },

  appURLFieldWrapper: {
    display: "flex",

    "& > :first-child": {
      marginRight: "10px",
      maxWidth: "350px",
      width: "100%",
    },

    "& > :last-child": {
      backgroundColor: theme.palette.background.default,
      border: `1px solid ${theme.palette.grey["300"]}`,
      borderRadius: `${theme.shape.borderRadius}px`,
      color: theme.palette.action.active,
      cursor: "pointer",
      height: "40px",
      maxWidth: "40px",
      minWidth: "0px",
      padding: "6.5px",
      textAlign: "center",
      width: "100%",
    },
  },

  avatarIcons: {
    color: theme.palette.action.active,
    cursor: "pointer",
    height: "24px",
    position: "absolute",
    right: "7.5px",
    top: "7.5px",
    width: "24px",
    zIndex: 2,
  },

  avatarURLInputField: {
    marginTop: "0px",
    width: "100%",

    // Text field's label styles
    "& > label": {
      color: theme.palette.label,
    },

    "& label.Mui-focused": {
      color: `${theme.palette.action.focus} !important`,
    },

    // Text field's input outline styles
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: `${theme.palette.grey[300]} !important`,
      },

      "&.Mui-focused fieldset": {
        borderColor: `${theme.palette.action.focus} !important`,
      },
    },

    // Text field's input text styles
    "& .MuiInputBase-root": {
      "& .MuiInputBase-input": {
        color: theme.palette.action.active,
        height: "85px",
        transform: "translateY(30px)",
      },
    },

    // Text field's helper text
    "& .MuiFormHelperText-root": {
      color: theme.palette.label,

      "&.Mui-error": {
        color: theme.palette.error.main,
      },
    },
  },

  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px",
  },

  clientApplicationCardStatusText: {
    color: theme.palette.label,
    fontSize: "14px",
    fontWeight: 300,
    textAlign: "left",
  },

  clientCredentialsSubSectionDescription: {
    color: theme.palette.text.primary,
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "17px",
    marginBottom: "40px",
  },

  clientSecretInputFieldContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    background: theme.palette.common.white,
  },

  copyCta: {
    position: "absolute",
    right: 50,
    border: `1px solid ${theme.palette.action.disabled}`,
    background: theme.palette.common.white,
    borderTopRightRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    height: 40,
    marginTop: 8,
    marginBottom: 4,
    "& > button": {
      transform: "translateY(-4px)",
    },
  },

  customPropsFieldsContainer: {
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius,
    marginBottom: 24,
    padding: "18px 12px",

    "& > :first-child": {
      width: 400,
    },
  },

  customPropsFieldsInnerContainer: {
    display: "flex",
    justifyContent: "space-between",

    "& > div": {
      marginBottom: 0,
      width: 270,
    },
  },

  customPropsTextContainer: {
    display: "flex",
    justifyContent: "space-between",

    "& > :first-child": {
      color: theme.palette.secondary.main,
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "20px",
      marginBottom: "37.5px",
      marginRight: 40,
      width: 460,
    },

    "& > :last-child": {
      color: theme.palette.text.primary,
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "17px",
      marginBottom: "40px",
      width: 400,
    },
  },

  disabledClientSecretInputFieldRefreshButton: {
    border: `1px solid ${theme.palette.action.disabledBackground}`,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.action.disabledBackground,
    height: 40,
    marginLeft: 10,
    padding: "7px 0px",
    pointerEvents: "none",
    textAlign: "center",
    width: 47,
  },

  draftClientApplicationCardStatusIcon: {
    color: theme.palette.label,
    fontSize: "12px",
    margin: "0px 12px 0px 12px",
  },

  editApplicationHeaderContainer: {
    display: "flex",
  },

  editApplicationHeaderStatusContainer: {
    alignItems: "center",
    display: "flex",
  },

  enabledClientIDInputField: {
    marginBottom: "25px",
    marginTop: "0px",
    maxWidth: "400px",
    width: "100%",

    // Text field's label styles
    "& > label": {
      color: theme.palette.label,
    },

    "& label.Mui-focused": {
      color: `${theme.palette.action.focus} !important`,
    },

    // Text field's input outline styles
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: `${theme.palette.grey[300]} !important`,
      },

      "&.Mui-focused fieldset": {
        borderColor: `${theme.palette.action.focus} !important`,
      },

      // Multiline text field's styles
      "&.MuiInputBase-multiline": {
        height: "104.5px",
      },
    },

    // Text field's input text styles
    "& .MuiInputBase-root": {
      paddingRight: "8.5px !important",

      "& .MuiInputBase-input": {
        borderRight: "1px solid rgba(0, 0, 0, 0.2)",
        color: theme.palette.action.active,
      },

      "& .MuiInputAdornment-root": {
        color: theme.palette.action.active,
        cursor: "pointer",
      },
    },
  },

  enabledClientSecretInputField: {
    marginBottom: "25px",
    marginTop: "0px",
    maxWidth: "350px",
    width: "100%",

    // Text field's label styles
    "& > label": {
      color: theme.palette.label,
    },

    "& label.Mui-focused": {
      color: `${theme.palette.action.focus} !important`,
    },

    // Text field's input outline styles
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: `${theme.palette.grey[300]} !important`,
      },

      "&.Mui-focused fieldset": {
        borderColor: `${theme.palette.action.focus} !important`,
      },

      // Multiline text field's styles
      "&.MuiInputBase-multiline": {
        height: "104.5px",
      },
    },

    // Text field's input text styles
    "& .MuiInputBase-root": {
      paddingRight: "8.5px !important",

      "& .MuiInputBase-input": {
        borderRight: "1px solid rgba(0, 0, 0, 0.2)",
        color: theme.palette.action.active,
      },

      "& .MuiInputAdornment-root": {
        color: theme.palette.action.active,
        cursor: "pointer",
      },
    },
  },

  enabledClientSecretInputFieldRefreshButton: {
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: `${theme.shape.borderRadius}px`,
    color: theme.palette.action.active,
    cursor: "pointer",
    height: "40px",
    marginLeft: "10px",
    padding: "7px 0px",
    textAlign: "center",
    width: "47px",
  },

  focusedAvatar: {
    background: theme.palette.gradient.light,
    fontSize: "13.75px",
    fontWeight: 300,
    height: "55px",
    left: 0,
    marginLeft: "auto",
    marginRight: "auto",
    position: "absolute",
    right: 0,
    textTransform: "uppercase",
    top: "12.5px",
    width: "55px",
    zIndex: 2,
  },

  fullDescriptionField: {
    maxWidth: "none !important",
  },

  infoBox: {
    alignItems: "center",
    backgroundColor: theme.palette.info.light,
    borderRadius: `${theme.shape.borderRadius}px`,
    display: "flex",
    height: "100%",
    padding: "12px 10px",
    textAlign: "left",
    width: "400px",
  },

  infoBoxLink: {
    fontWeight: 700,
    textDecoration: "none",
  },

  infoBoxText: {
    color: "#035E86",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "18px",
    margin: "0px 0px 5px 2.5px",
  },

  inputFields: {
    marginBottom: "25px",
    marginTop: "0px",
    maxWidth: "400px",
    width: "100%",

    // Text field's label styles
    "& > label": {
      color: theme.palette.label,
    },

    "& label.Mui-focused": {
      color: `${theme.palette.action.focus} !important`,
    },

    // Text field's input outline styles
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: `${theme.palette.grey[300]} !important`,
      },

      "&.Mui-focused fieldset": {
        borderColor: `${theme.palette.action.focus} !important`,
      },

      // Multiline text field's styles
      "&.MuiInputBase-multiline": {
        height: 200,
        maxWidth: "none",
      },
    },

    // Text field's helper text styles
    "& > p": {
      color: theme.palette.label,
    },

    // Text field's input text styles
    "& .MuiInputBase-root": {
      "& .MuiInputBase-input": {
        color: theme.palette.action.active,
      },
    },
  },

  leftSubSectionContainer: {
    marginRight: "40px",
    width: "460px",
  },

  markdownIcon: {
    bottom: theme.spacing(1),
    color: theme.palette.text.hint,
    height: 24,
    position: "absolute",
    right: theme.spacing(1),
    width: 24,
  },

  metaPrefix: {
    "& > p": {
      marginRight: -8,
      paddingTop: 1,
    },
  },

  modalBodyContainer: {
    display: "block",
    margin: "0 auto",
    maxWidth: "900px",
    width: "100%",
  },

  notFocusedAvatar: {
    background: theme.palette.gradient.light,
    fontSize: "20px",
    fontWeight: 300,
    height: "80px",
    left: 0,
    marginLeft: "auto",
    marginRight: "auto",
    position: "absolute",
    right: 0,
    textTransform: "uppercase",
    top: "12.5px",
    width: "80px",
    zIndex: 2,
  },

  optionalURLsSubSectionDescription: {
    color: theme.palette.text.primary,
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "17px",
    marginBottom: "22.5px",
  },

  otherButtons: {
    marginLeft: theme.spacing(3),
    padding: theme.spacing(.75, 2.75),

    "&:hover": {
      backgroundColor: theme.palette.background.default,
    },
  },

  redirectURISubSectionTitle: {
    color: theme.palette.secondary.main,
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "20px",
    marginBottom: "37.5px",
  },

  regularSectionSeparator: {
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(5, 0),
    width: "100%",
  },

  removeAppButton: {
    backgroundColor: theme.palette.error.main,
    border: `1px solid ${theme.palette.error.main}`,
    borderRadius: `${theme.shape.borderRadius}px`,
    color: `${theme.palette.primary.contrastText} !important`,
    fontSize: "16px",
    fontWeight: 500,
    marginLeft: "25px",
    padding: "6px 21px",
    textDecoration: "none",

    "&:hover": {
      backgroundColor: theme.palette.error.main,
    },
  },

  rightSubSectionContainer: {
    width: "400px",
  },

  row: {
    alignItems: "center",
    display: "flex",
    position: "relative",
  },

  rowCta: {
    background: theme.palette.common.white,
    border: `1px solid ${theme.palette.action.disabled}`,
    borderBottomRightRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    height: 40,
    marginBottom: 4,
    marginTop: 8,
    position: "absolute",
    right: 0,

    "& > button": {
      transform: "translateY(-4px)",
    },
  },

  sectionContainer: {
    display: "flex",
  },

  selectorOption: {
    color: theme.palette.action.active,
    fontSize: "15px",
    fontWeight: 300,
    padding: "5px 25px",
  },

  selectorTitle: {
    color: theme.palette.text.primary,
    fontSize: "14px",
    fontWeight: 300,
    padding: "6px 25px",
  },

  subscribedClientApplicationCardStatusIcon: {
    color: theme.palette.primary.main,
    fontSize: "14px",
    margin: "0px 0px 0px 12px",
  },

  title: {
    color: theme.palette.secondary.main,
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "20px",
    marginBottom: "37.5px",
  },

  description: {
    color: theme.palette.grey[300],
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "17px",
    marginBottom: "22.5px",
  },
  cancelButton: {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.primary.contrastText} !important`,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));
