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

// console.log(barcodeInput)

export const AddDeposit = (props) => {
  const { dispatch, state } = useContext(Store);
  const { branch, productByBarcode } = state;

  const [barcode, setbarcode] = useState("");

  const INITIAL_FORM_VALUES = {
    created_at: "",
    invoice_number: "",
    amount_deposited: "",
    customer_name: "",
    phone_number: "",
    items: [{ product: "", product_id: "", quantity: "", selling_price: "" }],
  };

  const FORM_VALIDATIONS = yup.object().shape({
    created_at: yup.date().required("please select date"),
    invoice_number: yup.string().required("please provide invoice number"),
    amount_deposited: yup
      .number()
      .integer()
      .typeError("Amount must be a number")
      .required("please enter amount deposited"),
    phone_number: yup
      .number()
      .integer()
      .typeError("Phone must be a number")
      .required("please enter Cutomer Phone number"),
    customer_name: yup.string().required("please enter customer name"),
    items: yup.array().of(
      yup.object().shape({
        product_id: yup.string().required("please select a product"),

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
      product: "",
      product_id: "",
      selling_price: "",
      quantity: "",
    });

    setValues({ ...values, items });
  };

  const Submit = (values) => {
    // addSalesData({ dispatch: dispatch, sales: values });
    console.log(values);
  };

  const formRef = useRef(null);

  const [open, setopen] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
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
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
            // value={barcode}
            // onChange={(e) => {
            //   setbarcode(e.currentTarget.value);

            //   handleChange(e);
            // }}
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
            value={
              productByBarcode.length > 0 && typeof productByBarcode[i] != "undefined"
                ? productByBarcode[i].product_name
                : ""
            }
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
            ? Number(items.quantity) > productByBarcode[i].current_product_quantity && (
                <AlertBox open={open} severity="error" setopen={setopen} message="out of stock" />
              )
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
              productByBarcode.length > 0 && typeof productByBarcode[i] != "undefined"
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
                        <CustomTextField name="invoice_number" label="Invoice Number" />
                      </Grid>
                      <Grid item xs={4}>
                        <CustomTextField name="amount_deposited" label="Amount Deposited" />
                      </Grid>
                      <Grid item xs={4}>
                        <CustomTextField name="customer_name" label="Customer Name" />
                      </Grid>
                      <Grid item xs={4}>
                        <CustomTextField name="phone_number" label="Customer Phone" />
                      </Grid>

                      <FieldArray name="items">
                        {() =>
                          values.items.map((item, index) => (
                            <RenderForm
                              key={index}
                              items={item}
                              i={index}
                              handleChange={handleChange}
                            />
                          ))
                        }
                      </FieldArray>
                      <Grid xs={12} sx={{ mt: 2 }} spacing={2} container>
                        <Grid item xs={6}>
                          <CustomTextField
                            name="total_amount"
                            label="Total Purchase Amount"
                            disabled
                            value={
                              productByBarcode.length > 0
                                ? (values.total_amount = values.items.reduce(
                                    (a, c) => a + c.amount,
                                    0
                                  ))
                                : ""
                            }
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Field name="number of items">
                            {({ field }) => (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => addMoreItems(values, setValues)}
                                startIcon={<DownloadIcon fontSize="small" />}
                              >
                                Add More Products
                              </Button>
                            )}
                          </Field>
                        </Grid>
                      </Grid>
                      {/* <Grid item xs={6}>
                        <CustomSelect
                          name="payment_type"
                          label="Payment Type"
                          options={paymentMethods}
                        />
                      </Grid> */}

                      <Grid item xs={12}>
                        <Button
                          fullWidth={true}
                          variant="contained"
                          type="submit"
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
