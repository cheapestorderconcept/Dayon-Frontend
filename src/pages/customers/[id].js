import Head from "next/head";
import { Box, Container, Card, CardHeader, Divider, Typography, CardContent } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import { Store } from "src/statesManagement/store/store";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useSnackbar } from "notistack";
import { CustomerRegisterationForm } from "src/components/customers/CustomerRegisterationForm";
import { getCustomers } from "src/statesManagement/store/actions/customer-action";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const EditCustomers = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const [id, setid] = useState(null);
  const { query } = useRouter();

  const { userInfo,loading, error, customers } = state;
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    !userInfo && router.push("/auth");
    setid(query.id);
    getCustomers({dispatch, enqueueSnackbar})
     
  }, []);
  return (
    <>
      <Head>
        <title>Customer |Adeshex Global</title>
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
          <CustomerRegisterationForm title="Edit Customer" edit={true} cusId={id} customers={customers}  />
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

EditCustomers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EditCustomers;
