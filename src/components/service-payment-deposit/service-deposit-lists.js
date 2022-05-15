import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import { Button, Typography } from "@mui/material";

const ServiceDepositList = ({ serviceDeposits }) => {
  
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
                href={`/services/service-deposit/${tableMeta.rowData[0]}`}
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
      name: "customer_name",
      label: "Customer Name",
    },
    {
      name: "service_name",
      label: "Service Name",
    },
{
      name: "amount_to_pay",
      label: "Amount to pay",
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
      name: "branch",
      label: "Branch",
    },
  
    {
      name: "date",
      label: "Deposit Date",
    },
  ];

  // const myDeposits = deposits.map((item) => Object.values(item));
  console.log(serviceDeposits);

  const myDeposits = serviceDeposits?.map((dep, i) => {
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
      service_name: `${dep.service_name}`,
      amount_deposited: `${dep.amount_paid}`,
      amount_to_balance: `${dep.amount_to_balance}`,
      amount_to_pay: `${dep.amount_to_pay}`,
      customer_name: `${dep.customer_name}`,
      branch: `${dep.branch}`,
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
