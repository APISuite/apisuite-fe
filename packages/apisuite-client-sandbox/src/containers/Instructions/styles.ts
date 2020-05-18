import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'

export default makeStyles(({
  root: {
    minHeight: '100%',
    paddingTop: 200,
    backgroundColor: '#E3E3E3',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    maxWidth: 900,
    margin: '0 auto',
    transform: 'translateX(-8px)',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 100,
    width: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    width: 688,
  },
  navigation: {
    display: 'flex',
    flexDirection: 'column',
    width: 300,
  },
  title: {
    fontSize: 26,
    fontWeight: 300,
  },
  stepTitle: {
    fontSize: 20,
    marginTop: -170,
    paddingTop: 170,
  },
  description: {
    display: 'flex',
    textAlign: 'justify',
    padding: 0,
    marginBottom: 20,
    marginTop: 0,
  },
  stepContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  codeBlock: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: config.dimensions.borderRadius,
    borderBottomRightRadius: config.dimensions.borderRadius,
  },
  noteContainer: {
    width: '100%',
    backgroundColor: config.palette.secondary,
    borderRadius: config.dimensions.borderRadius,
    overflow: 'hidden',
    marginBottom: 20,
  },
  noteTitle: {
    fontSize: 16,
    color: 'black',
    fontWeight: 400,
  },
  note: {
    fontSize: 14,
    color: 'white',
  },
  noteContent: {
    backgroundColor: config.palette.primary,
    padding: 20,
    marginLeft: 5,
  },
  iconRow: {
    display: 'flex',
    color: 'white',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#333333',
    height: 40,
    marginTop: 0,
    paddingLeft: 20,
    paddingRight: 20,
    borderTopRightRadius: config.dimensions.borderRadius,
    borderTopLeftRadius: config.dimensions.borderRadius,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  clipboardIcon: {
    cursor: 'pointer',
    '&:hover': {
      color: config.palette.primary,
    },
    zIndex: 1,
  },
  sideMenuContainer: {
    paddingLeft: 40,
    position: 'sticky',
    top: 180,
  },
}))

export const codeStyle = {
  'hljs-string': {
    'color': config.palette.primary,
  },
  'hljs-symbol': {
    'color': config.palette.primary,
  },
  'hljs-bullet': {
    'color': config.palette.primary,
  },
  'hljs-addition': {
    'color': config.palette.primary,
  },
  'hljs': {
    display: 'block',
    overflowX: 'auto',
    background: '#333333',
    fontFamily: 'Roboto, sans-serif',
    fontSize: 14,
    color: '#D8D8D8',
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },
  'hljs-emphasis': {
    fontStyle: 'italic',
  },
  'hljs-strong': {
    fontWeight: 'bold',
  },
}
