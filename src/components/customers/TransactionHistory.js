import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles/";
import { createTheme, Typography } from "@mui/material";

const TransactionHistory = ({ customerTransactions }) => {
  console.log("====================================");
  console.log(customerTransactions);
  console.log("====================================");
  const theme = createTheme({
    overrides: {
      MUIDataTable: {
        root: {
          backgroundColor: "#FF000",
        },
        paper: {
          boxShadow: "none",
        },
      },
      MUIDataTableBodyCell: {
        root: {
          backgroundColor: "#FF0000",
        },
      },
    },
  });

  const [ready, setready] = useState(false);

  useEffect(() => {
    setready(true);
  }, []);

  const columns = [
    {
      name: "created_at",
      label: "Transaction Date",
    },
    {
      name: "customer_fullname",

      label: "Full Name",
    },
    {
      name: "invoice_number",

      label: "Invoice Number",
    },

    {
      name: "total_amount_paid",
      label: "Total Amount Paid",
    },
    {
      name: "customer_current_debt",
      label: "Customer Current Debt ",
    },
    {
      name: "payment_due",
      label: "Payment Due ",
    },
  ];

  const myTransactions = customerTransactions.map((cus) => {
    const strDate = new Date(cus?.created_at);
    function convert(strDate) {
      var date = new Date(strDate),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }
    return {
      payment_due: `${cus.payment_due}`,
      customer_current_debt: `${cus.customer_current_debt}`,
      total_amount_paid: `${cus.total_amount_paid}`,
      invoice_number: `${cus.invoice_number}`,
      customer_fullname: `${cus.customer_fullname}`,
      created_at: `${convert(strDate)}`,
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
        <ThemeProvider theme={theme}>
          <MUIDataTable
            title={"Customer's Transactions"}
            data={myTransactions}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      )}
    </>
  );
};

export default TransactionHistory;
