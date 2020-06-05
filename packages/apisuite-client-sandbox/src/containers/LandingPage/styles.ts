import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'

export default makeStyles(({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minHeight: '100%',
    backgroundSize: '110% 110%',
    paddingTop: 300,
    paddingBottom: 45,
  },
  section: {
    maxWidth: 900,
    margin: '0 auto',
  },
  steps: {
    display: 'flex',
    flexDirection: 'row',
  },
  step: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 260,
    padding: 16,
    '& > h1': {
      width: 100,
      height: 100,
      margin: 16,
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      border: '2px solid white',
      fontSize: '48px',
      fontWeight: 300,
      color: 'white',
    },
    '& > h3': {
      width: '100%',
      margin: 16,
      padding: 0,
      fontSize: '22px',
      fontWeight: 300,
      textAlign: 'center',
      color: 'white',
    },
    '& > p': {
      textAlign: 'center',
      color: 'white',
    },
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    maxWidth: 900,
    margin: '0 auto',
  },
  cardRow: {
    display: 'flex',
    flexDirection: 'row',
    width: 550,
  },
  cardItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 150,
    '& > p': {
      fontSize: 16,
      textAlign: 'center',
      margin: 0,
      marginTop: 16,
    },
  },
  cardSide: {
    paddingRight: 60,
    paddingTop: 60,
    color: '#fff',
    '& > h1': {
      display: 'inline-block',
      fontSize: 26,
      fontWeight: 300,
      backgroundColor: 'white',
      padding: '0px 16px',
      margin: 0,
      marginBottom: 30,
      color: config.palette.primary,
    },
  },
  btn: {
    display: 'inline-block',
    color: '#333333',
    backgroundColor: 'white',
    padding: '8px 24px',
    borderRadius: config.dimensions.borderRadius,
    cursor: 'pointer',
    fontWeight: 500,
  },
  featureAvatar: {
    height: 60,
    width: 60,
    backgroundColor: config.palette.primary
  }
}))
