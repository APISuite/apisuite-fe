import { makeStyles } from '@material-ui/styles'
import theme from 'theme'
import { colorPicker } from 'util/colorPicker'

export default makeStyles(({
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginTop: 8,
    marginBottom: 4,
  },
  controlWrapper: {
    border: `1px solid ${theme.palette.greyScales[900]}`,
    marginRight: 8,
    paddingRight: 12,
    borderRadius: theme.dim.radius,
    cursor: 'pointer',
  },
  controlLabel: {
    margin: 0,
  },
  unselected: {
    backgroundColor: theme.palette.greyScales[50],
    border: `1px solid ${theme.palette.greyScales[50]}`,
  },
  desc: {
    fontSize: 12,
    width: 234,
    lineHeight: '18px',
    color: theme.palette.greyScales[500],
    paddingLeft: 42,
    marginTop: 0,
    marginBottom: 24,
  },
}))
