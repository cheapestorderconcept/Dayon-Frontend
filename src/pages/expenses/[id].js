import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import dynamic from "next/dynamic";
import ExpensesContainer from "src/components/expenses/expense-container";
import ListOfExpensesCategory from "src/components/expenses/list-of-expenses-category";
import ManageExpenses from "src/components/expenses/manage-expenses";
import { useContext, useEffect, useState } from "react";
import { Store } from "src/statesManagement/store/store";
import { useRouter } from "next/router";
import {
  getExpenses,
  getExpensesCategory,
} from "src/statesManagement/store/actions/expense-action";
import { useSnackbar } from "notistack";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const EditExpenses = () => {
  const { state, dispatch } = useContext(Store);
  const { query } = useRouter();
  const router = useRouter();
  const [id, setid] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const { userInfo, expensesCategories } = state;

  useEffect(() => {
    !userInfo && router.push("/auth");
    setid(query.id);
    getExpensesCategory({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
  }, [query.id]);
  return (
    <>
      <Head>
        <title>Edit Expenses | Adeshex Global</title>
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
          <ExpensesContainer edit={true} id={id} expensesCategories={expensesCategories} />
        </Container>
      </Box>
    </>
  );
};
EditExpenses.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EditExpenses;
