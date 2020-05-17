import { makeStyles } from '@material-ui/styles'
import theme from 'theme'

const useStyles = makeStyles(({
  textField: {
    '& label.Mui-focused': {
      color: theme.palette.primary,
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.greyScales[600],
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary,
      },
    },
  },
}))

export default useStyles