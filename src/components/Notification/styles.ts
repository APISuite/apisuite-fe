import { makeStyles } from '@apisuite/fe-base'

export default makeStyles((theme) => ({
  content: {
    alignItems: 'center',
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },

  error: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
  },

  icon: {
    alignItems: 'center',
    display: 'flex',
    fontSize: 24,
    marginRight: 10,
  },

  snackbar: {
    display: 'flex',
    margin: 8,
    position: 'relative',
  },

  success: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },

  text: {
    margin: 0,
  },
}))
