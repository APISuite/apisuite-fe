import { makeStyles } from '@material-ui/styles'
import theme from 'theme'

export default makeStyles(({
  menuItem: {
    fontSize: 16,
    '& a': {
      textDecoration: 'none',
    },
    paddingBottom: 10,
    paddingLeft: 10,
    borderStyle: 'solid',
    borderLeftWidth: 1,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: theme.palette.greyScales[500],
    color: theme.palette.text.primary,
    fontWeight: 500,
  },
  selected: {
    color: theme.palette.text.secondary,
    borderColor: theme.palette.primary,
    borderLeftWidth: 3,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
}))
