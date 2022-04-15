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
import {  CustomButton } from "../basicInputs";
import { useContext } from "react";
import { Store } from "src/statesManagement/store/store";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useSnackbar } from "notistack";
import { addCustomer, updateCustomer } from "src/statesManagement/store/actions/customer-action";
import { id } from "date-fns/locale";

export const CustomerRegisterationForm = (props) => {
  const { title, edit, cusId, customers } = props;
  const { dispatch, state } = useContext(Store);
  const { loading } = state;
  const { enqueueSnackbar } = useSnackbar();
  const Router = useRouter();


   let oneCustomer = [];
  oneCustomer = customers?.filter((cus) => cus?._id === cusId);
  

  const INITIAL_FORM_VALUES = {
    firstName: oneCustomer?.length > 0 && typeof oneCustomer[0] != "undefined" ? oneCustomer[0]?.first_name : "",
    lastName: oneCustomer?.length > 0 && typeof oneCustomer[0] != "undefined" ? oneCustomer[0]?.last_name : "",
    email: oneCustomer?.length > 0 && typeof oneCustomer[0] != "undefined" ? oneCustomer[0]?.email : "",
    phoneNumber: oneCustomer?.length > 0 && typeof oneCustomer[0] != "undefined" ? oneCustomer[0]?.phone_number : "",
    address: oneCustomer?.length > 0 && typeof oneCustomer[0] != "undefined" ? oneCustomer[0]?.address : "",
  };




  const FORM_VALIDATIONS = yup.object().shape({
    firstName: edit?yup.string():yup.string().required("Please provide customer first name"),
    lastName: edit?yup.string():yup.string().required("Please provide customer last name"),
    email: edit?yup.string().email("please provide valid email"):yup.string().required("Please enter customer email").email("please provide valid email"),
    phoneNumber:edit?yup.number().integer().typeError("Please enter a valid phone number"): yup
          .number()
          .integer()
          .typeError("Please enter a valid phone number")
          .required("Please enter Customer Phone number"),
    address:edit?yup.string(): yup.string().required("Please enter customer Address"),
  });






  const handleUpdate = (values) => {
      
  const customer = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone_number: values.phoneNumber,
      address: values.address,
     
    };
    
    updateCustomer({dispatch:dispatch, customer:customer, customerId:cusId, enqueueSnackbar:enqueueSnackbar})
  };

  const handleSubmit = (values) => {
      
  const customer = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone_number: values.phoneNumber,
      address: values.address,
     
    };
    
    addCustomer({
      dispatch: dispatch,
      customer: customer,
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
          Customers
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Home
          </Button>
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            <NextLink href="/customers">
              <Typography>{edit ? "Edit Customer" : "Add Customer"}</Typography>
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
                 enableReinitialize={true}
                validationSchema={FORM_VALIDATIONS}
              >
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CustomTextField
                        name="firstName"
                        label="First Name"
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
                        name="lastName"
                        label="Last Name"
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
                        name="email"
                        label="Email"
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
                        name="phoneNumber"
                        label="Phone Number"
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
                        name="address"
                        label="Address"
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
                      <CustomButton disabled={loading?true:false}> {edit ? "Update Customer" : "Submit"}</CustomButton>
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
