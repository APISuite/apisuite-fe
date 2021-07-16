import React from "react";
import { Fade, Theme, Tooltip, withStyles } from "@apisuite/fe-base";

import { CustomizableTooltipProps } from "./types";

export const CustomizableTooltip: React.FC<CustomizableTooltipProps> = ({
  children,
  tooltipContent,
}) => {
  /* Tooltip's styling (the 'Tooltip' component seems to have issues with
  class names and inline styles, so we do this styled 'Tooltip' cast). */
  const StyledTooltip = withStyles((theme: Theme) => ({
    arrow: {
      color: theme.palette.info.light,
    },

    tooltip: {
      backgroundColor: theme.palette.info.light,
      color: theme.palette.info.dark,
      padding: theme.spacing(0, 1.5),
    },
  }))(Tooltip);

  return (
    <StyledTooltip
      arrow
      title={tooltipContent}
      TransitionComponent={Fade}
    >
      {children}
    </StyledTooltip>
  );
};
