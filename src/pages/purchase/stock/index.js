import Head from "next/head";
import { Box, Container, Card, CardHeader, Divider, Typography, CardContent } from "@mui/material";

import ProductTable from "src/components/product/product-table";
import dynamic from "next/dynamic";
import { useContext } from "react";
import { Store } from "src/statesManagement/store/store";
import { useRouter } from "next/router";
import { getProduct } from "src/statesManagement/store/actions/product-action";
import { useEffect } from "react";

import Loading from "src/components/loading/Loading";
import { DashboardLayout } from "src/components/dashboard-layout";
import { useSnackbar } from "notistack";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const Stock = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const { userInfo, products, error, loading } = state;

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    !userInfo && router.push("/auth");
    getProduct({ dispatch, enqueueSnackbar: enqueueSnackbar });
    // getProductPrice(dispatch);
    // getOutOfStock(dispatch);
  }, []);
  return (
    <>
      <Head>
        <title>Stocks | Adeshex Nigeria Limited</title>
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
              <ProductTable editable={true} products={products} />
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

Stock.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Stock;
