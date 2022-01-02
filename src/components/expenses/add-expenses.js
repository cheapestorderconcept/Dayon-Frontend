import { Box, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { expenses } from "src/__mocks__/expense";
import * as yup from "yup";
import { CustomDate } from "../basicInputs";
import { CustomSelect } from "../basicInputs";
import { CustomButton } from "../basicInputs";
import { CustomTextField } from "../basicInputs";

const INITIAL_VALUES = {
  date: "",
  amount: "",
  expensesType: "",
  additionalDetails: "",
};

const VALIDATIONS = yup.object().shape({
  date: yup.date().required("please select date"),
  amount: yup
    .number()
    .integer()
    .typeError("this field must be a number")
    .required("please enter amount"),
  expensesType: yup.string().required("please choose expenses type"),
  additionalDetails: yup.string(),
});
const AddExpenses = () => {
  return (
    <>
      <Typography variant="h6" color="initial" style={{ marginBottom: "10px" }}>
        Add Expenses
      </Typography>

      <Formik
        initialValues={{ ...INITIAL_VALUES }}
        validationSchema={VALIDATIONS}
        onSubmit={(values) => console.log(values)}
      >
        <Form>
          <CustomDate name="date" />
          <Box mt={2} />
          <CustomTextField name="amount" label="Amount" />
          <Box mt={2} />
          <CustomSelect name="expensesType" label="Expense Type" options={expenses} />
          <Box mt={2} />
          <CustomTextField
            multiline={true}
            row={4}
            name="additionalDetails"
            label="Additional Details"
          />
          <Box mt={2} />
          <CustomButton>Submit</CustomButton>
        </Form>
      </Formik>
    </>
  );
};

export default AddExpenses;
