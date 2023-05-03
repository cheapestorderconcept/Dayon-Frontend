import { Button, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import { deletePurchase } from "src/statesManagement/store/actions/purchase-action";
import { Store } from "src/statesManagement/store/store";
import { useSnackbar } from "notistack";
import {
  getCustomerDepositHistory,
  getCustomerPurchaseHistory,
  getCustomerTransactionsHistory,
} from "src/statesManagement/store/actions/customer-action";
import { useRouter } from "next/router";

const style = {
  cursor: "pointer",
};
const CustomerList = ({ customers, loading }) => {
  const [ready, setready] = useState(false);

  useEffect(() => {
    setready(true);
  }, []);
  const { dispatch } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();
  const Router = useRouter();

  const viewTransactionHistory = (tableMeta) => (e) => {
    const id = tableMeta.rowData[5];
    getCustomerTransactionsHistory({
      dispatch: dispatch,
      enqueueSnackbar: enqueueSnackbar,
      customerId: id,
      Router: Router,
    });
  };

  const viewDepositHistory = (tableMeta) => (e) => {
    console.log("hello");
    const id = tableMeta.rowData[5];
    getCustomerDepositHistory({
      dispatch: dispatch,
      enqueueSnackbar: enqueueSnackbar,
      customerId: id,
      Router: Router,
    });
  };

  const viewPurchaseHistory = (tableMeta) => (e) => {
    console.log("hello");
    const id = tableMeta.rowData[5];
    getCustomerPurchaseHistory({
      dispatch: dispatch,
      enqueueSnackbar: enqueueSnackbar,
      customerId: id,
      Router: Router,
    });
  };
  const columns = [
    {
      name: "FirstName",
      label: "First Name",
    },
    {
      name: "LastName",
      label: "Last Name",
    },
    {
      name: "Email",
      label: "Email",
    },

    {
      name: "Address",
      label: "Address",
    },
    {
      name: "branch",
      label: "Branch",
    },
    {
      name: "Transactions",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return loading ? (
            <Button disabled style={style} variant="contained" component={"h3"} color="primary">
              Transaction History
            </Button>
          ) : (
            <Typography
              style={style}
              variant="contained"
              component={"h3"}
              color="primary"
              onClick={viewTransactionHistory(tableMeta)}
            >
              Transaction History
            </Typography>
          );
        },
      },
    },
    // {
    //   name: "Purchases",
    //   options: {
    //     filter: true,
    //     sort: false,
    //     empty: true,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //      loading?
    //        (<Button disabled  style={style} variant="contained" component={"h3"} color="primary" >
    //               Purchase History
    //             </Button>):

    //         (  <Typography style={style}  component="h3" variant="contained" color="primary" onClick={viewPurchaseHistory(tableMeta)}  >
    //           Purchase History
    //           </Typography>)

    //       );
    //     },
    //   },
    // },
    // {
    //   name: "Deposits",
    //   options: {
    //     filter: true,
    //     sort: false,
    //     empty: true,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         loading?(<Button disabled  style={style} variant="contained" component={"h3"} color="primary" >
    //               Deposit History
    //             </Button>):
    //          ( <Typography style={style} variant="contained" component={"h3"} color="primary" onClick={viewDepositHistory(tableMeta)}>
    //               Deposit History
    //             </Typography>)

    //       );
    //     },
    //   },
    // },
    //  {
    //   name: "Deposits",
    //   options: {
    //     filter: true,
    //     sort: false,
    //     empty: true,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         loading?(<Button disabled  style={style} variant="contained" component={"h3"} color="primary" >
    //               Customer Update
    //             </Button>):
    //          (<NextLink href={`${tableMeta.rowData[5]}`}><Typography style={style} variant="contained" component={"h3"} color="primary" >
    //               Update Customer
    //             </Typography></NextLink> )

    //       );
    //     },
    //   },
    // },
  ];
  // console.log(purchase);
  // const myPurchase = purchase.map((purch) => Object.values(purch));

  const myCustomers = customers.map((cus, i) => {
    const strDate = new Date(cus?.createdAt);
    function convert(strDate) {
      var date = new Date(strDate),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }
    return {
      Transactions: `${cus._id}`,
      Deposits: `${cus._id}`,
      Purchases: `${cus._id}`,
      FirstName: `${cus.first_name}`,
      LastName: `${cus.last_name}`,
      Email: `${cus.email}`,
      PhoneNumber: `${cus.phone_number}`,
      Address: `${cus.address}`,
      branch: `${cus.branch}`,
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
          title={"Lists Of Registered Customers"}
          data={myCustomers}
          columns={columns}
          options={options}
        />
      )}
    </>
  );
};

export default CustomerList;
