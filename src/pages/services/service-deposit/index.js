import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { DashboardLayout } from "src/components/dashboard-layout";
import dynamic from "next/dynamic";
import { useContext, useEffect } from "react";
import { Store } from "src/statesManagement/store/store";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { COMPANY_NAME } from "src/utils/company_details";
import { AddServiceDeposit } from "src/components/service-payment-deposit/add-service-deposit";


const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});
const ServiceDepositPage = () => {
  const { dispatch, state } = useContext(Store);
  const router = useRouter();
  // const { enqueueSnackbar } = useSnackbar();
  const { userInfo } = state;
  useEffect(() => {
    !userInfo && router.push("/auth");
  }, []);
  return (
    <>
      <Head>
        <title>Service Payment Deposit|{COMPANY_NAME}</title>
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
          <AddServiceDeposit />
        </Container>
      </Box>
    </>
  );
};

ServiceDepositPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ServiceDepositPage;
