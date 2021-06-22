import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  cancelButton: {
    marginRight: theme.spacing(1),
  },

  dialogActionsContainer: {
    display: "flex",
    padding: theme.spacing(0, 3, 2.5, 3),
  },

  dialogContentContainer: {
    padding: theme.spacing(2.5, 3),
  },

  dialogTitleCenter: {
    display: "flex",
    alignItems: "center",
  },

  dialogTitleContainer: {
    alignItems: "center",
    backgroundColor: theme.palette.grey[50],
    display: "flex",
    padding: theme.spacing(1, 3),

    // Dialog's optional title icon
    "& > :first-child": {
      marginRight: theme.spacing(1),
    },

    // Dialog's title
    "& > :last-child": {
      color: theme.palette.secondary.main,
      padding: "0px",
    },
  },

  dialogTitleInfoIcon: {
    color: theme.palette.info.main,
  },

  dialogTitleWarningIcon: {
    color: theme.palette.warning.main,
  },
}));
