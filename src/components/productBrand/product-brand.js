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
import { CustomButton } from "../basicInputs";
import { addBrand, updateBrand } from "src/statesManagement/store/actions/brand-action";
import { useContext, useState } from "react";

import AlertBox from "../alert";
import { useRouter } from "next/router";
import { Store } from "src/statesManagement/store/store";
import NextLink from "next/link";

const INITIAL_FORM_VALUES = {
  name: "",
};

const FORM_VALIDATIONS = yup.object().shape({
  name: yup.string().required("Please provide brand name"),
});
export const ProductBrand = (props) => {
  const { title, id } = props;
  const { state, dispatch } = useContext(Store);
  console.log(state.loading);
  const { loading, error, brands } = state;

  // console.log(id);
  let myBrand = {};
  if (id != null) {
    const brand = brands.filter((brand) => brand._id == id);
    myBrand = { ...brand[0] };
  }

  const [openAlert, setopenAlert] = useState(true);
  error && console.log(error);
  const Router = useRouter();

  const handleUpdate = (values) => {
    const brand = {
      brand_name: values.name,
    };
    updateBrand({ dispatch: dispatch, brand: brand, brandId: id, Router: Router });
  };
  const handleSubmit = (values) => {
    const brand = {
      brand_name: values.name,
    };
    addBrand(dispatch, brand, Router);
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
          Brand
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Home
          </Button>
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            <NextLink href="/products/brand" replace>
              <Typography>Brand</Typography>
            </NextLink>
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardHeader title={title} />
          <Divider />
          {error && (
            <AlertBox message={error} severity="error" open={openAlert} setopen={setopenAlert} />
          )}
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <Formik
                initialValues={INITIAL_FORM_VALUES}
                onSubmit={id != null ? handleUpdate : handleSubmit}
                validationSchema={FORM_VALIDATIONS}
              >
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CustomTextField
                        name="name"
                        label="Brand Name"
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
                      <CustomButton>{id != null ? "Update" : "Submit"}</CustomButton>
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
