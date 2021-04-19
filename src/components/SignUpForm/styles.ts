import { makeStyles } from '@apisuite/fe-base'

const useStyles = makeStyles((theme) => ({
  centerContent: {
    alignItems: 'center',
    color: 'red',
    display: 'flex',
    fontWeight: 500,
    height: '200px',
    justifyContent: 'center',
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

  loading: {
    color: theme.palette.secondary.main,
  },

  privacyPolicyDisclaimerContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '25px',
  },

  privacyPolicyDisclaimerLink: {
    color: `${theme.palette.action.active} !important`,
    fontSize: '12px',
    fontWeight: 400,
  },

  privacyPolicyDisclaimerText: {
    color: theme.palette.grey[400],
    fontSize: '12px',
    fontWeight: 300,
    marginRight: '3.5px',
  },

  signUpContainer: {
    height: '100%',
    width: '100%',
  },
}))

export default useStyles
