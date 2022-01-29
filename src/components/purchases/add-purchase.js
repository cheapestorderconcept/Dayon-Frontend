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
import { Formik, Form, FieldArray, Field } from "formik";
import { CustomSelect, CustomButton } from "../basicInputs";
import { CustomDate } from "../basicInputs";
import { useContext, useState } from "react";
import { Store } from "src/statesManagement/store/store";
import AlertBox from "../alert";
import { addPurchase } from "src/statesManagement/store/actions/purchase-action";
import { useRouter } from "next/router";
import Loading from "../loading/Loading";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";

export const AddPurchase = (props) => {
  const { suppliers, products } = props;

  const { dispatch, state } = useContext(Store);
  const { loading } = state;

  const { enqueueSnackbar } = useSnackbar();

  const Router = useRouter();

  const INITIAL_FORM_VALUES = {
    purchase_date: "",
    invoice_number: "",
    branch: Cookies.get("selectedBranch"),

    items: [
      {
        supplier: "",
        product: "",
        purchase_quantity: "",
        discount: "",
        total_purchase_value: "",
      },
    ],
  };

  const FORM_VALIDATIONS = yup.object().shape({
    branch: yup.string().required("Please choose a store"),
    purchase_date: yup.date().required("Please enter date"),
    invoice_number: yup.string().required("Please Enter Invoice Number"),

    items: yup.array().of(
      yup.object().shape({
        supplier: yup.string().required("Please choose a supplier"),
        product: yup.string().required("Please choose a product"),
        purchase_quantity: yup
          .number()
          .integer()
          .typeError("Invoice number must be a number")
          .required("Please enter Invoice Number"),
        discount: yup.string(),
        total_purchase_value: yup
          .number()
          .integer()
          .typeError("Purchase Value must be a number")
          .required("Please enter Purchase Value"),
      })
    ),
  });

  const addMoreItems = (values, setValues) => {
    const items = [...values.items];

    items.push({
      supplier: "",
      product: "",
      purchase_quantity: "",
      discount: "",
      total_purchase_value: "",
    });

    setValues({ ...values, items });
  };

  const removeItems = (values, setValues) => {
    const items = [...values.items];
    items.pop();
    setValues({ ...values, items });
  };

  const handleSubmit = (values) => {
    console.log(values);
    addPurchase({
      dispatch: dispatch,
      purchase: values,
      Router: Router,
      enqueueSnackbar: enqueueSnackbar,
    });
  };

  const RenderForm = ({ items, i }) => {
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
        <Grid item xs={6}>
          <CustomSelect name={`items.${i}.supplier`} label="Supplier" options={suppliers} />
        </Grid>
        <Grid item xs={6}>
          <CustomSelect name={`items.${i}.product`} label="Select Product" options={products} />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField name={`items.${i}.purchase_quantity`} label="Quantity" />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField name={`items.${i}.discount`} label="Discount" />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField name={`items.${i}.total_purchase_value`} label="Total Purchase Value" />
        </Grid>
      </>
    );
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
                {({ errors, values, handleChange, setValues }) => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <CustomDate
                          name="purchase_date"
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
                          name="invoice_number"
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
                        <CustomTextField name="branch" value={values.branch} />
                      </Grid>
                      <FieldArray name="items">
                        {() =>
                          values.items.map((item, index) => (
                            <RenderForm key={index} items={item} i={index} />
                          ))
                        }
                      </FieldArray>
                      <Grid
                        container
                        spacing={2}
                        sx={{
                          mt: 2,
                          pl: 2,
                        }}
                      >
                        <Grid item xs={6}>
                          <Field name="number of items">
                            {({ field }) => (
                              <Button
                                variant="contained"
                                color="primary"
                                fullWidth={true}
                                onClick={() => addMoreItems(values, setValues)}
                                startIcon={<DownloadIcon fontSize="small" />}
                              >
                                Add More Products
                              </Button>
                            )}
                          </Field>
                        </Grid>
                        <Grid item xs={6}>
                          <Field name="number of items">
                            {({ field }) => (
                              <Button
                                variant="contained"
                                fullWidth={true}
                                color="primary"
                                onClick={() => removeItems(values, setValues)}
                                startIcon={<DownloadIcon fontSize="small" />}
                              >
                                Remove Products
                              </Button>
                            )}
                          </Field>
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <CustomButton disabled={loading ? true : false}> Submit</CustomButton>
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
