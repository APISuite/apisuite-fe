import { makeStyles } from '@apisuite/fe-base'

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
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    cursor: 'pointer',
    marginRight: 8,
    paddingRight: 12,
  },
  controlLabel: {
    margin: 0,
  },
  unselected: {
    backgroundColor: theme.palette.grey[100],
    border: `1px solid ${theme.palette.grey[100]}`,
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
