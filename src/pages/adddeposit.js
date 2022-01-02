import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";

import { DashboardLayout } from "../components/dashboard-layout";
import PaymentMethodList from "src/components/paymentmethod/payment-method-list";
import { AddPurchase } from "src/components/purchases/add-purchase";
import { AddSales } from "src/components/sales/add-sales";
import { AddDeposit } from "src/components/deposit/add-deposit";

const Deposit = () => (
  <>
    <Head>
      <title>Deposit| Material Kit</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={true}>
        <AddDeposit />
      </Container>
    </Box>
  </>
);

Deposit.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Deposit;
