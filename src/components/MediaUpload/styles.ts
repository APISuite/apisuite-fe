import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  helperText: {
    color: theme.palette.grey[300],
    fontSize: 15,
    margin: "5px 0",
    maxWidth: "100%",
  },
  mediaContainer: {
    padding: "20px",
    border: 1,
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.grey[100],
    borderStyle: "solid",
    color: theme.palette.grey[300],
    maxWidth: "100%",
    outline: "none",
    transition: "border .24s ease-in-out",
  },
  media: {
    borderColor: theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius,
    border: "1px solid",
    flexDirection: "column",
    height: 200,
    margin: 10,
    maxWidth: 150,
    padding: "20px",
    textAlign: "center",
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
    maxHeight: 130,
    objectFit: "contain",
  },
  mediaText: {
    color: theme.palette.grey[300],
  },
  mediaUpload: {
    cursor: "pointer",
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
