import Head from "next/head";
import { Box, Container } from "@mui/material";
import dynamic from "next/dynamic";

import { useContext, useEffect, useState } from "react";
import { Store } from "src/statesManagement/store/store";
import { useRouter } from "next/router";

import { getProduct } from "src/statesManagement/store/actions/product-action";
import { DashboardLayout } from "src/components/dashboard-layout";
import { EditProductForm } from "src/components/product/EditProductForm";
import ProductTable from "src/components/product/product-table";
import { useSnackbar } from "notistack";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const EditProduct = () => {
  const { state, dispatch } = useContext(Store);
  const { query } = useRouter();
  const router = useRouter();
  const { userInfo, products, brands, suppliers, error } = state;

  const [id, setid] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    !userInfo && router.push("/auth");
    setid(query.id);
    getProduct({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
  }, [query.id]);

  return (
    <>
      <Head>
        <title>Update Price | Adeshex Nigeria Limited</title>
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
          <EditProductForm id={id} title="Edit Product" products={products} />
          <Box sx={{ mt: 3 }}>
            <ProductTable
              editable={true}
              products={products}
              suppliers={suppliers}
              brands={brands}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};
EditProduct.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EditProduct;
