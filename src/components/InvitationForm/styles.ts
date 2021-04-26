import { makeStyles } from '@apisuite/fe-base'

const useStyles = makeStyles((theme) => ({
  registerContainer: {
    width: '100%',
    height: '100%',
  },
  fieldContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  rejectButton: {
    backgroundColor: 'white',
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: theme.palette.dimensions.borderRadius,
    color: theme.palette.grey[800],
    fontSize: '16px',
    fontWeight: 500,
    textTransform: 'none',
  },
  textField: {
    backgroundColor: 'white',
    borderRadius: theme.palette.dimensions.borderRadius,
    fontSize: '16px',
    fontWeight: 500,
    '& div > input': {
      color: theme.palette.grey[400] + ' !important',
    },
  },
  centerContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    color: 'red',
    fontWeight: 500,
  },
  loading: {
    color: theme.palette.secondary.main,
  },
  ssoSignIcon: {
    fontSize: '25px',
    left: '20px',
    position: 'absolute',
    top: '11.5px',
  },
}))

export default useStyles
