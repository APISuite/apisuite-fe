import { makeStyles } from '@material-ui/styles'
import { Theme } from 'themes/types'
import { colorPicker } from 'util/colorPicker'

export default makeStyles((theme: Theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 220,
    height: 218,
    cursor: 'pointer',
    margin: 8,
    borderRadius: theme.shape.borderRadius,
    padding: 16,
    backgroundColor: 'white',
  },
  cardAdd: {
    backgroundColor: 'transparent',
    border: `2px dashed ${colorPicker(theme.palette.grey, 300, '#D1D1D1')}`,
  },
  avatar: {
    fontSize: 26,
    fontWeight: 300,
    background: 'linear-gradient(270deg, #14BC7D 0%, #14DE2D 100%)',
    width: 124,
    height: 124,
  },
  actions: {
    flex: 1,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginTop: 8,
  },
  actionsInfo: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
    maxWidth: 135,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    margin: 0,
  },
  caption: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 12,
    color: colorPicker(theme.palette.grey, 700, '#646464'),
    marginTop: 4,
  },
  disabled: {
    opacity: 0.5,
  },
}))
