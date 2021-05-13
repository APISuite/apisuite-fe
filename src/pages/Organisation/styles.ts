import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  avatarContainer: {
    alignItems: "center",
    display: "flex",
  },

  avatarIcons: {
    color: theme.palette.action.active,
    cursor: "pointer",
    height: "20px",
    position: "absolute",
    transform: "translate(371.5px, 10px)",
    width: "20px",
    zIndex: 2,
  },

  avatarURLInputField: {
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
    },

    // Text field's input text styles
    "& .MuiInputBase-root": {
      "& .MuiInputBase-input": {
        color: theme.palette.action.active,
        height: "85px",
        transform: "translateY(30px)",
      },
    },

    // Text field's input helper text
    "& .MuiFormHelperText-root": {
      color: theme.palette.label,

      "&.Mui-error": {
        color: theme.palette.error.main,
      },
    },
  },

  disabledUpdateDetailsButton: {
    backgroundColor: theme.palette.label,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.contrastText,
    cursor: "none",
    fontWeight: 500,
    height: "40px",
    maxWidth: "95px",
    padding: "6px 0px",
    pointerEvents: "none",
    textAlign: "center",
    width: "100%",

    "&:hover": {
      backgroundColor: theme.palette.label,
    },
  },

  disabledCreateOrgButton: {
    backgroundColor: "#99e6cc",
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.contrastText,
    cursor: "none",
    fontWeight: 500,
    height: "40px",
    maxWidth: "185px",
    padding: "6px 0px",
    pointerEvents: "none",
    textAlign: "center",
    width: "100%",
  },

  enabledCreateOrgButton: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.contrastText,
    cursor: "pointer",
    fontWeight: 500,
    height: "40px",
    maxWidth: "185px",
    padding: "6px 0px",
    textAlign: "center",
    width: "100%",

    "&:hover": {
      backgroundColor: theme.palette.secondary,
    },
  },

  enabledUpdateDetailsButton: {
    backgroundColor: theme.palette.action.active,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.contrastText,
    cursor: "pointer",
    fontWeight: 500,
    height: "40px",
    maxWidth: "95px",
    padding: "6px 0px",
    textAlign: "center",
    width: "100%",

    "&:hover": {
      backgroundColor: theme.palette.action.active,
    },
  },

  firstSectionSeparator: {
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: theme.shape.borderRadius,
    marginBottom: "25px",
    marginTop: "15px",
    maxWidth: "900px",
    width: "100%",
  },

  focusedAvatar: {
    backgroundColor: "#B4DC8C",
    fontSize: "13.75px",
    fontWeight: 300,
    height: "55px",
    position: "absolute",
    transform: "translate(172.5px, 10px)",
    width: "55px",
    zIndex: 2,
  },

  inputFields: {
    marginBottom: "25px",
    marginTop: "0px",
    maxWidth: "500px",
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
      },
    },
  },

  leftSideDetailsContainer: {
    marginRight: "60px",
    maxWidth: "440px",
    width: "100%",
  },

  notFocusedAvatar: {
    backgroundColor: "#B4DC8C",
    fontSize: "20px",
    fontWeight: 300,
    height: "80px",
    position: "absolute",
    transform: "translate(172.5px, 13px)",
    width: "80px",
    zIndex: 2,
  },

  orgAdditionalDetailsContainer: {
    display: "flex",
    width: "100%",
  },

  orgAdditionalDetailsSubtitle: {
    color: theme.palette.text.primary,
    fontSize: "14px",
    fontWeight: 300,
    lineHeight: "16.5px",
    marginBottom: "25px",
  },

  orgAdditionalDetailsTitle: {
    color: theme.palette.secondary.main,
    fontSize: "16px",
    fontWeight: 500,
    marginBottom: "30px",
  },

  orgDetailsContainer: {
    margin: "0px auto",
    maxWidth: "900px",
    width: "100%",
  },

  orgMainDetailsContainer: {
    display: "flex",
    width: "100%",
  },

  orgSubtitle: {
    color: theme.palette.text.primary,
    fontSize: "16px",
    fontWeight: 300,
  },

  orgTitle: {
    color: theme.palette.secondary.main,
    fontSize: "32px",
    fontWeight: 300,
    marginBottom: "12px",
  },

  orgTitleAndSubtitleContainer: {
    marginBottom: "40px",
    width: "100%",
  },

  orgURLFieldWrapper: {
    display: "flex",

    "& > :first-child": {
      marginRight: "10px",
      maxWidth: "350px",
      width: "100%",
    },

    "& > :last-child": {
      backgroundColor: theme.palette.background.default,
      border: `1px solid ${theme.palette.grey[300]}`,
      borderRadius: theme.shape.borderRadius,
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

  rightSideDetailsContainer: {
    maxWidth: "400px",
    width: "100%",
  },

  secondSectionSeparator: {
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: theme.shape.borderRadius,
    marginBottom: "15px",
    marginTop: "0px",
    maxWidth: "900px",
    width: "100%",
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
}));
