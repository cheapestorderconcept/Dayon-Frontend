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
import { CustomSelect, CustomButton } from "../basicInputs";
import { stores } from "../../__mocks__/stores";
import { products } from "src/__mocks__/products";
import { CustomDate } from "../basicInputs";
import { paymentMethods } from "src/__mocks__/paymentMethods";
import { status } from "src/__mocks__/status";

const INITIAL_FORM_VALUES = {
  subdealerCode: "",
  storeName: "",
  phone: "",
  startTradingDate: "",
  stopTradingDate: "",
  status: "",
  contactPerson: "",
  address: "",
  note: "",
};

const FORM_VALIDATIONS = yup.object().shape({
  subdealerCode: yup.string().required("Please enter subdealer code"),
  storeName: yup.string().required("Please enter store name"),
  startTradingDate: yup.date().required("Please enter date"),
  stopTradingDate: yup.date().required("Please enter date"),
  phone: yup
    .number()
    .integer()
    .typeError("Phone number must be a number")
    .required("Please enter Phone Number"),
  status: yup.string().required("Please select status"),
  contactPerson: yup.string().required("Please provide contact person"),
  address: yup.string().required("Please provide address"),
  note: yup.string().required("Please add some notes"),
});
export const AddSubdealer = (props) => (
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
        Add Subdealer
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
          Import
        </Button>
        <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
          Export
        </Button>
      </Box>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardHeader title="Add Subdealer" />
        <Divider />
        <CardContent>
          <Box sx={{ maxWidth: 800 }}>
            <Formik
              initialValues={INITIAL_FORM_VALUES}
              onSubmit={(values) => console.log(values)}
              validationSchema={FORM_VALIDATIONS}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <CustomTextField
                      name="subdealercode"
                      label="Subdealer Code"
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
                  <Grid item xs={6}>
                    <CustomTextField
                      name="phone"
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
                  <Grid item xs={6}>
                    <CustomDate
                      name="startTradingDate"
                      placeholder="Start Trading Date"
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
                    <CustomDate
                      name="stopTradingDate"
                      label="Stop Trading Date"
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
                    <CustomSelect name="status" label="Status" options={status} />
                  </Grid>

                  <Grid item xs={6}>
                    <CustomTextField name="contactPerson" label="Contact Person" />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextField name="address" label="Address" />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextField name="note" label="Note" multiline={true} rows={4} />
                  </Grid>
                  <Grid item xs={6}>
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
