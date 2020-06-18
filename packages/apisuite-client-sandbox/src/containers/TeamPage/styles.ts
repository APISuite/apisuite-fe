import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'

export default makeStyles(({
  root: {
    minHeight: '100%',
    paddingTop: 200,
    backgroundColor: config.palette.background.default,
  },
  contentContainer: {
    maxWidth: 900,
    margin: '0 auto',
    transform: 'translateX(-8px)',
  },
  title: {
    fontSize: 26,
    fontWeight: 300,
    marginBottom: 54,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    cursor: 'pointer',
    borderRadius: config.dimensions.borderRadius,
    backgroundColor: 'white',
    overflow: 'hidden',
    borderStyle: 'solid',
    borderColor: config.palette.greyScales[300],
    border: 1,
  },
  header: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 42,
    paddingLeft: 10,
    color: config.palette.greyScales[400],
  },
  actions: {
    paddingRight: 178,
  },
  row: {
    display: 'flex',
    padding: '16px 30px 16px 10px',
    justifyContent: 'space-between',
    width: '100%',
    borderTop: '1px solid ' + config.palette.greyScales[300],
  },
  auth: {
    fontSize: 14,
    color: config.palette.text.secondary,
  },
  select: {
    width: 182,
  },
  name: {
    fontSize: 16,
    color: config.palette.text.primary,
  },
  btn: {
    display: 'inline-block',
    color: 'white',
    padding: '8px 24px',
    borderRadius: config.dimensions.borderRadius,
    cursor: 'pointer',
    fontWeight: 500,
    marginRight: 16,
  },
  inviteCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    cursor: 'pointer',
    borderRadius: config.dimensions.borderRadius,
    backgroundColor: 'white',
    overflow: 'hidden',
    borderStyle: 'solid',
    borderColor: config.palette.greyScales[300],
    border: 1,
    marginTop: 24,
    height: 82,
    padding: '12px 30px 12px 10px',
  },
  emailTextfield: {
    backgroundColor: 'white',
    width: 220,
    borderRadius: config.dimensions.borderRadius,
    color: config.palette.greyScales[400],
  },
  nameTextfield: {
    backgroundColor: 'white',
    width: 220,
    borderRadius: config.dimensions.borderRadius,
    color: config.palette.greyScales[400],
  },
}))
