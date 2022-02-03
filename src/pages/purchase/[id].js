import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";

import { EditPurchase } from "src/components/purchases/edit-purchase";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import { Store } from "src/statesManagement/store/store";
import { useRouter } from "next/router";
import { getStores } from "src/statesManagement/store/actions/store-outlet-action";
import { getProduct } from "src/statesManagement/store/actions/product-action";
import { getSuppliers } from "src/statesManagement/store/actions/supplier-action";
import { useSnackbar } from "notistack";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});
const EditPurchasePage = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const { userInfo, selectedBranch, suppliers, products, purchase, error } = state;
  const { query } = useRouter();
  const [id, setid] = useState(null);
  console.log(selectedBranch);

  console.log(purchase);
  useEffect(() => {
    !userInfo && router.push("/auth");
    getProduct({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
    setid(query.id);
  }, [query.id]);
  return (
    <>
      <Head>
        <title>Edit Purchase| Material Kit</title>
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
          <EditPurchase
            suppliers={suppliers}
            id={id}
            selectedBranch={selectedBranch}
            products={products}
          />
        </Container>
      </Box>
    </>
  );
};

EditPurchasePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EditPurchasePage;
