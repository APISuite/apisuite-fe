import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  // a) Button's variant

  button: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '5px',
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.15)',
    color: theme.palette.primary.contrastText,
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: 600,
    padding: '6px 12px',
    position: 'relative',
    textAlign: 'center',
    textDecoration: 'none',

    '&:active': {
      boxShadow: '0 2px 5px 0 rgba(0,0,0,0.15)',
    },

    '&:hover': {
      cursor: 'pointer',
      boxShadow: '0 4px 6px 0 rgba(0,0,0,0.35)',
    },

    '&:link, &:visited': {
      color: theme.palette.primary.contrastText,
    },
  },

  dark: {
    backgroundColor: theme.palette.text.primary,
  },

  secondary: {
    backgroundColor: theme.palette.secondary.main,
  },

  tertiary: {
    backgroundColor: theme.palette.tertiary.main,
  },

  transparent: {
    background: 'none',
    borderWidth: 0,
    boxShadow: 'none',

    '&:hover': {
      boxShadow: 'none',
    },
  },

  // b) Button's text color

  primaryColor: {
    color: `${theme.palette.primary.contrastText} !important`,
  },

  secondaryColor: {
    color: `${theme.palette.secondary.contrastText} !important`,
  },

  tertiaryColor: {
    color: `${theme.palette.tertiary.contrastText} !important`,
  },

  // c) Button's status

  disabled: {
    backgroundColor: `${theme.palette.grey[300]} !important`,
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.05) !important',
    cursor: 'default !important',
    opacity: 0.6,
  },

  fullWidth: {
    width: '100%',
  },

  loading: {

  },
}))

export default useStyles
