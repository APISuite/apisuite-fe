import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  chip: {
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(1),
    padding: theme.spacing(1, 3),
  },

  edit: {
    cursor: "pointer",
    "&:hover": {
      opacity: 0.5,
    },
  },
}));
