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
import { useContext, useState } from "react";
import { Store } from "src/statesManagement/store/store";
import { useRouter } from "next/router";
import { addProduct, updateProduct } from "src/statesManagement/store/actions/product-action";
import AlertBox from "../alert";
import NextLink from "next/link";
import { useSnackbar } from "notistack";
import Loading from "../loading/Loading";

export const ProductListToolbar = (props) => {
  const INITIAL_FORM_VALUES = {
    name: "",
    price: "",
    selling_price: "",

    brand: "",
    barcode: "",
    supplier: "",
    current_product_quantity: "",
  };

  const FORM_VALIDATIONS = yup.object().shape({
    name: yup.string().required("Please provide product name"),
    brand: yup.string().required("Please provide product brand"),
    current_product_quantity: yup.number().typeError("Quantity must be a number"),
    barcode: yup.string(),
    price: yup
      .number()
      .typeError("Price must be a number")
      .required("Please provide product price"),
    selling_price: yup
      .number()
      .typeError("Selling Price must be a number")
      .required("Please provide product selling price"),

    supplier: yup.string().required("Please provide product supplier"),
  });

  const returnPercentageProfit = ({ cost_price, selling_price }) => {
    selling_price === "" ? (selling_price = 0) : (selling_price = selling_price);
    cost_price === "" ? (cost_price = 0) : (cost_price = cost_price);
    const profit = selling_price - cost_price;
    const overallGain = (profit / cost_price) * 100;
    return overallGain.toFixed(2);
  };

  const { title, suppliers, brands, edit } = props;
  const { dispatch, state } = useContext(Store);
  const { loading } = state;
  const { enqueueSnackbar } = useSnackbar();
  const Router = useRouter();

  // const [costPrice, setcostPrice] = useState("");
  // const [sellingPrice, setsellingPrice] = useState("");
  // const [calculatePercent, setcalculatePercent] = useState({ cost_price: "", selling_price: "" });

  const handleUpdate = (values) => {
    const product = {
      product_name: values.name,
      product_price: values.price,
      product_brand: values.brand,
      product_barcode: values.barcode,
      supplier: values.supplier,
      current_product_quantity: values.current_product_quantity,
    };

    updateProduct({ dispatch: dispatch, product: product, productId: id, Router: Router });
  };

  const handleSubmit = (values) => {
    const product = {
      product_name: values.name,
      product_price: values.price,
      selling_price: values.selling_price,
      product_brand: values.brand,
      product_barcode: values.barcode,
      supplier: values.supplier,
      current_product_quantity: values.current_product_quantity,
    };
    addProduct({
      dispatch: dispatch,
      product: product,
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
          Products
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Home
          </Button>
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            <NextLink href="/products">
              <Typography>{edit ? "Edit Products" : "Add Product"}</Typography>
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
                enableReinitialize={true}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  edit ? handleUpdate(values) : handleSubmit(values);
                  resetForm({ values: INITIAL_FORM_VALUES });
                  setSubmitting(false);
                }}
                validationSchema={FORM_VALIDATIONS}
              >
                {({ values }) => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <CustomTextField
                          name="name"
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
                          name="barcode"
                          label="Product Barcode"
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
                          name="price"
                          label="Cost Price"
                          // value={calculatePercent.cost_price}
                          // onChange={(e) =>
                          //   setcalculatePercent({
                          //     cost_price: e.target.value,
                          //     selling_price: calculatePercent.selling_price,
                          //   })
                          // }
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
                          name="selling_price"
                          label="Selling Price"
                          // value={calculatePercent.selling_price}
                          // onChange={(e) =>
                          //   setcalculatePercent({
                          //     selling_price: e.target.value,
                          //     cost_price: calculatePercent.cost_price,
                          //   })
                          // }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <ListIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      {(values.selling_price !== "" || values.price !== "") && (
                        <Grid item xs={12}>
                          <Typography>
                            {`You're selling with a ${
                              returnPercentageProfit({
                                cost_price: values.price,
                                selling_price: values.selling_price,
                              }) < 0
                                ? "loss of"
                                : "profit of"
                            }`}{" "}
                            <span
                              style={{
                                color:
                                  returnPercentageProfit({
                                    cost_price: values.price,
                                    selling_price: values.selling_price,
                                  }) < 0
                                    ? "red"
                                    : "green",
                                fontWeight: "bolder",
                              }}
                            >
                              {`${returnPercentageProfit({
                                cost_price: values.price,
                                selling_price: values.selling_price,
                              })} %`}
                            </span>
                          </Typography>
                        </Grid>
                      )}
                      <Grid item xs={12}>
                        <CustomTextField
                          name="current_product_quantity"
                          label="Quantity"
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
                          options={brands}
                          label="Brand Name"
                          id="brands"
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
                          id="suppliers"
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
                        <CustomButton disabled={loading ? true : false}>
                          {" "}
                          {edit ? "Update Product" : "Submit"}
                        </CustomButton>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
