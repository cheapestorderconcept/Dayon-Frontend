import { Box, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import { addExpenses, updateExpenses } from "src/statesManagement/store/actions/expense-action";
import { Store } from "src/statesManagement/store/store";
import { expenses } from "src/__mocks__/expense";
import * as yup from "yup";
import { CustomDate } from "../basicInputs";
import { CustomSelect } from "../basicInputs";
import { CustomButton } from "../basicInputs";
import { CustomTextField } from "../basicInputs";

const AddExpenses = ({ expensesCategories, edit, id, branch }) => {
  // const [oneExpenses, setoneExpenses] = useState([]);

  // edit &&
  //   useEffect(async () => {
  //     const myExpenses = await expenses.filter((exp) => exp._id === id);
  //     setoneExpenses(myExpenses);
  //   }, []);

  // console.log(oneExpenses);

  const VALIDATIONS = yup.object().shape({
    date: edit ? yup.date() : yup.date().required("please select date"),
    amount: edit
      ? yup.number().integer().typeError("this field must be a number")
      : yup
          .number()
          .integer()
          .typeError("this field must be a number")
          .required("please enter amount"),
    expenses_type: edit ? yup.string() : yup.string().required("please choose expenses type"),
    branch_name: edit ? yup.string() : yup.string().required("please choose Store Branch "),
    additional_details: edit
      ? yup.string()
      : yup.string().required("Please provide additional details"),
  });

  const { dispatch, state } = useContext(Store);
  const { loading, expenses } = state;
  const { enqueueSnackbar } = useSnackbar();
  let oneExp = [];
  oneExp = expenses.filter((exp) => exp._id === id);

  const strDate = new Date(oneExp[0]?.date);
  function convert(strDate) {
    var date = new Date(strDate),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  const INITIAL_VALUES = {
    date: oneExp.length > 0 && typeof oneExp[0] != "undefined" ? convert(strDate) : "",
    amount: oneExp.length > 0 && typeof oneExp[0] != "undefined" ? oneExp[0].amount : "",
    expenses_type:
      oneExp.length > 0 && typeof oneExp[0] != "undefined" ? oneExp[0].expenses_type : "",
    additional_details:
      oneExp.length > 0 && typeof oneExp[0] != "undefined" ? oneExp[0].additional_details : "",
    branch_name: edit
      ? oneExp.length > 0 && typeof oneExp[0] != "undefined"
        ? oneExp[0].branch_name
        : ""
      : Cookies.get("selectedBranch"),
  };

  // const editInitialValues = {
  //   date: oneExpenses[0]?.date,
  //   amount: oneExpenses[0]?.amount,
  //   expenses_type: oneExpenses[0]?.expenses_type,
  //   additional_details: oneExpenses[0]?.additional_details,
  //   branch_name: oneExpenses[0]?.branch_name,
  // };

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
        enableReinitialize={true}
        onSubmit={edit ? handleUpdate : handleSubmit}
      >
        {({ errors, values, handleChange, setValues }) => (
          <Form>
            <CustomDate name="date" />
            <Box mt={2} />
            <CustomTextField name="branch_name" value={values.branch_name} />
            <Box mt={2} />
            <CustomTextField name="amount" label="Amount" />
            <Box mt={2} />
            <CustomSelect
              name="expenses_type"
              label="Expense Type"
              id="expensesCategories"
              options={expensesCategories}
            />
            <Box mt={2} />
            <CustomTextField
              multiline={true}
              row={4}
              name="additional_details"
              label="Additional Details"
            />
            <Box mt={2} />
            <CustomButton disabled={loading ? true : false}>
              {edit ? "Update" : "Submit"}
            </CustomButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddExpenses;
