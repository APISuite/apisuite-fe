import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  snackbar: {
    display: 'flex',
    position: 'relative',
    margin: 8,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: theme.palette.dimensions.borderRadius,
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 24,
    marginRight: 10,
  },
  text: {
    margin: 0,
  },
  success: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
  },
  error: {
    backgroundColor: theme.palette.error.main,
    color: 'white',
  },
}))
