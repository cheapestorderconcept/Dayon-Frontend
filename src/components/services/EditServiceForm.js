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
import { updateService } from "src/statesManagement/store/actions/services-action";

export const EditServiceForm = (props) => {
  const { title, id } = props;

  const { dispatch, state } = useContext(Store);
  const { loading, services, serviceCategories } = state;
  let oneService = [];
  oneService = services?.services?.filter((ser) => ser._id === id);

  console.log(oneService);

  const INITIAL_FORM_VALUES = {
    service_name:
      oneService.length > 0 && typeof oneService[0] != "undefined"
        ? oneService[0].service_name
        : "",
    service_categories:
      oneService.length > 0 && typeof oneService[0] != "undefined"
        ? oneService[0].service_categories
        : "",
    service_price:
      oneService.length > 0 && typeof oneService[0] != "undefined"
        ? oneService[0].service_price
        : "",
  };

  const FORM_VALIDATIONS = yup.object().shape({
    service_name: yup.string(),
    service_price: yup.number().integer().typeError("Price must be a number"),
    service_categories: yup.string(),
  });

  const Router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = (values) => {
    const service = {
      ...values,
      service_price: Number(values.service_price),
    };
    updateService({
      dispatch: dispatch,
      service: service,
      serviceId: id,
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
          Services
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
          <CardHeader title="Edit Service" />
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
                      <CustomTextField name="service_price" label="Service Price" />
                    </Grid>

                    <Grid item xs={12}>
                      <CustomSelect
                        name="service_categories"
                        id="service_categories"
                        label="Services Category"
                        options={serviceCategories.categories}
                        useId={true}
                      />
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
