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
  const INITIAL_FORM_VALUES = {
    name: "Ola",
    username: "Dayon Consult",
    password: "1234",
  };

  return (
    <Formik initialValues={{ ...INITIAL_FORM_VALUES }} onSubmit={(values) => console.log(values)}>
      <Form>
        <Card>
          <CardHeader subheader="The information can be edited" title="Profile" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <CustomTextField name="name" label="Name" />
              </Grid>
              <Grid item md={6} xs={12}>
                <CustomTextField name="username" label="Username" />
              </Grid>
              <Grid item md={6} xs={12}>
                <CustomTextField name="password" label="Password" type="password" />
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
    </Formik>
  );
};
