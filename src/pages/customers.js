import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CustomerListResults } from "../components/customer/customer-list-results";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { customers } from "../__mocks__/customers";
import { AddStoreOutlets } from "src/components/storeoutlets/add-store-outlets";
import StoreOuletLists from "src/components/storeoutlets/store-lists";

const Customers = () => (
  <>
    <Head>
      <title>Customers | Material Kit</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        {/* <CustomerListToolbar /> */}
        <AddStoreOutlets />
        <Box sx={{ mt: 3 }}>
          <StoreOuletLists />
          {/* <CustomerListResults customers={customers} /> */}
        </Box>
      </Container>
    </Box>
  </>
);
Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Customers;
