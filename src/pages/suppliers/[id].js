import Head from "next/head";
import { Box, Card, CardContent, CardHeader, Container, Divider, Typography } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import dynamic from "next/dynamic";
import { AddSuppliers } from "src/components/suppliers/add-suppliers";
import SuppliersList from "src/components/suppliers/supplier-lists";
import { useContext, useEffect, useState } from "react";
import { Store } from "src/statesManagement/store/store";
import { useRouter } from "next/router";
import { getSuppliers } from "src/statesManagement/store/actions/supplier-action";
import { useSnackbar } from "notistack";
import { COMPANY_NAME } from "src/utils/company_name";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const EditSupplier = () => {
  const { state, dispatch } = useContext(Store);
  const { query } = useRouter();
  const router = useRouter();
  const { userInfo, suppliers, error } = state;
  const { enqueueSnackbar } = useSnackbar();
  const [id, setid] = useState(null);

  useEffect(() => {
    !userInfo && router.push("/auth");
    setid(query.id);
    getSuppliers({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
  }, [query.id]);

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
          <AddSuppliers id={id} edit={true} title="Edit Supplier" />
          <Box sx={{ mt: 3 }}>
            <SuppliersList suppliers={suppliers} />
          </Box>
        </Container>
      </Box>
    </>
  );
};
EditSupplier.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EditSupplier;
