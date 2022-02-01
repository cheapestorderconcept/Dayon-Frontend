import { Button, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";

import NextLink from "next/link";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { deleteProduct } from "src/statesManagement/store/actions/product-action";
import { Store } from "src/statesManagement/store/store";

const ProductTable = ({ products, editable }) => {
  const [ready, setready] = useState(false);

  useEffect(() => {
    setready(true);
  }, []);
  const { dispatch } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = (tableMeta) => (e) => {
    confirm("Are you sure you want to delete");
    const productId = tableMeta.rowData[0];
    console.log(productId);
    deleteProduct({
      dispatch: dispatch,
      productId: productId,

      enqueueSnackbar: enqueueSnackbar,
    });
  };

  const columnsEditable = [
    {
      name: "Update_Product",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button variant="contained">
              <NextLink
                href={`/purchase/stock/${tableMeta.rowData[0]}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Typography variant="body1" color="inherit">
                  Update Product
                </Typography>
              </NextLink>
            </Button>
          );
        },
      },
    },
    {
      name: "Update_Product",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button variant="contained">
              <NextLink
                href={`/purchase/stock/bal-stock-level/${tableMeta.rowData[0]}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Typography variant="body1" color="inherit">
                  Balance Stock Level
                </Typography>
              </NextLink>
            </Button>
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
    {
      name: "branch",
      label: "Branch",
    },
    {
      name: "brand",
      label: "Product Brand",
    },
    {
      name: "price",
      label: "Product Price",
    },
    {
      name: "supplier",
      label: "Supplier",
    },
    {
      name: "current_qty",
      label: "Current Qty",
    },
    {
      name: "prev_qty",
      label: "Previous Qty",
    },
  ];

  const columns = [
    {
      name: "delete",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button onClick={handleDelete(tableMeta)} variant="contained" color="error">
              <Typography variant="body1" color="inherit">
                Delete
              </Typography>
            </Button>
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
    {
      name: "branch",
      label: "Branch",
    },
    {
      name: "brand",
      label: "Product Brand",
    },
    {
      name: "price",
      label: "Product Price",
    },
    {
      name: "supplier",
      label: "Supplier",
    },
    {
      name: "current_qty",
      label: "Current Qty",
    },
    {
      name: "prev_qty",
      label: "Previous Qty",
    },
  ];

  // const product = products.map((pro) => Object.values(pro));
  // console.log(products);
  const product = products.map((pro, i) => {
    return {
      delete: `${pro._id}`,
      Update_Product: `${pro._id}`,
      name: `${pro.product_name}`,
      barcode: `${pro.product_barcode}`,
      branch: `${pro.branch}`,
      brand: `${pro.product_brand}`,
      price: `${pro.product_price}`,
      supplier: `${pro.supplier}`,
      current_qty: `${pro.current_product_quantity}`,
      prev_qty: `${pro.previous_product_quantity}`,
    };
  });

  const options = {
    filter: true,
    sort: true,
    selectableRowsHeader: false,
    responsive: "simple",
  };

  return (
    <>
      {ready == true && (
        <MUIDataTable
          title={"Lists Of Products"}
          data={product}
          columns={editable ? columnsEditable : columns}
          options={options}
        />
      )}
    </>
  );
};

export default ProductTable;
