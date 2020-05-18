import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'

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
    borderColor: config.palette.greyScales[500],
    color: config.palette.text.primary,
    fontWeight: 500,
  },
  selected: {
    color: config.palette.text.secondary,
    borderColor: config.palette.primary,
    borderLeftWidth: 3,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
}))
