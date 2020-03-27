import { makeStyles } from '@material-ui/styles'
import requireImage from 'util/requireImage'
import { Theme } from 'themes/types'
import { colorPicker } from 'util/colorPicker'

export default makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minHeight: '100%',
    background: `url("${requireImage('sandbox-background.png')}") no-repeat`,
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
    color: colorPicker(theme.palette.primary, 700, '#2DB7BA'),
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
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
    fontWeight: 500,
  },
  btn2: {
    backgroundColor: colorPicker(theme.palette.primary, 700, '#2DB7BA'),
    color: 'white',
    border: '1px solid white',
  },
  btn3: {
    backgroundColor: '#14C762',
    color: 'white',
    border: '1px solid white',
  },
  btn4: {
    display: 'flex',
    color: '#333333',
    backgroundColor: colorPicker(theme.palette.primary, 700, '#2DB7BA'),
    padding: '8px 24px',
    borderRadius: theme.shape.borderRadius,
    marginLeft: 12,
    cursor: 'pointer',
    fontWeight: 500,
    '&:hover': {
      color: '#FFF',
      backgroundColor: colorPicker(theme.palette.primary, 700, '#2DB7BA'),
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
    color: colorPicker(theme.palette.primary, 700, '#2DB7BA'),
  },
  otherTitle: {
    color: colorPicker(theme.palette.primary, 300, '#2DB7BA'),
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
    background: `linear-gradient(270deg, ${theme.gradients.G1.begin} 0%, ${theme.gradients.G1.end} 100%)`,
  },
  otherAvatar: {
    background: `linear-gradient(270deg, ${theme.gradients.G2.begin} 0%, ${theme.gradients.G2.end} 100%)`,
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
    color: colorPicker(theme.palette.primary, 300, '#2DB7BA'),
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
    borderRadius: theme.shape.borderRadius,
    color: '#ACACAC',
    margin: 0,
  },
  checkBoxLabel: {
    fontSize: '14px',
    fontWeight: 300,
    '& > a': {
      color: colorPicker(theme.palette.primary, 600, '#409CB0'),
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
