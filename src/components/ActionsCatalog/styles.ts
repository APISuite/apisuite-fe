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
    alignItems: "center",
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    borderRight: `2px solid ${theme.palette.primary.main}`,
    display: "flex",
    flexDirection: "column",
    height: 184,
    justifyContent: "center",
    width: 300,

    "& > img": {
      height: 56,
      width: 56,
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
