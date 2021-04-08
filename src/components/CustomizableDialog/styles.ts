import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  cancelButton: {
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    color: `${theme.palette.action.active} !important`,
    fontSize: '16px',
    fontWeight: 500,
    marginRight: '24px',
    padding: '6px 21px',
    textDecoration: 'none',
    textTransform: 'none',
    width: 'auto',

    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },
  },

  confirmButton: {
    backgroundColor: theme.palette.error.main,
    border: `1px solid ${theme.palette.error.main}`,
    borderRadius: theme.palette.dimensions.borderRadius,
    color: `${theme.palette.secondary.contrastText} !important`,
    fontSize: '16px',
    fontWeight: 500,
    padding: '6px 21px',
    textDecoration: 'none',
    textTransform: 'none',
    width: 'auto',

    '&:hover': {
      backgroundColor: theme.palette.error.main,
    },
  },

  dialogActionsContainer: {
    display: 'flex',
    padding: '0px 24px 20px 24px',
  },

  dialogContentContainer: {
    padding: '20px 24px',

    '& > :first-child': {
      color: theme.palette.grey[400],
      fontSize: '16px',
      fontWeight: 400,
    },
  },

  dialogTitleContainer: {
    backgroundColor: theme.palette.grey[200],

    '& > :first-child': {
      color: theme.palette.primary.main,
      fontSize: '24px',
      fontWeight: 500,
    },
  },
}))

export default useStyles
