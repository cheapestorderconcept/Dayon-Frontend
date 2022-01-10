import Head from "next/head";
import { Box, Button, Container, Grid, Pagination, Typography } from "@mui/material";

import { DashboardLayout } from "../../components/dashboard-layout";
import { Download as DownloadIcon } from "src/icons/download";
import { Upload as UploadIcon } from "src/icons/upload";
import PurchaseList from "src/components/purchases/purchase-lists";
import SalesList from "src/components/sales/sales-list";
import DepositList from "src/components/deposit/deposit-lists";
import TransferList from "src/components/transferoutltes/transfer-lists";
import SubdealerList from "src/components/subdealers/subdealer-list";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});
const ManageSubdealer = () => (
  <>
    <Head>
      <title>T Subdealer Lists| 1948 App</title>
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
            Subdealer Lists
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
          <SubdealerList />
        </Box>
      </Container>
    </Box>
  </>
);

ManageSubdealer.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ManageSubdealer;
