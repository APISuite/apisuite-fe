import React from "react";
import { Grid, useTranslation } from "@apisuite/fe-base";
import { useParams } from "react-router-dom";
import { Markdown } from "components/Markdown";
import { PageContainer } from "components/PageContainer";

export const MarkdownPages: React.FC = () => {
  const { page } = useParams<{ page: string }>();

  const [t] = useTranslation();

  return (
    <PageContainer>
      <Grid alignContent="center" alignItems="center" container justify="center">
        <Grid item md={12}>
          <Markdown page={page} defaultValue={t("pages.default")} />
        </Grid>
      </Grid>
    </PageContainer>
  );
};
