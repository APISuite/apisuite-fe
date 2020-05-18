import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'

export default makeStyles(({
  title: {
    fontSize: 26,
    fontWeight: 300,
  },
  appsContainer: {
    display: 'flex',
    flexDirection: 'row',
    transform: 'translateX(-8px)',
    paddingBottom: 50,
  },
  docsContainer: {
    backgroundColor: 'white',
    paddingTop: 24,
    paddingBottom: 180,
  },
  docs: {
    display: 'flex',
    flexDirection: 'row',
  },
  doc: {
    display: 'flex',
    flexDirection: 'column',
    width: 270,
    height: 460,
    '& > h1': {
      margin: 16,
      fontSize: '18px',
      fontWeight: 300,
      textAlign: 'center',
      color: config.palette.primary[700],
    },
    '& > p': {
      margin: 0,
    },
  },
  docImgContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 150,
  },
  spacer: {
    flex: 1,
  },
  readMore: {
    display: 'flex',
    alignItems: 'center',
    color: '#999999',
    userSelect: 'none',
    cursor: 'pointer',
  },
  middleDocSpace: {
    marginLeft: 32,
    marginRight: 32,
  },
}))
