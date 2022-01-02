import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { ProductListToolbar } from "../components/product/product-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import ProductTable from "src/components/product/product-table";
import { ProductBrand } from "src/components/productBrand/product-brand";
import BrandTable from "src/components/productBrand/brand-list";

const Brand = () => (
  <>
    <Head>
      <title>Brand | Material Kit</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <ProductBrand />
        <Box sx={{ pt: 3 }}>
          {/* <ProductCard product={product} /> */}
          <BrandTable />
        </Box>
      </Container>
    </Box>
  </>
);

Brand.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Brand;
