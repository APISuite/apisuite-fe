import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  cancelButton: {
    backgroundColor: theme.palette.background.default,
    color: `${theme.palette.action.active} !important`,
    marginRight: theme.spacing(1),
    padding: theme.spacing(0.75, 2.5),

    "&:hover": {
      backgroundColor: theme.palette.background.default,
    },
  },

  confirmButton: {
    backgroundColor: theme.palette.error.main,
    color: `${theme.palette.primary.contrastText} !important`,
    padding: theme.spacing(0.75, 2.5),

    "&:hover": {
      backgroundColor: theme.palette.error.main,
    },
  },

  dialogActionsContainer: {
    display: "flex",
    padding: theme.spacing(0, 3, 2.5, 3),
  },

  dialogContentContainer: {
    padding: theme.spacing(2.5, 3),
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
