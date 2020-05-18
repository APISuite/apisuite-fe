import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'

const useStyles = makeStyles({
  button: {
    backgroundColor: config.palette.primary,
    borderRadius: '5px',
    padding: '6px 12px',
    display: 'inline-block',
    fontSize: '14px',
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.15)',
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: '#fff !important',
    textAlign: 'center',
    position: 'relative',
    fontWeight: 600,

    '&:hover': {
      cursor: 'pointer',
      boxShadow: '0 4px 6px 0 rgba(0,0,0,0.35)',
    },

    '&:active': {
      boxShadow: '0 2px 5px 0 rgba(0,0,0,0.15)',
    },
  },
  secondary: {
    backgroundColor: config.palette.secondary,
  },
  dark: {
    backgroundColor: config.palette.text.primary,
  },
  transparent: {
    background: 'none',
    borderWidth: 0,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
  },
  primaryColor: {
    color: `${config.palette.primary} !important`,
  },
  secondaryColor: {
    color: `${config.palette.secondary} !important`,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    cursor: 'default !important',
    opacity: 0.6,
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.05) !important',
  },
  loading: {

  },
})

export default useStyles
