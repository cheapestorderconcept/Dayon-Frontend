import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "src/components/dashboard-layout";
import dynamic from "next/dynamic";
import { useContext, useEffect } from "react";
import { Store } from "src/statesManagement/store/store";

import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { getProduct } from "src/statesManagement/store/actions/product-action";
import { COMPANY_NAME } from "src/utils/company_details";
import { AddService } from "src/components/ServicePayment/add-service";
import { getService } from "src/statesManagement/store/actions/services-action";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const ServicePayment = () => {
  const { dispatch, state } = useContext(Store);
  const router = useRouter();
  const { userInfo, paymentType, services } = state;
  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    !userInfo && router.push("/auth");
    getService({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
  }, []);
  return (
    <>
      <Head>
        <title>Services Payment| {COMPANY_NAME}</title>
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
          <AddService paymentType={paymentType} serviceType={services}/>
        </Container>
      </Box>
    </>
  );
};

ServicePayment.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ServicePayment;
