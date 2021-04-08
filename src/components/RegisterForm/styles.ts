import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  registerContainer: {
    width: '100%',
    height: '100%',
  },
  fieldContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  textField: {
    backgroundColor: 'white',
    borderRadius: theme.palette.dimensions.borderRadius,
    color: theme.palette.grey[400],
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

}))

export default useStyles
