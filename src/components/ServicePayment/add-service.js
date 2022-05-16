import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider, Grid, Typography
} from "@mui/material";
import { Field, FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useContext, useRef } from "react";
import { addServicePayment } from "src/statesManagement/store/actions/services-action";
import { Store } from "src/statesManagement/store/store";
import { generateInvoice } from "src/utils/helpers";
import * as yup from "yup";
import { Download as DownloadIcon } from "../../icons/download";
import { Upload as UploadIcon } from "../../icons/upload";
import { CustomDate, CustomSelect, CustomTextField, SearchableSelect } from "../basicInputs";



export const AddService = (props) => {
  const { paymentType, serviceType } = props;
  const { dispatch, state } = useContext(Store);
  const { loading } = state;
  const { enqueueSnackbar } = useSnackbar();
  const Router = useRouter();



  const INITIAL_FORM_VALUES = {
    created_at: "",
    // branch: Cookies.get("selectedBranch"),
    invoice_number: generateInvoice(),
    total_amount: "",
    payment_type: "",
    service: [
      {
     
        service_name: "",
        service_category: "",
        invoice_number: "",
        created_at: "",
        amount_paid: "",
       
      },
    ],
  };

  const FORM_VALIDATIONS = yup.object().shape({
    created_at: yup.date().required("please select date"),
    invoice_number: yup.string().required("please provide invoice number"),
    payment_type: yup.string().required("please choose a payment method"),
    total_amount: yup.number().integer().typeError("Total amount must be a number"),
    service: yup.array().of(
      yup.object().shape({
        service_name: yup.string(),
        service_category: yup.string(),
        invoice_number: yup.string(),
        created_at: yup.date(),
        amount_paid: yup.number().integer().typeError("Amount must be a number"),
       
      })
    ),
  });

  const addMoreservice = (values, setValues) => {
    const service = [...values.service];

    service.push({
    
      service_category: "",
      service_name: "",
      invoice_number: "",
      created_at: "",
      amount_paid: "",
    
    });

    setValues({ ...values, service });
  };

  const Submit = (values) => {
   const service = {
        ...values,
        total_amount : `${values.total_amount}`,
   }
  
  //  addServicePayment({dispatch, enqueueSnackbar, service:service}) 

  };
  const removeservice = (values, setValues) => {
    const service = [...values.service];
    service.pop();
    setValues({ ...values, service });
  };

  const formRef = useRef(null);

  const RenderForm = ({ service, i, values }) => {

    const retrieveServiceById = serviceType?.filter((serv) => serv._id === service?.service_name);

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
            name={`service.${i}.service_category`}
            disabled
           
            value={
              (service.service_category =
                service.service_name != "" && retrieveServiceById != []
                  ? retrieveServiceById[0]?.service_categories
                  : "")
            }
          />
        </Grid> 
        <Grid item xs={6}>
          <SearchableSelect
            name={`service.${i}.service_name`}
            options={serviceType}
            id="service"
            title="Choose Service"
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            name={`service.${i}.invoice_number`}
            label="Invoice Number"
            disabled
            value={(service.invoice_number = values.invoice_number)}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            name={`service.${i}.created_at`}
            label="Date"
            disabled
            value={(service.created_at = values.created_at)}
          />
        </Grid>


        <Grid item xs={6}>
          <CustomTextField
            name={`service.${i}.amount_paid`}
            label="Amount Paid"
          
          />
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
          Render Service
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Home
          </Button>
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Service Payment
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardHeader title="Render Service" />
          <Divider />
          <CardContent>
            <Box sx={{ maxWidth: 800 }}>
              <Formik
                initialValues={INITIAL_FORM_VALUES}
                validationSchema={FORM_VALIDATIONS}
                onSubmit={Submit}
                innerRef={formRef}
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
                     

                      <FieldArray name="service">
                        {() =>
                          values.service.map((service, index) =>
                            RenderForm({
                              values: values,
                              service: service,
                              i: index,
                            })
                          )
                        }
                      </FieldArray>
                      <Grid item xs={6}>
                        <CustomTextField
                          name="total_amount"
                          label="Total service Cost"
                          disabled
                          value={
                            (values.total_amount = values.service.reduce((a, c) => a + Number(c.amount_paid), 0))
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
                          <Field name="number of service">
                            {({ field }) => (
                              <Button
                                variant="contained"
                                color="primary"
                                disabled={loading ? true : false}
                                fullWidth={true}
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
                                color="primary"
                                disabled={loading ? true : false}
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
                          Process Service Payment
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
