import { Box, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useSnackbar } from "notistack";
import React, { useContext } from "react";
import { addExpenses, updateExpenses } from "src/statesManagement/store/actions/expense-action";
import { Store } from "src/statesManagement/store/store";
import { expenses } from "src/__mocks__/expense";
import * as yup from "yup";
import { CustomDate } from "../basicInputs";
import { CustomSelect } from "../basicInputs";
import { CustomButton } from "../basicInputs";
import { CustomTextField } from "../basicInputs";

const AddExpenses = ({ expensesCategories, edit, id, branch }) => {
  const INITIAL_VALUES = {
    date: "",
    amount: "",
    expenses_type: "",
    additional_details: "",
    branch_name: "",
  };

  const VALIDATIONS = yup.object().shape({
    date: yup.date().required("please select date"),
    amount: yup
      .number()
      .integer()
      .typeError("this field must be a number")
      .required("please enter amount"),
    expenses_type: yup.string().required("please choose expenses type"),
    branch_name: yup.string().required("please choose Store Branch "),
    additional_details: yup.string().required("Please provide additional details"),
  });

  const { dispatch } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (values) => {
    addExpenses({ dispatch: dispatch, expenses: values, enqueueSnackbar: enqueueSnackbar });
  };

  const handleUpdate = (values) => {
    updateExpenses({
      dispatch: dispatch,
      enqueueSnackbar: enqueueSnackbar,
      expId: id,
      expenses: values,
    });
  };
  return (
    <>
      <Typography variant="h6" color="initial" style={{ marginBottom: "10px" }}>
        {edit ? "Edit Expenses" : "Add Expenses"}
      </Typography>

      <Formik
        initialValues={{ ...INITIAL_VALUES }}
        validationSchema={VALIDATIONS}
        onSubmit={edit ? handleUpdate : handleSubmit}
      >
        <Form>
          <CustomDate name="date" />
          <Box mt={2} />
          <CustomSelect name="branch_name" label="Branch" options={branch} />
          <Box mt={2} />
          <CustomTextField name="amount" label="Amount" />
          <Box mt={2} />
          <CustomSelect name="expenses_type" label="Expense Type" options={expensesCategories} />
          <Box mt={2} />
          <CustomTextField
            multiline={true}
            row={4}
            name="additional_details"
            label="Additional Details"
          />
          <Box mt={2} />
          <CustomButton>{edit ? "Update" : "Submit"}</CustomButton>
        </Form>
      </Formik>
    </>
  );
};

export default AddExpenses;
