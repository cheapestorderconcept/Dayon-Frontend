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
import { CustomButton, CustomSelect } from "../basicInputs";
import { useContext, useState } from "react";
import { Store } from "src/statesManagement/store/store";
import { useRouter } from "next/router";
import NextLink from "next/link";
import {
  balanceStockLevel,
  updateProduct,
} from "src/statesManagement/store/actions/product-action";
import { useSnackbar } from "notistack";

export const BalStockLevelStockForm = (props) => {
  const { title, id } = props;

  const { dispatch, state } = useContext(Store);
  const { loading, suppliers, brands } = state;

  const INITIAL_FORM_VALUES = {
    quantity: "",
  };

  const FORM_VALIDATIONS = yup.object().shape({
    quantity: yup.number().integer().typeError("Quantity must be a number"),
  });

  const Router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = (values) => {
    const product = {
      quantity: Number(values.quantity),
    };
    balanceStockLevel({
      dispatch: dispatch,
      product: product,
      productId: id,
      Router: Router,
      enqueueSnackbar: enqueueSnackbar,
    });
    console.log(product);
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
          Products
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Home
          </Button>
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            <NextLink href="/products">
              <Typography>Add Product</Typography>
            </NextLink>
          </Button>
          {/* <Button color="primary" variant="contained">
              Add products
            </Button> */}
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardHeader title={title} />
          <Divider />

          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <Formik
                initialValues={{ ...INITIAL_FORM_VALUES }}
                onSubmit={handleSubmit}
                validationSchema={FORM_VALIDATIONS}
              >
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CustomTextField name="quantity" label="Balance Stock Level" />
                    </Grid>

                    <Grid item xs={12}>
                      <CustomButton disabled={loading ? true : false}>
                        {" "}
                        Balance Stock Level
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
