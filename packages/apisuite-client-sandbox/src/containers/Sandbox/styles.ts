import { makeStyles } from '@material-ui/styles'
import requireImage from 'util/requireImage'
import theme from 'theme'
import { colorPicker } from 'util/colorPicker'

export default makeStyles(({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minHeight: '100%',
    // background: `url("${requireImage('sandbox-background.png')}") no-repeat`,
    backgroundSize: '100% 100%',
    paddingTop: 300,
    paddingBottom: 45,
  },
  section: {
    maxWidth: 900,
    margin: '0 auto',
  },
  slide: {
    display: 'flex',
    alignItems: 'center',
  },
  slideImage: {
    width: 400,
    height: 350,
  },
  slideInfo: {
    width: 400,
    marginTop: 50,
    color: 'white',
  },
  slideInfoH1: {
    display: 'inline-block',
    fontSize: 26,
    fontWeight: 100,
    backgroundColor: 'white',
    padding: '8px 16px',
    margin: 0,
    marginBottom: 8,
    color: theme.palette.primary,
  },
  slideInfoParagraph: {
    marginBottom: 48,
  },
  spacer: {
    flex: 1,
  },
  btn: {
    display: 'inline-block',
    color: '#333333',
    backgroundColor: 'white',
    padding: '8px 24px',
    borderRadius: theme.dim.radius,
    cursor: 'pointer',
    fontWeight: 500,
  },
  btn2: {
    backgroundColor: theme.palette.primary,
    color: 'white',
    border: '1px solid white',
  },
  btn3: {
    backgroundColor: theme.palette.secondaryLight,
    color: 'white',
    border: '1px solid white',
  },
  btn4: {
    display: 'flex',
    color: '#333333',
    backgroundColor: theme.palette.primary,
    padding: '8px 24px',
    borderRadius: theme.dim.radius,
    marginLeft: 12,
    cursor: 'pointer',
    fontWeight: 500,
    '&:hover': {
      color: '#FFF',
      backgroundColor: theme.palette.primary,
    },
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
    color: theme.palette.primary,
  },
  otherTitle: {
    color: theme.palette.primary,
  },
  featuresDesc: {
    textAlign: 'center',
    color: '#666666',
    maxWidth: 600,
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: '8px 24px',
    paddingTop: 0,
  },
  list: {
    width: '100%',
    maxWidth: 350,
    margin: '0 40px',
  },
  featureAvatar: {
    background: 'linear-gradient(270deg, #2DB7BA 0%, #14BC7D 100%)',
  },
  otherAvatar: {
    background: 'linear-gradient(270deg, #14BC7D 0%, #14DE2D 100%)',
  },
  partnersContainer: {
    display: 'felx',
    justifyContent: 'center',
    padding: '16px 60px',
  },
  partnersTitle: {
    fontSize: '26px',
    fontWeight: 300,
    textAlign: 'center',
    marginBottom: 20,
  },
  partnersImg: {
    display: 'block',
    maxWidth: 800,
  },
  partnersLink: {
    color: theme.palette.primary,
    textAlign: 'center',
    marginTop: 40,
  },
  stepsContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    maxWidth: 900,
    margin: '0 auto',
  },
  steps: {
    display: 'flex',
    flexDirection: 'row',
  },
  step: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 200,
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
      border: '2px solid #9D9D9D',
      fontSize: '48px',
      fontWeight: 300,
    },
    '& > h3': {
      width: '100%',
      margin: 16,
      padding: 0,
      fontSize: '22px',
      fontWeight: 300,
      textAlign: 'center',
    },
    '& > p': {
      textAlign: 'center',
    },
  },
  stepDivider: {
    borderRight: '1px solid #EAEAEA',
  },
  stepSide: {
    marginLeft: 40,
    '& > h1': {
      fontSize: '26px',
      fontWeight: 300,
      textAlign: 'center',
    },
  },
  stepBtn: {
    width: '100%',
    marginTop: 16,
    marginBottom: 8,
    textTransform: 'inherit',
  },
  subscribeContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    maxWidth: 900,
    margin: '0 auto',
  },
  wheelContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px 48px',
    borderRight: '1px solid #4A4A4A',
  },
  emailContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 24,
    paddingLeft: 48,
    color: 'white',
    '& > h1': {
      fontSize: '26px',
      fontWeight: 300,
    },
    '& > p': {
      fontSize: '14px',
    },
  },
  email: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailTextfield: {
    backgroundColor: '#646464',
    borderRadius: theme.dim.radius,
    color: '#ACACAC',
    margin: 0,
  },
  checkBoxLabel: {
    fontSize: '14px',
    fontWeight: 300,
    '& > a': {
      color: theme.palette.primaryLight,
    },
  },
  checkbox: {
    color: 'white',
  },
  stepsideHeading: {
    display: 'flex',
    textAlign: 'left',
  },
  buttonLink: {
    textDecoration: 'none',
  },
}))
