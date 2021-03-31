import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  greetingCardContentsContainer: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    borderRadius: '4px',
    boxShadow: `0px 3px 10px -3px ${theme.palette.grey[100]}`,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 'auto',
    maxWidth: '900px',
    padding: '20px 40px',
    width: '100%',
  },

  greetingCardText: {
    fontSize: '20px',
    fontWeight: 200,
    paddingRight: '20px',
    width: '625px',
  },
}))
