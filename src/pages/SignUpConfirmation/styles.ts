import { makeStyles } from "@apisuite/fe-base";
import celebration from "assets/celebration.svg";

const useStyles = makeStyles(() => ({
  close: {
    cursor: "pointer",
  },

  logo: {
    alignItems: "center",
    cursor: "pointer",
    display: "flex",
  },

  imageSideContentContainer: {
    backgroundImage: "url(" + celebration + ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 8.5% 100%)",
    width: "45%",

    "@media (min-width: 1100px)": {
      width: "50%",
    },

    "@media (min-width: 1280px)": {
      width: "55%",
    },
  },
}));

export default useStyles;
