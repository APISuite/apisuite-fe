import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'

export default makeStyles({
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 42,
    backgroundColor: config.palette.background.default,
    paddingLeft: 10,
    borderBottomWidth: 0,
    borderTopWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: config.palette.greyScales[300],
    borderStyle: 'solid',
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    fontSize: 14,
  },
  apiName: {
    width: '35%',
  },
  apiVersion: {
    width: '25%',
    color: config.palette.greyScales[400],
  },
  apiApps: {
    display: 'flex',
    flexDirection: 'row',
    width: '25%',
  },
})
