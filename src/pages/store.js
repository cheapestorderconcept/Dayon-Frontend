import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { AddStoreOutlets } from "src/components/storeoutlets/add-store-outlets";
import StoreOuletLists from "src/components/storeoutlets/store-lists";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const Store = () => (
  <>
    <Head>
      <title>Store | 1948 App</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <DynamicComponentWithNoSSR />
      <Container maxWidth={false}>
        <AddStoreOutlets />
        <Box sx={{ mt: 3 }}>
          <StoreOuletLists />
        </Box>
      </Container>
    </Box>
  </>
);
Store.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Store;
