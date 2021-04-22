import { makeStyles } from '@apisuite/fe-base'

export default makeStyles((theme) => ({
  actionsContainer: {
    display: 'flex',
    marginBottom: '65px',
    marginTop: '10px',
  },

  disabledUpdatePasswordButton: {
    backgroundColor: theme.palette.secondary.main,
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: theme.palette.dimensions.borderRadius,
    color: `${theme.palette.primary.contrastText} !important`,
    cursor: 'none',
    fontSize: '16px',
    fontWeight: 500,
    height: '40px',
    marginRight: '15px',
    opacity: 0.5,
    padding: '12px 20px',
    pointerEvents: 'none',
    textDecoration: 'none',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },

  enabledUpdatePasswordButton: {
    backgroundColor: theme.palette.secondary.main,
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: theme.palette.dimensions.borderRadius,
    color: `${theme.palette.primary.contrastText} !important`,
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 500,
    height: '40px',
    marginRight: '15px',
    padding: '12px 20px',
    textDecoration: 'none',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
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

  infoBox: {
    alignItems: 'center',
    backgroundColor: theme.palette.info.light,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    display: 'flex',
    height: '100%',
    marginBottom: '25px',
    padding: '12px 12px',
    textAlign: 'left',
    width: '500px',
  },

  infoBoxIcon: {
    fill: '#46B5EF',
    transform: 'translate(-3.5px, -11.5px)',
  },

  infoBoxText: {
    color: '#035E86',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '18px',
    margin: '0px 0px 5px 2.5px',
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
      color: `${theme.palette.action.focus} !important`,
    },

    // Text field's input outline styles
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: `${theme.palette.grey[300]} !important`,
      },

      '&.Mui-focused fieldset': {
        borderColor: `${theme.palette.action.focus} !important`,
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
    color: theme.palette.secondary.main,
    fontSize: '32px',
    fontWeight: 300,
    marginBottom: '12px',
  },

  securitySubtitle: {
    color: theme.palette.grey[400],
    fontSize: '16px',
    fontWeight: 300,
    marginBottom: '55px',
  },

  updatePasswordContainer: {
    margin: '0px auto',
    maxWidth: '900px',
    width: '100%',
  },

  updatePasswordTitle: {
    color: theme.palette.secondary.main,
    fontSize: '16px',
    fontWeight: 500,
    marginBottom: '10px',
  },

  userActivityTitle: {
    color: theme.palette.label,
    fontSize: '22px',
    fontWeight: 300,
  },
}))
