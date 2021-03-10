import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

export default makeStyles(({
  chip: {
    background: 'linear-gradient(270deg, #2DB7BA 0%, #14BC7D 100%)',
    borderRadius: 3,
    color: config.palette.background.default,
    display: 'flex',
    fontWeight: 400,
    margin: 4,
  },

  chips: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  clearIcon: {
    fill: 'rgba(255, 255, 255, 0.6)',
    height: 14,

    '&:hover': {
      fill: 'rgba(255, 255, 255, 1)',
      height: 18,
    },
  },

  dropdown: {
    cursor: 'pointer',
    display: 'flex',
    fontSize: 14,
    margin: 4,
    width: '100%',
  },

  icon: {
    cursor: 'pointer',
  },

  loading: {
    color: config.palette.primaryContrastText,
    opacity: 0.5,
  },

  subSelect: {
    alignItems: 'center',
    color: config.palette.greyScales[400],
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
}))
