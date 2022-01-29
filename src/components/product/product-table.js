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
    const productId = tableMeta.rowData[2];
    deleteProduct({
      dispatch: dispatch,
      productId: productId,

      enqueueSnackbar: enqueueSnackbar,
    });
  };

  const columnsEditable = [
    {
      name: "Update Product",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button variant="contained">
              <NextLink
                href={`/purchase/stock/${tableMeta.rowData[2]}`}
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
      name: "Balance Stock Level",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button variant="contained">
              <NextLink
                href={`/purchase/stock/bal-stock-level/${tableMeta.rowData[2]}`}
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
      name: "ID",
    },
    {
      name: "NAME",
    },
    {
      name: "COST PRICE",
    },
    {
      name: "BARCODE",
    },
    {
      name: "CURRENT QUANTITY",
    },
    {
      name: "PREVIOUS QUANTITY",
    },
    {
      name: "BRAND NAME",
    },
  ];

  const columns = [
    {
      name: "Delete",
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
      name: "ID",
    },
    {
      name: "NAME",
    },
    {
      name: "COST PRICE",
    },
    {
      name: "BARCODE",
    },
    {
      name: "CURRENT QUANTITY",
    },
    {
      name: "PREVIOUS QUANTITY",
    },
    {
      name: "BRAND NAME",
    },
  ];

  const product = products.map((pro) => Object.values(pro));

  const data = [...product];

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
          data={data}
          columns={editable ? columnsEditable : columns}
          options={options}
        />
      )}
    </>
  );
};

export default ProductTable;
