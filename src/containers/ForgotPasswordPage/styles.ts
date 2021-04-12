import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

import keyIllustration from 'assets/keyIllustration.svg'

const useStyles = makeStyles(({
  fieldContainer: {
    marginBottom: 20,
    marginTop: 20,
  },

  forgotPasswordContainer: {
    height: '100%',
    width: '100%',
  },

  imageSide: {
    backgroundImage: 'url(' + keyIllustration + ')',
    backgroundPosition: '10px 42%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '60% auto',
    display: 'flex',
    flex: '1 1 0',

    '@media (max-width: 1440px)': {
      backgroundSize: '80% auto',
    },

    '@media (max-width: 1024px)': {
      backgroundPosition: 'center',
      backgroundSize: '50% auto',
    },

    '@media (max-width: 640px)': {
      backgroundPosition: 'center',
      backgroundSize: '70% auto',
      height: '41.5%',
      minHeight: '375px',
      width: '100%',
    },
  },

  main: {
    backgroundColor: config.palette.background.default,
    display: 'flex',
    height: '100%',

    '@media (max-width: 1024px)': {
      flexDirection: 'column-reverse',
    },
  },

  message: {
    color: config.palette.greyScales[600],
    marginBottom: '12px',
  },

  messageContainer: {
    margin: '0 auto 0 auto',
    maxWidth: '583px',
    padding: '16px',
    transform: 'translateY(-28px)',

    '@media (max-width: 1024px)': {
      margin: 0,
      padding: '48px 20px 0 20px',
    },
  },

  messageSide: {
    alignItems: 'center',
    display: 'flex',
    flex: '1 1 0',
    justifyContent: 'end',

    '@media (max-width: 1024px)': {
      alignItems: 'start',
      height: 'calc(100% - 41.5%)',
      justifyContent: 'center',
      width: '100%',
    },
  },

  messageTitle: {
    color: config.palette.greyScales[800],
    marginBottom: '16px',
  },

  placeholder: {
    height: '12px',
  },

  textField: {
    backgroundColor: config.palette.background.default,
    borderRadius: `${config.dimensions.borderRadius}px`,
    color: config.palette.greyScales[400],
  },
}))

export default useStyles
