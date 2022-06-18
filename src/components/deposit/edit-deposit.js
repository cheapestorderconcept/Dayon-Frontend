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
import { CustomTextField, SearchableSelect } from "../basicInputs";
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
  const { branch, customers, paymentType, loading } = state;
  let oneDeposit = [];
  oneDeposit = deposits.filter((dep) => dep._id === id);
  const strDate = new Date(oneDeposit[0]?.created_at);
  function convert(strDate) {
    var date = new Date(strDate),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  const [barcode, setbarcode] = useState("");
  let itemsArray = [];

  // const publishItems = () => {
  //   if (oneDeposit.length > 0 && typeof oneDeposit[0] != "undefined") {
  //     for (let index = 0; index < oneDeposit[0].items.length; index++) {
  //       itemsArray.push({
  //         barcode: oneDeposit[0].items[index].barcode,
  //         product: oneDeposit[0].items[index].product,
  //         quantity: Number(oneDeposit[0].items[index].quantity),
  //         selling_price: oneDeposit[0].items[index].selling_price,
  //         product_id: oneDeposit[0].items[index].product_id,
  //       });
  //     }
  //   }
  // };
  // publishItems();

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
    barcode:
      oneDeposit.length > 0 && typeof oneDeposit[0] != "undefined" ? oneDeposit[0].barcode : "",
    product:
      oneDeposit.length > 0 && typeof oneDeposit[0] != "undefined" ? oneDeposit[0].product : "",
    quantity:
      oneDeposit.length > 0 && typeof oneDeposit[0] != "undefined" ? oneDeposit[0].quantity : "",
    selling_price:
      oneDeposit.length > 0 && typeof oneDeposit[0] != "undefined"
        ? oneDeposit[0].selling_price
        : "",
    serial_number:
      oneDeposit.length > 0 && typeof oneDeposit[0] != "undefined"
        ? oneDeposit[0].serial_number
        : "",
    product_id: "",
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
    customer_id: yup.string(),

    barcode: yup.string(),
    product_id: yup.string(),
    product: yup.string(),

    selling_price: yup.number().integer().typeError("Price must be a number"),
    quantity: yup.number().integer().typeError("Price must be a number"),
  });

  const { enqueueSnackbar } = useSnackbar();

  const Submit = (values) => {
    updateDeposit({
      dispatch: dispatch,
      deposit: values,
      enqueueSnackbar: enqueueSnackbar,
      depId: id,
    });
  };

  const formRef = useRef(null);

  useEffect(() => {
    getTotalDeposit({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
  }, []);

  // const RenderForm = ({ items, i }) => {
  //   setbarcode(items.barcode);

  //   return (
  //     <React.Fragment key={i}>
  //       <Grid
  //         sx={{
  //           mb: 2,
  //           mt: 2,
  //         }}
  //         item
  //         xs={12}
  //       >
  //         <Typography>Item {i + 1}</Typography>
  //       </Grid>

  //       {/* <Grid item xs={6}>
  //           <form onSubmit={(e) => e.preventDefault()}>
  //             <TextField
  //               name="barcodeNum"
  //               label="Scan Barcode"
  //               value={barcode}
  //               autoFocus={true}
  //               onChange={handleChange}
  //               InputProps={{
  //                 endAdornment: (
  //                   <InputAdornment position="end">
  //                     <ListIcon />
  //                   </InputAdornment>
  //                 ),
  //               }}
  //             />
  //           </form>
  //         </Grid> */}
  //       <Grid item xs={6}>
  //         <CustomTextField
  //           name={`items.${i}.barcode`}
  //           label="Barcode"
  //           disabled
  //           onKeyPress={(e) => {
  //             e.key === "Enter" && e.preventDefault();
  //           }}
  //           autoFocus={true}
  //           InputProps={{
  //             endAdornment: (
  //               <InputAdornment position="end">
  //                 <ListIcon />
  //               </InputAdornment>
  //             ),
  //           }}
  //         />
  //       </Grid>

  //       <Grid item xs={6}>
  //         <CustomTextField
  //           name={`items.${i}.product`}
  //           disabled
  //           // value={
  //           //   productByBarcode.length > 0 && typeof productByBarcode[i] != "undefined"
  //           //     ? (items.product_name = productByBarcode[i].product_name)
  //           //     : ""
  //           // }
  //           label="Product"
  //         />
  //       </Grid>

  //       <Grid item xs={6} style={{ display: "none" }}>
  //         <CustomTextField
  //           name={`items.${i}.product_id`}
  //           disabled
  //           value={
  //             productByBarcode.length > 0 && typeof productByBarcode[i] != "undefined"
  //               ? (items.product_id = productByBarcode[i]._id)
  //               : ""
  //           }
  //           label="Product"
  //         />
  //       </Grid>
  //       <Grid item xs={6}>
  //         <CustomTextField name={`items.${i}.quantity`} label="Quantity" />
  //         {productByBarcode.length > 0 && typeof productByBarcode[i] != "undefined"
  //           ? Number(items.quantity) > productByBarcode[i].current_product_quantity &&
  //             enqueueSnackbar("Quantity is out of stock", {
  //               variant: "error",
  //               preventDuplicate: true,
  //             })
  //           : null}
  //       </Grid>

  //       <Grid item xs={6}>
  //         <CustomTextField
  //           name={`items.${i}.selling_price`}
  //           //values of selling price can also be set to default depends on usage
  //           label="Selling Price Per Unit"
  //         />
  //       </Grid>

  //       {/* <Grid item xs={6}>
  //         <CustomTextField
  //           name={`items.${i}.amount`}
  //           label="Amount"
  //           value={
  //             productByBarcode.length > 0 && typeof productByBarcode[i] != "undefined"
  //               ? (items.amount = items.quantity * items.selling_price)
  //               : ""
  //           }
  //         />
  //       </Grid> */}
  //     </React.Fragment>
  //   );
  // };

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
                         {/*   <Grid item xs={4}>
                            <SearchableSelect
                              name="customer_id"
                              useId={true}
                              title="Choose a customer"
                              options={customers}
                              id="customers"
                           />
                         </Grid>
                     */}
                      <Grid
                        item
                        xs={6}
                        sx={{
                          mb: 2,
                          mt: 2,
                        }}
                      >
                        <CustomTextField name="barcode" label="Barcode" />
                      </Grid>
                      <Grid item xs={6}>
                        <CustomTextField name="product" disabled label="Product" />
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
                        <CustomTextField name="quantity" label="Quantity" />
                      </Grid>
                      <Grid item xs={6}>
                        <CustomTextField name="selling_price" label="Selling Price" />
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
