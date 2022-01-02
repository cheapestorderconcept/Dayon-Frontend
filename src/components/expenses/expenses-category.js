import { Box } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { CustomButton } from "../basicInputs";
import { CustomTextField } from "../basicInputs";

const INITIAL_VALUES = {
  category: "",
};

const VALIDATIONS = yup.object().shape({
  category: yup.string().required("Please enter a category"),
});
const ExpensesCategory = () => {
  return (
    <Formik
      initialValues={{ ...INITIAL_VALUES }}
      validationSchema={VALIDATIONS}
      onSubmit={(values) => console.log(values)}
    >
      <Form>
        <CustomTextField name="category" label="Add Category" />
        <Box mt={2} />
        <CustomButton>Submit</CustomButton>
      </Form>
    </Formik>
  );
};

export default ExpensesCategory;
