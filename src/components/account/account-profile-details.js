import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { CustomTextField } from "../basicInputs";
import { CustomButton } from "../basicInputs";
import { Form, Formik } from "formik";

export const AccountProfileDetails = (props) => {
  const { profile } = props;
  console.log(profile.last_name);
  const INITIAL_FORM_VALUES = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  };

  return (
    <Formik
      initialValues={INITIAL_FORM_VALUES}
      enableReinitialize={true}
      onSubmit={(values) => console.log(values)}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Card>
            <CardHeader subheader="The information can be edited" title="Profile" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <CustomTextField
                    value={(values.firstName = profile.first_name)}
                    name="firstName"
                    // label="First Name"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <CustomTextField name="lastName" label="Last Name" />
                </Grid>
                <Grid item md={6} xs={12}>
                  <CustomTextField name="email" label="Email" />
                </Grid>
                <Grid item md={6} xs={12}>
                  <CustomTextField name="username" label="Username" />
                </Grid>
                <Grid item md={6} xs={12}>
                  <CustomTextField name="password" label="Password" />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                p: 2,
              }}
            >
              <CustomButton>Update</CustomButton>
            </Box>
          </Card>
        </Form>
      )}
    </Formik>
  );
};
