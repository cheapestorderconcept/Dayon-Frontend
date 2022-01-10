import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  Grid,
  CardHeader,
  Divider,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { Download as DownloadIcon } from "../../icons/download";
import { Formik, Form } from "formik";
import * as yup from "yup";
import ListIcon from "@mui/icons-material/List";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { CustomTextField } from "../basicInputs";
import { CustomButton } from "../basicInputs";
import { CustomSelect } from "../basicInputs";
import { useContext, useState } from "react";
import { Store } from "src/statesManagement/store/store";
import { useRouter } from "next/router";
import { registerStaff } from "src/statesManagement/store/actions/register-staff-action";
import AlertBox from "../alert";

const INITIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  role: "",
  branch: "",
};

const FORM_VALIDATIONS = yup.object().shape({
  firstName: yup.string().required("Please enter Firt Name"),
  lastName: yup.string().required("Please enter Last Name"),
  username: yup.string().required("Please enter staff username"),
  email: yup.string().required("Please enter staff email"),
  password: yup.string().required("Please enter supplier password"),
  role: yup.string().required("Please enter staff role"),
  branch: yup.string().required("Please choose staff branch"),
});

export const AddStaff = (props) => {
  const { branch } = props;
  const { dispatch, state } = useContext(Store);
  const { loading, error, notification, success } = state;

  const roles = [{ name: "Super Admin" }, { name: "Admin" }];

  const [openAlert, setopenAlert] = useState(true);
  error && console.log(error);
  const Router = useRouter();

  const handleSubmit = (values) => {
    const staff = {
      first_name: values.firstName,
      last_name: values.lastName,
      username: values.username,
      email: values.email,
      branch: values.branch,
      role: values.role,
      password: values.password,
    };

    registerStaff({ dispatch: dispatch, staff: staff, Router: Router });
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
          Staff
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Home
          </Button>
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Staff
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardHeader title="Add Staff" />
          <Divider />
          {notification && (
            <AlertBox
              message={error ? error : success.response_message}
              severity={error ? "error" : "success"}
              open={openAlert}
              setopen={setopenAlert}
            />
          )}
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <Formik
                initialValues={{ ...INITIAL_FORM_STATE }}
                onSubmit={handleSubmit}
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
                        name="username"
                        label="Username"
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
                        name="password"
                        label="Password"
                        type="password"
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
                      <CustomSelect name="role" label="Role" options={roles} />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomSelect name="branch" label="Branch" options={branch} />
                    </Grid>

                    <Grid item xs={12}>
                      <CustomButton>Submit</CustomButton>
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
