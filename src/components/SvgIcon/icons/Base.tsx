import React from "react";

import { BaseSvgIconProps } from "../types";

const Base: React.FC<BaseSvgIconProps> = ({
  size = 16,
  name,
  color = "currentColor",
  style,
  children,
  ...rest
}) => {
  return (
    <svg
      width={size}
      height={size}
      fill={color}
      style={{ display: "block", ...style }}
      {...rest}
    >
      {children({
        width: size,
        height: size,
        color,
      })}
    </svg>
  );
};

export default Base;
