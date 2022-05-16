import Head from "next/head";
import { Box, Container, Card, CardHeader, Divider, Typography, CardContent } from "@mui/material";
import { ProductListToolbar } from "../../components/product/product-list-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import { Store } from "src/statesManagement/store/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  getService,
  getServiceCategories,
} from "src/statesManagement/store/actions/services-action";

import Loading from "src/components/loading/Loading";
import { useSnackbar } from "notistack";
import { COMPANY_NAME } from "src/utils/company_details";
import { ServicesListToolbar } from "src/components/services/ServicesListToolbar";
import ServicesTable from "src/components/services/ServicesTable";
import { EditServiceForm } from "src/components/services/EditServiceForm";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const EditService = () => {
  const [id, setId] = useState(null);
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { query } = useRouter();
  const { userInfo, services, serviceCategories, loading, error } = state;
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    !userInfo && router.push("/auth");
    setId(query.id);
    getService({
      dispatch,
      enqueueSnackbar: enqueueSnackbar,
    });

    getServiceCategories({
      dispatch: dispatch,
      enqueueSnackbar: enqueueSnackbar,
    });
  }, [query.id]);
  return (
    <>
      <Head>
        <title>Service | {COMPANY_NAME}</title>
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
          {/* <ProductListToolbar
            edit={true}
            products={products}
            suppliers={suppliers}
            brands={brands}
          /> */}
          {/* <ServicesListToolbar services={services} serviceCategories={serviceCategories} /> */}
          <EditServiceForm serviceCategories={serviceCategories} id={id} />
          <Box sx={{ pt: 3 }}>
            {!services ? (
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
              <ServicesTable services={services} />
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

EditService.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EditService;
