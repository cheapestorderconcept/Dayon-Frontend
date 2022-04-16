/** 
TODO: FIX DEPOSIT PAGE 
**/

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  InputAdornment,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Container,
} from "@mui/material";
import { Download as DownloadIcon } from "../../icons/download";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { CustomTextField } from "../basicInputs";
import ListIcon from "@mui/icons-material/List";
import * as yup from "yup";
import { Formik, Form, Field, FieldArray, ErrorMessage, useFormikContext } from "formik";
import { CustomSelect, CustomButton } from "../basicInputs";
import { CustomDate } from "../basicInputs";
import { paymentMethods } from "src/__mocks__/paymentMethods";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  getProductByBarcode,
  getProductById,
} from "src/statesManagement/store/actions/product-action";
import { Store } from "src/statesManagement/store/store";
import { addSupplier } from "src/statesManagement/store/actions/supplier-action";
import { addSales, addSalesData } from "src/statesManagement/store/actions/sales-action";
import AlertBox from "../../components/alert";
import { useSnackbar } from "notistack";
import { addDepositData, getTotalDeposit } from "src/statesManagement/store/actions/deposit-action";
import { Router } from "next/router";
import Cookies from "js-cookie";
import { SearchableSelect } from "../basicInputs";

// console.log(barcodeInput)

export const AddDeposit = (props) => {
  const { dispatch, state } = useContext(Store);
  const { customers, paymentType, loading, products } = state;
  console.log(customers)

  const INITIAL_FORM_VALUES = {
    created_at: "",
    invoice_number: "",
    // amount_deposited: "",
    customer_name: "",
    customer_id:"",
    branch: Cookies.get("selectedBranch"),
    payment_type: "",
    items: [
      {
        // barcode: "",
        product: "",
        selectedProduct: "",
        amount_deposited: "",
        serial_number: "",
        created_at: "",
        invoice_number: "",
        product_id: "",
        quantity: "",
        selling_price: "",
        amount: "",
      },
    ],
  };

  const FORM_VALIDATIONS = yup.object().shape({
    created_at: yup.date().required("please select date"),
    invoice_number: yup.string().required("please provide invoice number"),
    branch: yup.string().required("please choose store branch"),
    payment_type: yup.string().required("please choose payment method "),
    // amount_deposited: yup
    //   .number()
    //   .integer()
    //   .typeError("Amount must be a number")
    //   .required("please enter amount deposited"),
    // customer_phone: yup.string().required("please enter Cutomer Phone number"),
    customer_name: yup.string(),
    customer_id:yup.string(),
    items: yup.array().of(
      yup.object().shape({
        // barcode: yup.string(),
        product_id: yup.string(),
        selectedProduct: yup.string(),
        serial_number: yup.string(),
        created_at: yup.date(),
        amount_deposited: yup.number().integer().typeError("Amount must be a number"),
        invoice_number: yup.string().required("please provide invoice number"),
        selling_price: yup
          .number()
          .integer()
          .typeError("Price must be a number")
          .required("Please provide Selling price"),
        amount: yup
          .number()
          .integer()
          .typeError("Amount must be a number")
          .required("Please provide amount"),

        quantity: yup
          .number()
          .integer()
          .typeError("Price must be a number")
          .required("Please provide product quantity"),
      })
    ),
  });

  const addMoreItems = (values, setValues) => {
    const items = [...values.items];

    items.push({
      // barcode: "",
      product: "",
      selectedProduct: "",
      amount_deposited: "",
      product_id: "",
      serial_number: "",
      invoice_number: "",
      created_at: "",
      selling_price: "",
      amount: "",
      quantity: "",
    });

    setValues({ ...values, items });
  };

  // const Router = Router();

  const removeItems = (values, setValues) => {
    const items = [...values.items];
    items.pop();
    setValues({ ...values, items });
  };

  const { enqueueSnackbar } = useSnackbar();
  const Submit = (values) => {
    addDepositData({
      deposit: values,
      enqueueSnackbar: enqueueSnackbar,
      dispatch: dispatch,
    });
  };

  const formRef = useRef(null);

  const RenderComponentForm = ({ items, i, values }) => {
    const retrieveProduct = products.filter((pro) => pro.product_barcode === items.barcode);
    const retrieveProductById = products.filter((pro) => pro._id === items?.selectedProduct);

    return (
      <React.Fragment key={i}>
        <Grid
          sx={{
            mb: 2,
            mt: 2,
          }}
          item
          xs={12}
        >
          <Typography>Item {i + 1}</Typography>
        </Grid>

        {/* <Grid item xs={6}>
          <CustomTextField
            name={`items.${i}.barcode`}
            label="Barcode"
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
            
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <ListIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid> */}

       <Grid item xs={6}>
          <CustomTextField
            name={`items.${i}.product`}
            disabled
            value={
              (items.product =
                items.selectedProduct != "" && retrieveProductById != []
                  ? retrieveProductById[0]?.product_name
                  : retrieveProduct != []
                  ? retrieveProduct[0]?.product_name
                  : "")
            }
            // label="Product"
          />
        </Grid> 
        <Grid item xs={6}>
          <SearchableSelect
            name={`items.${i}.selectedProduct`}
            useId={true}
            options={products}
            id="products"
          />
        </Grid>
        {/* <Grid item xs={6}>
          <CustomSelect
            name={`items.${i}.selectedProduct`}
            useId={true}
            options={products}
            id="products"
            label="Choose Products"
          />
        </Grid> */}

        <Grid item xs={6}>
          <CustomTextField name={`items.${i}.serial_number`} label="Serial Number" />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            name={`items.${i}.invoice_number`}
            label="Invoice Number"
            disabled
            value={(items.invoice_number = values.invoice_number)}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            name={`items.${i}.created_at`}
            label="Date"
            disabled
            value={(items.created_at = values.created_at)}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField name={`items.${i}.amount_deposited`} label="Amount Deposited" />
        </Grid>
        <Grid item xs={6} style={{ display: "none" }}>
          <CustomTextField
            name={`items.${i}.product_id`}
            disabled
            value={
              (items.product_id =
                items.selectedProduct != "" && retrieveProductById != []
                  ? retrieveProductById[0]?._id
                  : retrieveProduct != []
                  ? retrieveProduct[0]?._id
                  : "")
            }
            label="Product Id"
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField name={`items.${i}.quantity`} label="Quantity" />
          {items.selectedProduct != "" && retrieveProductById != []
            ? Number(items.quantity) > retrieveProductById[0]?.current_product_quantity &&
              enqueueSnackbar("provided quantity is out of stock", {
                variant: "warning",
                preventDuplicate: true,
              })
            : retrieveProductById != []
            ? Number(items.quantity) > retrieveProduct[0]?.current_product_quantity &&
              enqueueSnackbar("provided quantity is out of stock", {
                variant: "warning",
                preventDuplicate: true,
              })
            : null}
        </Grid>

        <Grid item xs={6}>
          <CustomTextField
            name={`items.${i}.selling_price`}
            //values of selling price can also be set to default depends on usage
            label="Selling Price Per Unit"
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextField
            name={`items.${i}.amount`}
            label="Amount"
            value={
              items.selectedProduct != "" && retrieveProductById != []
                ? (items.amount = items.quantity * items.selling_price)
                : retrieveProductById != []
                ? (items.amount = items.quantity * items.selling_price)
                : ""
            }
          />
        </Grid>
      </React.Fragment>
    );
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
          Add Deposit
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Home
          </Button>
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Deposit
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardHeader title="Add Deposit" />
          <Divider />
          <CardContent>
            <Box sx={{ maxWidth: 800 }}>
              <Formik
                initialValues={INITIAL_FORM_VALUES}
                validationSchema={FORM_VALIDATIONS}
                // enableReinitialize={true}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  Submit(values);
                  resetForm({ values: INITIAL_FORM_VALUES });
                  setSubmitting(false);
                }}
                innerRef={formRef}
              >
                {({ values, setValues }) => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <CustomDate name="created_at" />
                      </Grid>
                      <Grid item xs={4}>
                        <CustomTextField name="branch" value={values.branch} />
                      </Grid>
                      <Grid item xs={4}>
                        <CustomTextField name="invoice_number" label="Invoice Number" />
                      </Grid>
                      {/* <Grid item xs={4}>
                        <CustomTextField name="amount_deposited" label="Amount Deposited" />
                      </Grid> */}
                      <Grid item xs={4}>
                        <CustomTextField name="customer_name" label="Customer Name" />
                      </Grid>
                      {/* <Grid item xs={4}>
                      <CustomSelect name="customer_id"
                          label="Choose Customer"
                          options={customers}
                          id="customers"
                          useId={true} />
                      </Grid> */}

                       <Grid item xs={4}>
                       <SearchableSelect
                       name="customer_id"
                        useId={true}
                        title="Choose a customer"
                       options={customers}
                          id="customers"
                       />
                      </Grid>
                      <FieldArray name="items">
                        {() =>
                          values.items.map((item, index) =>
                            RenderComponentForm({
                              values: values,
                              items: item,
                              i: index,
                            })
                          )
                        }
                      </FieldArray>

                      <Grid item xs={6}>
                        <CustomTextField
                          name="total_amount"
                          label="Total Purchase Amount"
                          disabled
                          value={
                            (values.total_amount = values.items.reduce((a, c) => a + c.amount, 0))
                          }
                        />
                      </Grid>
                      <Grid
                        container
                        spacing={2}
                        sx={{
                          mt: 2,
                          pl: 2,
                        }}
                      >
                        <Grid item xs={6}>
                          <Field name="number of items">
                            {({ field }) => (
                              <Button
                                variant="contained"
                                fullWidth={true}
                                color="primary"
                                disabled={loading ? true : false}
                                onClick={() => addMoreItems(values, setValues)}
                                startIcon={<DownloadIcon fontSize="small" />}
                              >
                                Add More Products
                              </Button>
                            )}
                          </Field>
                        </Grid>
                        <Grid item xs={6}>
                          <Field name="number of items">
                            {({ field }) => (
                              <Button
                                variant="contained"
                                fullWidth={true}
                                disabled={loading ? true : false}
                                color="primary"
                                onClick={() => removeItems(values, setValues)}
                                startIcon={<DownloadIcon fontSize="small" />}
                              >
                                Remove Products
                              </Button>
                            )}
                          </Field>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <CustomSelect
                          name="payment_type"
                          label="Payment Type"
                          options={paymentType}
                          id="paymentType"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Button
                          fullWidth={true}
                          variant="contained"
                          type="submit"
                          disabled={loading ? true : false}
                          onClick={() => Submit(values)}
                        >
                          {" "}
                          Process Deposit
                        </Button>
                      </Grid>
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
