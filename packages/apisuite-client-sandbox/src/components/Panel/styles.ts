import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'

export default makeStyles(({
  card: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: config.dimensions.borderRadius * 2,
    boxShadow: '-1px -1px 1px 0px rgba(0,0,0,0.03)',
    maxWidth: 900,
    margin: '20px auto',
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
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px 24px',
  },
  featuresTitle: {
    fontSize: 26,
    fontWeight: 100,
    textAlign: 'center',
    color: config.palette.primary,
  },
  otherTitle: {
    color: config.palette.primary,
  },
  featuresDesc: {
    textAlign: 'center',
    color: '#666666',
    maxWidth: 600,
  },
}))
