import { makeStyles } from '@apisuite/fe-base'

export default makeStyles((theme) => ({
  cancelButton: {
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    color: `${theme.palette.action.active} !important`,
    fontSize: '16px',
    fontWeight: 500,
    marginRight: '12px',
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
    color: `${theme.palette.common.white} !important`,
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
  },

  dialogText: {
    color: '#2F4152',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '20px',
  },

  dialogSubText: {
    color: theme.palette.grey[400],
    fontSize: '14px',
    fontWeight: 300,
    lineHeight: '20px',
  },

  dialogTitleContainer: {
    alignItems: 'center',
    backgroundColor: theme.palette.grey[50],
    display: 'flex',
    padding: '15px 25px',

    // Dialog's optional title icon
    '& > :first-child': {
      marginRight: '10px',
    },

    // Dialog's title
    '& > :last-child': {
      color: theme.palette.primary.main,
      fontSize: '24px',
      fontWeight: 500,
      padding: '0px',
    },
  },

  dialogTitleInfoIcon: {
    color: '#46B5EF',
  },

  dialogTitleWarningIcon: {
    color: theme.palette.warning.main,
  },
}))
