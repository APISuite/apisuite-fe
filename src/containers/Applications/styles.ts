import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
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

  clientApplicationCardImage: {
    borderRadius: '50%',
    fontSize: '20px',
    fontWeight: 300,
    height: '120px',
    margin: '20px auto',
    width: '120px',
  },

  clientApplicationCardBottomSection: {
    backgroundColor: '#F5F5F5',
    border: `1px solid ${theme.palette.label}`,
    borderRadius: '4px',
    borderTop: 'none',
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    padding: '12px 24px 24px 24px',
  },

  clientApplicationCardDescription: {
    color: theme.palette.grey[400],
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

  clientApplicationCardWithAvatarIcon: {
    color: theme.palette.label,
    fontSize: '30px',
    position: 'absolute',
    transform: 'translate(105px, 10px) rotate(45deg)',
  },

  clientApplicationCardWithImageIcon: {
    color: theme.palette.label,
    fontSize: '30px',
    position: 'absolute',
    transform: 'translate(165px, 10px) rotate(45deg)',
  },

  clientApplicationCardStatus: {
    display: 'flex',
  },

  clientApplicationCardStatusText: {
    color: theme.palette.label,
    fontSize: '14px',
    fontWeight: 300,
    textAlign: 'left',
  },

  clientApplicationCardTitle: {
    color: theme.palette.primary.main,
    fontSize: '22px',
    fontWeight: 400,
    marginBottom: '12px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  clientApplicationCardTopSection: {
    backgroundColor: theme.palette.grey[50],
    border: `1px solid ${theme.palette.label}`,
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
    borderRadius: '4px',
    textAlign: 'center',
  },

  clientApplicationCardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  clientApplicationsContentContainer: {
    margin: '0px auto',
    maxWidth: '900px',
    padding: '40px 0px 20px 0px',
    width: '100%',
  },

  clientApplicationsSubtitle: {
    color: theme.palette.grey[400],
    fontSize: '16px',
    fontWeight: 300,
    marginBottom: '24px',
  },

  clientApplicationsTitle: {
    color: theme.palette.primary.main,
    fontSize: '32px',
    fontWeight: 300,
    marginBottom: '12px',
  },

  draftClientApplicationCardStatusIcon: {
    color: theme.palette.label,
    fontSize: '14px',
    marginRight: '12px',
  },

  firstUseButton: {
    backgroundColor: theme.palette.secondary.main,
    color: `${theme.palette.secondary.contrastText} !important`,
    padding: '12px 21px',
    textDecoration: 'none',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
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
    color: `${theme.palette.grey[300]} !important`,
  },

  knowledgeBaseCard: {
    backgroundColor: theme.palette.secondary.contrastText,
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
    color: theme.palette.grey[400],
    fontSize: '16px',
    fontWeight: 300,
    lineHeight: '21.5px',
  },

  knowledgeBaseCardIcon: {
    color: theme.palette.label,
    fontSize: '25px',
    position: 'absolute',
    transform: 'translate(362.5px, -10px)',
  },

  knowledgeBaseCardImage: {
    marginBottom: '15px',
  },

  knowledgeBaseCardTitle: {
    color: theme.palette.secondary.main,
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
    color: theme.palette.action.active,
    fontSize: '24px',
    fontWeight: 500,
    margin: '0px auto 24px auto',
    maxWidth: '900px',
    width: '100%',
  },

  loadingClientApplicationCards: {
    color: theme.palette.grey[400],
    fontSize: '16px',
    fontWeight: 200,
  },

  registerClientApplicationCard: {
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    border: `1px solid ${theme.palette.label}`,
    borderRadius: '4px',
    display: 'flex',
    height: '331.5px',
    marginBottom: '25px',
    width: '285px',
  },

  registerClientApplicationCardButton: {
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.label}`,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    color: `${theme.palette.action.active} !important`,
    fontSize: '16px',
    fontWeight: 500,
    margin: '0px auto',
    padding: '6px 21px',
    textDecoration: 'none',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },
  },

  subscribedClientApplicationCardStatusIcon: {
    color: theme.palette.primary.main,
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
    fill: theme.palette.warning.main,
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
