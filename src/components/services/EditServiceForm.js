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
import { CustomButton, CustomSelect } from "../basicInputs";
import { useContext, useState } from "react";
import { Store } from "src/statesManagement/store/store";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { updateProduct } from "src/statesManagement/store/actions/product-action";
import { useSnackbar } from "notistack";

export const EditServiceForm = (props) => {
  const { title, id } = props;

  const { dispatch, state } = useContext(Store);

  const { loading, services, serviceCategories } = state;
  let oneService = [];
  oneService = services?.services?.filter((ser) => ser._id === id);

  console.log(oneService);

  const INITIAL_FORM_VALUES = {
    product_name:
      oneProduct.length > 0 && typeof oneProduct[0] != "undefined"
        ? oneProduct[0].product_name
        : "",
    price:
      oneProduct.length > 0 && typeof oneProduct[0] != "undefined"
        ? oneProduct[0].product_price
        : "",
    product_brand:
      oneProduct.length > 0 && typeof oneProduct[0] != "undefined"
        ? oneProduct[0].product_brand
        : "",
    // product_barcode:
    //   oneProduct.length > 0 && typeof oneProduct[0] != "undefined"
    //     ? oneProduct[0].product_barcode
    //     : "",
    supplier:
      oneProduct.length > 0 && typeof oneProduct[0] != "undefined" ? oneProduct[0].supplier : "",
    quantity:
      oneProduct.length > 0 && typeof oneProduct[0] != "undefined"
        ? oneProduct[0].current_product_quantity
        : "",
  };

  const FORM_VALIDATIONS = yup.object().shape({
    service_name: yup.string(),
    service_category: yup.string(),
    price: yup.number().integer().typeError("Price must be a number"),
  });

  const Router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = (values) => {
    const service = {
      ...values,
      price: Number(values.price),
      
    };
    // updateProduct({
    //   dispatch: dispatch,
    //   product: product,
    //   productId: id,
    //   Router: Router,
    //   enqueueSnackbar: enqueueSnackbar,
    // });
    console.log(service);
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
            <NextLink href="/services">
              <Typography>Add Services</Typography>
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
                      <CustomTextField name="service_name" label="Service Name" />
                    </Grid>

                    {/* <Grid item xs={12}>
                      <CustomTextField name="product_barcode" label="Product Barcode" />
                    </Grid> */}
                    <Grid item xs={12}>
                      <CustomSelect
                        name="service_category"
                        id="service-categories"
                        label="Services Category "
                        options={categories}
                      />
                    </Grid>
                 

                    <Grid item xs={12}>
                      <CustomTextField name="price" label="Service Price" />
                    </Grid>

                    <Grid item xs={12}>
                      <CustomButton disabled={loading ? true : false}> Update Service</CustomButton>
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
