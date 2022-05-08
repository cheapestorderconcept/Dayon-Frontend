import { Button, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";

import NextLink from "next/link";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { deleteProduct } from "src/statesManagement/store/actions/product-action";
import { Store } from "src/statesManagement/store/store";

const ServicesTable = ({ services, editable }) => {
  const [ready, setready] = useState(false);

  useEffect(() => {
    setready(true);
  }, []);
  const { dispatch } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = (tableMeta) => (e) => {
    const validate = confirm("Are you sure you want to delete");
    if (!!validate) {
      const productId = tableMeta.rowData[0];
      deleteProduct({
        dispatch: dispatch,
        productId: productId,

        enqueueSnackbar: enqueueSnackbar,
      });
    }
  };

  const columnsEditable = [
    {
      name: "name",
      label: "Service Name",
    },

    {
      name: "branch",
      label: "Branch",
    },
    {
      name: "service",
      label: "Service Category",
    },
    {
      name: "price",
      label: "Service Price",
    },
  ];

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
      name: "Update_Service",
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
                  Update Service
                </Typography>
              </NextLink>
            </Button>
          );
        },
      },
    },
    {
      name: "name",
      label: "Service Name",
    },

    {
      name: "branch",
      label: "Branch",
    },
    {
      name: "categories",
      label: "Service Category",
    },
    {
      name: "price",
      label: "Service Price",
    },
  ];

  // const product = products.map((pro) => Object.values(pro));
  // console.log(products);
  // const { state } = useContext(Store);
  // const { serviceCategories } = state;
  // console.log(serviceCategories);

  const service = services.services?.map((ser, i) => {
    const strDate = new Date(ser?.created_at);
    function convert(strDate) {
      var date = new Date(strDate),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }
    console.log(ser.service_categories);
    return {
      delete: `${ser._id}`,
      Update_Service: `${ser._id}`,
      name: `${ser.service_name}`,
      branch: `${ser.branch}`,
      service: `${ser.service_categories}`,
      price: `${ser.service_price}`,
      date: convert(strDate),
      // prev_qty: `${pro.previous_product_quantity}`,
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
          title={"Lists Of Services"}
          data={service}
          columns={editable ? columnsEditable : columns}
          options={options}
        />
      )}
    </>
  );
};

export default ServicesTable;
