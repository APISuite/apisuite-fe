import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  actionsCatalogContainer: {
    backgroundColor: theme.palette.background.default,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: "40px auto",
    maxWidth: "900px",
    /* This outline (and its offset) allows us to hide every catalog entry's
    outermost border. It should always be of the same color as the background. */
    outline: `5px solid ${theme.palette.background.default}`,
    outlineOffset: "-2.5px",
  },

  actionsCatalogEntry: {
    /* This outline sets the color of every catalog entry's innermost borders. */
    outline: `1px solid ${theme.palette.primary.light}`,
    textAlign: "center",
    width: "300px",

    "& > img": {
      height: "100px",
      paddingTop: "20px",
      width: "100px",
    },

    "& > p": {
      color: theme.palette.label,
      fontSize: "16px",
      fontWeight: 300,
      paddingBottom: "65px",
      textAlign: "center",
    },
  },

  actionsCatalogEntryLink: {
    cursor: "pointer",
    textDecoration: "none",
  },

  disabledAction: {
    filter: "grayscale(1)",
    opacity: 0.5,
  },
}));
