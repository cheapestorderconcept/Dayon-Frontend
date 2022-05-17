import { Box, Container } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useContext, useEffect } from "react";
import { DepositTrackForm } from "src/components/service-payment-deposit/DepositTrackForm";
import { Store } from "src/statesManagement/store/store";
import { COMPANY_NAME } from "src/utils/company_details";
import { DashboardLayout } from "../../../components/dashboard-layout";


const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});
const DepositTrack = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { userInfo } = state;

  useEffect(() => {
    !userInfo && router.push("/auth");
    
  }, []);

  return (
    <>
      <Head>
        <title>Deposit Track || {COMPANY_NAME}</title>
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
          <DepositTrackForm title="Deposit Track" />
          
        </Container>
      </Box>
    </>
  );
};

DepositTrack.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default DepositTrack;
