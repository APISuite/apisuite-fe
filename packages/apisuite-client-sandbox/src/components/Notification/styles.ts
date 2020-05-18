import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'

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
    borderRadius: config.dimensions.borderRadius,
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
    backgroundColor: config.palette.primary,
    color: 'white',
  },
  error: {
    backgroundColor: config.palette.feedback.error,
    color: 'white',
  },
}))
