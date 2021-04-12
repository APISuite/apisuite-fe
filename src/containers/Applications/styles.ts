import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

export default makeStyles(({
  clientApplicationCard: {
    height: '331.5px',
    marginBottom: '15px',
    marginRight: '15px',
    width: '285px',

    '&:hover': {
      cursor: 'pointer',
      filter: 'drop-shadow(0px 2.5px 2.5px rgba(0, 0, 0, 0.25))',

      '& > :first-child': {
        '& > :first-child': {
          color: '#505F6F',
        },
      },
    },
  },

  clientApplicationCardAvatar: {
    background: '#C8DC8C linear-gradient(270deg, rgba(200, 220, 140, 1) 0%, rgba(25, 165, 140, 1) 100%)',
    fontSize: '20px',
    fontWeight: 300,
    height: '120px',
    margin: '24px auto',
    textTransform: 'uppercase',
    width: '120px',
  },

  clientApplicationCardBottomSection: {
    backgroundColor: '#F5F5F5',
    border: `1px solid ${config.palette.label}`,
    borderRadius: '4px',
    borderTop: 'none',
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    padding: '12px 24px 24px 24px',
  },

  clientApplicationCardDescription: {
    color: config.palette.newGreyScales['400'],
    display: '-webkit-box',
    fontSize: '16px',
    fontWeight: 300,
    height: '44.5px',
    lineHeight: '22px',
    marginBottom: '12px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2,
  },

  clientApplicationCardImage: {
    borderRadius: '50%',
    fontSize: '20px',
    fontWeight: 300,
    height: '120px',
    margin: '20px auto',
    width: '120px',
  },

  clientApplicationCardStatus: {
    display: 'flex',
  },

  clientApplicationCardStatusText: {
    color: config.palette.label,
    fontSize: '14px',
    fontWeight: 300,
    textAlign: 'left',
  },

  clientApplicationCardTitle: {
    color: config.palette.tertiary,
    fontSize: '22px',
    fontWeight: 400,
    marginBottom: '12px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  clientApplicationCardTopSection: {
    backgroundColor: config.palette.newGreyScales['25'],
    border: `1px solid ${config.palette.label}`,
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
    borderRadius: '4px',
    textAlign: 'center',
  },

  clientApplicationCardWithAvatarIcon: {
    color: config.palette.label,
    fontSize: '30px',
    position: 'absolute',
    transform: 'translate(105px, 10px) rotate(45deg)',
  },

  clientApplicationCardWithImageIcon: {
    color: config.palette.label,
    fontSize: '30px',
    position: 'absolute',
    transform: 'translate(165px, 10px) rotate(45deg)',
  },

  clientApplicationCardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  clientApplicationsContainerTitle: {
    color: '#14283C',
    fontSize: '24px',
    fontWeight: 400,
    marginBottom: '24px',
  },

  clientApplicationsContentContainer: {
    margin: '0px auto',
    maxWidth: '900px',
    padding: '40px 0px 20px 0px',
    width: '100%',
  },

  clientApplicationsSubtitle: {
    color: config.palette.newGreyScales['400'],
    fontSize: '16px',
    fontWeight: 300,
    marginBottom: '40px',
  },

  clientApplicationsTitle: {
    color: config.palette.tertiary,
    fontSize: '32px',
    fontWeight: 300,
    marginBottom: '12px',
  },

  draftClientApplicationCardStatusIcon: {
    color: config.palette.label,
    fontSize: '14px',
    marginRight: '12px',
  },

  firstUseButton: {
    backgroundColor: config.palette.primary,
    color: `${config.palette.primaryContrastText} !important`,
    padding: '12px 20px',
    textDecoration: 'none',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: config.palette.primary,
    },
  },

  firstUseButtonContainer: {
    marginBottom: '30px',
  },

  firstUseContentContainer: {
    margin: '70px auto',
    maxWidth: '900px',
    textAlign: 'center',
    width: '100%',
  },

  firstUseImage: {
    filter: 'grayscale(100%)',
    height: '185px',
    opacity: 0.35,
  },

  firstUseImageContainer: {
    marginBottom: '40px',
  },

  firstUseLink: {
    color: `${config.palette.newGreyScales['300']} !important`,
  },

  knowledgeBaseCard: {
    backgroundColor: config.palette.primaryContrastText,
    borderRadius: '4px',
    boxShadow: '1px 0px 10px 0px rgba(0, 0, 0, 0.05)',
    height: '310px',
    padding: '24px 40px 40px 40px',
    textDecoration: 'none',
    width: '440px',

    '&:hover': {
      cursor: 'pointer',
      filter: 'drop-shadow(0px 2.5px 2.5px rgba(0, 0, 0, 0.25))',

      '& > :first-child': {
        '& > :first-child': {
          color: '#505F6F',
        },
      },
    },
  },

  knowledgeBaseCardDescription: {
    color: config.palette.newGreyScales['400'],
    fontSize: '16px',
    fontWeight: 300,
    lineHeight: '21.5px',
  },

  knowledgeBaseCardIcon: {
    color: config.palette.label,
    fontSize: '25px',
    position: 'absolute',
    transform: 'translate(362.5px, -10px)',
  },

  knowledgeBaseCardImage: {
    marginBottom: '15px',
  },

  knowledgeBaseCardTitle: {
    color: config.palette.primary,
    fontSize: '24px',
    fontWeight: 500,
    marginBottom: '20px',
  },

  knowledgeBaseCardsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0px auto',
    maxWidth: '900px',
    width: '100%',
  },

  knowledgeBaseContentContainer: {
    backgroundColor: '#F5F5F5',
    padding: '24px 60px 80px 60px',
    width: '100%',
  },

  knowledgeBaseTitle: {
    color: config.palette.active,
    fontSize: '24px',
    fontWeight: 500,
    margin: '0px auto 24px auto',
    maxWidth: '900px',
    width: '100%',
  },

  loadingClientApplicationCards: {
    color: config.palette.newGreyScales['400'],
    fontSize: '16px',
    fontWeight: 200,
  },

  registerNewClientApplicationCardButton: {
    backgroundColor: config.palette.primary,
    border: `1px solid ${config.palette.primary}`,
    borderRadius: `${config.dimensions.borderRadius}px`,
    color: `${config.palette.primaryContrastText} !important`,
    fontSize: '16px',
    fontWeight: 500,
    marginBottom: '40px',
    padding: '6px 21px',
    textDecoration: 'none',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: config.palette.primary,
    },
  },

  subscribedClientApplicationCardStatusIcon: {
    color: config.palette.primary,
    fontSize: '14px',
    marginRight: '12px',
  },

  warningBox: {
    alignItems: 'center',
    backgroundColor: '#FFDCB9',
    borderRadius: '4px',
    display: 'flex',
    height: '40px',
    marginTop: '40px',
    textAlign: 'left',
  },

  warningBoxIcon: {
    fill: config.palette.warning,
    transform: 'translate(7px, 0px)',
  },

  warningBoxText: {
    color: '#80460B',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '18px',
    margin: '0px 10px 0px 15px',
  },
}))
