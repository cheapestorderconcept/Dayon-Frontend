import Head from "next/head";
import { Box, Container, Card, CardHeader, Divider, Typography, CardContent } from "@mui/material";
import { ProductListToolbar } from "../../components/product/product-list-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import ProductTable from "src/components/product/product-table";
import dynamic from "next/dynamic";
import { useContext } from "react";
import { Store } from "src/statesManagement/store/store";
import { useRouter } from "next/router";
import {
  getOutOfStock,
  getProduct,
  getProductPrice,
} from "src/statesManagement/store/actions/product-action";
import { useEffect } from "react";

import Loading from "src/components/loading/Loading";
import { useSnackbar } from "notistack";
import { COMPANY_NAME } from "src/utils/company_details";
import ServicesTable from "src/components/services/ServicesTable";
import { ServicesListToolbar } from "src/components/services/ServicesListToolbar";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const Services = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const { userInfo, loading, error } = state;
  const services = []
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    !userInfo && router.push("/auth");
  
  }, []);
  return (
    <>
      <Head>
        <title>Services | {COMPANY_NAME}</title>
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
          <ServicesListToolbar title="Add Service" categories={[]} />
          <Box sx={{ pt: 3 }}>
            {!services ? (
              <Card>
                <CardHeader title="Services" />
                <Divider />
                <Typography
                  sx={{
                    mt: 4,
                  }}
                  variant="h6"
                  style={{ textAlign: "center" }}
                >
                  {loading ? <Loading /> : "No Services"}
                </Typography>
                <CardContent></CardContent>
              </Card>
            ) : (
              <ServicesTable  services={services} editable={true}  />
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 3,
            }}
          ></Box>
        </Container>
      </Box>
    </>
  );
};

Services.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Services;
