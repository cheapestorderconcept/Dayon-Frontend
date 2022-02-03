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
import PhoneIcon from "@mui/icons-material/Phone";

import { CustomTextField } from "../basicInputs";
import { CustomButton } from "../basicInputs";
import { addStore, updateStore } from "src/statesManagement/store/actions/store-outlet-action";
import { Router, useRouter } from "next/router";
import { useContext } from "react";
import { useSnackbar } from "notistack";
import { Store } from "src/statesManagement/store/store";

export const AddStoreOutlets = (props) => {
  const { edit, id, branch } = props;
  let oneBranch = [];
  oneBranch = branch.filter((brch) => brch._id === id);

  const { dispatch, state } = useContext(Store);
  const { loading } = state;
  const { enqueueSnackbar } = useSnackbar();

  const Router = useRouter();

  const handleSubmit = (values) => {
    addStore({
      dispatch: dispatch,
      store: values,
      Router: Router,
      enqueueSnackbar: enqueueSnackbar,
    });
    console.log(values);
  };

  const handleUpdate = (values) => {
    updateStore({
      dispatch: dispatch,
      storeID: id,
      store: values,
      Router: Router,
      enqueueSnackbar: enqueueSnackbar,
    });
  };

  const INITIAL_FORM_STATE = {
    branch_name:
      oneBranch.length > 0 && typeof oneBranch[0] != "undefined" ? oneBranch[0].branch_name : "",
    address: oneBranch.length > 0 && typeof oneBranch[0] != "undefined" ? oneBranch[0].address : "",
    manager_name:
      oneBranch.length > 0 && typeof oneBranch[0] != "undefined" ? oneBranch[0].manager_name : "",
    manager_phone:
      oneBranch.length > 0 && typeof oneBranch[0] != "undefined" ? oneBranch[0].manager_phone : "",
  };

  const FORM_VALIDATIONS = yup.object().shape({
    branch_name: edit ? yup.string() : yup.string().required("Please input Store Name"),
    address: edit ? yup.string() : yup.string().required("Please input Store Address"),
    manager_name: edit ? yup.string() : yup.string().required("Please inpu name of manager"),
    manager_phone: edit
      ? yup.number().integer().typeError("Please enter a valid phone number")
      : yup
          .number()
          .integer()
          .typeError("Please enter a valid phone number")
          .required("Please enter Phone number"),
  });
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
          {edit ? "Edit Store" : "Add Store"}
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Home
          </Button>
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Store Outlets
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardHeader title="Add Store Outlets" />
          <Divider />
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <Formik
                initialValues={INITIAL_FORM_STATE}
                onSubmit={edit ? handleUpdate : handleSubmit}
                enableReinitialize={true}
                validationSchema={FORM_VALIDATIONS}
              >
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CustomTextField
                        name="branch_name"
                        label="Store Name"
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
                              <HomeIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomTextField
                        name="manager_name"
                        label="Manager/Contact Person"
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
                        name="manager_phone"
                        label="Phone"
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
