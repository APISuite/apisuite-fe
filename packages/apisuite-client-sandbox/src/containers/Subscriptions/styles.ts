import { makeStyles } from '@material-ui/styles'

export default makeStyles({
  root: {
    minHeight: '100%',
    paddingTop: 200,
    backgroundColor: '#E3E3E3',
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
    textAlign: 'justify',
    paddingTop: 10,
    paddingBottom: 10,
  },
})
