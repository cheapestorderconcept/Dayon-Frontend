import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";

import dynamic from "next/dynamic";
import { Deposit_Report_Form } from "src/components/reporting/deposit-report-form";
import { COMPANY_NAME } from "src/utils/company_details";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const DepositReport = () => (
  <>
    <Head>
      <title>Reporting| {COMPANY_NAME} </title>
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
        <Deposit_Report_Form />
      </Container>
    </Box>
  </>
);

DepositReport.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default DepositReport;
