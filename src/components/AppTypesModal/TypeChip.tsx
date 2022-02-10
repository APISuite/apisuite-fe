import React from "react";
import { Box, Chip, Icon, useConfig, useTranslation } from "@apisuite/fe-base";
import { AppTypesModal } from "components/AppTypesModal";
import useStyles from "./styles";
import { TypeChipProps } from "./types";

export const TypeChip: React.FC<TypeChipProps> = ({
  color,
  editable = false,
  type,
  onTypeSelected,
}) => {
  const classes = useStyles();
  const { portalName } = useConfig();
  const { t } = useTranslation();
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <Box display="flex">
      <Chip
        className={classes.chip}
        color={color}
        label={t(`appTypes.modal.${type.type}App.label`)}
        size="small"
      />
      {
        editable &&
        <Icon
          className={classes.edit}
          color="secondary"
          onClick={() => setOpen(true)}
        >
          edit
        </Icon>
      }
      <AppTypesModal
        open={open}
        showLogo={false}
        title={portalName}
        type={type}
        onClose={() => setOpen(false)}
        onClick={(selection) => {
          if (selection) {
            onTypeSelected(selection);
            setOpen(false);
          }
        }}
      />
    </Box>
  );
};
