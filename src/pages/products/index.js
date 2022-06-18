import { Box, Card, CardContent, CardHeader, Container, Divider, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useContext, useEffect } from "react";
import Loading from "src/components/loading/Loading";
import dynamic from "next/dynamic";
import ProductTable from "src/components/product/product-table";
import {
  getProduct
} from "src/statesManagement/store/actions/product-action";
import { getSuppliers } from "src/statesManagement/store/actions/supplier-action";
import { Store } from "src/statesManagement/store/store";
import { COMPANY_NAME } from "src/utils/company_details";
import { DashboardLayout } from "../../components/dashboard-layout";
import { ProductListToolbar } from "../../components/product/product-list-toolbar";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const Products = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const { userInfo, products, suppliers, brands, loading, error } = state;
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    !userInfo && router.push("/auth");
    getProduct({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
    getSuppliers({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
   
  }, []);
  return (
    <>
      <Head>
        <title>Products | {COMPANY_NAME}</title>
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
