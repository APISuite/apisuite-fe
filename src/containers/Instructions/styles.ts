import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[50],
    minHeight: '100%',
  },

  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: '0 auto',
    maxWidth: 900,
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
    marginBottom: 20,
    marginTop: 0,
    padding: 0,
    textAlign: 'justify',
  },

  stepContainer: {
    marginBottom: 20,
    marginTop: 20,
  },

  codeBlock: {
    borderBottomLeftRadius: theme.palette.dimensions.borderRadius,
    borderBottomRightRadius: theme.palette.dimensions.borderRadius,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },

  noteContainer: {
    backgroundColor: theme.palette.action.focus,
    borderRadius: theme.palette.dimensions.borderRadius,
    marginBottom: 20,
    overflow: 'hidden',
    width: '100%',
  },

  noteTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: 400,
  },

  note: {
    color: 'white',
    fontSize: 14,
  },

  noteContent: {
    backgroundColor: theme.palette.secondary.main,
    marginLeft: 5,
    padding: 20,
  },

  iconRow: {
    alignItems: 'flex-end',
    backgroundColor: theme.palette.text.primary,
    color: 'white',
    display: 'flex',
    height: 40,
    justifyContent: 'flex-end',
    marginTop: 0,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: theme.palette.dimensions.borderRadius,
    borderTopLeftRadius: theme.palette.dimensions.borderRadius,
  },

  clipboardIcon: {
    cursor: 'pointer',
    zIndex: 1,

    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },

  sideMenuContainer: {
    paddingLeft: 40,
    position: 'sticky',
    top: 180,
  },
}))
