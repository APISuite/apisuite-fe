import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  dataToShowContentContainer: {
    margin: "0px auto",
    maxWidth: "900px",
    width: "100%",
  },

  infoBox: {
    alignItems: "center",
    backgroundColor: theme.palette.info.light,
    borderRadius: `${theme.shape.borderRadius}px`,
    display: "flex",
    height: "75px",
    marginLeft: "auto",
    textAlign: "left",
    width: "435px",
  },

  infoBoxIcon: {
    fill: "#46B5EF",
    transform: "translate(7px, -17.5px)",
  },

  infoBoxText: {
    color: "#035E86",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "18px",
    margin: "0px 10px 0px 15px",
  },

  noDataToShowImage: {
    filter: "grayscale(100%)",
    height: "185px",
    opacity: 0.35,
  },

  noDataToShowImageContainer: {
    marginBottom: "40px",
  },

}));
