import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'
import loginImage from 'assets/loginImage.svg'
import registerImage from 'assets/registerImage.svg'

const useStyles = makeStyles(({
  main: {
    display: 'flex',
    height: '100%',
    width: '100vw',
    backgroundColor: '#fff',
    '@media (max-width: 1024px)': {
      flexDirection: 'column-reverse',
    },
  },
  formSide: {
    display: 'flex',
    width: '44.25%',
    // height: '50%',
    margin: 'auto 0 auto 0',
    alignItems: 'flex-start',
    justifyContent: 'end',
    '@media (max-width: 1024px)': {
      width: '100%',
      height: '58.5%',
      justifyContent: 'center',
      alignItems: 'start',
    },
  },
  imageSide: {
    display: 'flex',
    flexDirection: 'column',
    width: '55.75%',
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 51px 100%)',
    backfaceVisibility: 'hidden',
    backgroundColor: config.palette.secondary,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '57px center',
    '&::before': {
      content: '',
      height: '100%',
      clipPath: 'polygon(0 0, 12px 0, 69px 100%, 51px 100%)',
      backgroundColor: config.palette.secondary,
    },
    '@media (max-width: 1024px)': {
      width: '100%',
      height: '41.5%',
      minHeight: '375px',
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 22px))',
      backgroundPosition: 'center -12px',
      backgroundSize: 'auto 115%',
      '&::before': {
        position: 'absolute',
        width: '100%',
        height: '41.5%',
        minHeight: '375px',
        backgroundColor: config.palette.secondary,
        opacity: 0.1,
        clipPath: 'polygon(0 calc(100% - 12px - 22px), 100% calc(100% - 12px), 100% 100%, 0 calc(100% - 22px))',
      },
    },
    '@media (min-width: 1024px)': {
      backgroundSize: '85% auto',
    },
    '@media (min-width: 1441px)': {
      backgroundSize: '60% auto',
      backgroundPosition: 'center',
    },
  },
  imageSideLogin: {
    backgroundImage: 'url(' + loginImage + ')',
  },
  imageSideRegister: {
    backgroundImage: 'url(' + registerImage + ')',
  },
  optionSelected: {
    textAlign: 'center',
    color: config.palette.primary,
    fontWeight: 'bold',
    borderBottom: '3px solid ' + config.palette.primary,
    flex: '1 1 0',
    height: '40px',
    background: 'none',
    cursor: 'pointer',
  },
  option: {
    textAlign: 'center',
    flex: '1 1 0',
    height: '40px',
    background: 'none',
    cursor: 'pointer',
    color: config.palette.greyScales[300],
    fontWeight: 'normal',
    borderBottom: '1px solid ' + config.palette.greyScales[300],
    '&:hover': {
      color: config.palette.greyScales[500],
      fontWeight: 'bold',
      borderBottom: '2px solid ' + config.palette.greyScales[500],
    },
  },
  formContainer: {
    margin: '0 calc(100px - 68px) 0 auto',
    padding: '0 68px 0 68px',
    '@media (max-width: 1024px)': {
      margin: 0,
      padding: '0 20px 0 20px',
    },
  },
  welcomeMessage: {
    color: config.palette.greyScales[600],
    marginBottom: '24px',
  },
  welcomeTitle: {
    color: config.palette.greyScales[700],
    marginBottom: '4px',
  },
  loginRegisterSelector: {
    display: 'flex',
  },
}))

export default useStyles
