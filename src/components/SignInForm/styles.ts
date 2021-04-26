import { makeStyles } from '@apisuite/fe-base'

const useStyles = makeStyles((theme) => ({
  disabledConfirmButton: {
    backgroundColor: theme.palette.label,
    color: `${theme.palette.primary.contrastText} !important`,
    fontSize: '16px',
    fontWeight: 500,
    padding: '7.5px 45px',
    pointerEvents: 'none',
    textTransform: 'none',
    width: '100%',

    '&:hover': {
      backgroundColor: theme.palette.label,
    },
  },

  enabledConfirmButton: {
    backgroundColor: theme.palette.secondary.main,
    color: `${theme.palette.primary.contrastText} !important`,
    fontSize: '16px',
    fontWeight: 500,
    padding: '7.5px 45px',
    textTransform: 'none',
    width: '100%',

    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },

  forgotPasswordLink: {
    color: `${theme.palette.grey[400]} !important`,
    cursor: 'pointer',
    display: 'flex',
    fontSize: '14px',
    fontWeight: 400,
    justifyContent: 'center',
    marginTop: '25px',
    textDecoration: 'underline',

    '&:hover': {
      color: `${theme.palette.grey[400]} !important`,
    },
  },

  inputField: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    color: theme.palette.grey[400],
  },

  inputFieldContainer: {
    marginBottom: '25px',
    marginTop: '25px',
  },

  signInContainer: {
    height: '100%',
    width: '100%',
  },

  separatorContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '30px 0px 30px 0px',
  },

  separatorLine: {
    backgroundColor: theme.palette.grey[200],
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    height: '1px',
    width: '100%',
  },

  separatorText: {
    color: theme.palette.grey[400],
    padding: '0px 10px',
  },
}))

export default useStyles
