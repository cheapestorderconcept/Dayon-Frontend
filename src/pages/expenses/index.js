import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import dynamic from "next/dynamic";
import ExpensesContainer from "src/components/expenses/expense-container";
import ListOfExpensesCategory from "src/components/expenses/list-of-expenses-category";
import ManageExpenses from "src/components/expenses/manage-expenses";
import { useContext, useEffect } from "react";
import { Store } from "src/statesManagement/store/store";
import { useRouter } from "next/router";
import {
  getExpenses,
  getExpensesCategory,
} from "src/statesManagement/store/actions/expense-action";
import { useSnackbar } from "notistack";
import { COMPANY_NAME } from "src/utils/company_name";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const Expenses = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { userInfo, branch, expensesCategories } = state;

  useEffect(() => {
    !userInfo && router.push("/auth");
    getExpensesCategory({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
  }, []);
  return (
    <>
      <Head>
        <title>Expenses | {COMPANY_NAME}</title>
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
          <ExpensesContainer branch={branch} expensesCategories={expensesCategories} />
          <Box sx={{ mt: 3 }}>
            <ListOfExpensesCategory expensesCategories={expensesCategories} />
          </Box>
        </Container>
      </Box>
    </>
  );
};
Expenses.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Expenses;
