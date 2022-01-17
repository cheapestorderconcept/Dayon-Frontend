import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  SvgIcon,
  Typography,
  Grid,
  CardHeader,
  Divider,
} from "@mui/material";

import { Upload as UploadIcon } from "../../icons/upload";
import { Download as DownloadIcon } from "../../icons/download";
import { Formik, Form } from "formik";
import * as yup from "yup";
import ListIcon from "@mui/icons-material/List";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PhoneIcon from "@mui/icons-material/Phone";
import { CustomTextField } from "../basicInputs";
import { CustomButton } from "../basicInputs";
import { addSupplier, updateSupplier } from "src/statesManagement/store/actions/supplier-action";
import { useContext, useEffect, useState } from "react";
import { Store } from "src/statesManagement/store/store";

import NextLink from "next/link";
import { useRouter } from "next/router";
import AlertBox from "../alert";
import { useSnackbar } from "notistack";

const FORM_VALIDATIONS = yup.object().shape({
  name: yup.string().required("Please enter supllier Name"),
  address: yup.string().required("Please enter supllier Address"),
  email: yup.string().required("Please enter supplier email").email("please provide valid email"),
  contactPerson: yup.string().required("Please provide a contact person "),
  phone: yup
    .number()
    .integer()
    .typeError("Please enter a valid phone number")
    .required("Please enter Phone number"),
});

export const AddSuppliers = (props) => {
  const { title, id } = props;
  const { dispatch, state } = useContext(Store);
  const { loading, suppliers } = state;
  const { enqueueSnackbar } = useSnackbar();
  console.log(id);
  let mySupplier = {};
  if (id != null) {
    const supplier = suppliers.filter((sup) => sup._id == id);
    mySupplier = { ...supplier[0] };
  }

  const Router = useRouter();

  const handleUpdate = (values) => {
    const supplier = {
      supplier_name: values.name,
      supplier_address: values.address,
      supplier_phone: values.phone,
      supplier_email: values.email,
      contact_person: values.contactPerson,
    };
    updateSupplier({
      dispatch: dispatch,
      supplier: supplier,
      supId: id,
      Router: Router,
      enqueueSnackbar: enqueueSnackbar,
    });
  };
  const handleSubmit = (values) => {
    const supplier = {
      supplier_name: values.name,
      supplier_address: values.address,
      supplier_phone: values.phone,
      supplier_email: values.email,
      contact_person: values.contactPerson,
    };
    addSupplier({
      dispatch: dispatch,
      supplier: supplier,
      Router: Router,
      enqueueSnackbar: enqueueSnackbar,
    });
  };

  const populateForm = {
    name: mySupplier.supplier_name,
    address: mySupplier.supplier_address,
    email: mySupplier.supplier_email,
    phone: mySupplier.supplier_phone,
    contactPerson: mySupplier.contact_person,
  };

  console.log(populateForm);

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
          Suppliers
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Home
          </Button>
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            <NextLink href="/suppliers">
              <Typography>Supplier</Typography>
            </NextLink>
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardHeader title={title} />
          <Divider />

          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <Formik
                initialValues={{ ...populateForm }}
                onSubmit={id != null ? handleUpdate : handleSubmit}
                validationSchema={FORM_VALIDATIONS}
              >
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CustomTextField
                        name="name"
                        label="Name"
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
                        name="phone"
                        label="Phone"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <HomeIcon />
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
                              <AccountBoxIcon />
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
                              <PhoneIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomTextField
                        name="contactPerson"
                        label="Contact Person"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <PhoneIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomButton>{id != null ? "Update" : "Submit"}</CustomButton>
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
