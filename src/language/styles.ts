import { makeStyles } from '@apisuite/fe-base'

export default makeStyles((theme) => ({
  languageSelector: {
    backgroundColor: theme.palette.common.white,
    borderColor: theme.palette.grey[400],
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    color: `${theme.palette.text.primary} !important`,
    fontSize: '14px',
    fontWeight: 300,
    overflow: 'hidden !important',
    padding: '5px 0px',
    position: 'relative',
    textIndent: '10px',
    textOverflow: 'ellipsis',
    textTransform: 'none',
    whiteSpace: 'nowrap',
    width: '180px',

    '&:disabled': {
      backgroundColor: theme.palette.action.disabled,
    },

    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },

    '&::after': {
      content: 'none',
    },

    '&::before': {
      content: 'none',
    },
  },
}))
