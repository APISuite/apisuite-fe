import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  root: {
    height: "100%",
    "& .MuiAlert-standardInfo": {
      backgroundColor: theme.palette.info.light,
    },
    "& .MuiInputBase-root.MuiInputBase-formControl": {
      backgroundColor: theme.palette.common.white,
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: theme.palette.action.focus,
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.action.focus,
    },
  },
}));
