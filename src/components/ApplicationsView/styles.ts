import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  editApplicationHeader: {
    color: theme.palette.secondary.main,
    fontSize: "22px",
    fontWeight: 400,
    margin: "20px 0px 0px 0px",
  },

  addCustomPropsButton: {
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.hint,
    height: 42,
    padding: "6px 21px",
    textDecoration: "none",
  },

  alternativeSectionSeparator: {
    border: `1px solid ${theme.palette.grey["100"]}`,
    borderRadius: `${theme.shape.borderRadius}px`,
    margin: theme.spacing(5, 0),
    width: "100%",
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

  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px",
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

  deleteAppButtonStyles: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
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

  descriptionField: {
    maxWidth: "none !important",
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
      "& .MuiInputBase-input.Mui-disabled": {
        color: theme.palette.text.disabled,
      },
    },
  },

  inputFullWidth: {
    maxWidth: "100% !important",
  },

  inputNoMargin: {
    marginBottom: 0,
  },

  markdownIcon: {
    bottom: theme.spacing(-3),
    color: theme.palette.text.hint,
    height: 24,
    position: "absolute",
    right: 0,
    width: 24,
  },

  metaPrefix: {
    "& > p": {
      marginRight: -8,
      paddingTop: 1,
    },
  },

  otherButtons: {
    marginLeft: theme.spacing(3),
    padding: theme.spacing(.75, 2.75),

    "&:hover": {
      backgroundColor: theme.palette.background.default,
    },
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
    fontWeight: 500,
    marginLeft: "25px",
    padding: "6px 21px",
    textDecoration: "none",

    "&:hover": {
      backgroundColor: theme.palette.error.main,
    },
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

  tableRow: {
    backgroundColor: theme.palette.grey[50],
  },

  cancelButton: {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.primary.contrastText} !important`,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },

  centerContent: {
    alignItems: "center",
    color: theme.palette.grey[400],
    display: "flex",
    flexDirection: "column",
    fontWeight: 300,
    height: 200,
    justifyContent: "space-evenly",
  },

  loading: {
    color: theme.palette.secondary.main,
  },
}));
