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
import AlertBox from "../alert";
import { useSnackbar } from "notistack";
import { addDepositData, getTotalDeposit } from "src/statesManagement/store/actions/deposit-action";
import { Router } from "next/router";
import Cookies from "js-cookie";
import { SearchableSelect } from "../basicInputs";

// console.log(barcodeInput)

export const AddServiceDeposit = (props) => {
  const { dispatch, state } = useContext(Store);
  const { customers, paymentType, loading } = state;
 const myServices=[]

  const INITIAL_FORM_VALUES = {
    created_at: "",
    invoice_number: "",
    // amount_deposited: "",
    customer_name: "",

    branch: Cookies.get("selectedBranch"),
    payment_type: "",
    services: [
      {
        // barcode: "",
        service: "",
        selectedService: "",
        amount_deposited: "",
        serial_number: "",
        created_at: "",
        invoice_number: "",
        service_id: "",
        service_price: "",
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

    services: yup.array().of(
      yup.object().shape({
        // barcode: yup.string(),
        service_id: yup.string(),
        selectedService: yup.string(),
        serial_number: yup.string(),
        created_at: yup.date(),
        amount_deposited: yup.number().integer().typeError("Amount must be a number"),
        invoice_number: yup.string().required("please provide invoice number"),
        service_price: yup
          .number()
          .integer()
          .typeError("Price must be a number")
          .required("Please provide Selling price"),
        amount: yup
          .number()
          .integer()
          .typeError("Amount must be a number")
          .required("Please provide amount"),

   
      })
    ),
  });

  const addMoreservices = (values, setValues) => {
    const services = [...values.services];

    services.push({
      // barcode: "",
      service: "",
      selectedService: "",
      amount_deposited: "",
      service_id: "",
      serial_number: "",
      invoice_number: "",
      created_at: "",
      service_price: "",
      amount: "",
   
    });

    setValues({ ...values, services });
  };

  // const Router = Router();

  const removeservices = (values, setValues) => {
    const services = [...values.services];
    services.pop();
    setValues({ ...values, services });
  };

  const { enqueueSnackbar } = useSnackbar();
  const Submit = (values) => {
   console.log(values)
  };

  const formRef = useRef(null);

  const RenderComponentForm = ({ services, i, values }) => {
   
    const retrieveServiceById = myServices.filter((serv) => serv._id === services?.selectedService);

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
          <Typography>Service {i + 1}</Typography>
        </Grid>

        {/* <Grid item xs={6}>
          <CustomTextField
            name={`services.${i}.barcode`}
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
            name={`services.${i}.service`}
            disabled
            value={
              (services.product =
                services.selectedService != "" && retrieveServiceById != []
                  ? retrieveServiceById[0]?.service
        
                  : "")
            }
            // label="Product"
          />
        </Grid> 
        <Grid item xs={6}>
          <SearchableSelect
            name={`services.${i}.selectedService`}
            useId={true}
            options={myServices}
            id="services"
            title={"Choose Service"}
          />
        </Grid>
        {/* <Grid item xs={6}>
          <CustomSelect
            name={`services.${i}.selectedService`}
            useId={true}
            options={products}
            id="products"
            label="Choose Products"
          />
        </Grid> */}

        <Grid item xs={6}>
          <CustomTextField name={`services.${i}.serial_number`} label="Serial Number" />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            name={`services.${i}.invoice_number`}
            label="Invoice Number"
            disabled
            value={(services.invoice_number = values.invoice_number)}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            name={`services.${i}.created_at`}
            label="Date"
            disabled
            value={(services.created_at = values.created_at)}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField name={`services.${i}.amount_deposited`} label="Amount Deposited" />
        </Grid>
        <Grid item xs={6} style={{ display: "none" }}>
          <CustomTextField
            name={`services.${i}.service_id`}
            disabled
            value={
              (services.product_id =
                services.selectedService != "" && retrieveServiceById != []
                  ? retrieveServiceById[0]?._id
              
                  : "")
            }
            label="Service Id"
          />
        </Grid>
       

        <Grid item xs={6}>
          <CustomTextField
            name={`services.${i}.selling_price`}
            label="Selling Price Per Unit"
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextField
            name={`services.${i}.amount`}
            label="Amount"
              disabled={true}
            value={
              services.selectedService != "" && retrieveServiceById != []
                ? (services.amount = services.selling_price)
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
          alignservices: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Add Service Payment Deposit
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Home
          </Button>
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Service Deposit
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardHeader title="Add Service Payment Deposit" />
          <Divider />
          <CardContent>
            <Box sx={{ maxWidth: 800 }}>
              <Formik
                initialValues={INITIAL_FORM_VALUES}
                validationSchema={FORM_VALIDATIONS}
                enableReinitialize={false}
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

                      <FieldArray name="services">
                        {() =>
                          values.services.map((service, index) =>
                            RenderComponentForm({
                              values: values,
                              services: service,
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
                            (values.total_amount = values.services.reduce((a, c) => a + c.amount, 0))
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
                          <Field name="number of services">
                            {({ field }) => (
                              <Button
                                variant="contained"
                                fullWidth={true}
                                color="primary"
                                disabled={loading ? true : false}
                                onClick={() => addMoreservices(values, setValues)}
                                startIcon={<DownloadIcon fontSize="small" />}
                              >
                                Add More Service
                              </Button>
                            )}
                          </Field>
                        </Grid>
                        <Grid item xs={6}>
                          <Field name="number of services">
                            {({ field }) => (
                              <Button
                                variant="contained"
                                fullWidth={true}
                                disabled={loading ? true : false}
                                color="primary"
                                onClick={() => removeservices(values, setValues)}
                                startIcon={<DownloadIcon fontSize="small" />}
                              >
                                Remove Service
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
