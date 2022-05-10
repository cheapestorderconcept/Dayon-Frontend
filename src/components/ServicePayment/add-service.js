import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider, Grid, Typography
} from "@mui/material";
import { Field, FieldArray, Form, Formik } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useContext, useRef } from "react";
import { addServicePayment } from "src/statesManagement/store/actions/services-action";
import { Store } from "src/statesManagement/store/store";
import * as yup from "yup";
import { Download as DownloadIcon } from "../../icons/download";
import { Upload as UploadIcon } from "../../icons/upload";
import { CustomDate, CustomSelect, CustomTextField, SearchableSelect } from "../basicInputs";



export const AddService = (props) => {
  const { paymentType } = props;
  const { dispatch, state } = useContext(Store);
  const { loading, customers, servicePayment } = state;
  const { enqueueSnackbar } = useSnackbar();
  const Router = useRouter();
  
 

  const INITIAL_FORM_VALUES = {
    created_at: "",
    branch: Cookies.get("selectedBranch"),
    invoice_number: "",
    customer_name:"",
    // customer_id:"",
    total_amount: "",
    payment_type: "",
    services: [
      {
     
        service_name: "",
        selectedService: "",
        serial_number: "",
        invoice_number: "",
        created_at: "",
        service_id: "",
        cost_price: "",
        service_price: "",
        amount: "",
       
      },
    ],
  };

  const FORM_VALIDATIONS = yup.object().shape({
    // numOfservices: yup.string().required("Please enter number of services"),
    created_at: yup.date().required("please select date"),
    invoice_number: yup.string().required("please provide invoice number"),
    customer_name: yup.string(),
    // customer_id: yup.string(),
    store: yup.string().required("please select store"),
    payment_type: yup.string().required("please choose a payment method"),
    total_amount: yup.number().integer().typeError("Total amount must be a number"),
    services: yup.array().of(
      yup.object().shape({
  
        selectedService: yup.string(),
        product_id: yup.string(),
        service_name: yup.string(),
        serial_number: yup.string(),
        invoice_number: yup.string(),
        created_at: yup.date(),
        service_price: yup
          .number()
          .integer()
          .typeError("Price must be a number")
          .required("Please provide service price"),
        cost_price: yup
          .number()
          .integer()
          .typeError("Cost must be a number")
          .required("Please provide Cost price"),
        amount: yup.number().integer().typeError("Amount must be a number"),
       
      })
    ),
  });

  const addMoreservices = (values, setValues) => {
    const services = [...values.services];

    services.push({
    
      service_name: "",
      selectedService: "",
      serial_number: "",
      invoice_number: "",
      created_at: "",
      service_id: "",
      cost_price: "",

      service_price: "",
      amount: "",
    
    });

    setValues({ ...values, services });
  };

  const Submit = (values) => {
   console.log(values)
  //  addServicePayment({dispatch, enqueueSnackbar, service}) .
  
  };
  const removeservices = (values, setValues) => {
    const services = [...values.services];
    services.pop();
    setValues({ ...values, services });
  };

  const formRef = useRef(null);

  const RenderForm = ({ services, i, values }) => {

    const retrieveServiceById = servicePayment.filter((serv) => serv._id === services?.selectedService);

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
            name={`services.${i}.service_name`}
            disabled
            // label="Product"
            value={
              (services.product =
                services.selectedService != "" && retrieveServiceById != []
                  ? retrieveServiceById[0]?.service_name
                  : "")
            }
          />
        </Grid> 
        <Grid item xs={6}>
          <SearchableSelect
            name={`services.${i}.selectedService`}
            useId={true}
            options={[]}
            id="services"
            title="Choose Service"
          />
        </Grid>
        {/* <Grid item xs={6}>
          <CustomSelect
            name={`services.${i}.selectedProduct`}
            options={products}
            useId={true}
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

        <Grid item xs={6} style={{ display: "none" }}>
          <CustomTextField
            name={`services.${i}.service_id`}
            disabled
            value={
              (services.service_id =
                services.selectedService != "" && retrieveServiceById != []
                  ? retrieveServiceById[0]?._id
                  : "")
            }
            label="Service Id"
          />
        </Grid>
        <Grid item xs={6} style={{ display: "none" }}>
          <CustomTextField
            name={`services.${i}.cost_price`}
            disabled
            value={
              (services.cost_price =
                services.selectedService != "" && retrieveServiceById != []
                  ? retrieveServiceById[0]?.service_price
                  : "")
            }
            label="Cost price"
          />
        </Grid>
     

        <Grid item xs={6}>
          <CustomTextField
            name={`services.${i}.selling_price`}
            //values of selling price can also be set to default depends on usage
            label="Service Cost Price"
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextField
            name={`services.${i}.amount`}
            label="Amount Paid"
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
                       <Grid item xs={4}>
                        <CustomTextField name="cutomer_name" label="Enter Customer Name" />
                      </Grid>
                      {/* <Grid item xs={4}>
                        <CustomSelect name="customer_id"
                          label="Choose Customer"
                          options={customers}
                          id="customers"
                          useId={true} />
                      </Grid> */}
                        {/* <Grid item xs={4}>
                         <SearchableSelect
                          name="customer_id"
                         useId={true}
                         title="Choose a customer"
                          options={customers}
                         id="customers"
                         />
                       </Grid> */}
                      <Grid item xs={4}>
                        <CustomTextField name="branch" value={values.branch} />
                      </Grid>

                      <FieldArray name="services">
                        {() =>
                          values.services.map((service, index) =>
                            RenderForm({
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
                          label="Total Services Cost"
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
                                color="primary"
                                disabled={loading ? true : false}
                                fullWidth={true}
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
                                color="primary"
                                disabled={loading ? true : false}
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
