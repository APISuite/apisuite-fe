import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  loadingContainer: {
    // We can still use theme in this context - the defaults will be the mui-ui ones
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
  },
}))
