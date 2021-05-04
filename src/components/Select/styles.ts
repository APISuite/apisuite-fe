import { makeStyles } from "@apisuite/fe-base";

const useStyles = makeStyles((theme) => ({
  textField: {
    "& label.Mui-focused": {
      color: `${theme.palette.action.focus} !important`,
    },

    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: `${theme.palette.grey[300]} !important`,
      },

      "&.Mui-focused fieldset": {
        borderColor: `${theme.palette.action.focus} !important`,
      },
    },
  },
}));

export default useStyles;
