
import { makeStyles } from '@apisuite/fe-base'

const useStyles = makeStyles((theme) => ({
  backButton: {
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.label}`,
    color: `${theme.palette.action.active} !important`,
    fontSize: '16px',
    fontWeight: 500,
    padding: '7.5px 45px',
    textTransform: 'none',
    width: '100%',

    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },
  },

  backButtonContainer: {
    margin: '20px 0px',
  },

  disabledNextButton: {
    backgroundColor: `${theme.palette.label} !important`,
    color: `${theme.palette.common.white} !important`,
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

  enabledNextButton: {
    backgroundColor: theme.palette.secondary.main,
    color: `${theme.palette.common.white} !important`,
    fontSize: '16px',
    fontWeight: 500,
    padding: '7.5px 45px',
    textTransform: 'none',
    width: '100%',

    '&:hover': {
      backgroundColor: theme.palette.primary,
    },
  },

  errorAlert: {
    backgroundColor: theme.palette.error.main,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    color: theme.palette.background.default,
    minHeight: '50px',
    padding: '12px 25px',
  },

  errorPlaceholder: {
    marginTop: '30px',
    minHeight: '50px',
  },

  formCard: {
    display: 'block',
  },

  formTitle: {
    color: theme.palette.common.white,
    fontSize: '26px',
    fontWeight: 300,
  },
}))

export default useStyles
