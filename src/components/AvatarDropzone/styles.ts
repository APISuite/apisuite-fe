import { makeStyles } from "@apisuite/fe-base";

const avatarSize = "120px";

export default makeStyles((theme) => ({
  acceptStyle: {
    borderColor: theme.palette.primary.main,
  },
  activeStyle: {
    borderColor: theme.palette.secondary.main,
  },
  avatar: {
    height: avatarSize,
    width: avatarSize,
  },
  delete: {
    color: theme.palette.grey[300],
    display: "none",
    "&:hover": {
      color: theme.palette.grey[50],
    },
  },
  helperText: {
    color: theme.palette.text.secondary,
    margin: "5px 0",
    maxWidth: "100%",
    whiteSpace: "pre-line",
  },
  mediaContainer: {
    padding: "5px",
    borderRadius: "50%",
    borderColor: theme.palette.grey[100],
    borderStyle: "dashed",
    borderWidth: "2px",
    color: theme.palette.grey[300],
    height: avatarSize,
    outline: "none",
    transition: "border .24s ease-in-out",
    width: avatarSize,
  },
  mediaError: {
    color: theme.palette.error.main,
    margin: theme.spacing(1, 0),
  },
  mediaIcon: {
    color: theme.palette.grey[300],
    margin: 5,
  },
  mediaText: {
    color: theme.palette.grey[300],
    textAlign: "center",
  },
  mediaUpload: {
    cursor: "pointer",
  },
  overlay: {
    alignItems: "center",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    height: avatarSize,
    position: "absolute",
    width: avatarSize,
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    "&:hover *": {
      display: "block",
    },
  },
  rejectStyle: {
    borderColor: theme.palette.error.main,
  },
}));
