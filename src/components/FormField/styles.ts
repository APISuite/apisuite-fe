import { makeStyles } from '@apisuite/fe-base'

const useStyles = makeStyles((theme) => ({
  textField: {
    // Input's 'label'
    '& label': {
      color: theme.palette.label,
    },

    '& label.Mui-focused': {
      color: theme.palette.action.focus,
    },

    // Input's 'input' section
    '& div > input': {
      color: `${theme.palette.action.active} !important`,
    },

    // Input's 'outline'
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.grey[600],
      },

      '&.Mui-focused fieldset': {
        borderColor: theme.palette.action.focus,
      },
    },
  },
}))

export default useStyles
