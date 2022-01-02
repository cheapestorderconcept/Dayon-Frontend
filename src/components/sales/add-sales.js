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
import { stores } from "../../__mocks__/stores";
import { suppliers } from "src/__mocks__/supplier";
import { products } from "src/__mocks__/products";
import { CustomDate } from "../basicInputs";
import { paymentMethods } from "src/__mocks__/paymentMethods";

const INITIAL_FORM_VALUES = {
  date: "",
  invoiceNum: "",
  store: "",
  product: "",
  quantity: "",
  pricePerUnit: "",
  paymentType: "",
  amount: "",
};

const FORM_VALIDATIONS = yup.object().shape({
  store: yup.string().required("Please choose a store"),
  date: yup.date().required("Please enter date"),
  invoiceNum: yup
    .number()
    .integer()
    .typeError("Invoice number must be a number")
    .required("Please enter Invoice Number"),
  product: yup.string().required("Please select a product"),
  quantity: yup
    .number()
    .integer()
    .typeError("Invoice number must be a number")
    .required("Please enter Invoice Number"),
  pricePerUnit: yup
    .number()
    .integer()
    .typeError("Price must be a number")
    .required("Please enter Price"),
  amount: yup
    .number()
    .integer()
    .typeError("Amount Value must be a number")
    .required("Please enter Amount Value"),
  paymentType: yup.string().required("Please select payment type"),
});
export const AddSales = (props) => (
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
          Import
        </Button>
        <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
          Export
        </Button>
        <Button color="primary" variant="contained">
          Add Sales
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
              onSubmit={(values) => console.log(values)}
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
                    <CustomSelect name="store" label="Select Store" options={stores} />
                  </Grid>

                  <Grid item xs={6}>
                    <CustomSelect name="product" label="Select Product" options={products} />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextField name="quantity" label="Quantity" />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextField name="pricePerUnit" label="Selling Price Per Unit" />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomSelect
                      name="paymentType"
                      label="Payment Type"
                      options={paymentMethods}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextField name="amount" label="Amount" />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomButton>Process Sale</CustomButton>
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
