import { Button, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import { deletePurchase } from "src/statesManagement/store/actions/purchase-action";
import { Store } from "src/statesManagement/store/store";
import { useSnackbar } from "notistack";


const PurchaseList = ({ purchase }) => {
  const [ready, setready] = useState(false);

  useEffect(() => {
    setready(true);
  }, []);
  const { dispatch } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();
  const handleDelete = (tableMeta) => (e) => {
    const validate = confirm("Are you sure you want to delete");
    if (!!validate) {
      const purchId = tableMeta.rowData[0];
      deletePurchase({
        dispatch: dispatch,
        purchId: purchId,
        enqueueSnackbar: enqueueSnackbar,
      });
    }
  };

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
      name: "update",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button variant="contained">
              <NextLink
                href={`/purchase/${tableMeta.rowData[1]}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Typography variant="body1" color="inherit">
                  Update
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
      name: "supplier",
      label: "Suppler",
    },
    {
      name: "product",
      label: "Product",
    },

    {
      name: "purch_qty",
      label: "Purchase Quantity",
    },
    {
      name: "total_purch_val",
      label: "Total Purchase Value",
    },
    {
      name: "discount",
      label: "Discount",
    },
    {
      name: "date",
      label: "Purchase Date",
    },
  ];
  // console.log(purchase);
  // const myPurchase = purchase.map((purch) => Object.values(purch));

  const myPurchase = purchase.map((purch, i) => {
    const strDate = new Date(purch?.purchase_date);
    function convert(strDate) {
      var date = new Date(strDate),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }
    return {
      delete: `${purch._id}`,
      update: `${purch._id}`,
      invoice: `${purch.invoice_number}`,
      supplier: `${purch.supplier}`,
      product: `${purch.product}`,
      purch_qty: `${purch.purchase_quantity}`,
      total_purch_val: `${purch.total_purchase_value}`,
      discount: `${purch.discount}`,
      date: convert(strDate),
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
          title={"Lists Of Purchases"}
          data={myPurchase}
          columns={columns}
          options={options}
        />
      )}
    </>
  );
};

export default PurchaseList;
