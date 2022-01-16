import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";

import { DashboardLayout } from "../../components/dashboard-layout";
import PaymentMethodList from "src/components/paymentmethod/payment-method-list";
import { AddPurchase } from "src/components/purchases/add-purchase";
import { AddSales } from "src/components/sales/add-sales";
import { AddDeposit } from "src/components/deposit/add-deposit";
import dynamic from "next/dynamic";
import { useContext, useEffect } from "react";
import { Store } from "src/statesManagement/store/store";
import { useRouter } from "next/router";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});
const Deposit = () => {
  const { dispatch, state } = useContext(Store);
  const router = useRouter();
  const { userInfo } = state;
  useEffect(() => {
    !userInfo && router.push("/auth");
  }, []);
  return (
    <>
      <Head>
        <title>Deposit| Material Kit</title>
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
          <AddDeposit />
        </Container>
      </Box>
    </>
  );
};

Deposit.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Deposit;
