import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  textField: {
    '& label.Mui-focused': {
      color: `${theme.palette.secondary.main} !important`,
    },

    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: `${theme.palette.grey[300]} !important`,
      },

      '&.Mui-focused fieldset': {
        borderColor: `${theme.palette.secondary.main} !important`,
      },
    },
  },
}))

export default useStyles
