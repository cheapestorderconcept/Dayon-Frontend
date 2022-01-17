import { Box } from "@mui/material";
import { Form, Formik } from "formik";
import { useSnackbar } from "notistack";
import React, { useContext } from "react";
import { addExpensesCategory } from "src/statesManagement/store/actions/expense-action";
import { Store } from "src/statesManagement/store/store";
import * as yup from "yup";
import { CustomButton } from "../basicInputs";
import { CustomTextField } from "../basicInputs";

const ExpensesCategory = () => {
  const INITIAL_VALUES = {
    expenses_category: "",
  };

  const VALIDATIONS = yup.object().shape({
    expenses_category: yup.string().required("Please enter a category"),
  });

  const { dispatch } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = (values) => {
    addExpensesCategory({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar, category: values });
  };
  return (
    <Formik
      initialValues={{ ...INITIAL_VALUES }}
      validationSchema={VALIDATIONS}
      onSubmit={handleSubmit}
    >
      <Form>
        <CustomTextField name="expenses_category" label="Add Category" />
        <Box mt={2} />
        <CustomButton>Submit</CustomButton>
      </Form>
    </Formik>
  );
};

export default ExpensesCategory;
