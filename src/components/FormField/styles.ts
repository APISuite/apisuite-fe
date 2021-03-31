import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  textField: {
    '& label.Mui-focused': {
      color: theme.palette.primary,
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.grey[600],
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary,
      },
    },
  },
}))

export default useStyles
