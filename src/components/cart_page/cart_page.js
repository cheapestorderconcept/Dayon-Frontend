import Head from "next/head";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { AddSales } from "src/components/sales/add-sales";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import { Store } from "src/statesManagement/store/store";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { getProduct } from "src/statesManagement/store/actions/product-action";
import { COMPANY_NAME } from "src/utils/company_details";

import { addToCart, removeFromCartAction } from "src/statesManagement/store/actions/cart_action";
import ProductSalesTable from "../product/product-sales-table";
import { CustomTextField } from "../basicInputs";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

export const CartPage = ({ Submit, values }) => {
  const { dispatch, state } = useContext(Store);
  const router = useRouter();
  const { userInfo, products, cart, loading } = state;
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    !userInfo && router.push("/auth");
    getProduct({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
  }, []);

  const [qValue, setqValue] = useState(0);
  const [barcode, setbarcode] = useState(null);
  const updateCartHandler = (item, qty) => {
    const actPro = products.filter((pro) => pro._id === item._id);
    if (actPro.length === 0) {
      return;
    }
    if (actPro[0].current_product_quantity < qty) {
      window.alert("Sorry,  Product is out of stock");
      return;
    }
    addToCart({ dispatch: dispatch, product: { ...item, quantity: qty } });
  };

  const removeFromCart = (item) => {
    removeFromCartAction({ dispatch: dispatch, product: item });
  };

  // const handleBarcodeSubmit = (e) => {
  //   console.log(barcode);
  //   e.preventDefault();
  // };
  // const onChange = (e) => {
  //   setbarcode(e.target.value);
  //   console.log(e);
  // };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        {/* <form onSubmit={handleBarcodeSubmit}>
          <CustomTextField
            name="scan_barcode"
            label="Scan Barcode"
            onChange={onChange}
            value={barcode}
            style={{
              width: "350px",
            }}
          />
        </form> */}
        <Container maxWidth={true}>
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <ProductSalesTable products={products} />
            </Grid>
            <Grid item xs={5} sx={{ padding: "10px" }}>
              <Paper
                sx={{
                  padding: "50px",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    marginTop: "10px",
                    marginBottom: "20px",
                  }}
                >
                  Cart Items ( ₦
                  {cart.cartItems.reduce(
                    (a, c) => a + Number(c.selling_price) * Number(c.quantity),
                    0
                  )}
                  )
                </Typography>
                <Container
                  sx={{
                    maxHeight: "400px",
                    overflowY: "scroll",
                  }}
                >
                  {cart.cartItems.length === 0 && (
                    <Typography variant="h6">No items in cart, please add some </Typography>
                  )}
                  {cart.cartItems.map((item) => (
                    <Grid
                      key={item._id}
                      container
                      spacing={2}
                      sx={{
                        padding: "10px",
                        marginBottom: "15px",
                      }}
                    >
                      <Grid item sx={4}>
                        <Typography variant="subtitle1"> {item.product_name}</Typography>
                      </Grid>
                      <Grid item sx={4}>
                        <Typography variant="subtitle1"> ₦{item.selling_price}</Typography>
                      </Grid>

                      <Grid item sx={3}>
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <TextField
                            label="quantity"
                            type={"number"}
                            onChange={(e) => {
                              setqValue(e.target.value);
                              updateCartHandler(item, Number(e.target.value));
                            }}
                            fullWidth={false}
                            style={{
                              maxWidth: "120px",
                            }}
                          />

                          {/* <IconButton
                          onClick={() => updateCartHandler(item, item.quantity - 1)}
                          disabled={item.quantity === 1}
                          disableRipple={false}
                        >
                          <RemoveIcon />{" "}
                        </IconButton>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            marginRight: "10px",
                            marginLeft: "10px",
                          }}
                        >
                          {item.quantity}
                        </Typography> */}
                          {/* <IconButton
                          disableRipple={false}
                          onClick={() => updateCartHandler(item, item.quantity + 1)}
                        >
                          <AddIcon />{" "}
                        </IconButton> */}
                        </div>
                      </Grid>
                      <Grid item>
                        <IconButton disableRipple={false} onClick={() => removeFromCart(item)}>
                          <DeleteIcon />{" "}
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                </Container>
                {cart.cartItems.length > 0 && (
                  <Button
                    fullWidth={true}
                    variant="contained"
                    type="submit"
                    disabled={loading}
                    onClick={() => Submit(values)}
                  >
                    {" "}
                    Check Out
                  </Button>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
        {/* <Typography variant="h4">You have {cart.cartItems.length} items in cart</Typography> */}
      </Box>
    </>
  );
};
