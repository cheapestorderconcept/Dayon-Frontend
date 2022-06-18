import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import dynamic from "next/dynamic";
import { DashboardLayout } from "../../components/dashboard-layout";
import { AddSubdealer } from "src/components/subdealers/add-subdealer";
import { COMPANY_NAME } from "src/utils/company_details";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const Subdealer = () => (
  <>
    <Head>
      <title>Add Sub Dealer|{COMPANY_NAME}</title>
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
        <AddSubdealer />
      </Container>
    </Box>
  </>
);

Subdealer.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Subdealer;
