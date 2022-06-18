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

const INITIAL_FORM_VALUES = {
  date: "",
  invoiceNum: "",
  store: "",
  supplier: "",
  totalGoods: "",
  description: "",
};

const FORM_VALIDATIONS = yup.object().shape({
  store: yup.string().required("Please choose a store"),
  description: yup.string().required("Please provide description"),
  date: yup.date().required("Please enter date"),
  invoiceNum: yup
    .number()
    .integer()
    .typeError("Invoice number must be a number")
    .required("Please enter Invoice Number"),
  supplier: yup.string().required("Please choose a supplier"),
  totalGoods: yup
    .number()
    .integer()
    .typeError("Purchase Value must be a number")
    .required("Please enter Purchase Value"),
});
export const AddSupplierLedger = (props) => (
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
        Supplier Ledger
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
          Home
        </Button>
        <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
          Supplier Ledger
        </Button>
      </Box>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardHeader title="Add Supplier Ledger" />
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
                    <CustomTextField name="totalGoods" label="Total Goods" />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomSelect name="store" label="Select Store" options={stores} />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomSelect name="supplier" label="Supplier" options={suppliers} />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextField
                      name="description"
                      label="Description"
                      multiline={true}
                      rows={4}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <CustomButton>Submit</CustomButton>
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
