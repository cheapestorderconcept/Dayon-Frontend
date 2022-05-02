import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import { Button, Typography } from "@mui/material";

const ServiceDepositList = ({ deposits }) => {
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
                href={`/services/${tableMeta.rowData[0]}`}
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
      name: "customer_name",
      label: "Customer Name",
    },
    {
      name: "name",
      label: "Service",
    },
  
    {
      name: "price",
      label: "Service Price",
    },
    {
      name: "amount_deposited",
      label: "Amount Deposited",
    },
    {
      name: "amount_to_balance",
      label: "Amount To Balance",
    },
    {
      name: "total_amount",
      label: "Total Amount",
    },

    {
      name: "serial_number",
      label: "Serial Number",
    },
    {
      name: "date",
      label: "Deposit Date",
    },
  ];

  // const myDeposits = deposits.map((item) => Object.values(item));
  console.log(deposits);

  const myDeposits = deposits.map((dep, i) => {
    const strDate = new Date(dep?.created_at);
    function convert(strDate) {
      var date = new Date(strDate),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }
    return {
      delete: `${dep._id}`,
      update: `${dep._id}`,
      name: `${dep.product}`,
      amount_deposited: `${dep.amount_deposited}`,
      amount_to_balance: `${dep.amount_to_balance}`,
      price: `${dep.selling_price}`,
      invoice: `${dep.invoice_number}`,
      serial_number: `${dep.serial_number}`,
      total_amount: `${dep.total_amount}`,
      customer_name: `${dep.customer_name}`,
      date: convert(strDate),
    };
  });

  return (
    <>
      {ready == true && (
        <MUIDataTable
          title={"Lists Of Service Deposits"}
          data={myDeposits}
          columns={columns}
          options={options}
        />
      )}
    </>
  );
};

export default ServiceDepositList;
