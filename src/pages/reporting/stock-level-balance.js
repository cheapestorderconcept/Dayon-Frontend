import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";

import dynamic from "next/dynamic";
import { Deposit_Report_Form } from "src/components/reporting/deposit-report-form";
import { Out_Of_Report_Form } from "src/components/reporting/out-of-stock-report-form";
import { Stock_level_Balance_Form } from "src/components/reporting/stock-level-summary-balance";
import { COMPANY_NAME } from "src/utils/company_name";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const StockLevelBalance = () => (
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
        <Stock_level_Balance_Form />
      </Container>
    </Box>
  </>
);

StockLevelBalance.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default StockLevelBalance;
