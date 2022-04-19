import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { AddStoreOutlets } from "src/components/storeoutlets/add-store";
import StoreOuletLists from "src/components/storeoutlets/store-lists";
import dynamic from "next/dynamic";
import { makeNetworkCall, networkCall } from "src/network";
import { useContext, useEffect, useState } from "react";
import { Store } from "src/statesManagement/store/store";
import { useSnackbar } from "notistack";
import { getStores } from "src/statesManagement/store/actions/store-outlet-action";
import { useRouter } from "next/router";
import { COMPANY_NAME } from "src/utils/company_name";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const EditBranch = () => {
  const { dispatch, state } = useContext(Store);
  const { branch, userInfo } = state;
  const { query } = useRouter();
  const router = useRouter();
  const [id, setid] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    !userInfo && router.push("/auth");
    setid(query.id);
    getStores({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
  }, [query.id]);

  return (
    <>
      <Head>
        <title>Store | {COMPANY_NAME}</title>
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
          <AddStoreOutlets edit={true} branch={branch} id={id} />
          <Box sx={{ mt: 3 }}>
            <StoreOuletLists branch={branch} />
          </Box>
        </Container>
      </Box>
    </>
  );
};
EditBranch.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EditBranch;
