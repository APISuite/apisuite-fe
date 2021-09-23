import React from "react";
import { Grid } from "@apisuite/fe-base";
import { Markdown } from "components/Markdown";
import { PageContainer } from "components/PageContainer";

export const Documentation: React.FC = () => {
  return (
    <PageContainer>
      <Grid alignContent="center" alignItems="center" container justify="center">
        <Grid item md={12}>
          <Markdown page="documentation" />
        </Grid>
      </Grid>
    </PageContainer>
  );
};
