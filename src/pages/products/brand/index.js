import Head from "next/head";
import { Box, Container, Card, CardHeader, Divider, Typography, CardContent } from "@mui/material";
import { DashboardLayout } from "../../../components/dashboard-layout";
import { ProductBrand } from "src/components/productBrand/product-brand";
import BrandTable from "src/components/productBrand/brand-list";
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
const Brand = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { brands, userInfo, error } = state;

  console.log(brands);
  useEffect(() => {
    !userInfo && router.push("/auth");
    getBrands({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
  }, []);

  return (
    <>
      <Head>
        <title>Brand || {COMPANY_NAME}</title>
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
          <ProductBrand title="Add Brand" />
          <Box sx={{ pt: 3 }}>
            {!brands ? (
              <Card>
                <CardHeader title="Brands" />
                <Divider />
                <Typography
                  sx={{
                    mt: 4,
                  }}
                  variant="h6"
                  style={{ textAlign: "center" }}
                >
                  No Brands
                </Typography>
                <CardContent></CardContent>
              </Card>
            ) : (
              <BrandTable brands={brands} />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

Brand.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Brand;
