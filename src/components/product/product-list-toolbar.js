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
import { Upload as UploadIcon } from "../../icons/upload";
import { CustomTextField } from "../basicInputs";
import ListIcon from "@mui/icons-material/List";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { CustomSelect, CustomButton } from "../basicInputs";
import { useContext, useState } from "react";
import { Store } from "src/statesManagement/store/store";
import { useRouter } from "next/router";
import { addProduct, updateProduct } from "src/statesManagement/store/actions/product-action";
import AlertBox from "../alert";
import NextLink from "next/link";
import { useSnackbar } from "notistack";
import Loading from "../loading/Loading";

export const ProductListToolbar = (props) => {
  const INITIAL_FORM_VALUES = {
    name: "",
    price: "",
    brand: "",
    barcode: "",
    supplier: "",
  };

  const FORM_VALIDATIONS = yup.object().shape({
    name: yup.string().required("Please provide product name"),
    brand: yup.string().required("Please provide product brand"),
    barcode: yup.string(),
    price: yup
      .number()
      .integer()
      .typeError("Price must be a number")
      .required("Please provide product price"),
    supplier: yup.string().required("Please provide product supplier"),
  });

  const { title, suppliers, brands, edit } = props;
  const { dispatch, state } = useContext(Store);
  const { loading } = state;
  const { enqueueSnackbar } = useSnackbar();
  const Router = useRouter();
  console.log(suppliers);

  const handleUpdate = (values) => {
    const product = {
      product_name: values.name,
      product_price: values.price,
      product_brand: values.brand,
      product_barcode: values.barcode,
      supplier: values.supplier,
    };

    updateProduct({ dispatch: dispatch, product: product, productId: id, Router: Router });
  };

  const handleSubmit = (values) => {
    const product = {
      product_name: values.name,
      product_price: values.price,
      product_brand: values.brand,
      product_barcode: values.barcode,
      supplier: values.supplier,
    };
    addProduct({
      dispatch: dispatch,
      product: product,
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
          Products
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Home
          </Button>
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            <NextLink href="/products">
              <Typography>{edit ? "Edit Products" : "Add Product"}</Typography>
            </NextLink>
          </Button>
          {/* <Button color="primary" variant="contained">
          Add products
        </Button> */}
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardHeader title={title} />
          <Divider />

          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <Formik
                initialValues={{ ...INITIAL_FORM_VALUES }}
                onSubmit={edit ? handleUpdate : handleSubmit}
                validationSchema={FORM_VALIDATIONS}
              >
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CustomTextField
                        name="name"
                        label="Product Name"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <ListIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomTextField
                        name="barcode"
                        label="Product Barcode"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <ListIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomTextField
                        name="price"
                        label="Cost Price"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <ListIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomSelect
                        name="brand"
                        options={brands}
                        label="Brand Name"
                        id="brands"
                        // InputProps={{
                        //   endAdornment: (
                        //     <InputAdornment position="end">
                        //       <ListIcon />
                        //     </InputAdornment>
                        //   ),
                        // }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomSelect
                        name="supplier"
                        options={suppliers}
                        id="suppliers"
                        label="Supplier Name"
                        // InputProps={{
                        //   endAdornment: (
                        //     <InputAdornment position="end">
                        //       <ListIcon />
                        //     </InputAdornment>
                        //   ),
                        // }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomButton> {edit ? "Update Product" : "Submit"}</CustomButton>
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
