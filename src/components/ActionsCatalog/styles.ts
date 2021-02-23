import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

export default makeStyles({
  actionsCatalogContainer: {
    backgroundColor: config.palette.background.default,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: '40px auto',
    maxWidth: '900px',
    /* This outline (and its offset) allows us to hide every catalog entry's
    outermost border. It should always be of the same color as the background. */
    outline: `5px solid ${config.palette.background.default}`,
    outlineOffset: '-2.5px',
  },

  actionsCatalogEntry: {
    /* This outline sets the color of every catalog entry's innermost borders. */
    outline: `1px solid ${config.palette.newGreyScales['100']}`,
    textAlign: 'center',
    width: '300px',

    '& > img': {
      height: '100px',
      paddingTop: '20px',
      width: '100px',
    },

    '& > p': {
      color: config.palette.label,
      fontSize: '16px',
      fontWeight: 300,
      paddingBottom: '65px',
      textAlign: 'center',
    },
  },

  actionsCatalogEntryLink: {
    textDecoration: 'none',
  },

  disabledAction: {
    filter: 'grayscale(1)',
    opacity: 0.5,
  },
})
