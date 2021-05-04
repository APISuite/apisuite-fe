import React from "react";
import { NavMenuProps } from "./types";
import useStyles from "./styles";
import Scrollspy from "react-scrollspy";

const NavMenu: React.FC<NavMenuProps> = ({ options }) => {
  const classes = useStyles();

  const getItems = () => {
    const items = [];
    for (let indx = 0; indx < options.length; indx++) {
      items.push(`step-${indx + 1}`);
    }
    return items;
  };

  return (
    <Scrollspy offset={170} items={getItems()} currentClassName={classes.selected}>
      {options.map((option, indx) => (
        <div
          className={classes.menuItem}
          key={indx}
        >
          <a href={`#step-${indx + 1}`}>{option}</a>
        </div>
      ))}
    </Scrollspy>
  );
};

export default NavMenu;
