import { makeStyles } from '@apisuite/fe-base'

export default makeStyles((theme) => ({
  allUserDetailsContainer: {
    display: 'flex',
    margin: '0px auto',
    maxWidth: '900px',
    width: '100%',
  },

  alternativeOrganisationDetailsTitle: {
    color: theme.palette.primary.main,
    fontSize: '16px',
    fontWeight: 500,
    marginBottom: '40px',
  },

  alternativeSectionSeparator: {
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: theme.palette.dimensions.borderRadius,
    margin: '32.5px 0px',
    maxWidth: '900px',
    width: '100%',
  },

  avatar: {
    backgroundColor: '#7DD291',
    cursor: 'pointer',
    fontSize: '20px',
    fontWeight: 300,
    height: '120px',
    margin: '24px 100px',
    width: '120px',
  },

  avatarIcons: {
    color: theme.palette.action.active,
    cursor: 'pointer',
    height: '20px',
    position: 'absolute',
    transform: 'translate(130px, -10px)',
    width: '20px',
  },

  deleteProfileButton: {
    backgroundColor: theme.palette.error.main,
    border: `1px solid ${theme.palette.error.main}`,
    borderRadius: theme.palette.dimensions.borderRadius,
    color: `${theme.palette.common.white} !important`,
    fontSize: '16px',
    fontWeight: 500,
    marginRight: '15px',
    padding: '12px 20px',
    textDecoration: 'none',
  },

  disabledOrganisationButton: {
    backgroundColor: theme.palette.label,
    borderRadius: theme.palette.dimensions.borderRadius,
    color: `${theme.palette.common.white} !important`,
    cursor: 'none',
    fontSize: '16px',
    fontWeight: 500,
    padding: '12px 20px',
    pointerEvents: 'none',
    textDecoration: 'none',
  },

  disabledUpdateDetailsButton: {
    backgroundColor: theme.palette.label,
    borderRadius: theme.palette.dimensions.borderRadius,
    color: theme.palette.primary.contrastText,
    cursor: 'none',
    fontWeight: 500,
    height: '40px',
    margin: '10px auto',
    maxWidth: '270px',
    padding: '6px 0px',
    pointerEvents: 'none',
    width: '100%',
  },

  enabledOrganisationButton: {
    backgroundColor: theme.palette.action.active,
    borderRadius: theme.palette.dimensions.borderRadius,
    color: `${theme.palette.common.white} !important`,
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 500,
    padding: '12px 20px',
    textDecoration: 'none',
  },

  enabledUpdateDetailsButton: {
    backgroundColor: theme.palette.action.active,
    borderRadius: theme.palette.dimensions.borderRadius,
    color: theme.palette.common.white,
    cursor: 'pointer',
    fontWeight: 500,
    height: '40px',
    margin: '10px auto',
    maxWidth: '270px',
    padding: '6px 0px',
    width: '100%',
  },

  formFieldsContainer: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.label}`,
    borderRadius: theme.palette.dimensions.borderRadius,
    marginBottom: '35px',
    textAlign: 'center',
  },

  formSectionSeparator: {
    border: `1px solid ${theme.palette.grey['100']}`,
    borderRadius: theme.palette.dimensions.borderRadius,
    margin: '0px 0px 16px 0px',
    maxWidth: '320px',
    width: '100%',
  },

  inputFields: {
    marginBottom: '15px',
    maxWidth: '270px',
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

  leftSideDetailsContainer: {
    marginRight: '80px',
    maxWidth: '500px',
    width: '100%',
  },

  organisationSelector: {
    borderColor: theme.palette.label,
    marginBottom: '35px',

    // Selector
    '& > .MuiFormControl-root': {
      // Selector's label
      '& > .MuiFormLabel-root': {
        color: theme.palette.label,
      },

      // Selector's input (i.e., text)
      '& > .MuiInputBase-root': {
        '& > .MuiInputBase-input': {
          color: theme.palette.action.active,
        },
      },
    },
  },

  otherActionsButtons: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.label}`,
    borderRadius: theme.palette.dimensions.borderRadius,
    color: `${theme.palette.action.active} !important`,
    fontSize: '16px',
    fontWeight: 500,
    marginRight: '15px',
    padding: '12px 20px',
    textDecoration: 'none',
  },

  otherActionsContainer: {
    display: 'flex',
  },

  regularOrganisationDetailsTitle: {
    color: theme.palette.primary.main,
    fontSize: '16px',
    fontWeight: 500,
    marginBottom: '20px',
  },

  regularSectionSeparator: {
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: theme.palette.dimensions.borderRadius,
    margin: '32.5px 0px 32.5px 0px',
    maxWidth: '900px',
    width: '100%',
  },

  rightSideDetailsContainer: {
    maxWidth: '320px',
    width: '100%',
  },

  subtitle: {
    color: theme.palette.grey[400],
    fontSize: '16px',
    fontWeight: 300,
    marginBottom: '25px',
  },

  userDetailsContainer: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.label}`,
    borderRadius: theme.palette.dimensions.borderRadius,
  },

  userName: {
    color: theme.palette.primary.main,
    fontSize: '32px',
    fontWeight: 300,
    marginRight: '10px',
  },

  userNameAndRoleContainer: {
    display: 'flex',
    marginBottom: '12px',
  },

  userRole: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.palette.dimensions.borderRadius,
    color: theme.palette.primary.contrastText,
    fontSize: '14px',
    fontWeight: 300,
    padding: '0px 7.5px',
  },

  userStatusAndType: {
    display: 'flex',
    margin: '0px 25px 20px 25px',

    '& > :first-child': {
      color: theme.palette.primary.main,
      fontSize: '14px',
      marginRight: '12px',
    },

    '& > :last-child': {
      color: theme.palette.label,
      fontSize: '14px',
      fontWeight: 300,
      textAlign: 'left',
    },
  },
}))
