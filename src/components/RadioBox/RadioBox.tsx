import React from "react";
import { Box, FormControlLabel, Radio, Typography, useTheme } from "@apisuite/fe-base";
import clsx from "clsx";
import { RadioBoxProps } from "./types";
import useStyles from "./styles";

export const RadioBox: React.FC<RadioBoxProps> = ({
  description,
  disabled = false,
  isChecked,
  label,
  value,
  onClick,
}) => {
  const classes = useStyles();
  const { palette } = useTheme();

  return (
    <Box
      className={clsx(classes.radioBox, {[classes.enabled]: !disabled})}
      m={1}
      onClick={!disabled ? onClick : undefined}
    >
      <FormControlLabel
        control={<Radio color="primary" />}
        checked={isChecked()}
        disabled={disabled}
        label={label}
        labelPlacement="end"
        value={value}
      />
      {description && <Box mb={1} ml={4} mr={2}>
        <Typography
          style={{ color: !disabled ? palette.label : palette.grey[200] }}
          variant="caption"
        >
          {description}
        </Typography>
      </Box>}
    </Box>
  );
};
