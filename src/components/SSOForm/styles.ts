
import { makeStyles } from '@apisuite/fe-base'

const useStyles = makeStyles((theme) => ({
  ssoFormContainer: {
    marginTop: '40px',
  },

  ssoSignInWithButtonContainer: {
    marginBottom: '25px',
    width: '100%',
  },

  ssoSignInWithButton: {
    backgroundColor: theme.palette.secondary.main,
    color: `${theme.palette.common.white} !important`,
    fontSize: '16px',
    fontWeight: 500,
    padding: '7.5px 45px',
    textTransform: 'none',
    width: '100%',

    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },

  ssoSignInWithIcon: {
    fontSize: '25px',
    left: '20px',
    position: 'absolute',
    top: '11.5px',
  },
}))

export default useStyles
