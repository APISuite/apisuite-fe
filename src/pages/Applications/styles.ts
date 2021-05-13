import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  clientApplicationCard: {
    height: "331.5px",
    marginBottom: "15px",
    marginRight: "15px",
    width: "285px",

    "&:hover": {
      cursor: "pointer",
      filter: "drop-shadow(0px 2.5px 2.5px rgba(0, 0, 0, 0.25))",

      "& > :first-child": {
        "& > :first-child": {
          color: "#505F6F",
        },
      },
    },
  },

  clientApplicationCardAvatar: {
    background: theme.palette.gradient.light,
    fontSize: "20px",
    fontWeight: 300,
    height: "120px",
    margin: "24px auto",
    textTransform: "uppercase",
    width: "120px",
  },

  clientApplicationCardBottomSection: {
    backgroundColor: "#F5F5F5",
    border: `1px solid ${theme.palette.grey["300"]}`,
    borderRadius: theme.shape.borderRadius,
    borderTop: "none",
    borderTopLeftRadius: "0px",
    borderTopRightRadius: "0px",
    padding: "12px 24px 24px 24px",
  },

  clientApplicationCardDescription: {
    color: theme.palette.text.primary,
    display: "-webkit-box",
    fontSize: "16px",
    fontWeight: 300,
    height: "44.5px",
    lineHeight: "22px",
    marginBottom: "12px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "-webkit-box-orient": "vertical",
    "-webkit-line-clamp": 2,
  },

  clientApplicationCardImage: {
    borderRadius: "50%",
    fontSize: "20px",
    fontWeight: 300,
    height: "120px",
    margin: "20px auto",
    width: "120px",
  },

  clientApplicationCardStatus: {
    display: "flex",
  },

  clientApplicationCardStatusText: {
    color: theme.palette.label,
    fontSize: "14px",
    fontWeight: 300,
    textAlign: "left",
  },

  clientApplicationCardTitle: {
    color: theme.palette.secondary.main,
    fontSize: "22px",
    fontWeight: 400,
    marginBottom: "12px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  clientApplicationCardTopSection: {
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.grey["300"]}`,
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "0px",
    borderRadius: theme.shape.borderRadius,
    textAlign: "center",
  },

  clientApplicationCardWithAvatarIcon: {
    color: theme.palette.grey["300"],
    fontSize: "30px",
    position: "absolute",
    transform: "translate(105px, 10px) rotate(45deg)",
  },

  clientApplicationCardWithImageIcon: {
    color: theme.palette.grey["300"],
    fontSize: "30px",
    position: "absolute",
    transform: "translate(165px, 10px) rotate(45deg)",
  },

  clientApplicationCardsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  clientApplicationsContainerTitle: {
    color: "#14283C",
    fontSize: "24px",
    fontWeight: 400,
    marginBottom: "24px",
  },

  clientApplicationsContentContainer: {
    margin: "0px auto",
    maxWidth: "900px",
    padding: "0px 0px 20px 0px",
    width: "100%",
  },

  clientApplicationsSubtitle: {
    color: theme.palette.text.primary,
    fontSize: "16px",
    fontWeight: 300,
    marginBottom: "40px",
  },

  clientApplicationsTitle: {
    color: theme.palette.secondary.main,
    fontSize: "32px",
    fontWeight: 300,
    marginBottom: "12px",
  },

  draftClientApplicationCardStatusIcon: {
    color: theme.palette.label,
    fontSize: "14px",
    marginRight: "12px",
  },

  firstUseButton: {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.primary.contrastText} !important`,
    padding: "12px 21px",
    textDecoration: "none",

    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },

  firstUseButtonContainer: {
    marginBottom: "30px",
  },

  firstUseContentContainer: {
    margin: "70px auto",
    maxWidth: "900px",
    textAlign: "center",
    width: "100%",
  },

  firstUseImage: {
    filter: "grayscale(100%)",
    height: "185px",
    opacity: 0.35,
  },

  firstUseImageContainer: {
    marginBottom: "40px",
  },

  firstUseLink: {
    color: `${theme.palette.label} !important`,
  },

  hasNoUserAppsButHasMarketplaceAppSubsContainer: {
    textAlign: "left",
  },

  knowledgeBaseCard: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: "1px 0px 10px 0px rgba(0, 0, 0, 0.05)",
    height: "310px",
    padding: "24px 40px 40px 40px",
    textDecoration: "none",
    width: "440px",

    "&:hover": {
      cursor: "pointer",
      filter: "drop-shadow(0px 2.5px 2.5px rgba(0, 0, 0, 0.25))",

      "& > :first-child": {
        "& > :first-child": {
          color: "#505F6F",
        },
      },
    },
  },

  knowledgeBaseCardDescription: {
    color: theme.palette.text.primary,
    fontSize: "16px",
    fontWeight: 300,
    lineHeight: "21.5px",
  },

  knowledgeBaseCardIcon: {
    color: theme.palette.label,
    fontSize: "25px",
    position: "absolute",
    transform: "translate(362.5px, -10px)",
  },

  knowledgeBaseCardImage: {
    marginBottom: "15px",
  },

  knowledgeBaseCardTitle: {
    color: theme.palette.primary.main,
    fontSize: "24px",
    fontWeight: 500,
    marginBottom: "20px",
  },

  knowledgeBaseCardsContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0px auto",
    maxWidth: "900px",
    width: "100%",
  },

  knowledgeBaseContentContainer: {
    backgroundColor: "#F5F5F5",
    padding: "24px 60px 80px 60px",
    width: "100%",
  },

  knowledgeBaseTitle: {
    color: theme.palette.action.active,
    fontSize: "24px",
    fontWeight: 500,
    margin: "0px auto 24px auto",
    maxWidth: "900px",
    width: "100%",
  },

  loadingClientApplicationCards: {
    color: theme.palette.text.primary,
    fontSize: "16px",
    fontWeight: 200,
  },

  pageContentsContainer: {
    padding: "210px 0px 0px 0px",
  },

  registerNewClientApplicationCardButton: {
    backgroundColor: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: `${theme.shape.borderRadius}px`,
    color: `${theme.palette.primary.contrastText} !important`,
    fontSize: "16px",
    fontWeight: 500,
    marginBottom: "40px",
    padding: "6px 21px",
    textDecoration: "none",

    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },

  sectionSeparator: {
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: theme.shape.borderRadius,
    margin: "25px 0px",
    width: "100%",
  },

  subscribedClientApplicationCardStatusIcon: {
    color: theme.palette.primary.main,
    fontSize: "14px",
    marginRight: "12px",
  },

  warningBox: {
    alignItems: "center",
    backgroundColor: "#FFDCB9",
    borderRadius: `${theme.shape.borderRadius}px`,
    display: "flex",
    height: "40px",
    marginTop: "40px",
    textAlign: "left",
  },

  warningBoxIcon: {
    fill: theme.palette.warning.main,
    transform: "translate(7px, 0px)",
  },

  warningBoxText: {
    color: "#80460B",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "18px",
    margin: "0px 10px 0px 15px",
  },
}));
