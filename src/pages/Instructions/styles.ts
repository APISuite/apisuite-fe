
import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  clipboardIcon: {
    cursor: "pointer",
    zIndex: 1,

    "&:hover": {
      color: theme.palette.primary.main,
    },
  },

  codeBlock: {
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },

  content: {
    display: "flex",
    flexDirection: "column",
    width: 688,
  },

  description: {
    display: "flex",
    marginBottom: 20,
    marginTop: 0,
    padding: 0,
    textAlign: "justify",
  },

  iconRow: {
    alignItems: "flex-end",
    backgroundColor: theme.palette.text.primary,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    color: theme.palette.primary.contrastText,
    display: "flex",
    height: 40,
    justifyContent: "flex-end",
    marginTop: 0,
    paddingLeft: 20,
    paddingRight: 20,
  },

  mainContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 100,
    width: "100%",
  },

  navigation: {
    display: "flex",
    flexDirection: "column",
    width: 300,
  },

  note: {
    color: theme.palette.primary.contrastText,
    fontSize: 14,
  },

  noteContainer: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: `${theme.shape.borderRadius}px`,
    marginBottom: 20,
    overflow: "hidden",
    width: "100%",
  },

  noteContent: {
    backgroundColor: theme.palette.primary.main,
    marginLeft: 5,
    padding: 20,
  },

  noteTitle: {
    color: "black",
    fontSize: 16,
    fontWeight: 400,
  },

  sideMenuContainer: {
    paddingLeft: 40,
    position: "sticky",
    top: 180,
  },

  stepContainer: {
    marginBottom: 20,
    marginTop: 20,
  },

  stepTitle: {
    fontSize: 20,
    marginTop: -170,
    paddingTop: 170,
  },

  title: {
    fontSize: 26,
    fontWeight: 300,
  },
}));
