import { makeStyles } from '@apisuite/fe-base'

const useStyles = makeStyles((theme) => ({
  textField: {
    '& label.Mui-focused': {
      color: theme.palette.secondary.main,
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.grey[600],
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.secondary.main,
      },
    },
  },
}))

export default useStyles
