import { Button, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { addSalesData, deleteSales } from "src/statesManagement/store/actions/sales-action";
import { Store } from "src/statesManagement/store/store";
import NextLink from "next/link";

const ServicePaymentList = ({ serviceLists }) => {
  const { dispatch, state } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();
  const handleDelete = (tableMeta) => (e) => {
    const validate = confirm("Are you sure you want to delete");
    if (!!validate) {
      const salesId = tableMeta.rowData[0];
      deleteSales({
        dispatch: dispatch,
        salesId: salesId,
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
                href={`/services/${tableMeta.rowData[1]}`}
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
      label: "Service Name",
    },
    {
      name: "Invoice",
      label: "Invoice Number",
    },
    // {
    //   name: "Barcode",
    //   label: "Product Barcode",
    // },
    {
      name: "amount",
      label: "Total Amount",
    },

    {
      name: "selling_price",
      label: "Service Price",
    },

    {
      name: "serial_number",
      label: "Serial Number",
    },
    { name: "date", label: "Date" },
  ];
  const [ready, setready] = useState(false);
  useEffect(() => {
    setready(true);
  }, []);


  const myService = serviceLists?.map((serv, i) => {
    const strDate = new Date(serv?.created_at);
    function convert(strDate) {
      var date = new Date(strDate),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }
    return {
      delete: `${serv._id}`,
      update: `${serv._id}`,
      Name: `${serv.product}`,
      date: `${serv.created_at}`,
      Barcode: `${serv.barcode}`,
      amount: `${serv.amount}`,
      // Price: `${sale.cost_price}`,
      Invoice: `${serv.invoice_number}`,
      serial_number: `${serv.serial_number}`,
      selling_price: `${serv.selling_price}`,
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
        <>
          <MUIDataTable
            title={"Lists Of Rendered Service"}
            data={myService}
            columns={columns}
            options={options}
          />
        </>
      )}
    </>
  );
};

export default ServicePaymentList;
