import Head from "next/head";
import { Box, Container } from "@mui/material";

import { DashboardLayout } from "../components/dashboard-layout";
import { AddSales } from "src/components/sales/add-sales";

const Sales = () => (
  <>
    <Head>
      <title>Sales| Material Kit</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={true}>
        <AddSales />
      </Container>
    </Box>
  </>
);

Sales.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Sales;
