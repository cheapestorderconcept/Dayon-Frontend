import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { AddStoreOutlets } from "src/components/storeoutlets/add-store-outlets";
import StoreOuletLists from "src/components/storeoutlets/store-lists";
import dynamic from "next/dynamic";
import { AddSuppliers } from "src/components/suppliers/add-suppliers";
import SuppliersList from "src/components/suppliers/supplier-lists";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const Supplier = () => (
  <>
    <Head>
      <title>Supplier | 1948 App</title>
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
        <AddSuppliers />
        <Box sx={{ mt: 3 }}>
          <SuppliersList />
        </Box>
      </Container>
    </Box>
  </>
);
Supplier.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Supplier;
