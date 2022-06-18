import Head from "next/head";
import { Box, Container, Card, CardHeader, Divider, Typography, CardContent } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import dynamic from "next/dynamic";
import { useContext } from "react";
import { Store } from "src/statesManagement/store/store";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useSnackbar } from "notistack";
import { CustomerRegisterationForm } from "src/components/customers/CustomerRegisterationForm";
import { COMPANY_NAME } from "src/utils/company_details";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const AddCustomers = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const { userInfo, products, suppliers, brands, loading, error } = state;
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    !userInfo && router.push("/auth");
  }, []);
  return (
    <>
      <Head>
        <title>Customer | {COMPANY_NAME}</title>
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
          <CustomerRegisterationForm title="Add Customer"  />
          {/* <Box sx={{ pt: 3 }}>
            {!products ? (
              <Card>
                <CardHeader title="Suppliers" />
                <Divider />
                <Typography
                  sx={{
                    mt: 4,
                  }}
                  variant="h6"
                  style={{ textAlign: "center" }}
                >
                  {loading ? <Loading /> : "No Products"}
                </Typography>
                <CardContent></CardContent>
              </Card>
            ) : (
              <ProductTable products={products} />
            )}
          </Box> */}
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

AddCustomers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddCustomers;
