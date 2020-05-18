import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'

export default makeStyles(({
  root: {
    minHeight: '100%',
    paddingTop: 200,
    backgroundColor: config.palette.background.default,
  },
  contentContainer: {
    maxWidth: 900,
    margin: '0 auto',
    transform: 'translateX(-8px)',
  },
  title: {
    fontSize: 26,
    fontWeight: 300,
  },
  subscriptionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 100,
  },
  description: {
    display: 'flex',
    paddingTop: 10,
    paddingBottom: 10,
  },
}))
