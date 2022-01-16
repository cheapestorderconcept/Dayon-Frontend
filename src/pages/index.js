import Head from "next/head";
import { Typography, Box, Container, Grid } from "@mui/material";
import { Budget } from "../components/dashboard/budget";
import { ProductProgress } from "../components/dashboard/Product";
import { TotalCustomers } from "../components/dashboard/total-customers";
import { TotalProfit } from "../components/dashboard/total-profit";
import { TrafficByDevice } from "../components/dashboard/traffic-by-device";
import { DashboardLayout } from "../components/dashboard-layout";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Store } from "src/statesManagement/store/store";
import { useSnackbar } from "notistack";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const Dashboard = () => {
  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo, products, error } = state;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  error && enqueueSnackbar(error, { variant: "error" });
  useEffect(() => {
    !userInfo && router.push("/auth");
  }, []);

  // !userInfo && router.push("/auth");
  return (
    <>
      <Head>
        <title>Dashboard | Adeshex Global </title>
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
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Budget />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalCustomers />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <ProductProgress products={products} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalProfit sx={{ height: "100%" }} />
            </Grid>
            {/* <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales />
          </Grid> */}
            <Grid item lg={12} md={6} xl={3} xs={12}>
              <TrafficByDevice sx={{ height: "100%" }} />
            </Grid>
            {/* <Grid item lg={4} md={6} xl={3} xs={12}>
            <LatestProducts sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LatestOrders />
          </Grid> */}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
