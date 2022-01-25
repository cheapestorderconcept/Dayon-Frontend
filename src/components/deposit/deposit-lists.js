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
      name: "Edit",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button variant="contained">
              <NextLink
                href={`/deposit/${tableMeta.rowData[1]}`}
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
      name: "Deposit Id",
    },
    {
      name: "Invoice no",
    },
    {
      name: "Customer Name",
    },
    {
      name: "Amount Deposited",
    },
    {
      name: "Total Amount",
    },

    {
      name: "Payment Method",
    },
    {
      name: "Store Branch",
    },
    {
      name: "Date",
    },
    {
      name: "Amount To Balance",
    },
  ];

  const myDeposits = deposits.map((item) => Object.values(item));

  // const data = [...myDeposits];

  const newArray = myDeposits.map((arr) =>
    arr.filter((arr) => {
      return typeof arr !== "object";
    })
  );

  const itemsArray = myDeposits.map((arr) =>
    arr.filter((arr) => {
      if (typeof arr === "object") {
        return arr;
      }
    })
  );
  itemsArray.map((item) => console.log(item.length));

  const data = [...newArray];

  return (
    <>
      {ready == true && (
        <MUIDataTable title={"Lists Of Deposits"} data={data} columns={columns} options={options} />
      )}
    </>
  );
};

export default DepositList;
