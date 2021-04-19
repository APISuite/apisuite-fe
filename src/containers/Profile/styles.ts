import { makeStyles } from '@apisuite/fe-base'

export default makeStyles((theme) => ({
  allUserDetailsContainer: {
    display: 'flex',
    margin: '0px auto 50px auto',
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
    background: '#C8DC8C linear-gradient(270deg, rgba(200, 220, 140, 1) 0%, rgba(25, 165, 140, 1) 100%)',
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
  createOrganisationButton: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    color: `${theme.palette.common.white} !important`,
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 500,
    padding: '12px 20px',
    textDecoration: 'none',
    textTransform: 'none',
  },

  deleteAccountButton: {
    backgroundColor: theme.palette.error.main,
    border: `1px solid ${theme.palette.error.main}`,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    color: `${theme.palette.common.white} !important`,
    fontSize: '16px',
    fontWeight: 500,
    padding: '12px 20px',
    textDecoration: 'none',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: theme.palette.error.main,
    },
  },

  disabledInputFields: {
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    marginBottom: '25px',
    marginTop: '0px',
    maxWidth: '270px',
    pointerEvents: 'none',
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
        backgroundColor: '#DCDFE2',
        borderRadius: `${theme.palette.dimensions.borderRadius}px`,
        color: theme.palette.label,
      },

      '& .MuiInputAdornment-root': {
        color: theme.palette.label,
        pointerEvents: 'none',
      },
    },
  },

  disabledOrganisationButton: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.palette.dimensions.borderRadius,
    color: `${theme.palette.common.white} !important`,
    cursor: 'none',
    fontSize: '16px',
    fontWeight: 500,
    opacity: 0.5,
    padding: '12px 20px',
    pointerEvents: 'none',
    textDecoration: 'none',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },

  disabledUpdateDetailsButton: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.palette.dimensions.borderRadius,
    color: `${theme.palette.common.white} !important`,
    cursor: 'none',
    fontSize: '16px',
    fontWeight: 500,
    height: '40px',
    margin: '10px auto',
    maxWidth: '270px',
    opacity: 0.5,
    padding: '12px 20px',
    pointerEvents: 'none',
    textDecoration: 'none',
    textTransform: 'none',
    width: '100%',

    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },

  enabledOrganisationButton: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.palette.dimensions.borderRadius,
    color: `${theme.palette.common.white} !important`,
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 500,
    padding: '12px 20px',
    textDecoration: 'none',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },

  enabledUpdateDetailsButton: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.palette.dimensions.borderRadius,
    color: `${theme.palette.common.white} !important`,
    cursor: 'none',
    fontSize: '16px',
    fontWeight: 500,
    height: '40px',
    margin: '10px auto',
    maxWidth: '270px',
    padding: '12px 20px',
    textDecoration: 'none',
    textTransform: 'none',
    width: '100%',

    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },

  formFieldsContainer: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.label}`,
    borderRadius: theme.palette.dimensions.borderRadius,
    marginBottom: '35px',
    textAlign: 'center',
  },

  formSectionSeparator: {
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: theme.palette.dimensions.borderRadius,
    margin: '0px 0px 20px 0px',
    maxWidth: '320px',
    width: '100%',
  },

  infoBox: {
    alignItems: 'center',
    backgroundColor: theme.palette.info.light,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    display: 'flex',
    height: '100%',
    padding: '12px 12px',
    textAlign: 'left',
    width: '400px',
  },

  infoBoxIcon: {
    fill: '#46B5EF',
    transform: 'translate(-3.5px, -23.5px)',
  },

  infoBoxText: {
    color: '#035E86',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '18px',
    margin: '0px 0px 5px 2.5px',
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

  leftSideDetailsContainer: {
    marginRight: '80px',
    maxWidth: '500px',
    width: '100%',
  },

  openIDInfoBoxContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '0px auto',
    maxWidth: '900px',
    width: '100%',
  },

  organisationDetailsTitle: {
    color: theme.palette.primary.main,
    fontSize: '16px',
    fontWeight: 500,
    marginBottom: '40px',
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
    textTransform: 'none',

    '&:hover': {
      backgroundColor: theme.palette.common.white,
    },
  },

  otherActionsContainerOne: {
    display: 'flex',
  },

  otherActionsContainerTwo: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  regularSectionSeparator: {
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    margin: '32.5px 0px 32.5px 0px',
    maxWidth: '900px',
    width: '100%',
  },

  rightSideDetailsContainer: {
    maxWidth: '320px',
    width: '100%',
  },

  signOutButton: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.label}`,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    color: `${theme.palette.action.active} !important`,
    fontSize: '16px',
    fontWeight: 500,
    marginLeft: '15px',
    padding: '12px 20px',
    textDecoration: 'none',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
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
    maxWidth: '355px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  userNameAndRoleContainer: {
    alignItems: 'center',
    display: 'flex',
    height: '32.5px',
    marginBottom: '12px',
  },

  userRole: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: theme.palette.dimensions.borderRadius,
    color: theme.palette.primary.contrastText,
    fontSize: '14px',
    fontWeight: 300,
    padding: '2px 7.5px',
  },

  userStatusAndType: {
    alignItems: 'center',
    display: 'flex',
    margin: '0px 25px 20px 25px',

    '& > :first-child': {
      color: theme.palette.secondary.main,
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
