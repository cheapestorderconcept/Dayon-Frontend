import Head from "next/head";
import { Box, Button, Container, Grid, Pagination, Typography } from "@mui/material";

import { DashboardLayout } from "../../../components/dashboard-layout";
import { Download as DownloadIcon } from "src/icons/download";
import { Upload as UploadIcon } from "src/icons/upload";
import PurchaseList from "src/components/purchases/purchase-lists";
import dynamic from "next/dynamic";
import { useContext, useEffect } from "react";
import { getPurchase } from "src/statesManagement/store/actions/purchase-action";
import { Store } from "src/statesManagement/store/store";
import { useSnackbar } from "notistack";
import { getCustomers } from "src/statesManagement/store/actions/customer-action";
import CustomerList from "src/components/customers/CustomerList";
import { COMPANY_NAME } from "src/utils/company_name";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const RegisteredCustomerListPage = () => {
  const { dispatch, state } = useContext(Store);
  const { customers, userInfo, loading } = state;
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    !userInfo && router.push("/auth");
 getCustomers({dispatch:dispatch, enqueueSnackbar:enqueueSnackbar})
  }, []);

  return (
    <>
      <Head>
        <title>Registered Customers | {COMPANY_NAME}</title>
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
            My Customers
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
            <CustomerList customers={customers} loading={loading} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

RegisteredCustomerListPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default RegisteredCustomerListPage;
