import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { AddStoreOutlets } from "src/components/storeoutlets/add-store";
import StoreOuletLists from "src/components/storeoutlets/store-lists";
import dynamic from "next/dynamic";
import { makeNetworkCall, networkCall } from "src/network";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const Store = () => {
  return (
    <>
      <Head>
        <title>Store | 1948 App</title>
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
          <AddStoreOutlets />
          <Box sx={{ mt: 3 }}>
            <StoreOuletLists />
          </Box>
        </Container>
      </Box>
    </>
  );
};
Store.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Store;

// export async function getStaticProps() {
//   try {
//     const response = await makeNetworkCall({ method: "GET", path: "/view-branch" });
//     const { data } = response;
//     return { props: { data } };
//   } catch (error) {
//     console.log(error.response.data);
//   }
// }
