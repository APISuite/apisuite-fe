import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minHeight: '100%',
    paddingBottom: 45,
  },
  header: {
    height: '280px',
    display: 'flex',
    padding: '0 50px 20px 50px',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  badge: {
    padding: '5px',
    borderRadius: '5px',
    width: '40px',
    textAlign: 'center',
    fontSize: '.7em',
    lineHeight: '1em',
  },
  live: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  docs: {
    backgroundColor: theme.palette.action.active,
    color: theme.palette.secondary.contrastText,
  },
  centerVertical: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '50vh',
  },
  swagger: {
    maxHeight: '90vh',
    overflowY: 'scroll',
    margin: '0 5% 40px 5%',
  },
}))
