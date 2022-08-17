import { Button, IconButton, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import NextLink from "next/link";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { addToCart } from "src/statesManagement/store/actions/cart_action";
import { deleteProduct } from "src/statesManagement/store/actions/product-action";
import { Store } from "src/statesManagement/store/store";

const ProductSalesTable = ({ products }) => {
  const [ready, setready] = useState(false);

  useEffect(() => {
    setready(true);
  }, []);

  const { dispatch } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();

  const checkAvail = (tableMeta) => {
    const productIdArray = tableMeta.rowData;
    const product = { ...productIdArray };
    const actPro = products.filter((pro) => pro._id === product[0]);
    if (actPro[0].current_product_quantity > 0) {
      return false;
    }
    return true;
  };

  const handleAddToCart = (tableMeta) => (e) => {
    const productIdArray = tableMeta.rowData;
    const product = { ...productIdArray };
    const actPro = products.filter((pro) => pro._id === product[0]);

    addToCart({ dispatch: dispatch, product: { ...actPro[0], quantity: 1 } });
  };

  const columns = [
    {
      name: "add_to_cart",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButton onClick={handleAddToCart(tableMeta)} disabled={checkAvail(tableMeta)}>
              <AddShoppingCartIcon color={checkAvail(tableMeta) ? "" : "primary"} />
            </IconButton>
          );
        },
      },
    },

    {
      name: "name",
      label: "Product Name",
    },
    {
      name: "barcode",
      label: "Product Barcode",
    },
    // {
    //   name: "branch",
    //   label: "Branch",
    // },
    {
      name: "brand",
      label: "Product Brand",
    },
    // {
    //   name: "price",
    //   label: "Product Price",
    // },
    {
      name: "selling_price",
      label: "Selling Price",
    },
    {
      name: "current_qty",
      label: "Current Qty",
    },
  ];

  // const product = products.map((pro) => Object.values(pro));
  console.log(products);
  const product = products.map((pro, i) => {
    const strDate = new Date(pro?.created_at);
    function convert(strDate) {
      var date = new Date(strDate),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }
    return {
      add_to_cart: `${pro._id}`,
      name: `${pro.product_name}`,
      barcode: `${pro.product_barcode}`,
      branch: `${pro.branch}`,
      brand: `${pro.product_brand}`,
      //   price: `${pro.product_price}`,
      supplier: `${pro.supplier}`,
      current_qty: `${pro.current_product_quantity}`,
      date: convert(strDate),
      selling_price: `${pro.selling_price}`,
      // prev_qty: `${pro.previous_product_quantity}`,
    };
  });
  const handleSearch = (e) => {
    if (e.charCode === 13) {
      e.preventDefault();
    }
  };
  const options = {
    filter: true,
    sort: true,
    selectableRowsHeader: false,
    selectableRows: "none",
    responsive: "simple",
    searchAlwaysOpen: true,
    searchProps: {
      onKeyPress: handleSearch,
    },
  };

  return (
    <>
      {ready == true && (
        <MUIDataTable title={"Sales Products"} data={product} columns={columns} options={options} />
      )}
    </>
  );
};

export default ProductSalesTable;
