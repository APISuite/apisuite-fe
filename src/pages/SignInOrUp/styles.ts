import { makeStyles } from "@apisuite/fe-base";
import rocketMan from "assets/rocketMan.svg";

const useStyles = makeStyles(() => ({
  close: {
    cursor: "pointer",
  },
  imageSideContentContainer: {
    backgroundImage: "url(" + rocketMan + ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 8.5% 100%)",
  },
  logo: {
    alignItems: "center",
    cursor: "pointer",
    display: "flex",
  },
}));

export default useStyles;
