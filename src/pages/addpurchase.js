import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";

import { DashboardLayout } from "../components/dashboard-layout";
import PaymentMethodList from "src/components/paymentmethod/payment-method-list";
import { AddPurchase } from "src/components/purchases/add-purchase";

const AddPurchasePage = () => (
  <>
    <Head>
      <title>Purchase| Material Kit</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={true}>
        <AddPurchase />
      </Container>
    </Box>
  </>
);

AddPurchasePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddPurchasePage;
