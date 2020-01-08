import { makeStyles } from '@material-ui/styles'
import requireImage from 'util/requireImage'

export default makeStyles({
  container: {
    backgroundColor: 'white',
    paddingTop: 250,
    paddingBottom: 50,
    minHeight: '100%',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  left: {
    width: 500,
  },
  right: {
    flex: 1,
    marginLeft: 60,
  },
  iconBtn: {
    padding: 7,
    minWidth: 40,
    width: 40,
    height: 40,
    color: '#8B8B8B',
    marginLeft: 8,
    marginBottom: 4,
  },
  fieldWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-end',
  },
  info: {
    'fontSize': 12,
    'lineHeight': '14px',
    '& a': {
      display: 'block',
      color: '#2DB7B9',
    },
  },
  divider: {
    width: '100%',
    height: 1,
    borderBottom: '1px solid #E3E3E3',
  },
  marginBottom: {
    marginBottom: 8,
  },
  btn: {
    display: 'inline-block',
    backgroundColor: '#333333',
    color: 'white',
    padding: '8px 24px',
    borderRadius: 4,
    cursor: 'pointer',
    fontWeight: 500,
    marginRight: 16,
  },
  btn2: {
    backgroundColor: 'white',
    color: '#646464',
    border: '1px solid #646464',
  },
  upload: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 160,
    height: 160,
    border: '1px dashed #646464',
    backgroundColor: '#E3E3E3',
    borderRadius: '50%',
    margin: '4px 0',
  },
  uploadDesc: {
    width: 160,
    margin: 0,
    textAlign: 'center',
  },
  space: {
    height: 485,
  },
  info2: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 45,
  },
  infoImage: {
    width: 160,
    height: 160,
    border: '1px solid #979797',
    borderRadius: '50%',
    margin: '16px 0',
    background: `url("${requireImage('create-app-1.png')}") no-repeat`,
    backgroundPosition: 'center',
    backgroundSize: '140% 140%',
  },
})
