import Head from "next/head";
import { Box, Button, Container, Grid, Pagination, Typography } from "@mui/material";

import { DashboardLayout } from "../components/dashboard-layout";
import { Download as DownloadIcon } from "src/icons/download";
import { Upload as UploadIcon } from "src/icons/upload";
import PurchaseList from "src/components/purchases/purchase-lists";

const PurcahseListsPage = () => (
  <>
    <Head>
      <title>Purchase Lists| Material Kit</title>
    </Head>

    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
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
            Lists Of Purchases
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
          <PurchaseList />
        </Box>
      </Container>
    </Box>
  </>
);

PurcahseListsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default PurcahseListsPage;
