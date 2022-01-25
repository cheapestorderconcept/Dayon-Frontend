import { Button, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";

import NextLink from "next/link";
import { useEffect, useState } from "react";

const ProductTable = ({ products, editable }) => {
  const [ready, setready] = useState(false);

  useEffect(() => {
    setready(true);
  }, []);

  const columnsEditable = [
    {
      name: "Update Price",
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
                  Update Price
                </Typography>
              </NextLink>
            </Button>
          );
        },
      },
    },
    {
      name: "Update Quantity",
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
                  Update Quantity
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
