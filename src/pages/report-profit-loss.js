import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";

import dynamic from "next/dynamic";

import { Profit_LossReport_Form } from "src/components/reporting/profit-loss-report";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const ProfitLossReport = () => (
  <>
    <Head>
      <title>Reporting| 18A Nigerial Limited</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2,
      }}
    >
      <DynamicComponentWithNoSSR />
      <Container maxWidth={true}>
        <Profit_LossReport_Form />
      </Container>
    </Box>
  </>
);

ProfitLossReport.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ProfitLossReport;
