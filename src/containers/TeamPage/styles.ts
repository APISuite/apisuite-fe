import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'

export default makeStyles(({
  teamPageContentContainer: {
    maxWidth: 900,
    margin: '0 auto',
  },
  teamPageTitle: {
    fontSize: '32px',
    fontWeight: 300,
    marginBottom: '12px',
  },

  teamMembersTable: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #BAC0C6',
    borderRadius: config.dimensions.borderRadius,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflow: 'hidden',
  },

  tableHeader: {
    width: '100%',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 40px',
    flexDirection: 'row',
    justifyContent: 'space-between',

    '& > :first-child': {
      color: '#51606E',
      fontSize: '16px',
      fontWeight: 400,
    },
  },

  evenTableRow: {
    display: 'flex',
    height: '60px',
    padding: '10px 40px',
    justifyContent: 'space-between',
    width: '100%',
    borderTop: '1px solid #ECEDEF',
    backgroundColor: '#F7F8F9',
  },

  oddTableRow: {
    display: 'flex',
    height: '60px',
    padding: '10px 40px',
    justifyContent: 'space-between',
    width: '100%',
    borderTop: '1px solid #ECEDEF',
    backgroundColor: '#FFFFFF',
  },

  userStatus: {
    fontSize: '12px',
    fontWeight: 300,
    color: '#85909A',
    marginTop: '-10px',
  },

  userRoleSelector: {
    width: '240px',
    borderColor: config.palette.label,

    // Selector
    '& > .MuiFormControl-root': {
      // Selector's label
      '& > .MuiFormLabel-root': {
        color: config.palette.label,
      },

      // Selector's input (i.e., text)
      '& > .MuiInputBase-root': {
        padding: '0px',
        height: '40px',

        '& > .MuiInputBase-input': {
          color: '#85909A',
          fontSize: '14px',
          fontWeight: 300,
          paddingLeft: '12px',
        },
      },
    },
  },

  userName: {
    color: '#51606E',
    fontSize: '16px',
    fontWeight: 400,
  },

  toggleInvitationCardButton: {
    backgroundColor: config.palette.primary,
    borderRadius: config.dimensions.borderRadius,
    color: config.palette.primaryContrastText,
    fontSize: '16px',
    fontWeight: 500,
    padding: '12px 20px',
    textTransform: 'none',
    maxWidth: '180px',
    width: '100%',
    height: '40px',

    '&:hover': {
      backgroundColor: config.palette.primary,
    },
  },

  enabledInviteToTeamButton: {
    backgroundColor: config.palette.primary,
    borderRadius: config.dimensions.borderRadius,
    color: config.palette.primaryContrastText,
    fontSize: '16px',
    fontWeight: 500,
    padding: '12px 20px',
    textTransform: 'none',
    maxWidth: '150px',
    width: '100%',
    height: '40px',
    marginRight: '16px',

    '&:hover': {
      backgroundColor: config.palette.primary,
    },
  },

  disabledInviteToTeamButton: {
    backgroundColor: '#99e6cc',
    borderRadius: config.dimensions.borderRadius,
    color: config.palette.primaryContrastText,
    fontSize: '16px',
    fontWeight: 500,
    padding: '12px 20px',
    textTransform: 'none',
    maxWidth: '150px',
    width: '100%',
    pointerEvents: 'none',
    height: '40px',
    marginRight: '16px',

    '&:hover': {
      backgroundColor: '#99e6cc',
    },
  },

  invitationCardOuterContainerWithoutErrors: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    borderRadius: config.dimensions.borderRadius,
    backgroundColor: '#FFFFFF',
    border: `1px solid ${config.palette.greyScales[300]}`,
    height: '80px',
    marginBottom: '25px',
    padding: '0px 16px',
  },

  invitationCardOuterContainerWithErrors: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    borderRadius: config.dimensions.borderRadius,
    backgroundColor: '#FFFFFF',
    border: `1px solid ${config.palette.greyScales[300]}`,
    height: '100px',
    marginBottom: '25px',
    padding: '0px 16px',
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
  loading: {
    position: 'relative',
    top: 4,
    color: 'white',
    opacity: 0.5,
  },
  loadingSpinnerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50px',
  },
  errorPlaceholder: {
    display: 'flex',
    marginTop: 10,
  },
  errorAlert: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: config.palette.feedback.error,
    border: 'solid',
    borderWidth: 1,
    borderColor: config.palette.feedback.error,
    fontSize: 13,
    color: '#FFF',
    padding: '2px 15px',
    borderRadius: config.dimensions.borderRadius,
    minHeight: 20,
  },

  // ---

  teamPageSubtitle: {
    color: '#85909A',
    fontSize: '16px',
    fontWeight: 300,
    marginBottom: '24px',
  },

  rightMostPart: {
    color: '#85909A',
    display: 'flex',
    flexDirection: 'row',

    '& > :first-child': {
      fontSize: '16px',
      fontWeight: 300,
    },

    '& > :last-child': {
      fontSize: '16px',
      fontWeight: 300,
      paddingLeft: '30px',
    },
  },

  userNameAndStatusContainer: {
    maxWidth: '400px',
    width: '100%',
    alignSelf: 'center',
  },

  ableToInviteContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '25px 0px',
    height: '55px',
  },

  unableToInviteContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: '25px 0px',
    height: '55px',
  },

  linkToProfileContainer: {
    display: 'flex',
    color: '#85909A !important',
    textDecoration: 'none',
    alignItems: 'center',

    '& > :first-child': {
      border: '2px solid #85909A',
      borderRadius: '50%',
      width: '28px',
      height: '28px',
    },

    '& > :last-child': {
      marginLeft: '7.5px',
      fontSize: '18px',
      fontWeight: 400,
    },
  },

  sectionSeparator: {
    border: `1px solid ${config.palette.newGreyScales['100']}`,
    borderRadius: config.dimensions.borderRadius,
    marginBottom: '25px',
    marginTop: '0px',
    maxWidth: '900px',
    width: '100%',
  },

  userActivityTitle: {
    color: '#BAC0C6',
    fontSize: '22px',
    fontWeight: 300,
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

  roleSelectorAndOtherActionsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '40px',
  },

  otherActionsSelector: {
    color: '#51606E',
    margin: 'auto 12.5px auto 47.5px',
  },

  userRoleText: {
    color: '#85909A',
    fontSize: '16px',
    fontWeight: 300,
  },

  invitationCardInputField: {
    maxWidth: '220px',
    width: '100%',
    marginRight: '12px',

    // Text field's label styles
    '& > label': {
      color: config.palette.label,
      fontSize: '14px',
      fontWeight: 300,
      transform: 'translate(14px, 14px) scale(1)',
    },

    '& label.Mui-focused': {
      color: `${config.palette.primary} !important`,
    },

    // Text field's input outline styles
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: `${config.palette.greyScales['300']} !important`,
      },

      '&.Mui-focused fieldset': {
        borderColor: `${config.palette.primary} !important`,
      },
    },

    // Text field's input text styles
    '& .MuiInputBase-root': {
      height: '40px',

      '& .MuiInputBase-input': {
        color: config.palette.active,
      },
    },
  },

  invitationCardInnerContainer: {
    display: 'flex',
    width: '100%',
  },
}))
