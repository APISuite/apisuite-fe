import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  auth: {
    color: theme.palette.text.secondary,
    fontSize: 14,
  },

  deleteAppButtonStyles: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,

    "&:hover": {
      backgroundColor: theme.palette.error.main,
    },
  },

  emailTextfield: {
    backgroundColor: theme.palette.background.default,
    borderRadius: `${theme.shape.borderRadius}px`,
    color: theme.palette.text.primary,
    width: 220,
  },

  errorAlert: {
    alignItems: "center",
    backgroundColor: theme.palette.error.main,
    border: "solid",
    borderColor: theme.palette.error.main,
    borderRadius: `${theme.shape.borderRadius}px`,
    borderWidth: 1,
    color: theme.palette.primary.contrastText,
    display: "flex",
    fontSize: 13,
    minHeight: 20,
    padding: "2px 15px",
  },

  errorPlaceholder: {
    display: "flex",
    marginTop: 10,
  },

  header: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    height: 47,
    width: "100%",
  },

  inviteCard: {
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
    border: 1,
    borderColor: theme.palette.grey[300],
    borderRadius: `${theme.shape.borderRadius}px`,
    borderStyle: "solid",
    cursor: "pointer",
    display: "flex",
    height: 82,
    justifyContent: "space-between",
    marginTop: 24,
    overflow: "hidden",
    padding: "12px 30px",
    width: "100%",
  },

  loading: {
    color: theme.palette.primary.contrastText,
    opacity: 0.5,
    position: "relative",
    top: 4,
  },

  name: {
    color: theme.palette.text.primary,
    fontSize: 16,
  },

  nameTextfield: {
    backgroundColor: theme.palette.background.default,
    borderRadius: `${theme.shape.borderRadius}px`,
    color: theme.palette.text.primary,
    width: 220,
  },

  row: {
    borderTop: "1px solid " + theme.palette.grey[300],
    display: "flex",
    justifyContent: "space-between",
    padding: "16px 30px 16px 10px",
    width: "100%",
  },

  table: {
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
    border: 1,
    borderColor: theme.palette.grey[300],
    borderRadius: `${theme.shape.borderRadius}px`,
    borderStyle: "solid",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    overflow: "hidden",
    width: "100%",
  },

  title: {
    fontSize: 26,
    fontWeight: 300,
    marginBottom: 54,
  },

  tableRow: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.grey[50],
    },
  },
}));
