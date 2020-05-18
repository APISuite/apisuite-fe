import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'

export default makeStyles(({
  subSelect: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: config.palette.greyScales[400],
  },
  dropdown: {
    display: 'flex',
    width: '100%',
    fontSize: 14,
    margin: 4,
    cursor: 'pointer',
  },
  chip: {
    display: 'flex',
    margin: 4,
    borderRadius: 3,
    background: 'linear-gradient(270deg, #2DB7BA 0%, #14BC7D 100%)',
    fontWeight: 400,
    color: '#fff',
  },
  chips: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  loading: {
    color: 'white',
    opacity: 0.5,
  },
  icon: {
    cursor: 'pointer',
  },
  clearIcon: {
    fill: 'rgba(255, 255, 255, 0.6)',
    height: 14,
    '&:hover': {
      fill: 'rgba(255, 255, 255, 1)',
      height: 18,
    },
  },
}))
