import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";

import { AddPurchase } from "src/components/purchases/add-purchase";
import dynamic from "next/dynamic";
import { useContext, useEffect } from "react";
import { Store } from "src/statesManagement/store/store";
import { useRouter } from "next/router";
import { getStores } from "src/statesManagement/store/actions/store-outlet-action";
import { getProduct } from "src/statesManagement/store/actions/product-action";
import { getSuppliers } from "src/statesManagement/store/actions/supplier-action";
import { useSnackbar } from "notistack";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});
const AddPurchasePage = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const { userInfo, branch, suppliers, products, purchase, error } = state;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  error && enqueueSnackbar(error, { variant: "error" });
  console.log(purchase);
  useEffect(() => {
    !userInfo && router.push("/auth");
    getProduct(dispatch);
  }, []);
  return (
    <>
      <Head>
        <title>Purchase| Material Kit</title>
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
          <AddPurchase suppliers={suppliers} branch={branch} products={products} />
        </Container>
      </Box>
    </>
  );
};

AddPurchasePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddPurchasePage;
