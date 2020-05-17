import { makeStyles } from '@material-ui/styles'

import theme from 'theme'

const useStyles = makeStyles({
  button: {
    backgroundColor: theme.palette.primary,
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
      boxShadow: '0 2px 5px 0 rgba(0,0,0,0.15)'
    }
  },
  secondary: {
    backgroundColor: theme.palette.secondary
  },
  dark: {
    backgroundColor: theme.palette.text.primary
  },
  transparent: {
    background: 'none',
    borderWidth: 0,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none'
    }
  },
  primaryColor: {
    color: `${theme.palette.primary} !important`
  },
  secondaryColor: {
    color: `${theme.palette.secondary} !important`
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    cursor: 'default !important',
    opacity: .6,
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.05) !important'
  },
  loading: {

  }
})

export default useStyles
