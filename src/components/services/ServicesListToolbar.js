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
import { addService, getService } from "src/statesManagement/store/actions/services-action";
import AlertBox from "../alert";
import NextLink from "next/link";
import { useSnackbar } from "notistack";
import Loading from "../loading/Loading";

export const ServicesListToolbar = (props) => {
  const INITIAL_FORM_VALUES = {
    name: "",
    category: "",
    price: "",
  };

  const FORM_VALIDATIONS = yup.object().shape({
    name: yup.string().required("Please provide service name"),
    category: yup.string().required("Please provide service category"),
    price: yup
      .number()
      .integer()
      .typeError("Price must be a number")
      .required("Please provide service price"),
  });

  const { title, categories, edit } = props;
  const { dispatch, state } = useContext(Store);
  const { loading, services } = state;
  const { enqueueSnackbar } = useSnackbar();
  const Router = useRouter();
  // console.log(services);

  const handleUpdate = (values) => {
    const services = {
      service_name: values.name,
      service_category: values.category,
      service_price: values.price,
    };

    //  getService({ dispatch: dispatch, product: product, productId: id, Router: Router });
  };

  const handleSubmit = (values) => {
    const services = {
      service_name: values.name,
      service_price: values.price,
      service_categories: values.category,
    };

    addService({
      dispatch: dispatch,
      service: services,
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
          Services Management
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Home
          </Button>
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            <NextLink href="/services">
              <Typography>{edit ? "Edit Services" : "Add Services"}</Typography>
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
                        label="Service Name"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <ListIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    {/* <Grid item xs={12}>
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
                    </Grid> */}
                    <Grid item xs={12}>
                      <CustomTextField
                        name="price"
                        label="Service Price"
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
                        name="category"
                        options={categories.categories}
                        label="Service Category"
                        id="service_categories"
                        useId={true}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <CustomButton> {edit ? "Update Service" : "Submit"}</CustomButton>
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
