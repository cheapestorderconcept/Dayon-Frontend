import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";

import { DashboardLayout } from "../../components/dashboard-layout";
import PaymentMethodList from "src/components/paymentmethod/payment-method-list";
import { AddPurchase } from "src/components/purchases/add-purchase";
import { AddSales } from "src/components/sales/add-sales";
import { AddDeposit } from "src/components/deposit/add-deposit";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import { Store } from "src/statesManagement/store/store";
import { useRouter } from "next/router";
import { getTotalDeposit } from "src/statesManagement/store/actions/deposit-action";
import { useSnackbar } from "notistack";
import { EditDepositView } from "src/components/deposit/edit-deposit";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});
const EditDeposit = () => {
  const { dispatch, state } = useContext(Store);
  const router = useRouter();
  // const { enqueueSnackbar } = useSnackbar();
  const { userInfo, deposits } = state;
  const { query } = useRouter();
  const [id, setid] = useState(null);
  console.log(deposits);
  useEffect(() => {
    !userInfo && router.push("/auth");
    setid(query.id);
  }, [query.id]);
  return (
    <>
      <Head>
        <title>Edit Deposit View| Adeshex Global</title>
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
          <EditDepositView id={id} deposits={deposits} />
        </Container>
      </Box>
    </>
  );
};

EditDeposit.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EditDeposit;
