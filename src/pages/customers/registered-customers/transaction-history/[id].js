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
import { COMPANY_NAME } from "src/utils/company_name";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});
const TransactionHistoryPage = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const { userInfo, customerTransactions, error } = state;
  const { query } = useRouter();
  const [id, setid] = useState(null);
 


  useEffect(() => {
    !userInfo && router.push("/auth");
     setid(query.id);
   
    
  }, [query.id]);

 
  return (
    <>
      <Head>
        <title> Customer Transaction History| {COMPANY_NAME}</title>
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
          <TransactionHistory
       customerTransactions={customerTransactions}

          />
        </Container>
      </Box>
    </>
  );
};

TransactionHistoryPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default TransactionHistoryPage;
