import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import { Button, Typography } from "@mui/material";

const DepositList = ({ deposits }) => {
  const [ready, setready] = useState(false);
  useEffect(() => {
    setready(true);
  }, []);

  const options = {
    filter: true,
    sort: true,
    responsive: "simple",
  };

  const columns = [
    {
      name: "update",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button variant="contained">
              <NextLink
                href={`/deposit/${tableMeta.rowData[0]}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Typography variant="body1" color="inherit">
                  Edit
                </Typography>
              </NextLink>
            </Button>
          );
        },
      },
    },
    {
      name: "invoice",
      label: "Invoice Number",
    },
    {
      name: "name",
      label: "Product",
    },
    {
      name: "barcode",
      label: "Product Barcode",
    },
    {
      name: "amount",
      label: "Amount Deposited",
    },
    {
      name: "price",
      label: "Selling Price",
    },

    {
      name: "quantity",
      label: "Quantity",
    },
    {
      name: "serial_number",
      label: "Serial Number",
    },
  ];

  // const myDeposits = deposits.map((item) => Object.values(item));
  console.log(deposits);

  const myDeposits = deposits.map((dep, i) => {
    return {
      delete: `${dep.product_id}`,
      update: `${dep.product_id}`,
      name: `${dep.product}`,
      barcode: `${dep.barcode}`,
      amount: `${dep.amount}`,
      price: `${dep.selling_price}`,
      invoice: `${dep.invoice_number}`,
      serial_number: `${dep.serial_number}`,
      quantity: `${dep.quantity}`,
    };
  });

  return (
    <>
      {ready == true && (
        <MUIDataTable
          title={"Lists Of Deposits"}
          data={myDeposits}
          columns={columns}
          options={options}
        />
      )}
    </>
  );
};

export default DepositList;
