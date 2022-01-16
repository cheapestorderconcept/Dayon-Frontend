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
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { getProductByBarcode } from "src/statesManagement/store/actions/product-action";
import { Store } from "src/statesManagement/store/store";
import { addSupplier } from "src/statesManagement/store/actions/supplier-action";
import { addSales } from "src/statesManagement/store/actions/sales-action";

// console.log(barcodeInput)

export const AddSales = (props) => {
  const { dispatch, state } = useContext(Store);
  const { products, branch, productByBarcode } = state;

  const [barcode, setbarcode] = useState("");

  const INITIAL_FORM_VALUES = {
    date: "",
    branch: "",
    invoiceNum: "",
    total_amount: 0,
    items: [
      { barcode: "", product: "", product_id: "", selling_price: "", amount: "", quantity: "" },
    ],
    // date: "",
    // invoiceNum: "",
    // store: "",
    // product: "",
    // quantity: "",
    // pricePerUnit: "",
    // paymentType: "",
    // amount: "",
    // barcodeInput: "",
  };

  const FORM_VALIDATIONS = yup.object().shape({
    numOfItems: yup.string().required("Please enter number of items"),
    date: yup.date().required("please select date"),
    invoiceNum: yup.string().required("please provide invoice number"),
    store: yup.string().required("please select store"),
    paymentType: yup.string().required("please choose a payment method"),
    items: yup.array().of(
      yup.object().shape({
        barcode: yup.string(),

        product_id: yup.string().required("please select a product"),

        selling_price: yup
          .number()
          .integer()
          .typeError("Price must be a number")
          .required("Please provide Selling price"),
        amount: yup.number().integer().typeError("Total must be a number"),
        quantity: yup
          .number()
          .integer()
          .typeError("Price must be a number")
          .required("Please provide product quantity"),
        total_amount: yup.number().integer(),
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
      amount: "",
      quantity: "",
      total_amount: "",
    });

    setValues({ ...values, items });
  };

  const Submit = (fields) => {
    console.log(JSON.stringify(fields));
  };

  // const handleSubmit = (values) => {
  //   console.log(values);
  // };
  let eee;
  const getCode = [];
  getCode.push(eee);

  const formRef = useRef(null);

  useEffect(() => {
    const timeOutId = setTimeout(() => getProductByBarcode(dispatch, barcode), 500);
    return () => clearTimeout(timeOutId);
  }, [barcode]);

  // const fetchData = (e) => {
  //   e.preventDefault();
  //   console.log(barcode);
  // };
  //   <Grid item xs={6}>
  //   <CustomDate
  //     name="date"
  //     InputProps={{
  //       endAdornment: (
  //         <InputAdornment position="end">
  //           <ListIcon />
  //         </InputAdornment>
  //       ),
  //     }}
  //   />
  // </Grid>

  // <Grid item xs={6}>
  // <CustomSelect name="store" label="Select Store" options={branch} />
  // </Grid>

  // <Grid item xs={6}>
  // <CustomSelect name="paymentType" label="Payment Type" options={paymentMethods} />
  // </Grid>
  //   <Grid item xs={6}>
  //   <CustomTextField
  //     name={`items.${i}.invoiceNum`}
  //     label="Invoice Number"
  //     InputProps={{
  //       endAdornment: (
  //         <InputAdornment position="end">
  //           <ListIcon />
  //         </InputAdornment>
  //       ),
  //     }}
  //   />
  // </Grid>
  const RenderForm = ({ items, i, handleChange }) => {
    setbarcode(items.barcode);
    const subAmount = items.quantity * items.selling_price;
    return (
      <>
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
      </>
    );
  };

  const eachPrice = [];
  const sumTotal = () => {
    const reducer = (prevValues, curValues) => Number(prevValues) + Number(curValues);
    const a = eachPrice.reduce(reducer);
    return a;
  };
  // sumTotal();
  // getProduct();
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
          Add Sales
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Home
          </Button>
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Sales
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardHeader title="Add Sales" />
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
                        <CustomDate name="date" />
                      </Grid>
                      <Grid item xs={4}>
                        <CustomTextField name="invoiceNum" label="Invoice Number" />
                      </Grid>
                      <Grid item xs={4}>
                        <CustomSelect name="branch" label="Branch" options={branch} />
                      </Grid>
                      <Grid item xs={4}>
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
                      <FieldArray name="items">
                        {() =>
                          values.items.map((item, i) => {
                            return <RenderForm items={item} i={i} handleChange={handleChange} />;
                          })
                        }
                      </FieldArray>
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

                      <Grid item xs={12}>
                        <button type="submit"> Process Sales</button>
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
