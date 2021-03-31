import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  root: {
    height: '100%',
    '& .MuiAlert-standardInfo': {
      backgroundColor: theme.alert.success.background,
    },
    '& .MuiInputBase-root.MuiInputBase-formControl': {
      backgroundColor: theme.palette.common.white,
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: theme.palette.focus?.main || theme.palette.primary.main,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.focus?.main || theme.palette.primary.main,
    },
  },
}))
