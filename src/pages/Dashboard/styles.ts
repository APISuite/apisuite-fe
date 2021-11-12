import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  expandedHeaderImageSection: {
    backgroundColor: theme.palette.background.default,
    backgroundPosition: "center -320px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    // FIXME: this should be in sync with the transparent navigation no?
    height: 300,
    position: "absolute",
    top: 0,
    transition: "height 0.5s",
    width: "100%",
  },

  regularHeaderImageSection: {
    backgroundColor: theme.palette.background.default,
    backgroundPosition: "center -320px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    // FIXME: this should be in sync with the transparent navigation no?
    height: 213,
    position: "absolute",
    top: 0,
    transition: "height 0.5s",
    width: "100%",
  },

  // JSS for the 'Notification cards' section

  customNotificationCardButton: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: `${theme.shape.borderRadius}px`,
    boxShadow: "none",
    color: theme.palette.primary.contrastText,
    cursor: "pointer",
    display: "inline-block",
    fontSize: "16px",
    fontWeight: 600,
    padding: "12px 20px",
    position: "relative",
    textAlign: "center",
    textDecoration: "none",

    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },

    "&:link, &:visited": {
      color: theme.palette.primary.contrastText,
    },
  },

  notificationCardSection: {
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -90.75px)",
    width: "100%",
  },

  // JSS for the 'Actions Catalog' section

  actionsCatalogSectionWithNotificationCards: {
    marginBottom: "40px",
    marginTop: "80px",
    transition: "margin 0.5s",
  },

  actionsCatalogSectionWithoutNotificationCards: {
    marginBottom: "40px",
    marginTop: "-80px",
    transition: "margin 0.5s",
  },

  sectionIntroHeading: {
    color: theme.palette.secondary.main,
    fontSize: "32px",
    fontWeight: 300,
    margin: "40px 0px",
  },

  // JSS for the notice

  noticeContainer: {
    margin: "0px auto -30px auto",
    maxWidth: "900px",
  },

  // JSS for the notification banner

  customNotificationBannerParagraph: {
    color: theme.palette.primary.contrastText,
  },
}));
