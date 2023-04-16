import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Field, FieldArray, Form, Formik } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useContext, useRef } from "react";
import { addSalesData } from "src/statesManagement/store/actions/sales-action";
import { Store } from "src/statesManagement/store/store";
import { generateInvoice, generateTodayDate } from "src/utils/helpers";
import * as yup from "yup";
import { Download as DownloadIcon } from "../../icons/download";
import { Upload as UploadIcon } from "../../icons/upload";
import { CustomDate, CustomSelect, CustomTextField, SearchableSelect } from "../basicInputs";
import { CartPage } from "../cart_page/cart_page";

export const AddSales = (props) => {
  const { paymentType } = props;
  const { dispatch, state } = useContext(Store);
  const { products, loading, customers, cart } = state;
  const { enqueueSnackbar } = useSnackbar();
  const Router = useRouter();

  const INITIAL_FORM_VALUES = {
    created_at: generateTodayDate(),
    branch: Cookies.get("selectedBranch"),
    invoice_number: generateInvoice(),
    // customer_name: "",
    customer_id: "",
    total_amount: "",
    amount_paid: "",
    payment_type: "",
    items: [],
  };

  const FORM_VALIDATIONS = yup.object().shape({
    // numOfItems: yup.string().required("Please enter number of items"),
    created_at: yup.date().required("please select date"),
    invoice_number: yup.string().required("please provide invoice number"),
    // customer_name: yup.string(),
    customer_id: yup.string(),
    store: yup.string().required("please select store"),
    payment_type: yup.string().required("please choose a payment method"),
    total_amount: yup.number().typeError("Total amount must be a number"),
    amount_paid: yup.number().typeError("Amount paid  must be a number"),
    items: yup.array().required("please add product to cart "),
  });

  const Submit = (formData) => {
    const values = { ...formData, items: cart.cartItems };
    console.log(values);

    addSalesData({
      dispatch: dispatch,
      sales: values,
      enqueueSnackbar: enqueueSnackbar,
      Router: Router,
    });
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Add Sales
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Home
          </Button>
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Sales
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardHeader title="Add Sales" />
          <Divider />
          <CardContent>
            <Box>
              <Formik
                initialValues={INITIAL_FORM_VALUES}
                validationSchema={FORM_VALIDATIONS}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  // Submit(values);
                  resetForm({ values: INITIAL_FORM_VALUES });
                  setSubmitting(false);
                }}
              >
                {({ values, setValues }) => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <CustomDate name="created_at" />
                      </Grid>
                      <Grid item xs={4}>
                        <CustomTextField name="invoice_number" label="Invoice Number" />
                      </Grid>
                      <Grid item xs={4}>
                        <CustomTextField name="branch" value={values.branch} />
                      </Grid>

                      <Grid item xs={4}>
                        <SearchableSelect
                          name="customer_id"
                          useId={true}
                          title="Choose a customer"
                          options={customers}
                          id="customers"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <CustomTextField
                          label="Amount Paid"
                          name="amount_paid"
                          value={values.amount_paid}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <CustomTextField
                          name="total_amount"
                          label="Total Purchase Amount"
                          disabled
                          value={
                            (values.total_amount = cart.cartItems.reduce(
                              (a, c) => a + Number(c.selling_price) * Number(c.quantity),
                              0
                            ))
                          }
                        />
                      </Grid>

                      <Grid item xs={4}>
                        <CustomSelect
                          name="payment_type"
                          label="Payment Type"
                          options={paymentType}
                          id="paymentType"
                        />
                      </Grid>

                      <Grid
                        item
                        sx={{
                          marginTop: "15px",
                        }}
                      >
                        <CartPage Submit={Submit} values={values} />
                      </Grid>
                      {/* <FieldArray name="items">
                        {() =>
                          values.items.map((item, index) =>
                            RenderForm({
                              values: values,
                              items: item,
                              i: index,
                            })
                          )
                        }
                      </FieldArray> */}

                      {/* <Grid item xs={12}>
                        <Button
                          fullWidth={true}
                          variant="contained"
                          type="submit"
                          disabled={loading ? true : false}
                          onClick={() => Submit(values)}
                        >
                          {" "}
                          Process Sales
                        </Button>
                      </Grid> */}
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
