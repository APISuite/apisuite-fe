import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'

const useStyles = makeStyles(({
  textField: {
    '& label.Mui-focused': {
      color: config.palette.primary,
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: config.palette.greyScales[600],
      },
      '&.Mui-focused fieldset': {
        borderColor: config.palette.primary,
      },
    },
  },
}))

export default useStyles
