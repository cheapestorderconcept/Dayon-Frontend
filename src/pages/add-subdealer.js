import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";

import { DashboardLayout } from "../components/dashboard-layout";
import { AddSubdealer } from "src/components/subdealers/add-subdealer";

const Subdealer = () => (
  <>
    <Head>
      <title>Add Sub Dealer| Material Kit</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={true}>
        <AddSubdealer />
      </Container>
    </Box>
  </>
);

Subdealer.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Subdealer;
