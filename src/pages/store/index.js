import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { AddStoreOutlets } from "src/components/storeoutlets/add-store";
import StoreOuletLists from "src/components/storeoutlets/store-lists";
import dynamic from "next/dynamic";
import { makeNetworkCall, networkCall } from "src/network";
import { useContext } from "react";
import { Store } from "src/statesManagement/store/store";
import { useSnackbar } from "notistack";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const Branch = () => {
  const { dispatch, state } = useContext(Store);
  const { branch, error } = state;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  error && enqueueSnackbar(error, { variant: "error" });

  return (
    <>
      <Head>
        <title>Store | Adeshex Global</title>
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
          <AddStoreOutlets />
          <Box sx={{ mt: 3 }}>
            <StoreOuletLists branch={branch} />
          </Box>
        </Container>
      </Box>
    </>
  );
};
Branch.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Branch;
