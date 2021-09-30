import React from "react";
import { Grid, useTranslation } from "@apisuite/fe-base";
import { Markdown } from "components/Markdown";
import { PageContainer } from "components/PageContainer";

export const Documentation: React.FC = () => {

  const [t] = useTranslation();

  return (
    <PageContainer>
      <Grid alignContent="center" alignItems="center" container justify="center">
        <Grid item md={12}>
          <Markdown page="documentation" defaultValue={t("dashboardTab.documentation.default")} />
        </Grid>
      </Grid>
    </PageContainer>
  );
};
