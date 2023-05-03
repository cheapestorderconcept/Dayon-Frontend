import Head from "next/head";
import { Box, Container, Card, CardHeader, Divider, Typography, CardContent } from "@mui/material";
import { ProductListToolbar } from "../../components/product/product-list-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import ProductTable from "src/components/product/product-table";
import dynamic from "next/dynamic";
import { useContext } from "react";
import { Store } from "src/statesManagement/store/store";
import { useRouter } from "next/router";
import {
  getOutOfStock,
  getProduct,
  getProductPrice,
} from "src/statesManagement/store/actions/product-action";
import { useEffect } from "react";

import Loading from "src/components/loading/Loading";
import { useSnackbar } from "notistack";
import { COMPANY_NAME } from "src/utils/company_details";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const EditProducts = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const { userInfo, products, suppliers, brands, loading, error } = state;
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    !userInfo && router.push("/auth");
    getProduct({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
    alert("success")
    // getProductPrice(dispatch);
    // getOutOfStock(dispatch);
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
          <ProductListToolbar
            edit={true}
            products={products}
            suppliers={suppliers}
            brands={brands}
          />
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

EditProducts.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EditProducts;
