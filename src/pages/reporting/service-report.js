import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { AddSales } from "src/components/sales/add-sales";
import dynamic from "next/dynamic";
import { SalesReportForm } from "src/components/reporting/sales-report-form";
import { useContext, useEffect } from "react";
import { getSalesReport } from "src/statesManagement/store/actions/reportingActions/sales-report-action";
import { Store } from "src/statesManagement/store/store";
import { useSnackbar } from "notistack";
import { COMPANY_NAME } from "src/utils/company_details";
import { ServicesReportForm } from "src/components/reporting/service-report-form";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const ServicesReport = () => {
  const { dispatch, state } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <Head>
        <title>Services Report| {COMPANY_NAME}</title>
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
          <ServicesReportForm />
        </Container>
      </Box>
    </>
  );
};

ServicesReport.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ServicesReport;
