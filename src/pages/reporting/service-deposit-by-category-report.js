import { Box, Container } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useSnackbar } from "notistack";
import { useContext } from "react";
import { ServiceDepositByCategoryReportForm } from "src/components/reporting/service-deposit-by-category-report-form";
import { Store } from "src/statesManagement/store/store";
import { COMPANY_NAME } from "src/utils/company_details";
import { DashboardLayout } from "../../components/dashboard-layout";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const ServiceDepositByCategory = () => {
  const { dispatch, state } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <Head>
        <title>Services Deposit By Category Report| {COMPANY_NAME}</title>
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
          <ServiceDepositByCategoryReportForm />
        </Container>
      </Box>
    </>
  );
};

ServiceDepositByCategory.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ServiceDepositByCategory;
