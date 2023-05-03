import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";

import { DashboardLayout } from "../../components/dashboard-layout";

import { AddPaymentMethod } from "src/components/paymentmethod/add-payment-method";
import PaymentMethodList from "src/components/paymentmethod/payment-method-list";
import dynamic from "next/dynamic";
import { useContext, useEffect } from "react";
import { Store } from "src/statesManagement/store/store";
import { useRouter } from "next/router";
import { getPaymentMethod } from "src/statesManagement/store/actions/payment-type-action";
import { useSnackbar } from "notistack";
import { COMPANY_NAME } from "src/utils/company_details";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});
const PaymentMethod = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const { userInfo, paymentType } = state;

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    !userInfo && router.push("/auth");
    getPaymentMethod({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
  }, []);
  return (
    <>
      <Head>
        <title>Payment Method | {COMPANY_NAME}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <DynamicComponentWithNoSSR />
        <Container maxWidth={false}>
          <AddPaymentMethod />
          <Box sx={{ pt: 3 }}>
            {/* <ProductCard product={product} /> */}
            <PaymentMethodList paymentType={paymentType} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

PaymentMethod.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default PaymentMethod;
