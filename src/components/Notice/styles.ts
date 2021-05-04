import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  noticeContentsContainer: {
    backgroundColor: theme.palette.info.light,
    border: `1px solid ${theme.palette.info.light}`,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    display: "flex",
    padding: "12px",
    width: "100%",
  },

  noticeIcon: {
    alignItems: "center",
    color: theme.palette.info.main,
    display: "flex",
    justifyContent: "center",
    marginRight: "10px",
  },

  noticeText: {
    "& > p": {
      color: "#035E86",
      fontSize: "14px",
      fontWeight: 400,

      "& > a": {
        textDecoration: "none",
      },
    },
  },
}));
