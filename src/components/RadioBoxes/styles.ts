import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginTop: 8,
    marginBottom: 4,
  },
  controlWrapper: {
    border: `1px solid ${theme.palette.grey[900]}`,
    marginRight: 8,
    paddingRight: 12,
    borderRadius: theme.dimensions.borderRadius,
    cursor: 'pointer',
  },
  controlLabel: {
    margin: 0,
  },
  unselected: {
    backgroundColor: theme.palette.grey[50],
    border: `1px solid ${theme.palette.grey[50]}`,
  },
  desc: {
    fontSize: 12,
    width: 234,
    lineHeight: '18px',
    color: theme.palette.grey[500],
    paddingLeft: 42,
    marginTop: 0,
    marginBottom: 24,
  },
}))
