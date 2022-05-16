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
import { updateService } from "src/statesManagement/store/actions/services-action";
import { Store } from "src/statesManagement/store/store";
import * as yup from "yup";
import { Download as DownloadIcon } from "../../icons/download";
import { Upload as UploadIcon } from "../../icons/upload";
import { CustomButton, CustomSelect, CustomTextField } from "../basicInputs";

export const EditServiceForm = (props) => {
  const { title, id } = props;

  const { dispatch, state } = useContext(Store);
  const { loading, services, serviceCategories } = state;

  let oneService = [];
  oneService = services?.filter((ser) => ser._id === id);



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