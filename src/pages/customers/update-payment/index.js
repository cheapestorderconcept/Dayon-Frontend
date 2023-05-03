import { Box, Container } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Store } from "src/statesManagement/store/store";
import { DashboardLayout } from "../../../components/dashboard-layout";

import { useSnackbar } from "notistack";
import { UpdatePaymentForm } from "src/components/customers/UpdatePaymentForm";
import { COMPANY_NAME } from "src/utils/company_details";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const UpdatePayment = () => {
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
          <UpdatePaymentForm title="Update Customer Payment" />
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

UpdatePayment.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default UpdatePayment;
