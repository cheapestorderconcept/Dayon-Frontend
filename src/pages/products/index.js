import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { ProductListToolbar } from "../../components/product/product-list-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import ProductTable from "src/components/product/product-table";
import dynamic from "next/dynamic";
import { useContext } from "react";
import { Store } from "src/statesManagement/store/store";
import { useRouter } from "next/router";
import { getProduct } from "src/statesManagement/store/actions/product-action";
import { useEffect } from "react";
import { getSuppliers } from "src/statesManagement/store/actions/supplier-action";
import { getBrands } from "src/statesManagement/store/actions/brand-action";
import Loading from "src/components/loading/Loading";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const Products = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const { userInfo, products, suppliers, brands, loading } = state;
  console.log(products);

  useEffect(() => {
    !userInfo && router.push("/auth");
    getProduct(dispatch);
    getSuppliers(dispatch);
    getBrands(dispatch);
  }, []);
  return (
    <>
      <Head>
        <title>Products | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <DynamicComponentWithNoSSR />
        <Container maxWidth={false}>
          <ProductListToolbar products={products} suppliers={suppliers} brands={brands} />
          <Box sx={{ pt: 3 }}>
            {!products ? (
              <Card>
                <CardHeader title="Suppliers" />
                <Divider />
                <Typography
                  sx={{
                    mt: 4,
                  }}
                  variant="h6"
                  style={{ textAlign: "center" }}
                >
                  {loading ? <Loading /> : "No Products"}
                </Typography>
                <CardContent></CardContent>
              </Card>
            ) : (
              <ProductTable products={products} />
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 3,
            }}
          ></Box>
        </Container>
      </Box>
    </>
  );
};

Products.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Products;
