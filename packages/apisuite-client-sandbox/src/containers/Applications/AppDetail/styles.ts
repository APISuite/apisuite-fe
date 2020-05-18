import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'

export default makeStyles(({
  container: {
    backgroundColor: 'white',
    paddingTop: 250,
    paddingBottom: 50,
    minHeight: '100%',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  left: {
    width: 500,
  },
  right: {
    flex: 1,
    marginLeft: 60,
  },
  iconBtn: {
    padding: 7,
    minWidth: 40,
    width: 40,
    height: 40,
    color: '#8B8B8B',
    marginLeft: 8,
    marginBottom: 4,
  },
  iconBtnLeft: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: 0,
    transform: 'translateX(8px)',
  },
  iconBtnRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fieldWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-end',
  },
  divider: {
    width: '100%',
    height: 1,
    borderBottom: '1px solid #E3E3E3',
  },
  btn: {
    display: 'inline-block',
    backgroundColor: '#333333',
    color: 'white',
    padding: '8px 24px',
    borderRadius: config.dimensions.borderRadius,
    cursor: 'pointer',
    fontWeight: 500,
    marginRight: 16,
  },
  btn2: {
    backgroundColor: 'white',
    color: '#646464',
    border: '1px solid #646464',
  },
  appName: {
    fontSize: 26,
    fontWeight: 300,
  },
  avatar: {
    fontSize: 26,
    fontWeight: 300,
    backgroundColor: config.palette.secondary,
    width: 140,
    height: 140,
  },
  status: {
    display: 'flex',
    alignItems: 'center',
  },
  marginBottom: {
    marginBottom: 8,
  },
  link: {
    color: config.palette.primary,
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  disabled: {
    opacity: 0.5,
    pointerEvents: 'none',
  },
  tag: {
    backgroundColor: '#333333',
    color: 'white',
    padding: '6px 24px',
    borderRadius: config.dimensions.borderRadius,
    marginRight: 8,
  },
  cardContainer: {
    padding: '80px 0',
    backgroundColor: '#E3E3E3',
  },
  panel: {
    display: 'flex',
    flexDirection: 'row',
  },
  wheelContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px 48px',
    borderRight: '1px solid #E3E3E3',
  },
  cardInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 24,
    paddingLeft: 48,
    '& > h1': {
      fontSize: 26,
      fontWeight: 100,
      margin: 0,
      marginBottom: 16,
    },
    '& > p': {
      margin: 0,
    },
  },
  greenColor: {
    color: '#14BC7D',
    '& > a': {
      textDecoration: 'underline',
    },
  },
  cardInfoItalic: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  errorPlaceholder: {
    display: 'flex',
    marginTop: 10,
  },
  errorAlert: {
    backgroundColor: config.palette.feedback.error,
    border: 'solid',
    borderWidth: 1,
    borderColor: config.palette.feedback.error,
    fontSize: 13,
    color: '#FFF',
    padding: '2px 15px',
    borderRadius: config.dimensions.borderRadius,
    minHeight: 20,
  },
}))
