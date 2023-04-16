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
import { CustomDate, CustomTextField, SearchableSelect } from "../basicInputs";
import ListIcon from "@mui/icons-material/List";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { CustomButton } from "../basicInputs";
import { useContext } from "react";
import { Store } from "src/statesManagement/store/store";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useSnackbar } from "notistack";
import {
  addCustomer,
  getCustomer,
  updateCustomer,
  updateCustomerPayment,
} from "src/statesManagement/store/actions/customer-action";
import { id } from "date-fns/locale";
import { generateInvoice, generateTodayDate } from "src/utils/helpers";

export const UpdatePaymentForm = (props) => {
  const { title } = props;

  const { dispatch, state } = useContext(Store);
  const { loading, customers, customer } = state;

  console.log(customer);

  const { enqueueSnackbar } = useSnackbar();
  const Router = useRouter();

  // customer = customers?.filter((cus) => cus?._id === cusId);

  const INITIAL_FORM_VALUES = {
    firstName: customer !== {} ? customer?.first_name : "",
    lastName: customer !== {} ? customer?.last_name : "",
    email: customer !== {} ? customer?.email : "",
    phoneNumber: customer !== {} ? customer?.phone_number : "",
    address: customer !== {} ? customer?.address : "",
    customer_id: "",
    customer_current_debt: customer !== {} ? Number(customer?.customer_current_debt) : 0,
    amountPaid: "",
    created_at: generateTodayDate(),
    invoice_number: generateInvoice(),
    payment_due: customer !== {} ? Number(customer?.customer_current_debt) : 0,
  };

  const FORM_VALIDATIONS = yup.object().shape({
    created_at: yup.date().required("please select date"),
    // firstName: customer
    //   ? yup.string()
    //   : yup.string().required("Please provide customer first name"),
    // lastName: customer ? yup.string() : yup.string().required("Please provide customer last name"),
    // email: customer
    //   ? yup.string().email("please provide valid email")
    //   : yup.string().required("Please enter customer email").email("please provide valid email"),
    // phoneNumber: customer
    //   ? yup.number().integer().typeError("Please enter a valid phone number")
    //   : yup
    //       .number()
    //       .integer()
    //       .typeError("Please enter a valid phone number")
    //       .required("Please enter Customer Phone number"),
    // customer_current_debt: customer
    //   ? yup.number().typeError("Please enter a customer_current_debt")
    //   : yup.number().typeError("Please enter a valid number as customer_current_debt"),
    // amountPaid: customer
    //   ? yup.number().typeError("Please enter a amount")
    //   : yup.number().typeError("Please enter a valid amount"),
    // paymentDue: customer
    //   ? yup.number().typeError("Please enter a amount")
    //   : yup.number().typeError("Please enter a valid amount"),

    // address: customer ? yup.string() : yup.string().required("Please enter customer Address"),
  });

  const fetchCustomerDetails = (values) => {
    // alert("clicked");
    console.log(values.customer_id);
    getCustomer({
      dispatch: dispatch,
      customerId: values.customer_id,
      enqueueSnackbar: enqueueSnackbar,
    });
  };

  const handleSubmit = (values) => {
    const Mycustomer = {
      amount_paid: values.amountPaid,
      customer_id: customer._id,
      invoice_number: values.invoice_number,
      created_at: values.created_at,
    };

    updateCustomerPayment({
      dispatch: dispatch,
      customer: Mycustomer,

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
              <Typography> Add Customer</Typography>
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
            <Box sx={{ maxWidth: 1000 }}>
              <Formik
                initialValues={{ ...INITIAL_FORM_VALUES }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  values.amountPaid === "" ? fetchCustomerDetails(values) : handleSubmit(values);
                  resetForm({ values: INITIAL_FORM_VALUES });
                  setSubmitting(false);
                }}
                enableReinitialize={true}
                // validationSchema={FORM_VALIDATIONS}
              >
                {({ values, setValues }) => (
                  <Form>
                    <Grid container spacing={4}>
                      <Grid item xs={4}>
                        <CustomDate name="created_at" />
                      </Grid>

                      <Grid item xs={4}>
                        <SearchableSelect
                          name="customer_id"
                          useId={true}
                          title="Choose a customer"
                          options={customers}
                          id="customers"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <CustomButton
                          type="submit"
                          onClick={() => fetchCustomerDetails(values)}
                          disabled={loading ? true : false}
                        >
                          Fetch Custmer Detail
                        </CustomButton>
                      </Grid>
                      {Object.keys(customer).length !== 0 && (
                        <>
                          <Grid item xs={6}>
                            <CustomTextField
                              name="firstName"
                              label="First Name"
                              disabled={true}
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
                              name="lastName"
                              label="Last Name"
                              disabled={true}
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
                              name="email"
                              label="Email"
                              disabled={true}
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
                              name="phoneNumber"
                              label="Phone Number"
                              disabled={true}
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
                              name="address"
                              label="Address"
                              disabled={true}
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
                              disabled={true}
                              name="customer_current_debt"
                              label="Customer Current Debt"
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
                              name="amountPaid"
                              label="Enter Amount Paid"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <ListIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          {values.amountPaid !== "" && (
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
                          )}
                          {values.amountPaid !== "" && (
                            <Grid item xs={6}>
                              <CustomTextField
                                name="payment_due"
                                label="Payment Due"
                                value={
                                  (values.payment_due = Number(
                                    values.customer_current_debt - values.amountPaid
                                  ))
                                }
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <ListIcon />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Grid>
                          )}
                          {/* <Grid item xs={12}> */}
                          {/* <CustomTextField
                          name="paymentDue"
                          label="Payment Due"
                          value={
                            (values.paymentDue = Number(
                              values.customer_current_debt - values.amountPaid
                            ))
                          }
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
                            <CustomButton
                              type="submit"
                              onClick={() => handleSubmit(values)}
                              disabled={loading ? true : false}
                            >
                              {" "}
                              {"Update Customer Payment"}
                            </CustomButton>
                          </Grid>
                        </>
                      )}
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
