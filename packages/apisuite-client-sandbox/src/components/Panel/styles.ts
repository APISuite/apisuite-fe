import { makeStyles } from '@material-ui/styles'
import theme from 'theme'

export default makeStyles(({
  card: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: theme.dim.radius * 2,
    boxShadow: '-1px -1px 1px 0px rgba(0,0,0,0.03)',
    maxWidth: 900,
    margin: '0 auto',
  },
  cardShadow: {
    position: 'absolute',
    left: 30,
    top: 'calc(100% + 5px)',
    marginTop: -4,
    transform: 'skew(45deg)',
    width: '100%',
    height: 60,
    background: 'linear-gradient(top, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0) 100%)',
  },
  cardShadowSide: {
    position: 'absolute',
    right: -60,
    top: 31,
    transform: 'skewY(45deg)',
    height: '100%',
    width: 60,
    background: 'linear-gradient(left, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0) 100%)',
  },
}))
