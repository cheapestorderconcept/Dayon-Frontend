import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import dynamic from "next/dynamic";
import ExpensesContainer from "src/components/expenses/expense-container";
import ListOfExpensesCategory from "src/components/expenses/list-of-expenses-category";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const Expenses = () => (
  <>
    <Head>
      <title>Expenses | 1948 App</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2,
      }}
    >
      <DynamicComponentWithNoSSR />
      <Container maxWidth={true}>
        <ExpensesContainer />
        <Box sx={{ mt: 3 }}>
          <ListOfExpensesCategory />
        </Box>
      </Container>
    </Box>
  </>
);
Expenses.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Expenses;
