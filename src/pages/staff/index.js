import Head from "next/head";
import { Box, Card, CardContent, CardHeader, Container, Divider, Typography } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import dynamic from "next/dynamic";
import { AddStaff } from "src/components/staff/add-staff";
import ListOfStaff from "src/components/staff/staff-lists";
import { useContext, useEffect } from "react";
import { Store } from "src/statesManagement/store/store";
import { useRouter } from "next/router";
import { getStaff } from "src/statesManagement/store/actions/register-staff-action";
import { getStores } from "src/statesManagement/store/actions/store-outlet-action";
import { useSnackbar } from "notistack";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const Staff = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const { userInfo, staff, branch, error } = state;
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    !userInfo && router.push("/auth");
    getStaff({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
    getStores({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
  }, []);
  return (
    <>
      <Head>
        <title>Staff | 18A Nigeria Limited </title>
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
          <AddStaff branch={branch} />
          <Box sx={{ mt: 3 }}>
            {!staff ? (
              <Card>
                <CardHeader title="Staff" />
                <Divider />
                <Typography
                  sx={{
                    mt: 4,
                  }}
                  variant="h6"
                  style={{ textAlign: "center" }}
                >
                  No Staff
                </Typography>
                <CardContent></CardContent>
              </Card>
            ) : (
              <ListOfStaff staff={staff} />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};
Staff.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Staff;
