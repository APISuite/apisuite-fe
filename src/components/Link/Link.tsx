import React from "react";
import { Link as RouterLink, LinkProps } from "react-router-dom";

type LinkBehaviourProps = {
  externalTarget?: string,
} & LinkProps

const Link = React.forwardRef<any, LinkBehaviourProps>((
  {
    externalTarget = "_blank",
    href,
    to,
    ...props
  },
  ref,
) => {
  const destination = href || to;
  if (typeof destination === "string" && /^https?:\/\//.test(destination)) {
    return (
      <a
        target={externalTarget}
        href={destination}
        {...props as React.AnchorHTMLAttributes<HTMLAnchorElement>}
      >
        {props.children}
      </a>
    );
  } else {
    return (
      <RouterLink ref={ref} to={destination} {...props} />
    );
  }
});

export default Link;
