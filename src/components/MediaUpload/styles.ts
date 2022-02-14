import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  delete: {
    color: "#FFFFFF",
    display: "none",
    marginLeft: "85%",
    marginTop: "50%",
    "&:hover": {
      color: theme.palette.grey[300],
    },
  },
  helperText: {
    color: theme.palette.text.secondary,
    margin: "5px 0",
    maxWidth: "100%",
  },
  media: {
    borderColor: theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius,
    border: "1px solid",
    display: "flex",
    margin: 10,
    height: 110,
    width: 165,
    position: "relative",
  },
  mediaError: {
    color: theme.palette.error.main,
    margin: 10,
    fontSize: 11,
  },
  mediaIcon: {
    color: theme.palette.grey[300],
    margin: 5,
  },
  mediaImg: {
    maxHeight: 110,
    maxWidth: 165,
  },
  mediaText: {
    color: theme.palette.grey[300],
  },
  mediaUpload: {
    cursor: "pointer",
  },
  overlay: {
    height: "100%",
    width: "100%",
    position: "absolute",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    "&:hover *": {
      display: "block",
    },
  },
  upload: {
    alignItems: "center",
    border: 2,
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.grey[100],
    borderStyle: "dashed",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: 10,
    height: 110,
    width: 165,
    textAlign: "center",
    transition: "border .24s ease-in-out",
  },
  activeStyle: {
    borderColor: theme.palette.secondary.main,
  },
  acceptStyle: {
    borderColor: theme.palette.primary.main,
  },
  rejectStyle: {
    borderColor: theme.palette.error.main,
  },
}));
