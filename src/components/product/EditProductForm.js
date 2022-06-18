import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider, Grid, Typography
} from "@mui/material";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useContext } from "react";
import { updateProduct } from "src/statesManagement/store/actions/product-action";
import { Store } from "src/statesManagement/store/store";
import * as yup from "yup";
import { Download as DownloadIcon } from "../../icons/download";
import { Upload as UploadIcon } from "../../icons/upload";
import { CustomButton, CustomSelect, CustomTextField } from "../basicInputs";

export const EditProductForm = (props) => {
  const { title, id } = props;

  const { dispatch, state } = useContext(Store);
  const { loading, suppliers, brands, products } = state;
  let oneProduct = [];
  oneProduct = products.filter((pro) => pro._id === id);

  const INITIAL_FORM_VALUES = {
    product_name:
      oneProduct.length > 0 && typeof oneProduct[0] != "undefined"
        ? oneProduct[0].product_name
        : "",
    price:
      oneProduct.length > 0 && typeof oneProduct[0] != "undefined"
        ? oneProduct[0].product_price
        : "",
        selling_price:
      oneProduct.length > 0 && typeof oneProduct[0] != "undefined"
        ? oneProduct[0].selling_price
        : "",
    product_brand:
      oneProduct.length > 0 && typeof oneProduct[0] != "undefined"
        ? oneProduct[0].product_brand
        : "",
    product_barcode:
      oneProduct.length > 0 && typeof oneProduct[0] != "undefined"
        ? oneProduct[0].product_barcode
        : "",
    supplier:
      oneProduct.length > 0 && typeof oneProduct[0] != "undefined" ? oneProduct[0].supplier : "",
    quantity:
      oneProduct.length > 0 && typeof oneProduct[0] != "undefined"
        ? oneProduct[0].current_product_quantity
        : "",
  };

  const FORM_VALIDATIONS = yup.object().shape({
    product_name: yup.string(),
    product_barcode: yup.string(),
    product_brand: yup.string(),
    supplier: yup.string(),
    price: yup.number().integer().typeError("Price must be a number"),
    selling_price: yup.number().integer().typeError("Selling Price must be a number"),
    quantity: yup.number().integer().typeError("Quantity must be a number"),
  });

  const Router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = (values) => {
    const product = {
      ...values,
      price: Number(values.price),
      selling_price: Number(values.selling_price),
      quantity: Number(values.quantity),
    };
    updateProduct({
      dispatch: dispatch,
      product: product,
      productId: id,
      Router,
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
              <Typography>Add Product</Typography>
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
                onSubmit={handleSubmit}
                enableReinitialize={true}
                validationSchema={FORM_VALIDATIONS}
              >
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CustomTextField name="product_name" label="Product Name" />
                    </Grid>

                    <Grid item xs={12}>
                      <CustomTextField name="product_barcode" label="Product Barcode" />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomSelect
                        name="product_brand"
                        id="brands"
                        label="Product Brand "
                        options={brands}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomSelect
                        name="supplier"
                        id="suppliers"
                        options={suppliers}
                        label="Supplier"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <CustomTextField name="price" label="Cost Price" />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomTextField name="selling_price" label="Selling Price" />
                    </Grid>
                    {/* <Grid item xs={12}>
                      <CustomTextField name="quantity" label="Quantity" />
                    </Grid> */}

                    <Grid item xs={12}>
                      <CustomButton disabled={loading ? true : false}> Update Product</CustomButton>
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
