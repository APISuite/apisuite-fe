import React, { FC } from "react";
import { Trans, Typography, useTheme } from "@apisuite/fe-base";
import Link from "components/Link";

export const ReCaptchaPrivacyCopy: FC = () => {
  const { palette } = useTheme();

  return (
    <Typography
      variant="caption"
      align="center"
      color="textSecondary"
    >
      <Trans i18nKey="reCaptcha.terms">
        {[
          <Link
            key="reCaptcha.privacy"
            to="https://policies.google.com/privacy"
            rel='noopener noreferrer'
            target='_blank'
            style={{ color: palette.info.main }}
          />,
          <Link
            key="reCaptcha.terms"
            to="https://policies.google.com/terms"
            rel='noopener noreferrer'
            target='_blank'
            style={{ color: palette.info.main }}
          />,
        ]}
      </Trans>
    </Typography>
  );
};
