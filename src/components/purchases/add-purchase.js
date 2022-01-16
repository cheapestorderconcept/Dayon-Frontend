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
} from "@mui/material";
import { Download as DownloadIcon } from "../../icons/download";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { CustomTextField } from "../basicInputs";
import ListIcon from "@mui/icons-material/List";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { CustomSelect, CustomButton } from "../basicInputs";
import { CustomDate } from "../basicInputs";
import { useContext, useState } from "react";
import { Store } from "src/statesManagement/store/store";
import AlertBox from "../alert";
import { addPurchase } from "src/statesManagement/store/actions/purchase-action";
import { useRouter } from "next/router";
import Loading from "../loading/Loading";

const INITIAL_FORM_VALUES = {
  date: "",
  invoiceNum: "",
  store: "",
  supplier: "",
  product: "",
  quantity: "",
  discount: "",
  totalPurchaseValue: "",
};

const FORM_VALIDATIONS = yup.object().shape({
  store: yup.string().required("Please choose a store"),
  date: yup.date().required("Please enter date"),
  invoiceNum: yup.string().required("Please Enter Invoice Number"),
  supplier: yup.string().required("Please choose a supplier"),
  product: yup.string().required("Please select a product"),
  quantity: yup
    .number()
    .integer()
    .typeError("Invoice number must be a number")
    .required("Please enter Invoice Number"),
  discount: yup.string().required("Please select discount"),
  totalPurchaseValue: yup
    .number()
    .integer()
    .typeError("Purchase Value must be a number")
    .required("Please enter Purchase Value"),
});
export const AddPurchase = (props) => {
  const { branch, suppliers, products } = props;

  const { dispatch, state } = useContext(Store);
  const { loading, error, success, notification } = state;

  const Router = useRouter();

  const handleSubmit = (values) => {
    const purchase = {
      purchase_date: values.date,
      invoice_number: values.invoiceNum,
      branch: values.store,
      supplier: values.supplier,
      product: values.product,
      purchase_quantity: values.quantity,
      discount: values.discount,
      total_purchase_value: values.totalPurchaseValue,
    };
    console.log(purchase);
    addPurchase(dispatch, purchase, Router);
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
          Add Purchase
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Home
          </Button>
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Purchase
          </Button>
          <Button color="primary" variant="contained">
            Add Products
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardHeader title="Add Purchase" />
          <Divider />

          <CardContent>
            <Box sx={{ maxWidth: 800 }}>
              <Formik
                initialValues={INITIAL_FORM_VALUES}
                onSubmit={handleSubmit}
                validationSchema={FORM_VALIDATIONS}
              >
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <CustomDate
                        name="date"
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
                        name="invoiceNum"
                        label="Invoice Number"
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
                      <CustomSelect name="store" label="Select Store" options={branch} />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomSelect name="supplier" label="Supplier" options={suppliers} />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomSelect name="product" label="Select Product" options={products} />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextField name="quantity" label="Quantity" />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextField name="discount" label="Discount" />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextField name="totalPurchaseValue" label="Total Purchase Value" />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomButton>{loading ? <Loading /> : "Submit"}</CustomButton>
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
