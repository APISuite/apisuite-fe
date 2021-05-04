import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  greetingCardButton: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    boxShadow: "none",
    color: `${theme.palette.secondary.contrastText} !important`,
    display: "inline-block",
    fontSize: "16px",
    fontWeight: 600,
    padding: "12px 20px",
    position: "relative",
    textAlign: "center",
    textDecoration: "none",
    textTransform: "none",

    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },

  greetingCardContentsContainer: {
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    boxShadow: `0px 3px 10px -3px ${theme.palette.grey[200]}`,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: "auto",
    maxWidth: "900px",
    padding: "20px 40px",
    width: "100%",
  },

  greetingCardText: {
    fontSize: "20px",
    fontWeight: 200,
    paddingRight: "20px",
    width: "625px",
  },
}));
