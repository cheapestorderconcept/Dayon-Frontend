import Head from "next/head";
import { Box, Button, Container, Grid, Pagination, Typography } from "@mui/material";

import { DashboardLayout } from "../../components/dashboard-layout";
import { Download as DownloadIcon } from "src/icons/download";
import { Upload as UploadIcon } from "src/icons/upload";
import PurchaseList from "src/components/purchases/purchase-lists";
import SalesList from "src/components/sales/sales-list";
import DepositList from "src/components/deposit/deposit-lists";
import dynamic from "next/dynamic";
import { getTotalDeposit } from "src/statesManagement/store/actions/deposit-action";
import { useContext, useEffect } from "react";
import { Store } from "src/statesManagement/store/store";
import { useSnackbar } from "notistack";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const DepositListsPage = () => {
  const { dispatch, state } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();
  const { userInfo, deposits } = state;
  useEffect(() => {
    !userInfo && router.push("/auth");
    getTotalDeposit({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
  }, []);

  return (
    <>
      <Head>
        <title>Manage Deposit | Material Kit</title>
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
              Deposit Lists
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
            <DepositList deposits={deposits} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

DepositListsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default DepositListsPage;
