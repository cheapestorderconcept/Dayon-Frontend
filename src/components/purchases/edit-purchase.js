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
import { updatePurchase } from "src/statesManagement/store/actions/purchase-action";
import { useRouter } from "next/router";
import Loading from "../loading/Loading";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";
import { SearchableSelect } from "../basicInputs";

export const EditPurchase = (props) => {
  const { suppliers, products, id } = props;
  console.log(suppliers);
  const { dispatch, state } = useContext(Store);
  const { loading, purchase } = state;

  const { enqueueSnackbar } = useSnackbar();

  const Router = useRouter();

  let onePurchase = [];
  onePurchase = purchase.filter((pur) => pur._id === id);

  const strDate = new Date(onePurchase[0]?.purchase_date);
  function convert(strDate) {
    var date = new Date(strDate),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  const INITIAL_FORM_VALUES = {
    purchase_date:
      onePurchase.length > 0 && typeof onePurchase[0] != "undefined" ? convert(strDate) : "",
    invoice_number:
      onePurchase.length > 0 && typeof onePurchase[0] != "undefined"
        ? onePurchase[0].invoice_number
        : "",
    branch:
      onePurchase.length > 0 && typeof onePurchase[0] != "undefined" ? onePurchase[0].branch : "",
    supplier:
      onePurchase.length > 0 && typeof onePurchase[0] != "undefined" ? onePurchase[0].supplier : "",
    product:
      onePurchase.length > 0 && typeof onePurchase[0] != "undefined"
        ? onePurchase[0].product_id
        : "",
    purchase_quantity:
      onePurchase.length > 0 && typeof onePurchase[0] != "undefined"
        ? onePurchase[0].purchase_quantity
        : "",
    discount:
      onePurchase.length > 0 && typeof onePurchase[0] != "undefined" ? onePurchase[0].discount : "",
    total_purchase_value:
      onePurchase.length > 0 && typeof onePurchase[0] != "undefined"
        ? onePurchase[0].total_purchase_value
        : "",
  };

  const FORM_VALIDATIONS = yup.object().shape({
    branch: yup.string().required("Please choose a store"),
    purchase_date: yup.date().required("Please enter date"),
    invoice_number: yup.string().required("Please Enter Invoice Number"),
    supplier: yup.string(),
    product: yup.string(),
    purchase_quantity: yup.number().typeError("Invoice number must be a number"),

    discount: yup.string(),
    total_purchase_value: yup.number().typeError("Purchase Value must be a number"),
  });

  //   const addMoreItems = (values, setValues) => {
  //     const items = [...values.items];

  //     items.push({
  //       invoice_number: "",
  //       supplier: "",
  //       product: "",
  //       purchase_quantity: "",
  //       discount: "",
  //       total_purchase_value: "",
  //     });

  //     setValues({ ...values, items });
  //   };

  //   const removeItems = (values, setValues) => {
  //     const items = [...values.items];
  //     items.pop();
  //     setValues({ ...values, items });
  //   };

  const handleSubmit = (values) => {
    updatePurchase({
      dispatch: dispatch,
      purchId: id,
      purchase: values,
      Router: Router,
      enqueueSnackbar: enqueueSnackbar,
    });
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
          Edit Purchase
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
          <CardHeader title="Edit Purchase" />
          <Divider />

          <CardContent>
            <Box sx={{ maxWidth: 800 }}>
              <Formik
                initialValues={INITIAL_FORM_VALUES}
                onSubmit={handleSubmit}
                enableReinitialize={true}
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

                      <Grid item xs={6}>
                        <CustomSelect
                          name={`supplier`}
                          label="Supplier"
                          id="suppliers"
                          options={suppliers}
                        />
                      </Grid>
                      {/* <Grid item xs={6}>
                        <SearchableSelect
                          name={"product"}
                          useId={true}
                          options={products}
                          id="products"
                        />
                      </Grid> */}
                      <Grid item xs={6}>
                        <CustomSelect
                          name={`product`}
                          label="Select Product"
                          id="products"
                          disabled
                          useId={true}
                          options={products}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <CustomTextField name={`purchase_quantity`} label="Quantity" />
                      </Grid>
                      <Grid item xs={6}>
                        <CustomTextField name={`discount`} label="Discount" />
                      </Grid>
                      <Grid item xs={6}>
                        <CustomTextField
                          name={`total_purchase_value`}
                          label="Total Purchase Value"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomButton disabled={loading ? true : false}> Update</CustomButton>
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
