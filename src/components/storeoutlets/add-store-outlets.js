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

const INITIAL_FORM_STATE = {
  storeName: "",
  address: "",
  manager: "",
  phone: "",
};

const FORM_VALIDATIONS = yup.object().shape({
  storeName: yup.string().required("Please input Store Name"),
  address: yup.string().required("Please input Store Address"),
  manager: yup.string().required("Please inpu name of manager"),
  phone: yup
    .number()
    .integer()
    .typeError("Please enter a valid phone number")
    .required("Please enter Phone number"),
});

export const AddStoreOutlets = (props) => (
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
        Stores
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
          Home
        </Button>
        <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
          Store Outlets
        </Button>
        <Button color="primary" variant="contained">
          Add Customers
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
              initialValues={{ ...INITIAL_FORM_STATE }}
              onSubmit={(values) => console.log(values)}
              validationSchema={FORM_VALIDATIONS}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CustomTextField
                      name="storeName"
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
                      name="manager"
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
                      name="phone"
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
