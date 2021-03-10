import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

export default makeStyles(({
  actionsContainer: {
    display: 'flex',
    marginBottom: '65px',
    marginTop: '10px',
  },

  disabledUpdatePasswordButton: {
    backgroundColor: '#99E6CC',
    border: '1px solid #99E6CC',
    borderRadius: config.dimensions.borderRadius,
    color: `${config.palette.primaryContrastText} !important`,
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
    backgroundColor: config.palette.primary,
    border: `1px solid ${config.palette.primary}`,
    borderRadius: config.dimensions.borderRadius,
    color: `${config.palette.primaryContrastText} !important`,
    fontSize: '16px',
    fontWeight: 500,
    height: '40px',
    marginRight: '15px',
    padding: '12px 20px',
    textDecoration: 'none',
  },

  forgotPasswordButton: {
    backgroundColor: config.palette.primaryContrastText,
    border: `1px solid ${config.palette.label}`,
    borderRadius: config.dimensions.borderRadius,
    color: `${config.palette.active} !important`,
    fontSize: '16px',
    fontWeight: 500,
    height: '40px',
    padding: '12px 20px',
    textDecoration: 'none',
  },

  infoBox: {
    alignItems: 'center',
    backgroundColor: config.palette.alert.success.background,
    borderRadius: '4px',
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
      color: config.palette.label,
    },

    '& label.Mui-focused': {
      color: `${config.palette.focus} !important`,
    },

    // Text field's input outline styles
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: `${config.palette.greyScales['300']} !important`,
      },

      '&.Mui-focused fieldset': {
        borderColor: `${config.palette.focus} !important`,
      },
    },

    // Text field's input text styles
    '& .MuiInputBase-root': {
      '& .MuiInputBase-input': {
        color: config.palette.active,
      },
    },
  },

  sectionSeparator: {
    border: `1px solid ${config.palette.newGreyScales['100']}`,
    borderRadius: config.dimensions.borderRadius,
    marginBottom: '25px',
    maxWidth: '900px',
    width: '100%',
  },

  securityTitle: {
    color: config.palette.tertiary,
    fontSize: '32px',
    fontWeight: 300,
    marginBottom: '12px',
  },

  securitySubtitle: {
    color: config.palette.newGreyScales['400'],
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
    color: config.palette.tertiary,
    fontSize: '16px',
    fontWeight: 500,
    marginBottom: '10px',
  },

  userActivityTitle: {
    color: config.palette.label,
    fontSize: '22px',
    fontWeight: 300,
  },
}))
