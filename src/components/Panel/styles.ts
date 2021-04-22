import { makeStyles } from '@apisuite/fe-base'

export default makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.palette.dimensions.borderRadius * 2,
    boxShadow: '-1px -1px 1px 0px rgba(0,0,0,0.03)',
    display: 'flex',
    flexDirection: 'column',
    margin: '20px auto',
    maxWidth: 900,
    position: 'relative',
  },

  cardContent: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 24px',
  },

  cardShadow: {
    background: 'linear-gradient(top, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0) 100%)',
    height: 60,
    left: 30,
    marginTop: -4,
    position: 'absolute',
    top: 'calc(100% + 5px)',
    transform: 'skew(45deg)',
    width: '100%',
  },

  cardShadowSide: {
    background: 'linear-gradient(left, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0) 100%)',
    height: '100%',
    position: 'absolute',
    right: -60,
    top: 31,
    transform: 'skewY(45deg)',
    width: 60,
  },

  featuresDesc: {
    color: '#666666',
    maxWidth: 600,
    textAlign: 'center',
  },

  featuresTitle: {
    color: theme.palette.primary.main,
    fontSize: 26,
    fontWeight: 100,
    textAlign: 'center',
  },

  otherTitle: {
    color: theme.palette.primary.main,
  },
}))
