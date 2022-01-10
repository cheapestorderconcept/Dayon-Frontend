import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";

import dynamic from "next/dynamic";
import { Deposit_Report_Form } from "src/components/reporting/deposit-report-form";
import { Out_Of_Report_Form } from "src/components/reporting/out-of-stock-report-form";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const OutOfStockReport = () => (
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
        <Out_Of_Report_Form />
      </Container>
    </Box>
  </>
);

OutOfStockReport.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default OutOfStockReport;
