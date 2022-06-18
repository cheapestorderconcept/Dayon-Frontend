import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";

import dynamic from "next/dynamic";

import { Transfer_Report_Form } from "src/components/reporting/transfer-report";
import { COMPANY_NAME } from "src/utils/company_details";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const TransferReport = () => (
  <>
    <Head>
      <title>Reporting| {COMPANY_NAME}</title>
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
        <Transfer_Report_Form />
      </Container>
    </Box>
  </>
);

TransferReport.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default TransferReport;
