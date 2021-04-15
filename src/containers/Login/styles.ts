import { makeStyles } from '@apisuite/fe-base'
import loginImage from 'assets/loginImage.svg'
import registerImage from 'assets/registerImage.svg'

const useStyles = makeStyles((theme) => ({
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
    backgroundColor: theme.palette.primary.main,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '57px center',
    '&::before': {
      content: '',
      height: '100%',
      clipPath: 'polygon(0 0, 12px 0, 69px 100%, 51px 100%)',
      backgroundColor: theme.palette.primary.main,
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
        backgroundColor: theme.palette.action.focus,
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
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
    borderBottom: `3px solid ${theme.palette.secondary.main}`,
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
    color: theme.palette.grey[300],
    fontWeight: 'normal',
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    '&:hover': {
      color: theme.palette.grey[500],
      fontWeight: 'bold',
      borderBottom: `2px solid ${theme.palette.grey[500]}`,
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
    color: theme.palette.grey[600],
    marginBottom: '24px',
  },
  welcomeTitle: {
    color: theme.palette.primary.light,
    marginBottom: '4px',
  },
  loginRegisterSelector: {
    display: 'flex',
  },
}))

export default useStyles
