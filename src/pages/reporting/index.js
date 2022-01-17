import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { AddSales } from "src/components/sales/add-sales";
import dynamic from "next/dynamic";
import { SalesReportForm } from "src/components/reporting/sales-report-form";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const SalesReport = () => (
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
        <SalesReportForm />
      </Container>
    </Box>
  </>
);

SalesReport.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default SalesReport;
