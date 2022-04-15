import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { DashboardLayout } from "src/components/dashboard-layout";

import { EditPurchase } from "src/components/purchases/edit-purchase";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import { Store } from "src/statesManagement/store/store";
import { useRouter } from "next/router";
import { getStores } from "src/statesManagement/store/actions/store-outlet-action";
import { getProduct } from "src/statesManagement/store/actions/product-action";
import { getSuppliers } from "src/statesManagement/store/actions/supplier-action";
import { useSnackbar } from "notistack";
import { getCustomerTransactionsHistory } from "src/statesManagement/store/actions/customer-action";
import TransactionHistory from "src/components/customers/TransactionHistory";
import DepositHistory from "src/components/customers/DepositHistory";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});
const DepositHistoryPage = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const { userInfo, customerDeposit, error } = state;
  const { query } = useRouter();
  const [id, setid] = useState(null);
 


  useEffect(() => {
    !userInfo && router.push("/auth");
     setid(query.id);
   
    
  }, [query.id]);

 
  return (
    <>
      <Head>
        <title> Customer Deposit History| Adeshex Global</title>
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
          <DepositHistory
       customerDeposits={customerDeposit}
          />
        </Container>
      </Box>
    </>
  );
};

DepositHistoryPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default DepositHistoryPage;
