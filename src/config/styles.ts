import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  container: {
    // We can still use theme in this context - the defaults will be the mui-ui ones
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
  },
  errorImg: {
    filter: 'grayscale(100%)',
    maxWidth: 500,
    height: 'auto',
    marginBottom: 16,
  },
}))
