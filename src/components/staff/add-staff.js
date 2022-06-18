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
import {
  registerStaff,
  updateStaff,
} from "src/statesManagement/store/actions/register-staff-action";
import AlertBox from "../alert";
import { useSnackbar } from "notistack";

export const AddStaff = (props) => {
  const { branch, edit, id } = props;
  const { dispatch, state } = useContext(Store);
  const { loading, staff } = state;
  const { enqueueSnackbar } = useSnackbar();
  const roles = [{ name: "Operator" }, { name: "Auditor" }, { name: "Super Admin" }];
  let oneStaff = [];
  oneStaff = staff.filter((stf) => stf._id === id);
  const INITIAL_FORM_STATE = {
    firstName:
      oneStaff.length > 0 && typeof oneStaff[0] != "undefined" ? oneStaff[0].first_name : "",
    lastName: oneStaff.length > 0 && typeof oneStaff[0] != "undefined" ? oneStaff[0].last_name : "",
    username: oneStaff.length > 0 && typeof oneStaff[0] != "undefined" ? oneStaff[0].username : "",
    email: oneStaff.length > 0 && typeof oneStaff[0] != "undefined" ? oneStaff[0].email : "",
    password: oneStaff.length > 0 && typeof oneStaff[0] != "undefined" ? oneStaff[0].password : "",
    role: oneStaff.length > 0 && typeof oneStaff[0] != "undefined" ? oneStaff[0].role : "",
    branch: oneStaff.length > 0 && typeof oneStaff[0] != "undefined" ? oneStaff[0].branch : "",
  };

  const FORM_VALIDATIONS = yup.object().shape({
    firstName: edit ? yup.string() : yup.string().required("Please enter Firt Name"),
    lastName: edit ? yup.string() : yup.string().required("Please enter Last Name"),
    username: edit ? yup.string() : yup.string().required("Please enter staff username"),
    email: edit ? yup.string() : yup.string().required("Please enter staff email"),
    password: edit ? yup.string() : yup.string().required("Please enter supplier password"),
    role: edit ? yup.string() : yup.string().required("Please enter staff role"),
    branch: edit ? yup.string() : yup.string().required("Please choose staff branch"),
  });

  const Router = useRouter();

  const handleUpdate = (values) => {
    const staff = {
      first_name: values.firstName,
      last_name: values.lastName,
      username: values.username,
      email: values.email,
      branch: values.branch,
      role: values.role,
      password: values.password,
    };

    updateStaff({
      dispatch: dispatch,
      staff: staff,
      staffId: id,
      Router: Router,
      enqueueSnackbar: enqueueSnackbar,
    });
  };

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

    registerStaff({
      dispatch: dispatch,
      staff: staff,
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
          <CardHeader title={edit ? "Edit Staff" : "Add Staff"} />
          <Divider />

          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <Formik
                initialValues={{ ...INITIAL_FORM_STATE }}
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
                      <CustomSelect name="role" label="Role" id="roles" options={roles} />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomSelect name="branch" label="Branch" id="branch" options={branch} />
                    </Grid>

                    <Grid item xs={12}>
                      <CustomButton disabled={loading ? true : false}>
                        {edit ? "Update" : "Submit"}
                      </CustomButton>
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
