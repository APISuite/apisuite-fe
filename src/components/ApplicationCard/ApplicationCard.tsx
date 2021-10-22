import React, { useState } from "react";
import {
  useTheme,
  Box,
  Card,
  CardContent,
  Icon,
} from "@apisuite/fe-base";
import { ApplicationCardProps } from "./types";

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  media,
  cardContent,
  children,
  className,
  contentStyle,
  icon="",
  onClick,
}) => {
  const { palette, spacing } = useTheme();
  const [isOver, setOver] = useState(false);

  return (
    <Card
      className={className}
      style={{ cursor: "pointer" }}
      onClick={onClick ? onClick : () => {
        //do nothing
      }}
      onMouseOver={() => {
        setOver(true);
      }}
      onMouseLeave={() => {
        setOver(false);
      }}
      elevation={ isOver ? 8 : 1 }
    >
      {
        icon && <Box position="relative">
          <Box right="0" position="absolute">
            <Icon style={{ color: isOver ? palette.grey["700"] : palette.label }}>{icon}</Icon>
          </Box>
        </Box>
      }
      {media}

      <CardContent className={contentStyle} style={{ padding: spacing(3) }}>
        {cardContent || children}
      </CardContent>
    </Card>
  );
};
