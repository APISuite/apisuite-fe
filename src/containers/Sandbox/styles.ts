import { makeStyles } from '@apisuite/fe-base'

export default makeStyles((theme) => ({
  // General JSS

  root: {
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    paddingBottom: 45,
    width: '100%',
  },

  section: {
    maxWidth: 900,
    margin: '0 auto',
  },

  sectionIntroHeading: {
    color: theme.palette.secondary.main,
    fontSize: '32px',
    fontWeight: 300,
    margin: '40px 0px',
  },

  sectionSeparator: {
    border: `1px solid ${theme.palette.grey['300']}`,
    borderRadius: theme.palette.dimensions.borderRadius,
    maxWidth: '900px',
    width: '100%',
  },

  // JSS for the 'Slideshow' section

  slideShowSectionContainer: {
    height: '670px',
    marginBottom: '-280px',
    transform: 'translateY(-300px)',
  },

  // JSS for the 'Steps' section

  individualStepsContainer: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'row',
  },

  individualStepsDivider: {
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },

  individualStep: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 18px',
    width: '200px',

    '& > h1': {
      fontSize: '42px',
      fontWeight: '700',
      marginBottom: '30px',
    },

    '& > h3': {
      marginBottom: '20px',
      fontSize: '20px',
      fontWeight: 300,
      textAlign: 'center',
    },

    '& > p': {
      color: theme.palette.grey[400],
      fontSize: '14px',
      height: '100px',
      lineHeight: '18px',
      textAlign: 'center',
      marginBottom: '55px',

      '& > span': {
        display: 'block',
        margin: '0px 0px 15px 0px',
      },
    },
  },

  individualStepButton: {
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    color: theme.palette.background.default,
    fontSize: '16px',
    fontWeight: 500,
    textTransform: 'inherit',
    width: '100%',

    '&:active, &:hover, &:link, &:visited': {
      backgroundColor: theme.palette.secondary.main,
      borderColor: theme.palette.secondary.main,
      borderRadius: `${theme.palette.dimensions.borderRadius}px`,
      color: theme.palette.background.default,
    },

    '&.MuiButton-root.Mui-disabled': {
      backgroundColor: theme.palette.grey[300],
      borderColor: theme.palette.grey[300],
      borderRadius: `${theme.palette.dimensions.borderRadius}px`,
      color: theme.palette.background.default,
    },
  },

  stepsSectionContainer: {
    display: 'block',
    margin: '0 auto 40px auto',
    maxWidth: '900px',
    width: '100%',
  },

  stepsDescriptionContainerOne: {
    display: 'block',
    marginRight: '40px',
    maxWidth: '260px',
    width: '100%',
  },

  stepsDescriptionContainerTwo: {
    display: 'block',
    maxWidth: '600px',
    width: '100%',
  },

  stepsDescriptionContactSupportButton: {
    backgroundColor: theme.palette.warning.main,
    borderColor: theme.palette.warning.main,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    color: theme.palette.background.default,
    fontSize: '16px',
    fontWeight: 500,
    textTransform: 'inherit',
    width: '160px',

    '&:active, &:hover, &:link, &:visited': {
      backgroundColor: theme.palette.warning.main,
      borderColor: theme.palette.warning.main,
      borderRadius: `${theme.palette.dimensions.borderRadius}px`,
      color: theme.palette.background.default,
    },
  },

  stepsDescriptionRegisterButton: {
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    color: theme.palette.background.default,
    fontSize: '16px',
    fontWeight: 500,
    textTransform: 'inherit',
    width: '135px',

    '&:active, &:hover, &:link, &:visited': {
      backgroundColor: theme.palette.secondary.main,
      borderColor: theme.palette.secondary.main,
      borderRadius: `${theme.palette.dimensions.borderRadius}px`,
      color: theme.palette.background.default,
    },
  },

  stepsSectionDescriptionsContainer: {
    display: 'flex',
    maxWidth: '900px',
    width: '100%',
  },

  stepsDescriptionHeading: {
    color: theme.palette.secondary.main,
    fontSize: '24px',
    fontWeight: 500,
    margin: '0px 0px 12px 0px',
  },

  stepsDescriptionParagraphOne: {
    color: theme.palette.action.active,
    fontSize: '20px',
    fontWeight: 200,
    margin: '12px 0px',
  },

  stepsDescriptionParagraphTwo: {
    color: theme.palette.grey[400],
    fontSize: '16px',
    fontWeight: 300,
    lineHeight: '20px',
    margin: '12px 0px',

    '& > span': {
      display: 'block',
      margin: '12px 0px',
    },
  },

  // JSS for the 'API Catalog' section

  apiCatalogContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  apiCatalogSectionContainer: {
    display: 'block',
    margin: '40px auto 20px auto',
    maxWidth: '900px',
    width: '100%',
  },

  // JSS for the 'notice'

  noticeContainer: {
    margin: '0px auto -30px auto',
    maxWidth: '900px',
  },
}))
