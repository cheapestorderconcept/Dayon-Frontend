import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import dynamic from "next/dynamic";
import { AddStaff } from "src/components/staff/add-staff";
import ListOfStaff from "src/components/staff/staff-lists";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const Staff = () => (
  <>
    <Head>
      <title>Staff | 18A Nigeria Limited </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <DynamicComponentWithNoSSR />
      <Container maxWidth={false}>
        <AddStaff />
        <Box sx={{ mt: 3 }}>
          <ListOfStaff />
        </Box>
      </Container>
    </Box>
  </>
);
Staff.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Staff;
