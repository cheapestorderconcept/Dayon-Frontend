import { Box, Button, Container, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useSnackbar } from "notistack";
import { useContext, useEffect } from "react";
import { DashboardLayout } from "src/components/dashboard-layout";
import ServicePaymentList from "src/components/ServicePayment/service-list";
import { Download as DownloadIcon } from "src/icons/download";
import { Upload as UploadIcon } from "src/icons/upload";
import { getServicePayments } from "src/statesManagement/store/actions/services-action";
import { Store } from "src/statesManagement/store/store";
import { COMPANY_NAME } from "src/utils/company_details";


const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const ServicePaymentListPage = () => {
  const { dispatch, state } = useContext(Store);
  const { servicePayment, userInfo } = state;
  const { enqueueSnackbar } = useSnackbar();
  console.log(servicePayment)

  useEffect(() => {
     !userInfo && router.push("/auth");
     getServicePayments({dispatch, enqueueSnackbar})
  }, []);

  return (
    <>
      <Head>
        <title>Service Payment Lists| {COMPANY_NAME}</title>
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
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              m: -1,
            }}
          >
            <Typography sx={{ m: 1 }} variant="h4">
              Service Payment Lists
            </Typography>
            <Box sx={{ m: 1 }}>
              <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
                Import
              </Button>
              <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
                Export
              </Button>
            </Box>
          </Box>
          <Box sx={{ pt: 3 }}>
            <ServicePaymentList serviceLists={servicePayment} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

ServicePaymentListPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ServicePaymentListPage;
