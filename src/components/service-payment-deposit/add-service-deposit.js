/** 
TODO: FIX DEPOSIT PAGE 
**/

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider, Grid, Typography
} from "@mui/material";
import { Field, FieldArray, Form, Formik } from "formik";
import { useSnackbar } from "notistack";
import React, { useContext, useRef } from "react";
import { addServiceDeposit } from "src/statesManagement/store/actions/services-action";
import { Store } from "src/statesManagement/store/store";
import { generateInvoice } from "src/utils/helpers";
import * as yup from "yup";
import { Download as DownloadIcon } from "../../icons/download";
import { Upload as UploadIcon } from "../../icons/upload";
import { CustomDate, CustomSelect, CustomTextField, SearchableSelect } from "../basicInputs";

// console.log(barcodeInput)

export const AddServiceDeposit = (props) => {
  const {paymentType, serviceType, customers} = props
  const { dispatch, state } = useContext(Store);
  const {loading } = state;
 

  const INITIAL_FORM_VALUES = {
    created_at: "",
    invoice_number: generateInvoice(),
    customer_name: "",
    payment_type: "",
    service: [
      {
        
        service_categories: "",
        service_name: "",
        amount_paid: "",
        amount_to_pay: "",
      
      },
    ],
  };

  const FORM_VALIDATIONS = yup.object().shape({
    created_at: yup.date().required("please select date"),
    invoice_number: yup.string().required("please provide invoice number"),
    payment_type: yup.string().required("please choose payment method "),
    customer_name: yup.string(),

    service: yup.array().of(
      yup.object().shape({
        service_categories: yup.string(),
        service_name: yup.string().required(),
        amount_to_pay: yup.number().integer().typeError("Amount to pay must be a number"),
        amount_paid: yup.number().integer().typeError("Amount paid must be a number"),
      })
    ),
  });

  const addMoreservice = (values, setValues) => {
    const service = [...values.service];

    service.push({
      service_categories: "",
        service_name: "",
        amount_paid: "",
        amount_to_pay: "",
   
    });

    setValues({ ...values, service });
  };

  // const Router = Router();

  const removeservice = (values, setValues) => {
    const service = [...values.service];
    service.pop();
    setValues({ ...values, service });
  };

  const { enqueueSnackbar } = useSnackbar();
  const Submit = (values) => {
    const deposit = {
      ...values
    }
   addServiceDeposit({dispatch, deposit, enqueueSnackbar})
  };

  const formRef = useRef(null);

  const RenderComponentForm = ({ service, i, values }) => {
   
    const retrieveServiceById = serviceType.filter((serv) => serv._id === service?.service_name);

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

       <Grid item xs={6} style={{display:"none"}}>
          <CustomTextField
            name={`service.${i}.service_categories`}
            disabled
            value={
              (service.service_categories =
                service.service_name != "" && retrieveServiceById != []
                  ? retrieveServiceById[0]?.service_categories
        
                  : "")
            }
            // label="Product"
          />
        </Grid> 
        <Grid item xs={6}>
          <SearchableSelect
            name={`service.${i}.service_name`}
            options={serviceType}
            id="service"
            title={"Choose Service"}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextField name={`service.${i}.amount_paid`} label="Amount Deposited" />
        </Grid>

        
        <Grid item xs={6}>
          <CustomTextField name={`service.${i}.amount_to_pay`} label="Amount to pay" />
        </Grid>
      
      </React.Fragment>
    );
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          alignservice: "center",
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
                      {/* <Grid item xs={4}>
                        <CustomTextField name="branch_id" value={values.branch_id} />
                      </Grid> */}
                      <Grid item xs={4}>
                        <CustomTextField name="invoice_number" label="Invoice Number" />
                      </Grid>
                    
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

                      <FieldArray name="service">
                        {() =>
                          values.service.map((service, index) =>
                            RenderComponentForm({
                              values: values,
                              service: service,
                              i: index,
                            })
                          )
                        }
                      </FieldArray>

                      {/* <Grid item xs={6}>
                        <CustomTextField
                          name="total_amount"
                          label="Total Purchase Amount"
                          disabled
                          value={
                            (values.total_amount = values.service.reduce((a, c) => a + c.amount, 0))
                          }
                        />
                      </Grid> */}
                      <Grid
                        container
                        spacing={2}
                        sx={{
                          mt: 2,
                          pl: 2,
                        }}
                      >
                        <Grid item xs={6}>
                          <Field name="number of service">
                            {({ field }) => (
                              <Button
                                variant="contained"
                                fullWidth={true}
                                color="primary"
                                disabled={loading ? true : false}
                                onClick={() => addMoreservice(values, setValues)}
                                startIcon={<DownloadIcon fontSize="small" />}
                              >
                                Add More Service
                              </Button>
                            )}
                          </Field>
                        </Grid>
                        <Grid item xs={6}>
                          <Field name="number of service">
                            {({ field }) => (
                              <Button
                                variant="contained"
                                fullWidth={true}
                                disabled={loading ? true : false}
                                color="primary"
                                onClick={() => removeservice(values, setValues)}
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
