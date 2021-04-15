import { makeStyles } from '@apisuite/fe-base'

export default makeStyles(({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    '& .page-container': {
      padding: '40px 0 80px 0',
    },
  },
  contractible: {
    '& .page-container': {
      paddingTop: 300,
    },
  },
}))
