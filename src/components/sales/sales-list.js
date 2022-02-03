import { Button, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { addSalesData, deleteSales } from "src/statesManagement/store/actions/sales-action";
import { Store } from "src/statesManagement/store/store";
import NextLink from "next/link";

const SalesList = ({ salesList }) => {
  const { dispatch, state } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();
  const handleDelete = (tableMeta) => (e) => {
    confirm("Are you sure you want to delete");
    const salesId = tableMeta.rowData[0];
    console.log(salesId);
    deleteSales({
      dispatch: dispatch,
      salesId: salesId,
      enqueueSnackbar: enqueueSnackbar,
    });
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
                href={`/sales/${tableMeta.rowData[1]}`}
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
      name: "Name",
      label: "Product Name",
    },
    {
      name: "Invoice",
      label: "Invoice Number",
    },
    {
      name: "Barcode",
      label: "Product Barcode",
    },
    {
      name: "amount",
      label: "Total Amount",
    },

    {
      name: "selling_price",
      label: "Selling Price",
    },
    {
      name: "qty",
      label: "Quantity",
    },
    {
      name: "serial_number",
      label: "Serial Number",
    },
  ];
  const [ready, setready] = useState(false);
  useEffect(() => {
    setready(true);
  }, []);

  console.log(salesList);

  const mySales = salesList.map((sale, i) => {
    return {
      delete: `${sale._id}`,
      update: `${sale._id}`,
      Name: `${sale.product}`,
      Barcode: `${sale.barcode}`,
      amount: `${sale.amount}`,
      qty: `${sale.quantity}`,
      // Price: `${sale.cost_price}`,
      Invoice: `${sale.invoice_number}`,
      serial_number: `${sale.serial_number}`,
      selling_price: `${sale.selling_price}`,
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
        <>
          <MUIDataTable
            title={"Lists Of Sales"}
            data={mySales}
            columns={columns}
            options={options}
          />
        </>
      )}
    </>
  );
};

export default SalesList;
