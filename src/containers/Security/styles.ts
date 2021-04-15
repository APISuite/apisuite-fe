import { makeStyles } from '@apisuite/fe-base'

export default makeStyles((theme) => ({
  actionsContainer: {
    display: 'flex',
    marginBottom: '65px',
    marginTop: '10px',
  },

  disabledUpdatePasswordButton: {
    backgroundColor: theme.palette.label,
    border: `1px solid ${theme.palette.label}`,
    borderRadius: theme.palette.dimensions.borderRadius,
    color: `${theme.palette.primary.contrastText} !important`,
    cursor: 'none',
    fontSize: '16px',
    fontWeight: 500,
    height: '40px',
    marginRight: '15px',
    padding: '12px 20px',
    pointerEvents: 'none',
    textDecoration: 'none',
  },

  enabledUpdatePasswordButton: {
    backgroundColor: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.palette.dimensions.borderRadius,
    color: `${theme.palette.common.white} !important`,
    fontSize: '16px',
    fontWeight: 500,
    height: '40px',
    marginRight: '15px',
    padding: '12px 20px',
    textDecoration: 'none',
  },

  forgotPasswordButton: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.label}`,
    borderRadius: theme.palette.dimensions.borderRadius,
    color: `${theme.palette.action.active} !important`,
    fontSize: '16px',
    fontWeight: 500,
    height: '40px',
    padding: '12px 20px',
    textDecoration: 'none',
  },

  inputFields: {
    marginBottom: '20px',
    marginTop: '20px',
    maxWidth: '500px',
    width: '100%',

    // Text field's label styles
    '& > label': {
      color: theme.palette.label,
    },

    '& label.Mui-focused': {
      color: `${theme.palette.secondary.main} !important`,
    },

    // Text field's input outline styles
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: `${theme.palette.grey[300]} !important`,
      },

      '&.Mui-focused fieldset': {
        borderColor: `${theme.palette.secondary.main} !important`,
      },
    },

    // Text field's input text styles
    '& .MuiInputBase-root': {
      '& .MuiInputBase-input': {
        color: theme.palette.action.active,
      },
    },
  },

  sectionSeparator: {
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: theme.palette.dimensions.borderRadius,
    marginBottom: '25px',
    maxWidth: '900px',
    width: '100%',
  },

  securityTitle: {
    color: theme.palette.primary.main,
    fontSize: '32px',
    fontWeight: 300,
    marginBottom: '55px',
  },

  updatePasswordContainer: {
    margin: '0px auto',
    maxWidth: '900px',
    width: '100%',
  },

  updatePasswordTitle: {
    color: theme.palette.primary.main,
    fontSize: '16px',
    fontWeight: 500,
    marginBottom: '10px',
  },

  userActivityTitle: {
    color: '#BAC0C6',
    fontSize: '22px',
    fontWeight: 300,
  },
}))
