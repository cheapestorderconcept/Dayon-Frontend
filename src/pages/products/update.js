import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { ProductListToolbar } from "../../components/product/product-list-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import ProductTable from "src/components/product/product-table";
import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import { Store } from "src/statesManagement/store/store";
import { useRouter } from "next/router";
import { getProduct } from "src/statesManagement/store/actions/product-action";
import { useEffect } from "react";
import { getSuppliers } from "src/statesManagement/store/actions/supplier-action";
import { getBrands } from "src/statesManagement/store/actions/brand-action";
import { useSnackbar } from "notistack";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const Editproduct = () => {
  const { state, dispatch } = useContext(Store);
  const { query } = useRouter();
  const router = useRouter();
  const { userInfo, products, suppliers, brands, error } = state;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  error && enqueueSnackbar(error, { variant: "error" });
  const [id, setid] = useState(null);

  useEffect(() => {
    !userInfo && router.push("/auth");
    setid(query.id);
    getProduct(dispatch);
    getSuppliers(dispatch);
    getBrands(dispatch);
  }, [query.id]);
  return (
    <>
      <Head>
        <title>Products | Material Kit</title>
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
          <ProductListToolbar
            products={products}
            title="Edit Product"
            suppliers={suppliers}
            brands={brands}
            id={id}
          />
          <Box sx={{ pt: 3 }}>
            <ProductTable products={products} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 3,
            }}
          >
            <Pagination color="primary" count={3} size="small" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Editproduct.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Editproduct;
