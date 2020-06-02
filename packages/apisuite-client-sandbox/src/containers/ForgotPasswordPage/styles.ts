import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'
import keyIllustration from 'assets/keyIllustration.svg'

const useStyles = makeStyles(({
  main: {
    display: 'flex',
    height: '100%',
    backgroundColor: config.palette.background.default,
    '@media (max-width: 1024px)': {
      flexCirection: 'column-reverse',
    },
  },
  imageSide: {
    display: 'flex',
    flex: '1 1 0',
    backgroundImage: 'url(' + keyIllustration + ')',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '10px 42%',
    backgroundSize: '60% auto',
    '@media (max-width: 1440px)': {
      backgroundSize: '80% auto',
    },
    '@media (max-width: 1024px)': {
      backgroundPosition: 'center',
      backgroundSize: '50% auto',
    },
    '@media (max-width: 640px)': {
      width: '100%',
      height: '41.5%',
      minHeight: '375px',
      backgroundPosition: 'center',
      backgroundSize: '70% auto',
    },
  },
  messageSide: {
    display: 'flex',
    flex: '1 1 0',
    alignItems: 'center',
    justifyContent: 'end',
    '@media (max-width: 1024px)': {
      width: '100%',
      height: 'calc(100% - 41.5%)',
      justifyContent: 'center',
      alignItems: 'start',
    },
  },
  messageContainer: {
    margin: '0 auto 0 auto',
    padding: '16px',
    maxWidth: '583px',
    transform: 'translateY(-28px)',
    '@media (max-width: 1024px)': {
      margin: 0,
      padding: '48px 20px 0 20px',
    },
  },
  message: {
    color: config.palette.greyScales[600],
    marginBottom: '12px',
  },
  messageTitle: {
    color: config.palette.greyScales[800],
    marginBottom: '16px',
  },
  forgotPasswordContainer: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    height: '12px',
  },
  fieldContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  textField: {
    backgroundColor: 'white',
    borderRadius: config.dimensions.borderRadius,
    color: config.palette.greyScales[400],
  },
}))

export default useStyles
