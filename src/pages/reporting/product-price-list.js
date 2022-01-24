import Head from "next/head";
import { Box, Button, Container, Grid, Pagination, Typography } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { Download as DownloadIcon } from "src/icons/download";
import { Upload as UploadIcon } from "src/icons/upload";
import ProductPriceListTable from "src/components/reporting/product-price-list-report";

const ProductPriceListPage = () => (
  <>
    <Head>
      <title>Product Price Lists| Material Kit</title>
    </Head>

    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2,
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
            Product Price List
          </Typography>
          <Box sx={{ m: 1 }}>
            <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
              Home
            </Button>
            <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
              Product Price
            </Button>
          </Box>
        </Box>
        <Box sx={{ pt: 3 }}>
          <ProductPriceListTable />
        </Box>
      </Container>
    </Box>
  </>
);

ProductPriceListPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ProductPriceListPage;
