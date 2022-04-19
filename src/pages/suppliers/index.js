import Head from "next/head";
import { Box, Card, CardContent, CardHeader, Container, Divider, Typography } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import dynamic from "next/dynamic";
import { AddSuppliers } from "src/components/suppliers/add-suppliers";
import SuppliersList from "src/components/suppliers/supplier-lists";
import { useContext, useEffect } from "react";
import { Store } from "src/statesManagement/store/store";
import { useRouter } from "next/router";
import { getSuppliers } from "src/statesManagement/store/actions/supplier-action";
import { useSnackbar } from "notistack";
import { COMPANY_NAME } from "src/utils/company_name";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const Supplier = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const { userInfo, suppliers, error } = state;

  useEffect(() => {
    !userInfo && router.push("/auth");
    getSuppliers({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
  }, []);

  return (
    <>
      <Head>
        <title>Supplier | {COMPANY_NAME}</title>
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
          <AddSuppliers title="Add Supplier" />
          <Box sx={{ mt: 3 }}>
            {!suppliers ? (
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
                  No Suppliers
                </Typography>
                <CardContent></CardContent>
              </Card>
            ) : (
              <SuppliersList suppliers={suppliers} />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};
Supplier.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Supplier;
