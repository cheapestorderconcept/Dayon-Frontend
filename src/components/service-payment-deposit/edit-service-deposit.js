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
import { Store } from "src/statesManagement/store/store";
import { useSnackbar } from "notistack";
import {
  addDepositData,
  getTotalDeposit,
  updateDeposit,
} from "src/statesManagement/store/actions/deposit-action";
import { Router } from "next/router";

// console.log(barcodeInput)

export const EditServiceDepositView = (props) => {
  const { deposits, id } = props;
  const { dispatch, state } = useContext(Store);
  const { bran, paymentType, loading } = state;
  let oneDeposit = [];
  oneDeposit = deposits.filter((dep) => dep._id === id);
  const strDate = new Date(oneDeposit[0]?.created_at);
  function convert(strDate) {
    var date = new Date(strDate),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  let itemsArray = [];

  

  const INITIAL_FORM_VALUES = {
    created_at:
      oneDeposit.length > 0 && typeof oneDeposit[0] != "undefined" ? convert(strDate) : "",
    invoice_number:
      oneDeposit.length > 0 && typeof oneDeposit[0] != "undefined"
        ? oneDeposit[0].invoice_number
        : "",
    price:
      oneDeposit.length > 0 && typeof oneDeposit[0] != "undefined"
        ? oneDeposit[0].amount_deposited
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
 
    service:
      oneDeposit.length > 0 && typeof oneDeposit[0] != "undefined" ? oneDeposit[0].service : "",

    service_price:
      oneDeposit.length > 0 && typeof oneDeposit[0] != "undefined"
        ? oneDeposit[0].service_price
        : "",
    serial_number:
      oneDeposit.length > 0 && typeof oneDeposit[0] != "undefined"
        ? oneDeposit[0].serial_number
        : "",
    serivice_id: "",
  };

  const FORM_VALIDATIONS = yup.object().shape({
    created_at: yup.date().required("please select date"),
    invoice_number: yup.string(),
    branch: yup.string(),
    payment_type: yup.string(),
    serial_number: yup.string(),
    price: yup.number().integer().typeError("Amount must be a number"),
    total_amount: yup.number().integer().typeError("Total Amount must be a number"),
    customer_name: yup.string(),
  

    // barcode: yup.string(),
    serivice_id: yup.string(),
    service: yup.string(),

    service_price: yup.number().integer().typeError("Price must be a number"),
 
  });

  const { enqueueSnackbar } = useSnackbar();

  const Submit = (values) => {
  console.log(values)
  };

  const formRef = useRef(null);

  useEffect(() => {
    getTotalDeposit({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
  }, []);

  
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
          Edit Service Deposit
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
                        <CustomTextField name="branch" label="Branch" />
                      </Grid>
                      <Grid item xs={4}>
                        <CustomTextField name="invoice_number" disabled label="Invoice Number" />
                      </Grid>
                      <Grid item xs={4}>
                        <CustomTextField name="price" label="Amount Deposited" />
                      </Grid>

                      <Grid item xs={4}>
                        <CustomTextField name="customer_name" label="Customer Name" />
                      </Grid>
                        
                     
                      {/* <Grid
                        item
                        xs={6}
                        sx={{
                          mb: 2,
                          mt: 2,
                        }}
                      >
                        <CustomTextField name="barcode" label="Barcode" />
                      </Grid> */}
                      <Grid item xs={6}>
                        <CustomTextField name="service" disabled label="service" />
                      </Grid>
                      {/* <Grid item xs={6}>
                        <CustomSelect
                          name="selectedservice"
                          label="Choose service"
                          options={services}
                          id="services"
                        />
                      </Grid> */}
                      <Grid item xs={6}>
                        <CustomTextField name="serial_number" label="Serial Number" />
                      </Grid>
                     
                      <Grid item xs={6}>
                        <CustomTextField name="service_price" label="Selling Price" />
                      </Grid>
                      <Grid item xs={6}>
                        <CustomTextField name="total_amount" label="Total Purchase Amount" />
                      </Grid>

                      <Grid item xs={12}>
                        <CustomSelect
                          name="payment_type"
                          label="Payment Type"
                          id="paymentType"
                          options={paymentType}
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
