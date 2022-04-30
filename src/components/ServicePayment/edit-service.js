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
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { getProductByBarcode } from "src/statesManagement/store/actions/product-action";
import { Store } from "src/statesManagement/store/store";
import {
  addSales,
  addSalesData,
  updateSales,
} from "src/statesManagement/store/actions/sales-action";
import AlertBox from "../alert";
import { useSnackbar } from "notistack";
import {
  addDepositData,
  getTotalDeposit,
  updateDeposit,
} from "src/statesManagement/store/actions/deposit-action";
import { Router } from "next/router";
import { SearchableSelect } from "../basicInputs";

// console.log(barcodeInput)

export const EditServicePaymentView = (props) => {
  const { totalSales, id } = props;
  const { dispatch, state } = useContext(Store);

  const { branch, customers, paymentType, loading } = state;
  let oneSale = [];
  oneSale = totalSales.filter((sal) => sal._id === id);
  const strDate = new Date(oneSale[0]?.created_at);
  function convert(strDate) {
    var date = new Date(strDate),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }



  const INITIAL_FORM_VALUES = {
    created_at: oneSale.length > 0 && typeof oneSale[0] != "undefined" ? convert(strDate) : "",
    invoice_number:
      oneSale.length > 0 && typeof oneSale[0] != "undefined" ? oneSale[0].invoice_number : "",
    amount: oneSale.length > 0 && typeof oneSale[0] != "undefined" ? oneSale[0].amount : "",
    total_amount:
      oneSale.length > 0 && typeof oneSale[0] != "undefined" ? oneSale[0].total_amount : "",
    payment_type:
      oneSale.length > 0 && typeof oneSale[0] != "undefined" ? oneSale[0].payment_type : "",
    branch: oneSale.length > 0 && typeof oneSale[0] != "undefined" ? oneSale[0].branch : "",
  
    product: oneSale.length > 0 && typeof oneSale[0] != "undefined" ? oneSale[0].product : "",
    selling_price:
      oneSale.length > 0 && typeof oneSale[0] != "undefined" ? oneSale[0].selling_price : "",
    serial_number:
      oneSale.length > 0 && typeof oneSale[0] != "undefined" ? oneSale[0].serial_number : "",
       customer_name:
      oneSale.length > 0 && typeof oneSale[0] != "undefined"
        ? oneSale[0].customer_name
        : "",
  };

  const FORM_VALIDATIONS = yup.object().shape({
    created_at: yup.date(),
    invoice_number: yup.string(),
    branch: yup.string(),
    payment_type: yup.string(),
    amount: yup.number().integer().typeError("Amount must be a number"),
    total_amount: yup.number().integer().typeError("Total Amount must be a number"),

    product_id: yup.string(),
    product: yup.string(),

    selling_price: yup.number().integer().typeError("Price must be a number"),
   
  });

  const { enqueueSnackbar } = useSnackbar();

  const Submit = (values) => {
    console.log(values)
  };

  const formRef = useRef(null);


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
          Edit Service Payment
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
          <CardHeader title="Edit Service Payment" />
          <Divider />
          <CardContent>
            <Box sx={{ maxWidth: 800 }}>
              <Formik
                initialValues={{ ...INITIAL_FORM_VALUES }}
                validationSchema={FORM_VALIDATIONS}
                enableReinitialize={true}
                onSubmit={Submit}
                innerRef={formRef}
              >
                {({ errors, values, handleChange, setValues }) => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <CustomDate name="created_at" />
                      </Grid>
                      <Grid item xs={6}>
                        <CustomTextField name="branch" label="Branch" />
                      </Grid>
                      <Grid item xs={6}>
                        <CustomTextField name="invoice_number" disabled label="Invoice Number" />
                      </Grid>
                      <Grid item xs={4}>
                        <CustomTextField name="customer_name" label="Customer Name" />
                      </Grid>
                      {/* <Grid item xs={4}>
                      <CustomSelect  name="customer_id"label="Choose Customer" id="customers" useId={true} options={customers}/>
                      </Grid> */}
                       <Grid item xs={6}>
                          <SearchableSelect
                           name="customer_id"
                            useId={true}
                            title="Choose a customer"
                            options={customers}
                            id="customers"
                                />
                       </Grid>
                      <Grid item xs={6}>
                        <CustomTextField name="amount" label="Amount" />
                      </Grid>

                      {/* <Grid item xs={6}>
                        <CustomTextField name="barcode" label="Barcode" />
                      </Grid> */}
                      <Grid item xs={6}>
                        <CustomTextField name="product" disabled label="Service Name" />
                      </Grid>

                      {/* <Grid item xs={6}>
                        <CustomSelect
                          name="selectedProduct"
                          label="Choose Product"
                          options={products}
                          id="products"
                        />
                      </Grid> */}
                      <Grid item xs={6}>
                        <CustomTextField name="serial_number" label="Serial Number" />
                      </Grid>
                     
                      <Grid item xs={6}>
                        <CustomTextField name="selling_price" label="Service Cost" />
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
                          Update Service Payment
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
