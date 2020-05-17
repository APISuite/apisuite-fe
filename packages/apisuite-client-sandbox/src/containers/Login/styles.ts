import { makeStyles } from '@material-ui/styles'
import theme from 'theme'
import { colorPicker } from 'util/colorPicker'

const useStyles = makeStyles(({
  authPage: {
    backgroundColor: '#fff',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    zIndex: 10000,
  },
  authLeftWrapper: {
    flex: 1,
  },
  authRightWrapper: {
    flex: 1,
    backgroundColor: theme.palette.secondary,
  },
  contentWrapper: {
    flexBasis: 1170,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',

    '@media screen and (max-width: 900px)': {
      flexDirection: 'column-reverse',
    },
  },
  authContentRight: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary,

    '@media screen and (max-width: 900px)': {
      flex: 2,
    },
  },
  authContentLeft: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',

    '@media screen and (max-width: 900px)': {
      flex: 1,
      padding: 20,
    },
  },
  authContentStripe: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    width: 140,
    backgroundImage: `-webkit-linear-gradient(5deg, #fff 54%, ${theme.palette.secondary} 54.3%)`,

    '@media screen and (max-width: 900px)': {
      position: 'absolute',
      top: '-40px',
      right: 0,
      height: 50,
      width: '100%',
      backgroundImage: '-webkit-linear-gradient(87deg, #fff 54%, transparent 54.3%);',
    },
  },
  authFormsWrapper: {
    maxWidth: 360,
    height: 620,

    '@media screen and (max-width: 900px)': {
      maxWidth: 360,
      height: 620,
      margin: '0 auto',
    },
  },
  authBlock: {
    margin: '0 auto',
    paddingTop: 20,
  },
  authSelector: {
    width: '100%',
    borderBottom: '1px solid #d8d8d8',
    display: 'flex',
    flexDirection: 'row',
    color: '#8B8B8B',

    '& div': {
      flex: 1,
      textAlign: 'center',
      padding: 10,
      position: 'relative',
      top: 1,

      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  authSelectorSelected: {
    fontWeight: 500,
    color: theme.palette.primary,
    borderBottom: `3px solid ${theme.palette.primary}`,
  },
  authForm: {
    paddingTop: 10,
  },
  userCreatedFeedback: {
    border: `1px solid ${theme.palette.primary}`,
    color: theme.palette.primary,
    textAlign: 'center',
    padding: '12px 25px',
    minWidth: 50,
  },
}))

export default useStyles
