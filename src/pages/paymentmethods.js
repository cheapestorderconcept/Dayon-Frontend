import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";

import { DashboardLayout } from "../components/dashboard-layout";

import { AddPaymentMethod } from "src/components/paymentmethod/add-payment-method";
import PaymentMethodList from "src/components/paymentmethod/payment-method-list";

const PaymentMethod = () => (
  <>
    <Head>
      <title>Payment Method | Material Kit</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <AddPaymentMethod />
        <Box sx={{ pt: 3 }}>
          {/* <ProductCard product={product} /> */}
          <PaymentMethodList />
        </Box>
      </Container>
    </Box>
  </>
);

PaymentMethod.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default PaymentMethod;
