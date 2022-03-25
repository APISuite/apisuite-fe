import React, { useEffect, useState } from "react";
import { Box, Button, Icon, FormControl, RadioGroup, Trans, Typography, useTheme, useTranslation } from "@apisuite/fe-base";
import { useDispatch, useSelector } from "react-redux";
import Link from "components/Link";
import Notice from "components/Notice";
import { Overlay } from "components/Overlay";
import { RadioBox } from "components/RadioBox";
import { getAppTypes } from "store/applications/actions/getAppTypes";
import { AppType } from "store/applications/types";
import { typesSelector } from "./selector";
import { AppTypesModalProps } from "./types";

export const AppTypesModal: React.FC<AppTypesModalProps> = ({
  open,
  showLogo,
  title,
  type,
  onClose,
  onClick,
}) => {
  const { palette } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { types } = useSelector(typesSelector);
  const [value, setValue] = useState<AppType | null>(type || null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(JSON.parse(event.target.value) as AppType);
  };

  const resetValue = () => {
    setValue(type || null);
  };

  useEffect(() => {
    dispatch(getAppTypes({}));
  });

  useEffect(() => {
    const filteredTypes = types.filter((element) => element.type !== "blueprint" && (element.type === "client" || element.enabled));
    if (filteredTypes.length === 1) {
      setValue(filteredTypes[0]);
      if (open) {
        onClick(filteredTypes[0]);
      }
    }
  }, [types, open]);

  useEffect(() => {
    if (type) {
      setValue(type);
    }
  }, [type]);


  return (
    <Overlay
      open={open}
      showLogo={showLogo}
      title={title}
      onClose={() => {
        onClose();
      }}
    >
      <Box>
        <Box mb={2} mx={1}>
          <Typography variant="h3">{type ? t("appTypes.modal.titleEdit") : t("appTypes.modal.title")}</Typography>
        </Box>
        <Box mb={7} mx={1}>
          <Typography variant="caption">{t("appTypes.modal.subtitle")}</Typography>
        </Box>
        <Box mb={2}>
          <FormControl component="fieldset" style={{ display: "flex" }}>
            <RadioGroup
              aria-label="type"
              name="type"
              onChange={handleChange}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              value={value}
            >
              {
                types.map((tp, idx) => {
                  if (tp.type === "blueprint") return;
                  if (tp.type !== "client" && !tp.enabled ) return;
                  return (
                    <RadioBox
                      description={t(`appTypes.modal.${tp.type}App.description`)}
                      disabled={tp.id === type?.id || false}
                      key={`apptype-${tp.type}-${idx}`}
                      isChecked={() => JSON.stringify(tp) === JSON.stringify(value)}
                      label={t(`appTypes.modal.${tp.type}App.label`)}
                      onClick={() => setValue(tp)}
                      value={JSON.stringify(tp)}
                    />
                  );
                })
              }
            </RadioGroup>
          </FormControl>
        </Box>
        <Box mb={5} mt={1} mx={1}>
          <Notice
            noticeIcon={<Icon>{type && "error" || "info"}</Icon>}
            noticeText={
              <Typography variant="body2" display="block" style={{ color: type && palette.warning.dark || palette.info.dark }}>
                <Trans i18nKey={`appTypes.modal.${type && "warning" || "info"}Box`}>
                  {[
                    <Link
                      key="appTypes.modal.url"
                      to="https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/1929314305/App+Types"
                      rel='noopener noreferrer'
                      target='_blank'
                    />,
                  ]}
                </Trans>
              </Typography>
            }
            type={type && "warning" || "info"}
          />
        </Box>
        <Box alignItems="center" display="flex" justifyContent="space-between" mb={2}>
          <Box m={1}>
            <Button
              color="primary"
              disabled={!value}
              onClick={() => onClick(value)}
              variant="contained"
            >
              {type ? t("appTypes.modal.update") : t("appTypes.modal.next")}
            </Button>
          </Box>
          <Box m={1}>
            <Button
              color="secondary"
              onClick={() => {
                onClose();
                resetValue();
              }}
              variant="outlined"
            >
              {t("appTypes.modal.cancel")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Overlay>
  );
};
