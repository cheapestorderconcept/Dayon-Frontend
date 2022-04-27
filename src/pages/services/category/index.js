import Head from "next/head";
import { Box, Container, Card, CardHeader, Divider, Typography, CardContent } from "@mui/material";
import { DashboardLayout } from "../../../components/dashboard-layout";
import  {ServiceCategory}  from "src/components/serviceCategory/ServiceCategory";
import ServiceCategoryTable from "src/components/serviceCategory/ServiceCategoryTable";
import dynamic from "next/dynamic";
import { getBrands } from "src/statesManagement/store/actions/brand-action";
import { useContext, useEffect } from "react";

import { useRouter } from "next/router";
import { Store } from "src/statesManagement/store/store";
import { useSnackbar } from "notistack";
import { COMPANY_NAME } from "src/utils/company_details";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});
const ServiceCategoryPage = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { userInfo } = state;
  const categories = []

  useEffect(() => {
    !userInfo && router.push("/auth");
    
  }, []);

  return (
    <>
      <Head>
        <title>Service Category || {COMPANY_NAME}</title>
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
          <ServiceCategory title="Add Service Category" />
          <Box sx={{ pt: 3 }}>
            {!categories ? (
              <Card>
                <CardHeader title="Categories" />
                <Divider />
                <Typography
                  sx={{
                    mt: 4,
                  }}
                  variant="h6"
                  style={{ textAlign: "center" }}
                >
                  No Service Category
                </Typography>
                <CardContent></CardContent>
              </Card>
            ) : (
              <ServiceCategoryTable Categories={categories} />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

ServiceCategoryPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ServiceCategoryPage;
