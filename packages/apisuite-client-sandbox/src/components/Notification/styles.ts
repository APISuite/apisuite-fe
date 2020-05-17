import { makeStyles } from '@material-ui/styles'
import theme from 'theme'
import { colorPicker } from 'util/colorPicker'

export default makeStyles(({
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
    borderRadius: theme.dim.radius,
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
    backgroundColor: theme.palette.primary,
    color: 'white',
  },
  error: {
    backgroundColor: theme.palette.feedback.error,
    color: 'white',
  },
}))
