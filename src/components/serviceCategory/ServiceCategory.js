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
import { useSnackbar } from "notistack";
import { addServiceCategory } from "src/statesManagement/store/actions/services-action";

export const ServiceCategory = (props) => {
  const { title, id } = props;
  const { state, dispatch } = useContext(Store);

  const { loading, error,  } = state;
const categories = []
  let myCategory = [];

  myCategory = categories.filter((cat) => cat._id == id);
  const INITIAL_FORM_VALUES = {
    category_name: myCategory.length > 0 && typeof myCategory[0] != "undefined" ? myCategory[0].category_name : "",
  };

  const FORM_VALIDATIONS = yup.object().shape({
    category_name: yup.string().required("Please provide Category name"),
  });

  const Router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const handleUpdate = (values) => {
    const category = {
      categories_name: values.category_name,
    };
  
  };
  const handleSubmit = (values) => {
    const category = {
      categories_name: values.category_name,
    };
    console.log(category)
addServiceCategory({dispatch, enqueueSnackbar, category})
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
          Service Category
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Home
          </Button>
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            <NextLink href="/services/category" replace>
              <Typography>Category</Typography>
            </NextLink>
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardHeader title={title} />
          <Divider />

          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <Formik
                initialValues={INITIAL_FORM_VALUES}
                onSubmit={id != null ? handleUpdate : handleSubmit}
                enableReinitialize={true}
                validationSchema={FORM_VALIDATIONS}
              >
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CustomTextField
                        name="category_name"
                        label="Category Name"
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
                      <CustomButton disabled={loading ? true : false}>
                        {id != null ? "Update" : "Submit"}
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
