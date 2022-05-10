import Head from "next/head";
import { Box, Button, Container, Grid, Pagination, Typography } from "@mui/material";

import { DashboardLayout } from "src/components/dashboard-layout";
import { Download as DownloadIcon } from "src/icons/download";
import { Upload as UploadIcon } from "src/icons/upload";
import PurchaseList from "src/components/purchases/purchase-lists";
import SalesList from "src/components/sales/sales-list";
import dynamic from "next/dynamic";
import { useContext, useEffect } from "react";
import { Store } from "src/statesManagement/store/store";
import { getTotalSales } from "src/statesManagement/store/actions/sales-action";
import { useSnackbar } from "notistack";
import { COMPANY_NAME } from "src/utils/company_details";
import ServicePaymentList from "src/components/ServicePayment/service-list";
import { setRevalidateHeaders } from "next/dist/server/send-payload";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const ServicePaymentListPage = () => {
  const { dispatch, state } = useContext(Store);
  const { servicePayment } = state;
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
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
