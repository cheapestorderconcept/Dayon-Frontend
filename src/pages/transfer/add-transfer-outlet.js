import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";

import { DashboardLayout } from "../../components/dashboard-layout";

import { AddTransferLog } from "src/components/transferoutltes/add-transfer-log";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});
const TransferOutlets = () => (
  <>
    <Head>
      <title>Add Transfer Outlet| Material Kit</title>
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
        <AddTransferLog />
      </Container>
    </Box>
  </>
);

TransferOutlets.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default TransferOutlets;
