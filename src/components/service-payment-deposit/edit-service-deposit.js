import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider, Grid, Typography
} from "@mui/material";
import { Form, Formik } from "formik";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useRef } from "react";
import {
  getTotalDeposit
} from "src/statesManagement/store/actions/deposit-action";
import { updateServiceDeposit } from "src/statesManagement/store/actions/services-action";
import { Store } from "src/statesManagement/store/store";
import * as yup from "yup";
import { Download as DownloadIcon } from "../../icons/download";
import { Upload as UploadIcon } from "../../icons/upload";
import { CustomTextField } from "../basicInputs";

// console.log(barcodeInput)

export const EditServiceDepositView = (props) => {
  const { deposits, id } = props;
  const { dispatch, state } = useContext(Store);
  const { loading } = state;
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
//     created_at:
//       oneDeposit.length > 0 && typeof oneDeposit[0] != "undefined" ? convert(strDate) : "",
//  invoice_number:
//       oneDeposit.length > 0 && typeof oneDeposit[0] != "undefined"
//         ? oneDeposit[0].invoice_number
//         : "",
//     customer_name:
//       oneDeposit.length > 0 && typeof oneDeposit[0] != "undefined"
//         ? oneDeposit[0].customer_name
//         : "",
//     payment_type:
//       oneDeposit.length > 0 && typeof oneDeposit[0] != "undefined"
//         ? oneDeposit[0].payment_type
//         : "", 
//     service_name:
//       oneDeposit.length > 0 && typeof oneDeposit[0] != "undefined" ? oneDeposit[0].service_name : "",

//     service_category:
//       oneDeposit.length > 0 && typeof oneDeposit[0] != "undefined"
//         ? oneDeposit[0].service_category
//         : "",
     amount_paid:
      oneDeposit.length > 0 && typeof oneDeposit[0] != "undefined"
        ? oneDeposit[0]. amount_paid
        : "",
  
  };

  const FORM_VALIDATIONS = yup.object().shape({
    // created_at: yup.date().required("please select date"),
    // invoice_number: yup.string(),
    // payment_type: yup.string(),
    amount_paid: yup.number().integer().typeError("Amount must be a number"),
    // customer_name: yup.string(),
    // service_category: yup.string(),
    // service_name: yup.string(),
 
  });

  const { enqueueSnackbar } = useSnackbar();

  const Submit = (values) => {
   const deposit = {
     amount: values.amount_paid
   }
    updateServiceDeposit({dispatch, enqueueSnackbar, depId:id, deposit })
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
                      {/* <Grid item xs={4}>
                        <CustomDate name="created_at" />
                      </Grid>
                      <Grid item xs={4}>
                        <CustomTextField name="invoice_number" disabled label="Invoice Number" />
                      </Grid>
                      <Grid item xs={4}>
                        <CustomTextField name="customer_name" label="Customer Name" />
                      </Grid> */}
                      <Grid item xs={12}>
                        <CustomTextField name="amount_paid" label="Amount Deposited" />
                      </Grid>

                      {/* <Grid item xs={6}>
                        <CustomTextField name="service_category" disabled label="service category" />
                      </Grid>
                      <Grid item xs={6}>
                        <SearchableSelect
                          name="serivce_name"
                          title="Choose service"
                          options={[]}
                          id="services"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <CustomTextField name="serial_number" label="Serial Number" />
                      </Grid>
 
                      <Grid item xs={12}>
                        <CustomSelect
                          name="payment_type"
                          label="Payment Type"
                          id="paymentType"
                          options={paymentType}
                        />
                      </Grid> */}
                      <Grid item xs={12}>
                        <Button
                          fullWidth={true}
                          variant="contained"
                          type="submit"
                          disabled={loading ? true : false}
                          
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
