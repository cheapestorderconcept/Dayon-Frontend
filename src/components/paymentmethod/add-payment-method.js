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
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { CustomTextField } from "../basicInputs";
import ListIcon from "@mui/icons-material/List";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { CustomSelect, CustomButton } from "../basicInputs";
import { brand } from "../../__mocks__/brand";
import { suppliers } from "src/__mocks__/supplier";
import { addPaymentMethod } from "src/statesManagement/store/actions/payment-type-action";
import { useContext } from "react";
import { Store } from "src/statesManagement/store/store";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

export const AddPaymentMethod = (props) => {
  const INITIAL_FORM_VALUES = {
    payment_type: "",
  };

  const FORM_VALIDATIONS = yup.object().shape({
    payment_type: yup.string().required("Please provide payment method"),
  });

  const { dispatch, state } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();
  const Router = useRouter();
  const handleSubmit = (values) => {
    addPaymentMethod({
      dispatch: dispatch,
      method: values,
      enqueueSnackbar: enqueueSnackbar,
      Router: Router,
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
          Payment Method
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Home
          </Button>
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Payment Method
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardHeader title="Add Payment Method" />
          <Divider />
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <Formik
                initialValues={INITIAL_FORM_VALUES}
                onSubmit={handleSubmit}
                validationSchema={FORM_VALIDATIONS}
              >
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CustomTextField
                        name="payment_type"
                        label="Add Payment Methhod"
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
