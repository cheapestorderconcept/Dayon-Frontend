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

const INITIAL_FORM_VALUES = {
  productName: "",
  size: "",
  brand: "",
  costPrice: "",
  supplier: "",
};

const FORM_VALIDATIONS = yup.object().shape({
  productName: yup.string().required("Please provide product name"),
  size: yup.string().required("Please product size"),
  brand: yup.string().required("Please provide product brand"),
  costPrice: yup
    .number()
    .integer()
    .typeError("Price must be a number")
    .required("Please provide product price"),
  supplier: yup.string().required("Please provide product supplier"),
});
export const ProductListToolbar = (props) => (
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
          Products
        </Button>
        {/* <Button color="primary" variant="contained">
          Add products
        </Button> */}
      </Box>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardHeader title="Add Products" />
        <Divider />
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <Formik
              initialValues={INITIAL_FORM_VALUES}
              onSubmit={(values) => console.log(values)}
              validationSchema={FORM_VALIDATIONS}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CustomTextField
                      name="productName"
                      label="Product Name"
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
                      name="size"
                      label="Size"
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
                      name="costPrice"
                      label="Cost Price"
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
                    <CustomSelect
                      name="brand"
                      options={brand}
                      label="Brand Name"
                      // InputProps={{
                      //   endAdornment: (
                      //     <InputAdornment position="end">
                      //       <ListIcon />
                      //     </InputAdornment>
                      //   ),
                      // }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomSelect
                      name="supplier"
                      options={suppliers}
                      label="Supplier Name"
                      // InputProps={{
                      //   endAdornment: (
                      //     <InputAdornment position="end">
                      //       <ListIcon />
                      //     </InputAdornment>
                      //   ),
                      // }}
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
