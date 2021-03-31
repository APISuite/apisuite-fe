import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  noticeContentsContainer: {
    backgroundColor: theme.alert.success.background,
    border: `1px solid ${theme.alert.success.background}`,
    borderRadius: `${theme.dimensions.borderRadius}px`,
    display: 'flex',
    padding: '12px',
    width: '100%',
  },

  noticeIcon: {
    alignItems: 'center',
    color: theme.palette.info.main,
    display: 'flex',
    justifyContent: 'center',
    marginRight: '10px',
  },

  noticeText: {
    '& > p': {
      color: '#035E86',
      fontSize: '14px',
      fontWeight: 400,

      '& > a': {
        textDecoration: 'none',
      },
    },
  },
}))
