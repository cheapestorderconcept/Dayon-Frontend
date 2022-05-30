import { Box, Container } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useSnackbar } from "notistack";
import { useContext, useEffect } from "react";
import { ServiceByCategoryReportForm } from "src/components/reporting/service-by-category-report-form";
import { getServiceCategories } from "src/statesManagement/store/actions/services-action";
import { Store } from "src/statesManagement/store/store";
import { COMPANY_NAME } from "src/utils/company_details";
import { DashboardLayout } from "../../components/dashboard-layout";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const ServiceByCategory = () => {
  const { dispatch, state } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
    getServiceCategories({dispatch, enqueueSnackbar})
  }, [])

  return (
    <>
      <Head>
        <title>Services By Category Report| {COMPANY_NAME}</title>
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
          <ServiceByCategoryReportForm />
        </Container>
      </Box>
    </>
  );
};

ServiceByCategory.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ServiceByCategory;
