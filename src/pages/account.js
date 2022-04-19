import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfile } from "../components/account/account-profile";
import { AccountProfileDetails } from "../components/account/account-profile-details";
import { DashboardLayout } from "../components/dashboard-layout";
import { useContext, useEffect } from "react";
import { Store } from "src/statesManagement/store/store";
import { getProfile } from "src/statesManagement/store/actions/profile-action";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { COMPANY_NAME } from "src/utils/company_name";

const Account = () => {
  const { dispatch, state } = useContext(Store);
  const { userInfo, profile } = state;
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  useEffect(() => {
    !userInfo && router.push("/auth");
    getProfile({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
  }, []);

  return (
    <>
      <Head>
        <title>Profile | {COMPANY_NAME}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Profile
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile profile={profile} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails profile={profile} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Account.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Account;
