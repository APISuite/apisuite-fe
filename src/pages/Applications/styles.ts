import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  clientApplicationCardAvatar: {
    background: theme.palette.gradient.main,
    height: "120px",
    margin: "20px auto",
    textTransform: "uppercase",
    width: "120px",
  },

  clientApplicationCardBottomSection: {
    backgroundColor: theme.palette.primary.light,
    padding: `${theme.spacing(1.5, 3, 3, 3)}`,
  },

  clientApplicationCardDescription: {
    color: theme.palette.text.primary,
    display: "-webkit-box",
    height: "44.5px",
    lineHeight: "22px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "-webkit-box-orient": "vertical",
    "-webkit-line-clamp": 2,
  },

  clientApplicationCardTitle: {
    color: theme.palette.secondary.main,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  draftClientApplicationCardStatusIcon: {
    alignItems: "center",
    color: theme.palette.label,
    display: "flex",
    justifyContent: "center",
  },

  firstUseButton: {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.primary.contrastText} !important`,
    padding: `${theme.spacing(1.5, 2.5)}`,
    textDecoration: "none",

    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },

  firstUseImage: {
    filter: "grayscale(100%)",
    height: "185px",
    opacity: 0.35,
  },

  registerNewClientApplicationCardButton: {
    backgroundColor: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: `${theme.shape.borderRadius}px`,
    color: `${theme.palette.primary.contrastText} !important`,
    fontSize: "16px",
    fontWeight: 500,
    padding: theme.spacing(1, 2.5),
    textDecoration: "none",

    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },

  sectionSeparator: {
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: theme.shape.borderRadius,
    margin: "25px 0px",
    width: "100%",
  },

  subscribedClientApplicationCardStatusIcon: {
    alignItems: "center",
    color: theme.palette.primary.main,
    display: "flex",
    justifyContent: "center",
  },
}));
