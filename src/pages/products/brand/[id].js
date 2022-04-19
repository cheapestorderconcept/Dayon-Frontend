import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../../../components/dashboard-layout";
import { ProductBrand } from "src/components/productBrand/product-brand";
import BrandTable from "src/components/productBrand/brand-list";
import dynamic from "next/dynamic";
import { getBrands } from "src/statesManagement/store/actions/brand-action";
import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { Store } from "src/statesManagement/store/store";
import { useSnackbar } from "notistack";
import { COMPANY_NAME } from "src/utils/company_name";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});
const EditBrand = () => {
  const { state, dispatch } = useContext(Store);
  const { query } = useRouter();
  const router = useRouter();
  const { userInfo, brands, error } = state;

  const [id, setid] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    !userInfo && router.push("/auth");
    setid(query.id);
    getBrands({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
  }, [query.id]);

  return (
    <>
      <Head>
        <title>Brand |{COMPANY_NAME}</title>
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
          <ProductBrand id={id} title="Edit Brand" />
          <Box sx={{ pt: 3 }}>
            <BrandTable brands={brands} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

EditBrand.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EditBrand;
