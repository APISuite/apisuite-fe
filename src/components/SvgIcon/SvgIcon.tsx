import React from "react";
import iconPaths from "./iconPaths";
import Instagram from "./icons/Instagram";
import GitLab from "./icons/GitLab";

import { SvgIconProps } from "./types";

const icons: Record<string, any> = {
  instagram: Instagram,
  gitlab: GitLab,
};

const SvgIcon: React.FC<SvgIconProps> = ({
  size = 16,
  name,
  color = "currentColor",
  style,
  ...rest
}) => {
  if (iconPaths[name]) {
    return (
      <svg
        width={size}
        height={size}
        fill={color}
        viewBox='0 0 24 24'
        style={{ display: "block", ...style }}
        {...rest}
      >
        <path d={iconPaths[name]} />
      </svg>
    );
  } else if (icons[name]) {
    const Component = icons[name];
    return (
      <Component
        size={size}
        color={color}
        style={{ display: "block", ...style }}
        {...rest}
      />
    );
  }
  return null;
};

export default SvgIcon;
