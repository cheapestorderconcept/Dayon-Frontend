import { Box, Button, Container, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useSnackbar } from "notistack";
import { useContext, useEffect } from "react";
import { DashboardLayout } from "src/components/dashboard-layout";
import ServiceDepositList from "src/components/service-payment-deposit/service-deposit-lists";
import { Download as DownloadIcon } from "src/icons/download";
import { Upload as UploadIcon } from "src/icons/upload";
import { getServiceDeposit } from "src/statesManagement/store/actions/services-action";
import { Store } from "src/statesManagement/store/store";
import { COMPANY_NAME } from "src/utils/company_details";


const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const ServiceDepositListsPage = () => {
  const { dispatch, state } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();
  const { userInfo, serviceDeposits } = state;
  useEffect(() => {
    !userInfo && router.push("/auth");
  
    getServiceDeposit({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
  }, []);

  return (
    <>
      <Head>
        <title>Manage Service Deposit |  {COMPANY_NAME}</title>
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
            Service  Deposit Lists
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
            <ServiceDepositList serviceDeposits={serviceDeposits} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

ServiceDepositListsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ServiceDepositListsPage;
