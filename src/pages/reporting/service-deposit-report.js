import { Box, Container } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useSnackbar } from "notistack";
import { useContext } from "react";
import { ServicesDepositReportForm } from "src/components/reporting/service-deposit-report-form";
import { Store } from "src/statesManagement/store/store";
import { COMPANY_NAME } from "src/utils/company_details";
import { DashboardLayout } from "../../components/dashboard-layout";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const ServiceDepositReport = () => {
  const { dispatch, state } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <Head>
        <title>Services Deposit Report| {COMPANY_NAME}</title>
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
          <ServicesDepositReportForm  />
        </Container>
      </Box>
    </>
  );
};

ServiceDepositReport.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ServiceDepositReport;
