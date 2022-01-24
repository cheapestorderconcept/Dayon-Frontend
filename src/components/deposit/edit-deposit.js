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
import { getProductByBarcode } from "src/statesManagement/store/actions/product-action";
import { Store } from "src/statesManagement/store/store";
import { addSupplier } from "src/statesManagement/store/actions/supplier-action";
import { addSales, addSalesData } from "src/statesManagement/store/actions/sales-action";
import AlertBox from "../../components/alert";
import { useSnackbar } from "notistack";
import {
  addDepositData,
  getTotalDeposit,
  updateDeposit,
} from "src/statesManagement/store/actions/deposit-action";
import { Router } from "next/router";

// console.log(barcodeInput)

export const EditDepositView = (props) => {
  const { deposits, id } = props;
  const { dispatch, state } = useContext(Store);
  const { branch, productByBarcode, paymentType } = state;
  let oneDeposit = [];
  oneDeposit = deposits.filter((dep) => dep._id === id);

  const [barcode, setbarcode] = useState("");
  let itemsArray = [];

  const publishItems = () => {
    if (oneDeposit.length > 0 && typeof oneDeposit[0] != "undefined") {
      for (let index = 0; index < oneDeposit[0].items.length; index++) {
        itemsArray.push({
          barcode: oneDeposit[0].items[index].barcode,
          product: oneDeposit[0].items[index].product,
          quantity: Number(oneDeposit[0].items[index].quantity),
          selling_price: oneDeposit[0].items[index].selling_price,
          product_id: oneDeposit[0].items[index].product_id,
        });
      }
    }
  };
  publishItems();

  const INITIAL_FORM_VALUES = {
    created_at: "",
    invoice_number:
      oneDeposit.length > 0 && typeof oneDeposit[0] != "undefined"
        ? oneDeposit[0].invoice_number
        : "",
    amount_deposited:
      oneDeposit.length > 0 && typeof oneDeposit[0] != "undefined"
        ? oneDeposit[0].amount_deposited
        : "",
    amount_to_balance:
      oneDeposit.length > 0 && typeof oneDeposit[0] != "undefined"
        ? oneDeposit[0].amount_to_balance
        : "",
    customer_name:
      oneDeposit.length > 0 && typeof oneDeposit[0] != "undefined"
        ? oneDeposit[0].customer_name
        : "",
    total_amount:
      oneDeposit.length > 0 && typeof oneDeposit[0] != "undefined"
        ? oneDeposit[0].total_amount
        : "",
    payment_type:
      oneDeposit.length > 0 && typeof oneDeposit[0] != "undefined"
        ? oneDeposit[0].payment_type
        : "",
    branch:
      oneDeposit.length > 0 && typeof oneDeposit[0] != "undefined" ? oneDeposit[0].branch : "",

    items: [...itemsArray],
  };

  const FORM_VALIDATIONS = yup.object().shape({
    created_at: yup.date().required("please select date"),
    invoice_number: yup.string().required("please provide invoice number"),
    branch: yup.string().required("please choose store branch"),
    payment_type: yup.string().required("please choose payment method "),
    amount_deposited: yup
      .number()
      .integer()
      .typeError("Amount must be a number")
      .required("please enter amount deposited"),
    total_amount: yup
      .number()
      .integer()
      .typeError("Total Amount must be a number")
      .required("please enter total amount "),
    // customer_phone: yup.string().required("please enter Cutomer Phone number"),
    customer_name: yup.string().required("please enter customer name"),
    items: yup.array().of(
      yup.object().shape({
        barcode: yup.string(),
        product_id: yup.string().required("please select a product"),
        product: yup.string().required("please select a product"),

        selling_price: yup
          .number()
          .integer()
          .typeError("Price must be a number")
          .required("Please provide Selling price"),

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
      barcode: "",
      product: "",
      product_id: "",
      selling_price: "",
      quantity: "",
    });

    setValues({ ...values, items });
  };

  // const Router = Router();

  const removeItems = (values, setValues) => {
    const items = [...values.items];
    console.log(items);
  };
  const [open, setopen] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const Submit = (values) => {
    updateDeposit({
      dispatch: dispatch,
      price: { price: values.amount_deposited },
      enqueueSnackbar: enqueueSnackbar,
      depId: id,
    });
  };

  const formRef = useRef(null);

  useEffect(() => {
    getTotalDeposit({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
    const timeOutId = setTimeout(
      () =>
        getProductByBarcode({
          dispatch: dispatch,
          barcode: barcode,
          enqueueSnackbar: enqueueSnackbar,
        }),
      500
    );

    return () => clearTimeout(timeOutId);
  }, [barcode]);

  const RenderForm = ({ items, i }) => {
    setbarcode(items.barcode);

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
            <form onSubmit={(e) => e.preventDefault()}>
              <TextField
                name="barcodeNum"
                label="Scan Barcode"
                value={barcode}
                autoFocus={true}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <ListIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          </Grid> */}
        <Grid item xs={6}>
          <CustomTextField
            name={`items.${i}.barcode`}
            label="Barcode"
            disabled
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
            autoFocus={true}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <ListIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextField
            name={`items.${i}.product`}
            disabled
            // value={
            //   productByBarcode.length > 0 && typeof productByBarcode[i] != "undefined"
            //     ? (items.product_name = productByBarcode[i].product_name)
            //     : ""
            // }
            label="Product"
          />
        </Grid>

        <Grid item xs={6} style={{ display: "none" }}>
          <CustomTextField
            name={`items.${i}.product_id`}
            disabled
            value={
              productByBarcode.length > 0 && typeof productByBarcode[i] != "undefined"
                ? (items.product_id = productByBarcode[i]._id)
                : ""
            }
            label="Product"
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField name={`items.${i}.quantity`} label="Quantity" />
          {productByBarcode.length > 0 && typeof productByBarcode[i] != "undefined"
            ? Number(items.quantity) > productByBarcode[i].current_product_quantity &&
              enqueueSnackbar("Quantity is out of stock", {
                variant: "error",
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

        {/* <Grid item xs={6}>
          <CustomTextField
            name={`items.${i}.amount`}
            label="Amount"
            value={
              productByBarcode.length > 0 && typeof productByBarcode[i] != "undefined"
                ? (items.amount = items.quantity * items.selling_price)
                : ""
            }
          />
        </Grid> */}
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
          Edit Deposit
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
          <CardHeader title="Edit Deposit" />
          <Divider />
          <CardContent>
            <Box sx={{ maxWidth: 800 }}>
              <Formik
                initialValues={INITIAL_FORM_VALUES}
                validationSchema={FORM_VALIDATIONS}
                enableReinitialize={true}
                onSubmit={Submit}
                innerRef={formRef}
              >
                {({ errors, values, handleChange, setValues }) => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <CustomDate name="created_at" />
                      </Grid>
                      <Grid item xs={4}>
                        <CustomSelect name="branch" options={branch} label="Select Branch" />
                      </Grid>
                      <Grid item xs={4}>
                        <CustomTextField name="invoice_number" disabled label="Invoice Number" />
                      </Grid>
                      <Grid item xs={4}>
                        <CustomTextField name="amount_deposited" label="Amount Deposited" />
                      </Grid>
                      <Grid item xs={4}>
                        <CustomTextField
                          name="amount_to_balance"
                          disabled
                          label="Amount To Balance"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <CustomTextField name="customer_name" label="Customer Name" />
                      </Grid>
                      {/* <Grid item xs={4}>
                          <CustomTextField name="customer_phone" label="Customer Phone" />
                        </Grid> */}

                      <FieldArray name="items">
                        {() =>
                          values.items.map((item, index) => (
                            <RenderForm
                              key={index}
                              items={item}
                              i={index}
                              handleChange={handleChange}
                              values={values}
                              setValues={setValues}
                            />
                          ))
                        }
                      </FieldArray>

                      <Grid item xs={6}>
                        <CustomTextField
                          name="total_amount"
                          label="Total Purchase Amount"

                          //   value={
                          //     productByBarcode.length > 0
                          //       ? (values.total_amount = values.items.reduce(
                          //           (a, c) => a + c.amount,
                          //           0
                          //         ))
                          //       : ""
                          //   }
                        />
                      </Grid>
                      {/* 
                      <Grid item xs={6}>
                        <Field name="number of items">
                          {({ field }) => (
                            <Button
                              variant="contained"
                              fullWidth={true}
                              color="primary"
                              onClick={() => addMoreItems(values, setValues)}
                              startIcon={<DownloadIcon fontSize="small" />}
                            >
                              Add More Products
                            </Button>
                          )}
                        </Field>
                      </Grid> */}
                      {/* <Grid item xs={6}>
                        <Field name="number of items">
                          {({ field }) => (
                            <Button
                              variant="contained"
                              fullWidth={true}
                              color="primary"
                              onClick={() => removeItems(values, setValues)}
                              startIcon={<DownloadIcon fontSize="small" />}
                            >
                              Remove Products
                            </Button>
                          )}
                        </Field>
                      </Grid> */}
                      <Grid item xs={12}>
                        <CustomSelect
                          name="payment_type"
                          label="Payment Type"
                          options={paymentType}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Button
                          fullWidth={true}
                          variant="contained"
                          type="submit"
                          onClick={() => Submit(values)}
                        >
                          {" "}
                          Update Deposit
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
