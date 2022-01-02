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

const roles = [
  { id: 0, name: "Super Admin" },
  { id: 1, name: "Admin" },
];

const INITIAL_FORM_STATE = {
  name: "",
  username: "",
  password: "",
  role: "",
};

const FORM_VALIDATIONS = yup.object().shape({
  name: yup.string().required("Please enter Staff Name"),
  username: yup.string().required("Please enter staff username"),
  password: yup.string().required("Please enter supplier password"),
  role: yup.string().required("Please enter staff role"),
});

export const AddStaff = (props) => (
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
                      name="username"
                      label="Username"
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
                      name="password"
                      label="Password"
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
                    <CustomSelect name="role" label="Role" options={roles} />
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
