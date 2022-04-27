import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../../../components/dashboard-layout";
import {  ServiceCategory } from "src/components/serviceCategory/ServiceCategory";
import dynamic from "next/dynamic";
import { getBrands } from "src/statesManagement/store/actions/brand-action";
import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { Store } from "src/statesManagement/store/store";
import { useSnackbar } from "notistack";
import { COMPANY_NAME } from "src/utils/company_details";
import ServiceCategoryTable from "src/components/serviceCategory/ServiceCategoryTable";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});
const EditServiceCategory = () => {
  const { state, dispatch } = useContext(Store);
  const { query } = useRouter();
  const router = useRouter();
  const { userInfo } = state;

  const [id, setid] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    !userInfo && router.push("/auth");
    setid(query.id);
    
  }, [query.id]);

  return (
    <>
      <Head>
        <title>Service Category |{COMPANY_NAME}</title>
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
          <ServiceCategory id={id} title="Edit Category" />
          <Box sx={{ pt: 3 }}>
            <ServiceCategoryTable categories={[]} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

EditServiceCategory.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EditServiceCategory;
